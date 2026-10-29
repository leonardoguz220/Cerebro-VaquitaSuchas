---
title: "Arquitectura · módulos y dependencias"
tipo: arquitectura
area: arquitectura
parent: "[[Arquitectura]]"
date: 2026-10-29
tags: [area/arquitectura, arquitectura]
related: ["[[Backend]]"]
---

> Padre: [[Arquitectura]]

# Módulos y dependencias

Catorce módulos de backend, uno por carpeta de `backend/src/modules`. Un módulo puede usar **servicios** de otro, nunca sus repositorios, y no hay dependencias circulares. Cuando un módulo necesita datos de otro se define un **puerto** y un **adaptador** en `app-adapters` ([[BE-Adapters-y-CLI]]); `architecture.spec.ts` lo verifica.

| Módulo | Spec | Depende de (spec) |
|---|---|---|
| [[BE-auth]] / [[BE-users]] / [[BE-telegram]] | 003 | 000 |
| [[BE-catalog]] | 004 | 000 |
| [[BE-subscriptions]] | 001 | 003, 004 |
| [[BE-billing]] | 002 | 001 |
| [[BE-join-requests]] | 010 | 001, 002, 003 |
| [[BE-notifications]] | 005 | 001, 002, 003, 010 |
| [[BE-reports]] | 006 | 001, 002, 004 |
| [[BE-reputation]] | 007 | 001, 002 |
| [[BE-listings]] | 008 | 001, 003, 005, 007, 010 |
| [[BE-admin]] | 009 | 003, 004, 002, 008, 010 |
| [[BE-shortfalls]] | 011 | 001, 002, 005, 010 |
| [[BE-health]] | 000 | — |

Orden de construcción: [[Roadmap-de-specs]]. Por qué por capas: [[ADR-0002-arquitectura-por-capas]].
