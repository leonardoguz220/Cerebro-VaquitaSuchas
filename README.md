# Cerebro-VaquitaSuchas

Cerebro especializado del proyecto **Vaquita** (Grupo Suchas) hecho en [Obsidian](https://obsidian.md): todo el contexto del proyecto, cómo se desarrolla y los temas teóricos y prácticos que lo rodean (suscripciones compartidas, finanzas aplicadas, método SDD con Spec Kit, arquitectura, modelo de negocio). El código vive en `leonardoguz220/VaquitaSuchas`.

## Cómo abrirlo

1. Instala Obsidian (gratis).
2. Clona este repo y en Obsidian elige *Abrir carpeta como bóveda*.
3. Abre `Vaquita-Cerebro` y el gráfico (Ctrl/Cmd+G): cada área tiene su color y los nodos padre son los más grandes.

La configuración compartida de `.obsidian/` trae el gráfico con colores por área, plantillas y enlaces wiki. Lo personal (espacio de trabajo, tema) está en `.gitignore`.

## Estructura

```
Vaquita-Cerebro                 raíz
├── 01-Implementacion-Vaquita   specs, constitución, plan, backend, frontend, BD, CI/CD, despliegue, estado
├── 02-Arquitectura             capas, módulos, datos, jobs, integraciones
├── 03-Dominio                  glosario y reglas de negocio
├── 04-Operaciones              runbooks, pendientes, mantenimiento del vault
├── 05-Modelo-de-negocio        suscripciones, valor, competencia, riesgos
├── 06-SDD-y-SpecKit            el método y cómo se aplica
├── 07-Finanzas-aplicadas       dinero, USD a Bs, pagos, mora
├── 08-Calidad-y-Seguridad      pruebas, seguridad, accesibilidad, rendimiento
├── 09-Herramientas-IA          hooks, subagentes, skills
└── 90-Plantillas               plantillas de Obsidian (ADR, spec, reunión, retro, runbook)
```

Colores del gráfico (etiqueta `area/…`): implementación verde, arquitectura azul, dominio rojo, operaciones naranja, negocio violeta, SDD turquesa, finanzas verde oscuro, calidad amarillo, IA magenta.

## Cómo mantenerlo

Lee `04-Operaciones/Como-mantener-el-vault.md`. Resumen: rama `nota/<tema>`, PR a `main`, y `node scripts/check-vault.mjs` en verde (el CI lo corre).

## Seguridad

Sin secretos, URLs de bases de datos ni datos de usuarios. Si dudas, no lo subas.
