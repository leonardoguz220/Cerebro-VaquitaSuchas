---
title: "Frontend · componentes, hooks, servicios y utilidades"
tipo: frontend
area: frontend
parent: "[[Frontend]]"
date: 2026-10-29
tags: [area/frontend, frontend, componentes]
---

> Padre: [[Frontend]]

# Componentes, hooks, servicios y utilidades

- **Componentes por feature** (`components/features`): `.gitkeep`, `admin`, `auth`, `brand`, `catalog`, `charges`, `dashboard`, `dev-telegram`, `groups`, `join-requests`, `listings`, `notifications`, `profile`, `reputation`, `shell`, `shortfalls`, `status`; y `components/ui` con los átomos compartidos.
- **Servicios de API** (`services/`): `admin`, `admin-audit`, `admin-catalog`, `admin-disputes`, `admin-moderation`, `auth`, `catalog`, `charges`, `dev-telegram`, `group-listing`, `groups`, `health`, `http`, `invitations`, `join-requests`, `listings`, `notifications`, `reports`, `reputation`, `shortfalls`, `users`. Cada uno tiene su versión simulada (`*.mock.ts`) para trabajar sin esperar al backend, y se conecta al real cuando el contrato está listo (hito de integración en [[Desarrollo-por-tarea]]).
- **Hooks** (`hooks/`): 59 hooks, por ejemplo `use-admin-audit`, `use-admin-catalog`, `use-admin-disputes`, `use-admin-hosts`, `use-admin-moderation`, `use-admin-stats`, `use-admin-transfer`, `use-admin-user`, `use-admin-user-search`, `use-admin-users`, `use-api-resource`, `use-api-submit`, etc. Patrón común: `use-api-resource` (lectura) y `use-api-submit` (escritura).
- **Utilidades** (`lib/`): `auth-validation`, `calendar-grid`, `clipboard`, `color-contrast`, `dates`, `download`, `exchange-rate`, `money`, `phone`, `profile-validation`, `receipt-file`, `routes`, `session-cookies`, `telegram-link`, `whatsapp`.

Las convenciones están en [[FE-Guia-de-la-capa]] y en la skill `vaquita-nextjs-conventions` ([[Skills]]). El formato de dinero (`Bs 25,50`) lo da `lib/money.ts`; las fechas se muestran en America/La_Paz ([[Reglas-de-dominio]]).
