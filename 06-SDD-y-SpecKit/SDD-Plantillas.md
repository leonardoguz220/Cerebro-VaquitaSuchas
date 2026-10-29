---
title: "SDD · plantillas de spec, plan y tareas"
tipo: sdd
area: sdd
parent: "[[SDD-y-SpecKit]]"
date: 2026-10-29
tags: [area/sdd, sdd]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/_templates/
---

> Padre: [[SDD-y-SpecKit]]

# Plantillas del repo

Carpeta `specs/_templates/`. Las plantillas de Spec Kit están en `.specify/templates/` ([[Spec-Kit-en-el-repo]]).

## spec.md

```markdown
# Spec NNN — Nombre de la feature

- **Estado:** borrador | en revisión | aprobada | implementada
- **Líder de la spec:** nombre (capa)
- **Revisión por capa:** BD: pendiente · Backend: pendiente · Frontend: pendiente
- **Prioridad:** P0 | P1 | P2
- **Depende de:** specs NNN
- **Última actualización:** AAAA-MM-DD

## 1. Contexto y problema

¿Qué problema resuelve y para quién? ¿Por qué ahora? (3-6 líneas, sin tecnología.)

## 2. Objetivos

- Objetivo 1
- Objetivo 2

## 3. Fuera de alcance

- Lo que explícitamente NO se hará en esta spec.

## 4. Actores y permisos

| Actor | Puede | No puede |
|---|---|---|

## 5. Historias de usuario

- **HU-NNN-01:** Como _rol_, quiero _acción_, para _beneficio_.

## 6. Requisitos funcionales

- **RF-NNN-01:** El sistema debe …

## 7. Requisitos no funcionales

- **RNF-NNN-01:** (rendimiento, seguridad, accesibilidad, usabilidad)

## 8. Reglas de negocio

- **RN-NNN-01:** …

## 9. Casos borde y errores

| Situación | Comportamiento esperado |
|---|---|

## 10. Criterios de aceptación

Formato: **Dado** contexto, **cuando** acción, **entonces** resultado verificable.

- **CA-NNN-01:** Dado …, cuando …, entonces …

## 11. Preguntas abiertas

- [NECESITA ACLARACIÓN] …

## 12. Historial de cambios

| Fecha | Cambio | Autor |
|---|---|---|
```

## plan.md

```markdown
# Plan técnico — Spec NNN: Nombre de la feature

- **Spec relacionada:** `specs/NNN-nombre/spec.md` (debe estar **aprobada** por BD, Backend y Frontend)
- **Líder de la spec:** nombre
- **Última actualización:** AAAA-MM-DD

| Capa | Responsable | Secciones | Visto bueno |
|---|---|---|---|
| Base de datos | Camila | §3 | pendiente |
| Backend | Leonardo | §4, §5, §7 | pendiente |
| Frontend | Adrian | §6 | pendiente |

## 1. Resumen de la solución

Enfoque técnico en 3-6 líneas. ¿Qué piezas se tocan?

## 2. Decisiones técnicas

| Decisión | Opción elegida | Alternativas descartadas | Motivo |
|---|---|---|---|

## 3. Modelo de datos — _Camila (BD)_

Tablas nuevas o modificadas: campos, tipos, restricciones (únicas, claves foráneas, checks), índices y relaciones. Indicar qué datos son **snapshot** y qué datos son **inmutables**.

```
Entidad
- campo: tipo (restricciones)
```

Migraciones y datos semilla: qué se crea y en qué orden.

## 4. Contratos de API — _Leonardo (Backend)_

Para cada endpoint: método y ruta, rol requerido, request, response (éxito y errores).

### `METHOD /ruta`
- **Auth / rol:**
- **Request:**
- **Response 2xx:**
- **Errores:** código → cuándo

> **Contrato congelado** al aprobarse este plan. Los cambios se hacen por PR sobre este archivo y avisando a las otras dos capas.

## 5. Lógica de dominio — _Leonardo (Backend)_

Funciones puras a implementar (nombre, entradas, salidas, reglas) y procesos programados (cuándo corren, idempotencia, recuperación).

## 6. Interfaz de usuario — _Adrian (Frontend)_

Pantallas, componentes y estados (cargando, vacío, error), por rol. Qué endpoint usa cada pantalla. Bocetos si existen.

## 7. Seguridad y permisos — _Leonardo (Backend), con revisión de BD_

Quién puede qué, validaciones en servidor, manejo de datos sensibles, límites de intentos.

## 8. Estrategia de pruebas

| Criterio de aceptación | Nivel (unit / integración / E2E) | Capa | Test |
|---|---|---|---|

## 9. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|

## 10. Trazabilidad

Cada `RF-` y `CA-` de la spec está cubierto por al menos un elemento de este plan.
```

## tasks.md

```markdown
# Tareas — Spec NNN: Nombre de la feature

- **Spec:** `spec.md` · **Plan:** `plan.md`
- Capas: **BD** = Camila · **BE** = Leonardo · **FE** = Adrian
- Estados: pendiente, en curso, en revisión y hecha.
- Cada tarea se completa y verifica sola. Una tarea pertenece a **una** sola capa.

| ID | Capa | Tarea | Responsable | Depende de | Cubre (CA/RF) | Terminado cuando | Estado |
|---|---|---|---|---|---|---|---|
| T1 | BD | Migración y modelo de datos | Camila | — | RF-NNN-01 | Migración aplicada; restricciones verificadas con script | pendiente |
| T2 | BE | Lógica de dominio (funciones puras + tests) | Leonardo | — | CA-NNN-01 | Tests unitarios pasan | pendiente |
| T3 | BE | Endpoint … | Leonardo | T1, T2 | CA-NNN-02 | Test de integración pasa | pendiente |
| T4 | FE | Pantalla … con datos simulados (mock) | Adrian | contrato congelado | CA-NNN-03 | Pantalla completa con estados de carga/vacío/error | pendiente |
| T5 | FE | Conectar pantalla con el endpoint real | Adrian | T3, T4 | CA-NNN-03 | Flujo manual verificado | pendiente |
| T6 | FE | Test E2E del flujo | Adrian | T5 | CA-NNN-0X | E2E pasa en CI | pendiente |
| T7 | Todos | Cierre: `/speckit-converge`, actualizar spec/plan y retro | Líder | T6 | — | Documentos reflejan la realidad | pendiente |

## Puntos de integración (hitos)

- [ ] **I1:** Modelo de datos disponible para el backend (T1)
- [ ] **I2:** Contrato de API congelado (plan §4)
- [ ] **I3:** Frontend conectado al backend real (T5)

## Bloqueos y decisiones durante la implementación

| Fecha | Situación | Decisión | ¿Cambió la spec o el contrato? |
|---|---|---|---|
```
