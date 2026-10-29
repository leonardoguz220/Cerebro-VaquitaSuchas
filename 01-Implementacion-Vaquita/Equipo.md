---
title: "Equipo y roles"
tipo: hub
area: desarrollo
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/desarrollo, hub]
---

> Padre: [[Implementacion-Vaquita]]

# Equipo (Grupo Suchas)

| Persona | Capa | Carpeta | Hace |
|---|---|---|---|
| Camila Fuentes | Base de datos | `database/` | Modelo, migraciones, restricciones, índices, seed del catálogo, consultas de reportes e integridad |
| Leonardo Guzman | Backend | `backend/` | API REST, dominio (cuotas, conversión, estados), autenticación, permisos, jobs, almacenamiento |
| Adrian Vargas | Frontend | `frontend/` | Pantallas, formularios, consumo de API, estados de carga/vacío/error, diseño móvil, E2E |

Los roles son fijos; lo que rota es quién lidera cada spec. El líder redacta y coordina, pero toda spec la aprueban las tres capas. Cada capa solo escribe en su carpeta (lo imponen los hooks, ver [[Hooks]]).

Ver [[Desarrollo-por-tarea]], [[Pendientes-de-Adrian-y-Camila]] y [[Pasos-pendientes-de-Leo]].
