---
title: "Backend · pruebas"
tipo: backend
area: backend
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/backend, backend, pruebas]
---

> Padre: [[Backend]]

# Pruebas del backend

- **Unitarias** (`*.spec.ts` junto al código): reglas de dominio puras, servicios con dobles y la regla de arquitectura `architecture.spec.ts`.
- **Integración / e2e** (`backend/test/*.e2e-spec.ts`): un test por criterio `CA-xxx` de endpoint, contra PostgreSQL real; corren en procesos particionados para no agotar el heap (PR #184).
- Cada test cita su `CA-xxx` ([[SDD-Criterios-CA-y-trazabilidad]]).

## Archivos e2e por área

- **admin:** `admin.audit`, `admin.ban`, `admin.ban-effects`, `admin.catalog`, `admin.catalog-import`, `admin.disputes`, `admin.guard`, `admin.hosts`, `admin.listings`, `admin.roles`, `admin.stats`, `admin.stats.perf`, `admin.suspension`, `admin.transfer`, `admin.users`
- **admin-catalog:** `admin-catalog`
- **auth:** `auth.ban`, `auth.guard`, `auth.leak`, `auth.log-privacy`, `auth.login`, `auth.password`, `auth.register`, `auth.register.concurrency`, `auth.session`
- **badges:** `badges`
- **billing:** `billing.debt`, `billing.entry-charge`, `billing.generate`, `billing.notifications`, `billing.overdue`, `billing.repositories`, `billing.retention`, `billing.security`, `billing.snapshot`, `billing.summary`
- **calendar:** `calendar`
- **catalog:** `catalog`, `catalog.perf`, `catalog.service`
- **charges:** `charges.concurrency`, `charges.permissions`, `charges.read`, `charges.review`, `charges.simulated-clock`
- **chat:** `chat`
- **cli:** `cli.seed`
- **dashboard:** `dashboard.access`, `dashboard.charts`, `dashboard.debts`, `dashboard.empty`, `dashboard.freshness`, `dashboard.history`, `dashboard.owed`, `dashboard.perf`, `dashboard.savings`, `dashboard.spend`
- **disputes:** `disputes`, `disputes.admin`
- **error-filter:** `error-filter`
- **export:** `export`, `export.limits`
- **groups:** `groups.close`, `groups.create`, `groups.events`, `groups.host-eligibility`, `groups.join-integration`, `groups.list`, `groups.payment-info`, `groups.permissions`, `groups.security`, `groups.update`, `groups.view`
- **guards:** `guards`
- **health:** `health`
- **invite-code:** `invite-code`
- **jobs:** `jobs.runner`, `jobs.tick`
- **join-requests:** `join-requests.accept`, `join-requests.concurrency`, `join-requests.deadlines`, `join-requests.decisions`, `join-requests.group-events`, `join-requests.list`, `join-requests.listing`, `join-requests.notifications`, `join-requests.open`, `join-requests.payment`, `join-requests.permissions`, `join-requests.repositories`, `join-requests.retention`, `join-requests.security`, `join-requests.timeline`
- **listings:** `listings.concurrency`, `listings.events`, `listings.expire`, `listings.publish`, `listings.reports`, `listings.requests`, `listings.search`, `listings.security`, `listings.view`
- **logging:** `logging`
- **mail:** `mail.dev`
- **membership:** `membership`
- **notifications:** `notifications.billing`, `notifications.delivery`, `notifications.groups`, `notifications.invitations`, `notifications.join-requests`, `notifications.list`, `notifications.preferences`, `notifications.purge`, `notifications.schedule`, `notifications.share`, `notifications.telegram`
- **ownership:** `ownership`
- **ranking:** `ranking`
- **receipts:** `receipts.reference`, `receipts.upload`
- **reports:** `reports`
- **reputation:** `reputation.adapters`, `reputation.events`, `reputation.facts`, `reputation.host`, `reputation.me`, `reputation.reconcile`
- **shortfalls:** `shortfalls`
- **storage:** `storage.contract`
- **subscriptions:** `subscriptions.snapshot`
- **swagger:** `swagger`
- **telegram:** `telegram.dev`, `telegram.verify`
- **users:** `users.phone-change`, `users.profile`

Visión global de la calidad: [[Estrategia-de-pruebas]].
