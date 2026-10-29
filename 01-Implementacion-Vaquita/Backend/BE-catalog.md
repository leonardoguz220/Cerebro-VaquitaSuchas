---
title: "Backend · módulo catalog"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-004]
related: ["[[Spec-004-catalogo-de-servicios]]"]
---

> Padre: [[Backend]]

# Módulo backend `catalog`

Catálogo de servicios y planes con búsqueda y categorías.

- Spec que lo define: [[Spec-004-catalogo-de-servicios]]
- Código: `backend/src/modules/catalog/` (capas: controllers, services, domain, repositories)
- Pruebas unitarias del módulo: 3 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/catalog/services` | catalog |
| GET | `/catalog/services/:slug` | catalog |
| GET | `/catalog/categories` | catalog |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-004-catalogo-de-servicios]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `catalog-cursor`, `catalog-search`, `categories`
- **Servicios:** `catalog`
- **Repositorios (SQL):** `catalog`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
