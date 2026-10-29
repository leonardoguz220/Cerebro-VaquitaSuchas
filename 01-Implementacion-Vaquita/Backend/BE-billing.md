---
title: "Backend · módulo billing"
tipo: backend
area: implementacion
parent: "[[Backend]]"
date: 2026-10-29
tags: [area/implementacion, backend, backend, spec-002]
related: ["[[Spec-002-cobros-y-pagos]]"]
---

> Padre: [[Backend]]

# Módulo backend `billing`

Ciclos y cobros mensuales, comprobantes, confirmación o rechazo del titular, pago manual, cancelación, deuda y retención.

- Spec que lo define: [[Spec-002-cobros-y-pagos]]
- Código: `backend/src/modules/billing/` (capas: controllers, services, domain, repositories, jobs, ports)
- Pruebas unitarias del módulo: 20 archivos `*.spec.ts` (más e2e en `backend/test/`, ver [[BE-Pruebas]])
- Tablas: ver [[BD]] y la nota de esquema de la spec

## Endpoints

| Método | Ruta | Controlador |
|---|---|---|
| GET | `/me/charges` | charges |
| GET | `/charges/:chargeId` | charges |
| POST | `/charges/:chargeId/confirm` | charges |
| POST | `/charges/:chargeId/reject` | charges |
| POST | `/charges/:chargeId/manual-payment` | charges |
| POST | `/charges/:chargeId/cancel` | charges |
| GET | `/groups/:groupId/billing/summary` | group-billing |
| GET | `/groups/:groupId/charges` | group-billing |
| POST | `/charges/:chargeId/receipts` | receipts |
| GET | `/charges/:chargeId/receipts/:receiptId/file` | receipts |

Todas las rutas pasan por el proxy `/api` del frontend ([[Frontend]]). Contrato detallado: [[Spec-002-cobros-y-pagos]] (nota de contrato dentro de la spec).

## Estructura por capas

- **Dominio** (funciones puras, 100 % con tests): `access`, `charge-cursor`, `charge-state`, `cycle-calculation`, `due-date`, `entry-charge`, `file-signature`, `history-cursor`, `manual-payment`, `missed-periods`, `period-totals`, `punctuality`, `receipt-file`, `receipt-upload`, `reference`, `retention`, `review-instant`
- **Servicios:** `billing-cycles`, `billing-read`, `charge-access`, `charge-presenter`, `charge-views`, `charges`, `group-billing`, `overdue`, `payment-reference`, `receipts`, `retention`
- **Repositorios (SQL):** `charge-facts`, `charge-read`, `charges`, `cycles`, `events`, `payment-references`, `receipts`

Reglas de la arquitectura: [[Arquitectura-por-capas]] y [[Reglas-de-dominio]].
