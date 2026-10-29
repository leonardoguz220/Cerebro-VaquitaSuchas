---
title: "BD · las migraciones"
tipo: bd
area: bd
parent: "[[BD]]"
date: 2026-10-29
tags: [area/bd, bd, migraciones]
---

> Padre: [[BD]]

# Migraciones SQL numeradas

53 archivos en `database/migrations/`; la numeración llega hasta 0110 con saltos por bloque (cada spec reserva un rango de decenas: 00xx plataforma, 001x usuarios, 002x catálogo, 003x grupos, 004x cobros, 005x ingreso, 006x reputación, 007x notificaciones, 008x cupos, 009x administración, 010x reportes, 011x faltante). Las migraciones nunca corren al arrancar el backend: se aplican con los workflows manuales [[Workflow-migrate-staging]] y [[Workflow-migrate-production]]. El script `db:check` valida numeración y que no se hayan editado migraciones ya fusionadas; hay pruebas de checksum, idempotencia y atomicidad.

| Archivo | Esquema | Tablas |
|---|---|---|
| `0001_init.sql` | [[BD-Esquema-plataforma]] | — |
| `0002_job_runs.sql` | [[BD-Esquema-plataforma]] | job_runs |
| `0003_rate_limit_events.sql` | [[BD-Esquema-plataforma]] | rate_limit_events |
| `0004_telegram_updates.sql` | [[BD-Esquema-plataforma]] | telegram_updates |
| `0005_rate_limit_events_retention.sql` | [[BD-Esquema-plataforma]] | — |
| `0010_users.sql` | [[BD-Esquema-usuarios]] | users |
| `0011_phone_verification_tokens.sql` | [[BD-Esquema-usuarios]] | phone_verification_tokens |
| `0012_password_reset_tokens.sql` | [[BD-Esquema-usuarios]] | password_reset_tokens |
| `0013_banned_identities.sql` | [[BD-Esquema-usuarios]] | banned_identities |
| `0020_catalog.sql` | [[BD-Esquema-catalogo]] | catalog_services, catalog_plans |
| `0021_catalog_search.sql` | [[BD-Esquema-catalogo]] | — |
| `0030_groups.sql` | [[BD-Esquema-grupos]] | groups |
| `0031_group_members.sql` | [[BD-Esquema-grupos]] | group_members |
| `0032_group_triggers.sql` | [[BD-Esquema-grupos]] | — |
| `0033_group_members_identity_immutable.sql` | [[BD-Esquema-grupos]] | — |
| `0040_billing_cycles.sql` | [[BD-Esquema-cobros]] | billing_cycles |
| `0041_charges.sql` | [[BD-Esquema-cobros]] | charges |
| `0042_receipts.sql` | [[BD-Esquema-cobros]] | receipts, payment_references |
| `0043_charge_triggers.sql` | [[BD-Esquema-cobros]] | — |
| `0044_charge_events.sql` | [[BD-Esquema-cobros]] | charge_events |
| `0045_charge_events_group_and_review.sql` | [[BD-Esquema-cobros]] | — |
| `0050_join_requests.sql` | [[BD-Esquema-ingreso]] | join_requests |
| `0051_join_request_events.sql` | [[BD-Esquema-ingreso]] | join_request_events |
| `0052_join_messages.sql` | [[BD-Esquema-ingreso]] | join_messages, join_request_reads |
| `0053_join_disputes.sql` | [[BD-Esquema-ingreso]] | join_disputes |
| `0054_join_request_triggers.sql` | [[BD-Esquema-ingreso]] | — |
| `0055_join_request_links.sql` | [[BD-Esquema-ingreso]] | — |
| `0056_join_request_coherence.sql` | [[BD-Esquema-ingreso]] | — |
| `0060_user_reputation.sql` | [[BD-Esquema-reputacion]] | user_reputation |
| `0061_charge_reputation_exclusions.sql` | [[BD-Esquema-reputacion]] | charge_reputation_exclusions |
| `0062_reputation_reports.sql` | [[BD-Esquema-reputacion]] | reputation_reports |
| `0063_user_badges.sql` | [[BD-Esquema-reputacion]] | user_badges |
| `0064_reputation_ownership.sql` | [[BD-Esquema-reputacion]] | — |
| `0070_notifications.sql` | [[BD-Esquema-notificaciones]] | notifications |
| `0071_notification_preferences.sql` | [[BD-Esquema-notificaciones]] | notification_preferences |
| `0072_notification_deliveries.sql` | [[BD-Esquema-notificaciones]] | notification_deliveries |
| `0073_group_invitations.sql` | [[BD-Esquema-notificaciones]] | group_invitations |
| `0074_notification_triggers.sql` | [[BD-Esquema-notificaciones]] | — |
| `0075_notifications_link_internal.sql` | [[BD-Esquema-notificaciones]] | — |
| `0080_listings.sql` | [[BD-Esquema-cupos]] | listings |
| `0081_listing_reports.sql` | [[BD-Esquema-cupos]] | listing_reports |
| `0082_listings_links.sql` | [[BD-Esquema-cupos]] | — |
| `0083_listings_coherence.sql` | [[BD-Esquema-cupos]] | — |
| `0090_bans.sql` | [[BD-Esquema-administracion]] | bans |
| `0091_host_enablements.sql` | [[BD-Esquema-administracion]] | host_enablements |
| `0092_admin_audit_log.sql` | [[BD-Esquema-administracion]] | admin_audit_log |
| `0093_user_suspensions.sql` | [[BD-Esquema-administracion]] | user_suspensions |
| `0094_admin_triggers.sql` | [[BD-Esquema-administracion]] | — |
| `0095_admin_audit_log_recent_idx.sql` | [[BD-Esquema-administracion]] | — |
| `0096_admin_history_integrity.sql` | [[BD-Esquema-administracion]] | — |
| `0100_reports_views.sql` | [[BD-Esquema-reportes]] | — |
| `0101_reports_indexes.sql` | [[BD-Esquema-reportes]] | — |
| `0110_shortfalls.sql` | [[BD-Esquema-faltante]] | shortfall_rounds, shortfall_responses, shortfall_events |
