---
title: "BD · relaciones entre tablas"
tipo: bd
area: implementacion
parent: "[[BD]]"
date: 2026-10-29
tags: [area/implementacion, bd, relaciones]
---

> Padre: [[BD]]

# Relaciones entre tablas

38 tablas. Relaciones por clave foránea extraídas de las migraciones (la flecha va de la tabla hija a la tabla referenciada):

```mermaid
erDiagram
    admin_audit_log }o--|| users : "ref"
    banned_identities }o--|| bans : "ref"
    bans }o--|| join_disputes : "ref"
    bans }o--|| users : "ref"
    billing_cycles }o--|| groups : "ref"
    billing_cycles }o--|| users : "ref"
    catalog_plans }o--|| catalog_services : "ref"
    charge_events }o--|| charges : "ref"
    charge_events }o--|| groups : "ref"
    charge_events }o--|| users : "ref"
    charge_reputation_exclusions }o--|| charges : "ref"
    charge_reputation_exclusions }o--|| users : "ref"
    charges }o--|| billing_cycles : "ref"
    charges }o--|| groups : "ref"
    charges }o--|| join_requests : "ref"
    charges }o--|| users : "ref"
    group_invitations }o--|| groups : "ref"
    group_invitations }o--|| users : "ref"
    group_members }o--|| groups : "ref"
    group_members }o--|| join_requests : "ref"
    group_members }o--|| users : "ref"
    groups }o--|| catalog_plans : "ref"
    groups }o--|| users : "ref"
    host_enablements }o--|| users : "ref"
    join_disputes }o--|| join_requests : "ref"
    join_disputes }o--|| users : "ref"
    join_messages }o--|| join_requests : "ref"
    join_messages }o--|| users : "ref"
    join_request_events }o--|| join_requests : "ref"
    join_request_events }o--|| users : "ref"
    join_request_reads }o--|| join_requests : "ref"
    join_request_reads }o--|| users : "ref"
    join_requests }o--|| charges : "ref"
    join_requests }o--|| groups : "ref"
    join_requests }o--|| listings : "ref"
    join_requests }o--|| users : "ref"
    listing_reports }o--|| listings : "ref"
    listing_reports }o--|| users : "ref"
    listings }o--|| groups : "ref"
    notification_deliveries }o--|| notifications : "ref"
    notification_preferences }o--|| users : "ref"
    notifications }o--|| users : "ref"
    password_reset_tokens }o--|| users : "ref"
    payment_references }o--|| groups : "ref"
    phone_verification_tokens }o--|| users : "ref"
    receipts }o--|| charges : "ref"
    receipts }o--|| users : "ref"
    reputation_reports }o--|| charges : "ref"
    reputation_reports }o--|| users : "ref"
    shortfall_events }o--|| shortfall_responses : "ref"
    shortfall_events }o--|| shortfall_rounds : "ref"
    shortfall_events }o--|| users : "ref"
    shortfall_responses }o--|| shortfall_rounds : "ref"
    shortfall_responses }o--|| users : "ref"
    shortfall_rounds }o--|| billing_cycles : "ref"
    shortfall_rounds }o--|| groups : "ref"
    shortfall_rounds }o--|| users : "ref"
    user_badges }o--|| charges : "ref"
    user_badges }o--|| users : "ref"
    user_reputation }o--|| users : "ref"
    user_suspensions }o--|| users : "ref"
```

Tablas: `admin_audit_log`, `banned_identities`, `bans`, `billing_cycles`, `catalog_plans`, `catalog_services`, `charge_events`, `charge_reputation_exclusions`, `charges`, `group_invitations`, `group_members`, `groups`, `host_enablements`, `job_runs`, `join_disputes`, `join_messages`, `join_request_events`, `join_request_reads`, `join_requests`, `listing_reports`, `listings`, `notification_deliveries`, `notification_preferences`, `notifications`, `password_reset_tokens`, `payment_references`, `phone_verification_tokens`, `rate_limit_events`, `receipts`, `reputation_reports`, `shortfall_events`, `shortfall_responses`, `shortfall_rounds`, `telegram_updates`, `user_badges`, `user_reputation`, `user_suspensions`, `users`.

Detalle por área en las notas `BD-Esquema-*` (enlazadas desde [[BD]]).
