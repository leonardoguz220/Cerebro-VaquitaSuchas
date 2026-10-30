---
title: "Riesgos y fraude"
tipo: negocio
area: negocio
parent: "[[Modelo-de-negocio]]"
date: 2026-10-29
tags: [area/negocio, negocio]
---

> Padre: [[Modelo-de-negocio]]

# Riesgos y fraude

| Riesgo | Mitigación en Vaquita | Límite |
|---|---|---|
| Miembro usa el servicio sin pagar | Pago previo al ingreso, retiro automático a los 3 días, deuda visible | Pérdida máxima del titular: una cuota |
| Solicitante paga y no lo agregan | Chat como evidencia, reclamo y baneo | Vaquita no custodia dinero |
| Comprobante falso | Referencia única por grupo, el titular verifica en su banco, reclamo | Verificación humana |
| Cuentas nuevas tras un baneo | Bloqueo de correo, celular, CI y Telegram | Difícil de evadir pero no imposible |
| Salida que deja un faltante | Ronda de regularización ([[Faltante-de-grupo-reglas]]) | La devolución es entre personas |
| Incumplir términos de la plataforma | Vaquita organiza pagos, no cuentas ([[Terminos-de-servicio-de-las-plataformas]]) | Responsabilidad de los usuarios |
| Datos personales | Cifrado de CI, logs sin datos, retención de 2 meses | Cumplir normas de protección de datos |
| Caída del plan gratuito | Respaldos y `db:dump` ([[Render]]) | Demo, no producción comercial |

Decisión base: [[ADR-0004-ingreso-con-pago-previo-y-chat]]. Seguridad técnica: [[Seguridad]].

Riesgos desde la óptica comercial: estafas entre usuarios (pago previo, chat con evidencia, reclamos, baneo), cambios de precio de plataformas (cada cobro guarda su copia), límites de compartir cuentas, infraestructura gratuita limitada. Ver [[Propuesta-de-producto-y-venta]] y [[Hoja-de-ruta-comercial]].
