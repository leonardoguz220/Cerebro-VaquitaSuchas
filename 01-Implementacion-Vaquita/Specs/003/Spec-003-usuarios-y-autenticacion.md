---
title: "Spec 003: Usuarios y autenticación"
tipo: spec
area: specs
parent: "[[Specs]]"
status: aprobada
date: 2026-10-29
tags: [area/specs, spec, spec-003]
related: ["[[BE-auth]]", "[[BE-users]]", "[[BD-Esquema-usuarios]]", "[[ADR-0005-identidad-cedula-telegram]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/specs/003-usuarios-y-autenticacion/spec.md
spec_id: "003"
lider: "Leonardo Guzman (Backend)"
prioridad: "P0"
---

> Padre: [[Specs]]

# Spec 003 — Usuarios y autenticación

## Resumen

Toda la app gira alrededor de personas que comparten dinero: hay que saber quién es cada una, protegerla de accesos ajenos y permitirle recuperar su cuenta. Esta spec define el registro, el inicio y cierre de sesión, la recuperación de contraseña y el perfil.

## Datos clave

- Estado: aprobada
- Líder: Leonardo Guzman (Backend)
- Prioridad: P0 (MVP)
- Depende de: [[Spec-000-setup-del-proyecto]]
- Última actualización: 2026-10-18
- Tamaño: 25 requisitos funcionales (RF), 5 reglas de negocio (RN), 35 criterios de aceptación (CA)
- Tareas: 50 hechas y 0 abiertas (ver [[Spec-003-tasks]])

## Historias de usuario

- **HU-003-01:** Como visitante, quiero registrarme con mi correo y una contraseña para usar Vaquita.
- **HU-003-02:** Como usuario, quiero iniciar y cerrar sesión de forma segura.
- **HU-003-03:** Como usuario, quiero recuperar mi contraseña desde mi correo si la olvido.
- **HU-003-04:** Como usuario, quiero editar mi nombre y mi celular para que mis compañeros me identifiquen.
- **HU-003-07:** Como visitante, quiero verificar mi celular compartiéndolo con el bot de Telegram de Vaquita, para demostrar que el número es mío sin esperar un SMS.
- **HU-003-05:** Como usuario, quiero cambiar mi contraseña estando dentro de la app.
- **HU-003-06:** Como usuario, quiero que, si me bloquean por intentos fallidos, el bloqueo sea temporal y claro.

## Dónde se implementa

- Backend: [[BE-auth]], [[BE-users]]
- Base de datos: [[BD-Esquema-usuarios]]
- Decisiones relacionadas: [[ADR-0005-identidad-cedula-telegram]]
- Roadmap: [[Roadmap-de-specs]]

## Documentos de esta spec

- [[Spec-003-texto-completo]] — Texto completo de la spec
- [[Spec-003-plan]] — Plan
- [[Spec-003-tasks]] — Tareas
- [[Spec-003-modelo-de-datos]] — Modelo de datos
- [[Spec-003-contrato-api]] — Contrato de API
- [[Spec-003-quickstart]] — Quickstart

## Notas hijas

- [[Spec-003-texto-completo]] — Spec 003 · Texto completo de la spec
- [[Spec-003-plan]] — Spec 003 · Plan
- [[Spec-003-tasks]] — Spec 003 · Tareas
- [[Spec-003-modelo-de-datos]] — Spec 003 · Modelo de datos
- [[Spec-003-contrato-api]] — Spec 003 · Contrato de API
- [[Spec-003-quickstart]] — Spec 003 · Quickstart
