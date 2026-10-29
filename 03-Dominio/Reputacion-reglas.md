---
title: "Reputación: calificación, nivel y racha"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
related: ["[[Roles-y-permisos]]"]
---

> Padre: [[Dominio]]

# Reputación

Spec: [[Spec-007-reputacion]]. Módulo: [[BE-reputation]].

- **Cobros considerados:** últimos 12 meses en `pagado` o `atrasado`, sin los excluidos ni los de origen `ingreso` (RN-007-01, RN-007-09).
- **Puntual:** primera subida de comprobante ≤ fecha de vencimiento (RN-007-02); el último día cuenta hasta 23:59:59 America/La_Paz.
- **Estrellas:** `5 × puntuales / considerados`, redondeado a 0,5 (RN-007-03). Niveles: Excelente desde 95 %, Bueno 75 %, Regular 55 %, En riesgo por debajo.
- **Racha:** puntuales consecutivos más recientes; un no puntual la reinicia (RN-007-05).
- **Habilitación de titular:** 4,5 estrellas con al menos 6 cobros considerados, o habilitación manual de un administrador (RF-001-21, [[Spec-009-administracion]]).
- Las reglas de nivel e insignias son configuración versionada; si cambian se recalcula a todos. La reputación nunca se calcula con datos de otros usuarios.
