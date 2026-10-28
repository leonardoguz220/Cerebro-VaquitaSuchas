---
title: "Glosario del dominio"
type: glossary
date: 2026-10-28
tags: [dominio, glosario]
related: ["[[Reglas-de-dominio]]"]
fuente: https://github.com/leonardoguz220/VaquitaSuchas/blob/main/context/dominio.md
---
Términos de Vaquita. Cada término tiene su ancla para enlazar con `[[Glosario#Titular]]`.

## Titular
Persona que paga el servicio, crea el grupo y confirma los pagos. Uno por grupo, sin cobro propio. Para crear grupos debe estar habilitado (4,5 estrellas con al menos 6 cobros, o habilitado por un administrador). Máximo 5 grupos activos.

## Miembro
Persona que paga su cuota y sube comprobantes. Solo es miembro cuando el titular confirma su pago de ingreso ([[ADR-0004-ingreso-con-pago-previo-y-chat]]).

## Cuota
Total del servicio dividido entre los miembros actuales (titular incluido), en centavos enteros. Los centavos sobrantes van al titular y la suma siempre da el total.

## Ciclo y período
Mes de cobro de un grupo. El día de corte es del 1 al 31; en meses cortos se usa el último día.

## Cobro
Deuda de un miembro en un ciclo. Estados: `pendiente`, `en_revision`, `pagado`, `atrasado`, `cancelado`. No se inventan estados ([[Reglas-de-dominio]]).

## Ventana de ingreso
Los 3 primeros días del período (el corte cuenta como día 1). Solo entonces se abren solicitudes de ingreso.

## Solicitud de ingreso
Se abre con el código de invitación. Tiene chat propio con el titular, 15 minutos para pagar y 60 para que el titular confirme. Ver [[Spec-010-solicitudes-de-ingreso]].

## Retiro automático
Quien no paga dentro de los 3 días siguientes al corte sale del grupo y su cobro queda `atrasado` como deuda.

## Reclamo
Disputa por estafa (ingreso pagado y no agregado, o comprobante falso). Un administrador revisa y puede banear.

## Faltante
Diferencia entre el total del servicio y lo cobrado cuando alguien sale después de que otros pagaron. Se resuelve con una ronda de regularización ([[Spec-011-faltante-de-grupo]]).

## Ronda de regularización
Proceso abierto por el titular: cada afectado elige cubrir la diferencia o pedir devolución. Ver [[Decision-plazos-faltante-grupo]].

## Devolución
Registro (método y referencia) de que el titular devolvió dinero por fuera. Vaquita no custodia dinero.

## Tipo de cambio
Lo ingresa el titular. Cada cobro guarda una copia del tipo de cambio y del precio.

## CI
Cédula de identidad. Obligatoria y única; el celular se verifica por Telegram ([[ADR-0005-identidad-cedula-telegram]]).
