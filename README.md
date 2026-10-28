# Cerebro-VaquitaSuchas

Segundo cerebro del proyecto **Vaquita** (Grupo Suchas) en [Obsidian](https://obsidian.md). Guarda decisiones, specs, glosario, arquitectura, runbooks y reuniones para que las decisiones futuras partan de lo que ya se sabe. El código vive en `leonardoguz220/VaquitaSuchas`.

## Cómo abrirlo

1. Instala Obsidian (gratis).
2. Clona este repo: `git clone <url-de-este-repo>`.
3. En Obsidian: *Abrir carpeta como bóveda* y elige la carpeta clonada.
4. Empieza en `00-Inicio`. El gráfico (Ctrl/Cmd+G) muestra cómo se conectan las notas.

La configuración compartida de `.obsidian/` activa plantillas (carpeta `90-Plantillas`), enlaces wiki y notas nuevas en `00-Inbox`. Lo personal (espacio de trabajo, tema) está en `.gitignore`.

## Cómo mantenerlo

Lee `Como-mantener-el-vault.md`. Flujo corto: rama `nota/<tema>` → PR a `main` → CI (`check-vault`) → fusionar. Con el plugin comunitario Obsidian Git se puede hacer commit y pull desde la app.

## Estructura

| Carpeta | Contenido |
|---|---|
| `00-Inbox` | Notas sin clasificar |
| `10-Decisiones` | ADR y decisiones (incluye supuestos pendientes de objeción) |
| `20-Specs` | Una nota por spec (000 a 011) y el roadmap |
| `25-Disenos` | Propuestas de diseño previas a una spec |
| `30-Arquitectura` | Proyecto, stack, capas, endpoints, funcionamiento |
| `40-Dominio` | Glosario y reglas de negocio |
| `50-Operaciones` | Flujo de ramas, runbooks, estado de despliegue, pendientes |
| `60-Equipo` | Personas y roles |
| `70-Reuniones` | Reuniones y retros |
| `80-Estudio` | Material de la defensa |
| `90-Plantillas` | ADR, spec, reunión, retro, runbook |

## Seguridad

Sin secretos, URLs de bases de datos ni datos de usuarios. Si dudas, no lo subas.
