---
title: "Funciones que resuelven el problema"
tipo: negocio
area: negocio
parent: "[[Modelo-de-negocio]]"
date: 2026-10-30
tags: [area/negocio, negocio]
status: verificada
related: ["[[Propuesta-de-producto-y-venta]]", "[[Specs]]"]
fuente: "propuesta-producto-y-venta-vaquita.pdf (documento de apoyo, fuera del repo)"
---

> Padre: [[Modelo-de-negocio]]

# Funciones que resuelven el problema

Según la propuesta, los diez módulos están construidos, probados y desplegados en entorno de pruebas. La app **no guarda dinero**: los pagos son externos y solo se registran comprobantes.

| Necesidad | Cómo lo hace Vaquita |
|---|---|
| Cuentas en USD y Bs | Plan del catálogo dividido en cuotas enteras en centavos, convertidas con el tipo de cambio del titular; la suma de cuotas es igual al total |
| Cobros mensuales | Se generan solos, con copia del precio y del tipo de cambio de ese momento |
| Pruebas de pago | El miembro sube comprobante; el titular confirma o rechaza con motivo; historial exportable a CSV |
| Confianza para entrar | Solicitud, chat con el titular, pago, y membresía solo cuando el titular confirma; reclamos revisados por un administrador |
| Puntualidad y reputación | Estrellas, insignias y ranking por pagar a tiempo; para ser titular hay que estar habilitado |
| Avisos | App, correo y Telegram opcional: cobro próximo, pago confirmado o rechazado, mora |
| Imprevistos de precio | Función de faltante: cubrir la diferencia o pedir devolución, con constancia de cada paso |
| Control del dinero | Panel con gasto mensual, ahorro frente al precio individual, calendario y deudas |

Detalle por spec: [[Specs]] y [[Roadmap-de-specs]]. Reglas: [[Estados-de-cobro]].
