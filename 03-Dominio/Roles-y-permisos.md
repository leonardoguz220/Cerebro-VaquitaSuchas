---
title: "Roles y permisos"
tipo: dominio
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, dominio]
---

> Padre: [[Dominio]]

# Roles y permisos

| Rol | Puede |
|---|---|
| Visitante | Registrarse, ingresar, recuperar contraseña |
| Usuario / miembro | Ver sus grupos y cobros, subir comprobantes, abrir solicitudes, calificar |
| Titular | Crear grupos (si está habilitado), confirmar o rechazar pagos, gestionar miembros, publicar cupos, abrir rondas de faltante |
| Administrador | Usuarios, baneos, habilitación de titulares, catálogo, reclamos, moderación y auditoría ([[Spec-009-administracion]]) |

Un usuario solo ve sus grupos. Permisos, montos y estados se validan en el servidor. Una persona puede ser titular en unos grupos y miembro en otros. CI cifrada y nunca visible a otros. Ver [[Seguridad]] y [[Funcionamiento-del-sistema]].
