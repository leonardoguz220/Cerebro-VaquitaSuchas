---
title: "BD (base de datos)"
tipo: hub
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, hub]
related: ["[[Backend]]", "[[Frontend]]"]
---

> Padre: [[Implementacion-Vaquita]]

# BD (PostgreSQL)

Dueña: **Camila Fuentes**. Carpeta `database/`. PostgreSQL 16 con migraciones SQL numeradas, seeds y pruebas de integridad ([[ADR-0001-postgresql-como-base-de-datos]]). La BD refuerza la integridad con restricciones: un solo titular por grupo, un cobro único por grupo, miembro y período, montos exactos (centavos enteros) y estados en un conjunto fijo.

## Cómo desarrolla Cami su tarea
Ver [[Desarrollo-por-tarea]]: rama `bd/NNN-tX-descripcion`, subagente `db-engineer`; publica el modelo en `plan.md` antes de que alguien programe sobre él.

## Contenido
[[BD-Migraciones]] · [[BD-Relaciones]] · [[BD-Herramientas-y-runbook]] · [[BD-Seeds]] · [[BD-Pruebas]] · [[BD-Guia-de-la-capa]]

Esquemas por área: [[BD-Esquema-plataforma]], [[BD-Esquema-usuarios]], [[BD-Esquema-catalogo]], [[BD-Esquema-grupos]], [[BD-Esquema-cobros]], [[BD-Esquema-ingreso]], [[BD-Esquema-reputacion]], [[BD-Esquema-notificaciones]], [[BD-Esquema-cupos]], [[BD-Esquema-administracion]], [[BD-Esquema-reportes]], [[BD-Esquema-faltante]].

Relacionados: [[Backend]], [[Runbook-migrar-produccion]], [[Render]].

## Notas hijas

- [[BD-Esquema-plataforma]] — BD · esquema: Plataforma: extensiones, job_runs, rate_limit_events y telegram_updates
- [[BD-Esquema-usuarios]] — BD · esquema: Usuarios e identidad
- [[BD-Esquema-catalogo]] — BD · esquema: Catálogo de servicios
- [[BD-Esquema-grupos]] — BD · esquema: Grupos y miembros
- [[BD-Esquema-cobros]] — BD · esquema: Ciclos, cobros y comprobantes
- [[BD-Esquema-ingreso]] — BD · esquema: Solicitudes de ingreso, chat y reclamos
- [[BD-Esquema-reputacion]] — BD · esquema: Reputación
- [[BD-Esquema-notificaciones]] — BD · esquema: Notificaciones
- [[BD-Esquema-cupos]] — BD · esquema: Cupos libres
- [[BD-Esquema-administracion]] — BD · esquema: Administración
- [[BD-Esquema-reportes]] — BD · esquema: Vistas e índices de reportes
- [[BD-Esquema-faltante]] — BD · esquema: Faltante de grupo
- [[BD-Migraciones]] — BD · las migraciones
- [[BD-Relaciones]] — BD · relaciones entre tablas
- [[BD-Herramientas-y-runbook]] — BD · README de database (comandos, respaldo, migrar producción, rol de la app)
- [[BD-Seeds]] — BD · seeds (catálogo y datos de desarrollo)
- [[BD-Guia-de-la-capa]] — BD · guía de la capa (CLAUDE.md)
- [[BD-Pruebas]] — BD · pruebas de integridad
