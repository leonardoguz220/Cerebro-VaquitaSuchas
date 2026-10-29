---
title: "Seguridad en Vaquita"
tipo: calidad
area: calidad
parent: "[[Calidad-y-Seguridad]]"
date: 2026-10-29
tags: [area/calidad, calidad]
related: ["[[Riesgos-y-fraude]]"]
---

> Padre: [[Calidad-y-Seguridad]]

# Seguridad en Vaquita

Qué se hace y dónde:

- **Sesión:** cookie httpOnly; el navegador solo habla con el proxy `/api` de Next.js, que reenvía al backend ([[Frontend]], [[BE-auth]]).
- **Contraseñas:** argon2id (parámetros a medir en el despliegue), política de contraseñas, bloqueo por intentos y limitación de tasa (`rate_limit_events`).
- **Identidad:** CI cifrada (`CI_ENCRYPTION_KEY`), celular verificado por Telegram, baneo con huellas irreversibles de correo, celular, CI y Telegram ([[ADR-0005-identidad-cedula-telegram]]).
- **Autorización en el servidor:** guards por rol y pertenencia al grupo; un usuario solo ve sus grupos; `403`/`404` para ajenos ([[Roles-y-permisos]]).
- **Archivos:** comprobantes validados por firma de archivo, almacenamiento privado, URLs firmadas ([[Supabase-Storage]]).
- **Logs sin datos personales, tokens ni contraseñas**; errores sin detalles internos (`auth.log-privacy`, `auth.leak` e2e).
- **Secretos solo en variables de entorno**; gitleaks en cada PR y semanal ([[Runbook-gitleaks-y-secretos]]).
- **Base de datos:** rol de aplicación solo DML, TLS en producción, respaldo previo a migrar ([[Runbook-migrar-produccion]]).
- **Entradas:** validación con DTO, texto plano en publicaciones (`plain-text`), pruebas XSS (`listings-xss.spec.ts`).
- **Auditoría:** `admin_audit_log` registra acciones de administración y aperturas de evidencia ([[BE-admin]]).
- **Fraude:** reclamos, baneo y evidencia del chat ([[Riesgos-y-fraude]]).
- **Hooks de Claude Code** bloquean secretos y comandos peligrosos ([[Hooks]]); el agente `security-auditor` revisa ([[Subagentes]]).

Checklist general: [[Seguridad-checklist-general]].

## Notas hijas

- [[Seguridad-checklist-general]] — Seguridad · checklist general
