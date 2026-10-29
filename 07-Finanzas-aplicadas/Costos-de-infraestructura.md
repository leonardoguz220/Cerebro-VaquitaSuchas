---
title: "Costos de infraestructura"
tipo: finanzas
area: finanzas
parent: "[[Finanzas-aplicadas]]"
date: 2026-10-29
tags: [area/finanzas, finanzas]
---

> Padre: [[Finanzas-aplicadas]]

# Costos de infraestructura

Todo corre en capas gratuitas: Render (servicio web y base PostgreSQL; la base caduca a los 30 días), Vercel, Supabase Storage, Brevo (300 correos diarios), Telegram (sin costo) y cron-job.org. Un SMS para verificar celular costaría USD 0,19 a 0,26 por mensaje a Bolivia según un proveedor consultado, razón por la que se eligió Telegram ([[ADR-0005-identidad-cedula-telegram]]). Una operación real exigiría planes de pago, dominio propio y respaldos programados. *Los precios cambian: verificar antes de presupuestar.*

Ver [[Despliegue]], [[Ingresos-y-costos]].
