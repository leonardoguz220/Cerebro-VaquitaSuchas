---
title: "Backend"
tipo: hub
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, hub]
related: ["[[BD]]", "[[Frontend]]", "[[Arquitectura]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Backend (NestJS)

Dueño: **Leonardo Guzman**. Carpeta `backend/`. NestJS con TypeScript, arquitectura por capas por módulo (controladores, servicios, dominio, repositorios) y SQL directo con `pg`. Las reglas de negocio viven solo aquí ([[Reglas-de-dominio]]).

## Cómo desarrolla Leo su tarea
Ver [[Desarrollo-por-tarea]]: rama `be/NNN-tX-descripcion`, subagente `backend-engineer` ([[Subagentes]]), test del `CA-xxx` junto con el código, PR a `dev`.

## Módulos
- [[BE-admin]] — spec 009
- [[BE-auth]] — spec 003
- [[BE-billing]] — spec 002
- [[BE-catalog]] — spec 004
- [[BE-health]] — spec 000
- [[BE-join-requests]] — spec 010
- [[BE-listings]] — spec 008
- [[BE-notifications]] — spec 005
- [[BE-reports]] — spec 006
- [[BE-reputation]] — spec 007
- [[BE-shortfalls]] — spec 011
- [[BE-subscriptions]] — spec 001
- [[BE-telegram]] — spec 003
- [[BE-users]] — spec 003

## Transversal
[[BE-Jobs]] · [[BE-Shared]] · [[BE-Adapters-y-CLI]] · [[BE-Pruebas]] · [[BE-Guia-de-la-capa]] · [[BE-Despliegue-notas]] · [[Endpoints-y-pantallas]] · [[Arquitectura-por-capas]]

## Notas hijas

- [[BE-admin]] — Backend · módulo admin
- [[BE-auth]] — Backend · módulo auth
- [[BE-billing]] — Backend · módulo billing
- [[BE-catalog]] — Backend · módulo catalog
- [[BE-health]] — Backend · módulo health
- [[BE-join-requests]] — Backend · módulo join-requests
- [[BE-listings]] — Backend · módulo listings
- [[BE-notifications]] — Backend · módulo notifications
- [[BE-reports]] — Backend · módulo reports
- [[BE-reputation]] — Backend · módulo reputation
- [[BE-shortfalls]] — Backend · módulo shortfalls
- [[BE-subscriptions]] — Backend · módulo subscriptions
- [[BE-telegram]] — Backend · módulo telegram
- [[BE-users]] — Backend · módulo users
- [[BE-Jobs]] — Backend · jobs programados
- [[BE-Shared]] — Backend · código compartido
- [[BE-Adapters-y-CLI]] — Backend · adaptadores y comandos CLI
- [[BE-Pruebas]] — Backend · pruebas
- [[BE-Guia-de-la-capa]] — Backend · guía de la capa (CLAUDE.md)
- [[BE-Despliegue-notas]] — Backend · notas de despliegue (DEPLOY.md)
