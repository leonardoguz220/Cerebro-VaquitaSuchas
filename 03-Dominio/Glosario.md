---
title: "Glosario del dominio"
tipo: glosario
area: dominio
parent: "[[Dominio]]"
date: 2026-10-29
tags: [area/dominio, glosario, glosario]
---

> Padre: [[Dominio]]

Términos de Vaquita. Cada uno tiene ancla: `[[Glosario#Titular]]`.

## Titular
Persona que paga el servicio, crea el grupo y confirma los pagos. Uno por grupo, sin cobro propio. Para crear grupos debe estar habilitado (4,5 estrellas con al menos 6 cobros, o habilitación manual). Máximo 5 grupos activos ([[Roles-y-permisos]]).

## Miembro
Persona que paga su cuota y sube comprobantes. Es miembro solo cuando el titular confirma su pago de ingreso ([[Ingreso-al-grupo]]).

## Cuota
Total del servicio entre los miembros actuales (titular incluido), en centavos enteros; los centavos sobrantes van al titular ([[Dinero-y-moneda]]).

## Ciclo y período
Mes de cobro de un grupo; el día de corte es del 1 al 31 y en meses cortos se usa el último día ([[Fechas-y-zona-horaria]]).

## Cobro
Deuda de un miembro en un ciclo. Estados: `pendiente`, `en_revision`, `pagado`, `atrasado`, `cancelado` ([[Estados-de-cobro]]).

## Ventana de ingreso
Los 3 primeros días del período (el corte es el día 1); solo entonces se abren solicitudes ([[Ingreso-al-grupo]]).

## Solicitud de ingreso
Se abre con el código de invitación; chat propio con el titular; 15 minutos para pagar y 60 para confirmar.

## Retiro automático
Sin pago a los 3 días del corte: el miembro sale, su cobro queda `atrasado` como deuda.

## Reclamo
Disputa de estafa (pagó y no lo agregaron, o comprobante falso); la revisa un administrador y puede banear.

## Faltante
Diferencia entre el total del servicio y lo cobrado cuando alguien sale después de que otros pagaron ([[Faltante-de-grupo-reglas]]).

## Ronda de regularización
Proceso del titular donde cada afectado cubre la diferencia o pide devolución.

## Devolución
Registro (método y referencia) de que el titular devolvió dinero por fuera; Vaquita no custodia dinero.

## Tipo de cambio
Lo ingresa el titular; cada cobro guarda una copia ([[Conversion-USD-a-Bs]]).

## CI
Cédula de identidad, obligatoria y única; el celular se verifica por Telegram ([[ADR-0005-identidad-cedula-telegram]]).

## Calificación y racha
Estrellas por puntualidad de pago y cobros puntuales consecutivos ([[Reputacion-reglas]]).

## Cupo libre
Lugar disponible que un titular publica para que otros pidan entrar ([[Spec-008-cupos-libres]]).
