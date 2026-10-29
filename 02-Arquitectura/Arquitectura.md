---
title: "Arquitectura"
tipo: hub
area: arquitectura
parent: "[[Vaquita-Cerebro]]"
date: 2026-10-29
tags: [area/arquitectura, hub]
related: ["[[Implementacion-Vaquita]]", "[[Dominio]]"]
---

> Padre: [[Vaquita-Cerebro]]

# Arquitectura

Cómo está construido Vaquita: tres capas (frontend, backend, base de datos), el backend en módulos por capas, datos con integridad fuerte, tareas por tick externo e integraciones aisladas por puertos.

- Capas y stack: [[Arquitectura-por-capas]], [[Stack]]
- Comportamiento: [[Funcionamiento-del-sistema]], [[Arquitectura-Flujo-extremo-a-extremo]]
- Módulos y dependencias: [[Arquitectura-Modulos]]
- Datos: [[Arquitectura-Datos]]
- Jobs: [[Arquitectura-Jobs]]
- Integraciones: [[Arquitectura-Integraciones]]
- API: [[Endpoints-y-pantallas]]

Implementación concreta: [[Implementacion-Vaquita]]. Reglas de negocio: [[Dominio]]. Seguridad transversal: [[Seguridad]].

## Notas hijas

- [[Arquitectura-por-capas]] — Arquitectura por capas
- [[Stack]] — Stack técnico
- [[Funcionamiento-del-sistema]] — Funcionamiento del sistema
- [[Endpoints-y-pantallas]] — Endpoints y pantallas
- [[Arquitectura-Modulos]] — Arquitectura · módulos y dependencias
- [[Arquitectura-Datos]] — Arquitectura · datos y principios de modelado
- [[Arquitectura-Jobs]] — Arquitectura · tareas programadas
- [[Arquitectura-Integraciones]] — Arquitectura · integraciones externas
- [[Arquitectura-Flujo-extremo-a-extremo]] — Arquitectura · flujo de punta a punta
