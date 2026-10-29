---
title: "Diseño: grupo incompleto (faltante de cuotas)"
tipo: design
area: implementacion
parent: "[[Spec-011-faltante-de-grupo]]"
status: propuesta
date: 2026-10-29
tags: [area/implementacion, design]
related: ["[[Decision-plazos-faltante-grupo]]"]
---

> Padre: [[Spec-011-faltante-de-grupo]]

> Propuesta previa a la spec 011. Donde difiere, manda [[Spec-011-faltante-de-grupo]]. Archivo de la carpeta compartida `disenos/`.

Estado: propuesta de diseño, sin código ni PR. Base: specs 001, 002, 005, 010, `context/dominio.md` y la skill `vaquita-money-and-billing`.

## 1. Qué hay hoy y dónde está el hueco

- La cuota se divide entre los **miembros actuales** (titular incluido), no entre los cupos (RF-001-10, RN-001-02). Un grupo "sin llenar" ya paga más por persona, y eso está resuelto.
- El hueco aparece **después de pagar**: un ciclo se emitió para `m` miembros, `m−1` personas pagaron y una se fue o no completó (retirada por mora, abandono, quitada, solicitud caída). El total `T` del servicio ya no se cubre y hoy lo absorbe el titular en silencio.
- Vaquita **no custodia ni devuelve dinero** (002 §3, 010 §3, roadmap, `context/proyecto.md`). Una "devolución" solo puede ser un **registro** de que el titular devolvió por fuera, con evidencia y reclamo si no cumple (mismo criterio de RN-010-07).
- Los estados de cobro no se tocan (`pendiente/en_revision/pagado/atrasado/cancelado`). Lo nuevo vive en una entidad propia y en un cobro de **origen nuevo**, no en un estado nuevo.

## 2. Propuesta: "Regularización de faltante" (spec 011)

Entidad por grupo y período, abierta por el titular. Tiene estados propios, separados de los del cobro:

`abierta → resuelta | vencida | cancelada` (finales las tres)

Cada miembro afectado tiene una fila de respuesta: `pendiente → cubre | pide_devolucion | sin_respuesta`.

### Flujo
1. Titular pulsa "Avisar al grupo" en un período con faltante. El **backend** calcula la cotización y la fija (el frontend no calcula).
2. Cada miembro recibe aviso (app, correo, Telegram) y ve en la app: lo que ya pagó, lo que debe agregar y el plazo.
3. Miembro elige:
   - **(a) Cubrir:** se crea un cobro complementario (origen `ajuste`) que sigue el flujo normal: comprobante → titular confirma → `pagado`.
   - **(b) Devolución:** deja el grupo y se abre un registro de devolución por lo que pagó.
4. Al vencer el plazo se cierra la ronda. Quien no respondió cuenta como `sin_respuesta` (ver §5).
5. Devolución: el titular registra "devolví" con referencia y comprobante; el miembro confirma "recibí" o disputa. Disputa o silencio del titular pasados 7 días → reclamo ante el administrador (misma cola que 010/009: sanción y constancia, no reintegro).

### Reglas de dinero (todo en centavos, función pura `calculateShortfallQuote`)
- `T` = `total_bs_cents` del ciclo (snapshot; no se re-lee tipo de cambio ni precio vigente).
- `m'` = miembros que se quedan en la cotización (titular incluido, quienes ya salieron no cuentan).
- `cuota_nueva = floor(T / m')`; el resto va al titular (RN-001-02), así `Σ cuotas == T`.
- Extra de cada miembro: `max(cuota_nueva − pagado_i, 0)`. El titular no genera cobro (RN-001-10); su cuota de referencia sube.
- Devolución = lo **efectivamente pagado y confirmado** por esa persona, sin comisión ni recargo.
- Ejemplo: T = Bs 100,00, titular + A, B, C (cuota 25,00; A, B y C pagaron). C pide devolución. `m' = 3`, `cuota_nueva = 33,33`, el titular absorbe el centavo (33,34). A y B deben **Bs 8,33** cada uno; el titular devuelve Bs 25,00 a C. Titular neto: 75 + 16,66 − 25 − 100 = −33,34 = su cuota. Cuadra.
- Plazos (configurables, como RN-005-06): responder 48 h; pagar el ajuste 48 h desde que acepta; titular devuelve en 5 días; reclamo hasta 7 días después.

### Reglas importantes
- Una sola ronda abierta por grupo y período. Cotización **inmutable** mientras está abierta (igual que RN-010-01).
- Si alguien elige devolución, `m'` baja y los que aceptaron quedarían con un extra mayor. Para no hacer cascadas: **la cotización de la ronda no se reabre**. Al cerrar, el titular elige: absorber la diferencia, abrir una segunda y última ronda, o cerrar el grupo (RF-001-18).
- El cobro `ajuste` no cuenta para la puntualidad (se excluye como `ingreso`, RN-007-09): el miembro no tiene culpa del faltante.
- Si vence el ajuste sin pagar: aplica lo de `sin_respuesta`; **no** hay retiro por mora automático por este cobro (decisión de simplicidad; evita castigar doble).
- Si llega el siguiente corte con la ronda abierta, la ronda pasa a `vencida` y el ciclo nuevo se genera normal con los miembros que queden.
- Grupo cerrado o congelado por baneo: no se abre ni se avanza (`422 GROUP_FROZEN`).

## 3. Modelo de datos (BD, Camila)

Migraciones nuevas, siguiente número libre (0110+):
- `shortfall_rounds`: `id, group_id, cycle_id, period, total_bs_cents, member_count_after, base_share_cents, owner_share_cents, shortfall_cents, status, respond_by, opened_by, closed_at, close_decision, version`. Único: una ronda `abierta` por (group_id, period) (índice parcial).
- `shortfall_responses`: `round_id, user_id, paid_cents, extra_due_cents, choice, responded_at, adjustment_charge_id NULL`. PK (round_id, user_id).
- `refunds`: `id, round_id, user_id, amount_cents, status (pendiente|enviada|confirmada|disputada|reclamada), reference, receipt_file, sent_at, confirmed_at, version`. Referencia única por grupo (RN-010-14).
- `shortfall_events`: solo anexado, igual que `charge_events`.
- **Cambio sobre tablas congeladas (requiere PR avisando a las tres personas):** `charges.origin` agrega `'ajuste'`; hoy hay a lo más un cobro por (grupo, miembro, período) (RF-002-04), y el ajuste lo rompe. Salida limpia: ampliar la unicidad a (grupo, miembro, período, origen) y que RN-002-10/RF-002-04 lo digan. Trigger de estado inicial `pendiente` para `ajuste`.

## 4. Endpoints (contrato nuevo, `specs/011-.../contracts/api.md`)

| Método y ruta | Quién | Para qué |
|---|---|---|
| `GET /groups/:groupId/shortfall/preview?period=` | Titular | Cotización calculada por el backend, sin abrir nada |
| `POST /groups/:groupId/shortfall` | Titular | Abre la ronda, fija cotización, notifica |
| `GET /groups/:groupId/shortfall/current` | Titular y miembros | Ronda actual (miembro solo ve su fila; no ve lo de otros) |
| `POST /shortfall/:id/respond` `{choice: "cubrir"\|"devolucion"}` | Miembro | Responde; crea cobro `ajuste` o registro de devolución |
| `POST /shortfall/:id/close` `{decision: "absorber"\|"nueva_ronda"\|"cerrar_grupo"}` | Titular | Cierra tras el plazo |
| `POST /shortfall/:id/cancel` | Titular | Cancela si no hay respuestas pagadas |
| `GET /me/refunds`, `GET /refunds/:id` | Miembro / titular | Seguimiento |
| `POST /refunds/:id/mark-sent` (multipart: referencia + comprobante) | Titular | "Ya devolví" |
| `POST /refunds/:id/confirm` · `POST /refunds/:id/dispute` | Miembro | Confirma o disputa; la disputa abre reclamo |

El cobro `ajuste` se paga y confirma con los endpoints existentes `/charges/:id/...`, sin duplicarlos. Reutiliza `version` para concurrencia optimista y transiciones en funciones puras con test exhaustivo (como CA-002-21).

## 5. Qué pasa si alguien no responde o rechaza

- **Rechaza pagar más** = elige devolución. No hay "ni lo uno ni lo otro": no se puede obligar a pagar más sin consentimiento ni quedarse con dinero ya pagado por un servicio que no se completa.
- **No responde en 48 h** (recomendado): se trata como devolución pendiente de confirmar. El miembro sale del grupo y la devolución queda registrada para el titular; se le avisa antes y al cierre. Alternativa más suave: mantenerlo y que el titular absorba; la desecho porque deja el faltante abierto indefinidamente.
- **Titular no devuelve:** miembro disputa → reclamo → administrador decide; con `estafa_confirmada` se banea (spec 009/010). Vaquita no mueve dinero.
- **Miembro dice "ya recibí" sin haber recibido:** la confirmación es del miembro; la disputa se hace antes de confirmar. Evidencia queda en `shortfall_events`.

## 6. Notificaciones (spec 005, tipos nuevos en `catalog.ts`)

Todas con clave de idempotencia (ronda, usuario, tipo), aviso en app + correo + Telegram, y Telegram sin montos (RF-005-27):
`faltante_abierto` (miembros), `faltante_recordatorio` (12 h antes de `respond_by`), `faltante_cobro_ajuste` (con monto y vencimiento), `faltante_cerrado` (todos), `devolucion_registrada`, `devolucion_confirmada`/`devolucion_disputada` (titular), `devolucion_recordatorio` (titular, a los 3 días). Urgentes: se generan en el momento, no con la tarea de las 08:00 (como RF-005-25).
Tareas programadas: cerrar rondas vencidas y recordar devoluciones, con evaluación al consultar (patrón RNF-010-03).

## 7. Casos límite

- Dos titulares-acciones a la vez (abrir y cancelar): una gana por `version`.
- Un miembro sale por su cuenta mientras la ronda está abierta: su fila pasa a `pide_devolucion` y la cotización no se reabre.
- Cambia el tipo de cambio o el precio: no afecta, la cotización usa el ciclo.
- Pagó de más (`pagado_i ≥ cuota_nueva`): extra 0; puede pedir devolución completa igual.
- Faltante menor a un centavo por persona: el resto va al titular; si `extra = 0` para todos, no se permite abrir ronda.
- Solo queda el titular (`m' = 1`): no se abre ronda; se ofrece cerrar el grupo y devolver a todos.
- Miembro baneado/suspendido: su fila se marca `sin_respuesta`; su devolución queda a decisión del titular.
- Cobro `en_revision` al abrir: se espera su resolución; si se confirma, ese miembro ya "pagó".
- Miembro que ya había sido retirado por mora: no participa (su cobro `atrasado` sigue como deuda, RN-002-11).
- Rondas repetidas: máximo 2 por período.

## 8. Qué specs hay que tocar (mismo PR que el código)

- 002: RN-002-10 (origen `ajuste`), RF-002-04 (unicidad), §3 "Reembolsos" (aclarar: registro, no movimiento de dinero).
- 001: RF-001-12/15/23 (referencia a la regularización).
- 005: tipos de aviso nuevos. 007: exclusión de cobros `ajuste`. 009/010: reclamo por devolución.
- `context/proyecto.md` y roadmap: "Custodia o devolución" sigue fuera; se agrega "registro de devoluciones entre pares".
- Es cambio de modelo y contrato: PR avisando a Camila, Leonardo y Adrian.

## 9. Recomendación y tamaño

Recomiendo **una spec nueva 011 "Regularización de faltante"** con la ronda única, cotización fija, devolución como registro con reclamo, y decisión final del titular. No intentaría detección automática ni segunda ronda en el MVP: el titular abre la ronda a mano (la detección automática queda P2).

Tamaño: **M-L**, aproximadamente 40 % de la spec 010 (sin chat).
- Spec, clarify, plan y tareas: 1–2 días.
- BD: 4 tablas + ajuste de `charges` (+ triggers): ~1 día.
- Backend: funciones puras (cotización, transiciones), servicio, ~9 endpoints, 2 tareas, 7 avisos, tests por CA: ~3–4 días.
- Frontend: pantalla de aviso/cotización (titular), pantalla de respuesta (miembro), seguimiento de devoluciones, E2E del flujo feliz: ~3 días.
- Total ≈ 8–10 días-persona repartidos entre las tres capas; riesgo principal: el cambio de unicidad en `charges`.

## 10. Preguntas abiertas para Leo (marcar `[NECESITA ACLARACIÓN]` en la spec)

1. Silencio = devolución y salida del grupo (recomendado) o el titular absorbe.
2. ¿El titular entra en el reparto del faltante? (recomendado: sí, igual que RF-001-10).
3. ¿Se permite segunda ronda en el MVP o solo absorber/cerrar?
