---
title: "Historial de PR y commits"
tipo: history
area: implementacion
parent: "[[Implementacion-Vaquita]]"
date: 2026-10-29
tags: [area/implementacion, history]
related: ["[[Estado-actual]]"]
---

> Padre: [[Implementacion-Vaquita]]

# Historial de PR y commits

147 cambios en `main` (se omiten los merge commits de promoción `dev → qa → main`). Convención: Conventional Commits con spec y tarea, por ejemplo `feat(011): … [T001-T015]`. Etiquetas `[BUG-nnn]` y `QA-nn` vienen de las revisiones de QA del 2026-10-26 y 27.

| Fecha | PR | Cambio |
|---|---|---|
| 2026-10-28 | #261 | ci(000): respaldo previo y TLS en Migrate production (#261) |
| 2026-10-28 | #258 | ci(000): add manual Migrate production workflow (#258) |
| 2026-10-28 | #255 | feat(011): cola de devoluciones disputadas y decisiones definitivas (#255) |
| 2026-10-28 | #254 | fix(011): incluir shortfall_events en las pruebas de solo anexado (#254) |
| 2026-10-28 | #253 | test(011): add Playwright E2E for the shortfall happy path [T016] (#253) |
| 2026-10-28 | #252 | feat(011): shortfall flow when a group does not fill (cover the difference or request a refund) [T001-T015] (#252) |
| 2026-10-27 | #249 | fix(000,002,007,008,009,010): integridad de la base, revisión QA [BUG-002..BUG-020] (#249) |
| 2026-10-27 | #248 | fix(001,005): estadías inmutables y enlaces de avisos solo internos [BUG-001][BUG-006] (#248) |
| 2026-10-26 | #245 | fix(000): require TELEGRAM_BOT_USERNAME when TELEGRAM_MODE=prod (#245) |
| 2026-10-26 | #244 | fix(qa): agrega Mis suscripciones al menú principal (#244) |
| 2026-10-26 | #243 | fix(qa): correcciones de la revisión QA del frontend (QA-01 a QA-12) (#243) |
| 2026-10-26 | #240 | docs(000): cierre de staging (Render, Supabase, Telegram, correo, argon2id) (#240) |
| 2026-10-26 | #239 | feat(009): conecta la moderación de cupos al backend [T032] (#239) |
| 2026-10-26 | #238 | feat(005,009): conecta invitaciones, habilitaciones, estadísticas y transferencia (#238) |
| 2026-10-26 | #237 | test(002): E2E del flujo feliz del MVP hasta confirmar el cobro [T043] (#237) |
| 2026-10-26 | #234 | docs(000): converge specs 000-010 with the implemented code [T055] (#234) |
| 2026-10-26 | #231 | fix(002): review simulated-date charges outside production [T043] (#231) |
| 2026-10-26 | #230 | test(010): add join-request chat E2E and MVP happy path [T046] (#230) |
| 2026-10-26 | #227 | feat(009): connect disputes and audit log, mobile-first admin [T025, T038] (#227) |
| 2026-10-26 | #226 | feat(000): fecha simulada (?now=) en POST /internal/jobs/tick fuera de producción (#226) |
| 2026-10-26 | #225 | revert(003): quita el botón Ingresar amarillo de la demo de despliegue continuo (#225) |
| 2026-10-26 | #221 | fix(000): allow maintenance.cleanup to delete old rate_limit_events [T033] (#221) |
| 2026-10-22 | #218 | feat(003): make the login button yellow for the CD demo (#218) |
| 2026-10-20 | #216 | ci(000): add deploy workflows for backend and frontend, vercel.json and per-folder deploy notes (#216) |
| 2026-10-20 | #215 | ci(000): skip auto-merge for manual/* branches (#215) |
| 2026-10-20 |  | test(000): verifica staging en Vercel y Render [T052] |
| 2026-10-20 | #209 | chore: promote qa to main (#195) (#209) |
| 2026-10-20 |  | chore(000): sync main history into dev without changing content (retry) |
| 2026-10-20 | #208 | chore: promote qa to main (#195) (#208) |
| 2026-10-20 | #207 | docs(000): agrega al README las URLs del staging y cómo comprobar cada parte (#207) |
| 2026-10-20 | #205 | test(009): E2E del baneo y su reversión con dos administradores [T018] (#205) |
| 2026-10-20 | #206 | fix(000): gitleaks excusa la regla genérica solo en archivos de prueba (#206) |
| 2026-10-20 | #203 | fix(000): el proxy lee el cuerpo completo para no romper las respuestas 401 de un POST (#203) |
| 2026-10-20 | #202 | chore(000): mark staging deploy tasks T048, T051 and 004 T020 as done (#202) |
| 2026-10-20 | #201 | feat(009): conecta el catálogo de administración con el backend y agrega la importación [T029] (#201) |
| 2026-10-20 | #200 | fix(009): seed:dev-users crea un segundo administrador para el E2E del baneo [T018] (#200) |
| 2026-10-20 | #195 | chore: promote qa to main (#195) |
| 2026-10-20 | #199 | feat(009): add GET /admin/catalog listing services with all plans (#199) |
| 2026-10-20 | #198 | docs(000): document modules in README and add per-layer backend and frontend workflows (#198) |
| 2026-10-20 | #196 | chore(000): ignore 10 test-fixture fingerprints that block the promotion to main (#196) |
| 2026-10-20 | #193 | fix(006): return 404 for foreign history groups, error codes in code, no-store on errors (#193) |
| 2026-10-20 | #192 | test(008): E2E finales de cupos libres, registro y baneo en pausa (#192) |
| 2026-10-20 | #191 | feat(006): historial en celular como tarjetas y verificación de accesibilidad (C8) (#191) |
| 2026-10-20 | #190 | feat(000): Blueprint de Render para el staging del backend y la base [T047] (#190) |
| 2026-10-20 | #189 | feat(009,010): conecta usuarios, baneo y reclamos del usuario con el backend (#189) |
| 2026-10-20 | #188 | fix(000): los comandos de backend/dist/cli leen backend/.env si existe (#188) |
| 2026-10-20 | #187 | docs(000,004): registra los recorridos del quickstart [T016][T019] (#187) |
| 2026-10-20 | #186 | feat(008): publicación de cupos, búsqueda y solicitudes desde publicación con el backend (#186) |
| 2026-10-20 | #185 | fix(000): marca con TODO los secretos del backend y explica BACKEND_URL en el quickstart [T016] (#185) |
| 2026-10-20 | #184 | fix(000): run backend e2e in sharded processes to avoid heap exhaustion (#184) |
| 2026-10-20 | #183 | feat(007): muestra la calificación con RatingBadge y lee el código de regla de negocio [T016][T033] (#183) |
| 2026-10-19 | #182 | feat(007): conecta reputación, insignias y ranking con el backend [T022][T027] (#182) |
| 2026-10-19 | #180 | test(009): verifica con 10.000 usuarios los planes de las estadísticas del tablero [T037] (#180) |
| 2026-10-19 | #181 | feat(006): conecta calendario, historial y exportaciones con el backend [T023][T027] (#181) |
| 2026-10-19 | #177 | docs(003): converge spec and plan with the implementation [T045] (#177) |
| 2026-10-19 | #179 | test(008): verifica con 5.000 publicaciones los planes de la búsqueda de cupos y del barrido [T027] (#179) |
| 2026-10-19 | #178 | feat(005): add Telegram channel for notifications and security review [T029][T030][T031] (#178) |
| 2026-10-19 | #176 | feat(006): conecta el panel, la cobranza y los gráficos con el backend [T013][T015][T019] (#176) |
| 2026-10-19 | #175 | feat(005): add notification purge, group invitations and WhatsApp share [T022][T026][T027] (#175) |
| 2026-10-19 | #174 | test(007): verifica con datos de volumen los planes del ranking, getRatings, ChargeFactsPort y la conciliación [T035] (#174) |
| 2026-10-19 | #173 | feat(005): conecta campana, avisos y preferencias con el backend [T013][T024] (#173) |
| 2026-10-19 | #172 | test(001): E2E de transferencia y cierre con miembro habilitado [T037] (#172) |
| 2026-10-19 | #162 | test(001,002): E2E de solicitud con pago en efectivo y del flujo MVP hasta el tick [T037][T043] (#162) |
| 2026-10-19 | #171 | fix(001): habilita a miembro1 como titular en el seed de desarrollo para el E2E de transferencia [T037] (#171) |
| 2026-10-19 | #170 | feat(008): add listing reports, expiry job and group event handlers [T021][T022][T024][T025][T026] (#170) |
| 2026-10-19 | #169 | fix(000): los scripts de database usan DB_PORT cuando no hay DATABASE_URL (#169) |
| 2026-10-19 | #168 | feat(009): agrega el índice del log de auditoría por fecha y verifica los planes de la búsqueda de usuarios y la auditoría [T037] (#168) |
| 2026-10-19 | #167 | test(006): verifica con 20 suscripciones × 12 meses los planes de las vistas y los reportes [T029] (#167) |
| 2026-10-19 | #166 | feat(009): add listing moderation and admin security review [T030][T031][T036] (#166) |
| 2026-10-19 | #165 | feat(005): add scheduled notices, email delivery and notification preferences [T014][T015][T016][T018][T019][T020][T021] (#165) |
| 2026-10-19 | #164 | feat(008,010): publish listings, request a seat and open from listing [T008][T009][T010][T017][T018][T036] (#164) |
| 2026-10-19 | #163 | feat(009): add admin catalog, import and stats endpoints [T026][T027][T028][T033][T034] (#163) |
| 2026-10-19 | #160 | feat(007): add badges, reputation reports and exclusions, security review [T018][T019][T020][T029][T030][T034] (#160) |
| 2026-10-19 | #161 | feat(010): connect spec 005 notices to join request sweep events [T044] (#161) |
| 2026-10-18 |  | chore: sync main into dev keeping the dev tree |
| 2026-10-18 |  | Merge remote-tracking branch 'origin/dev' into feat/003-bd-identidad |
| 2026-10-18 | #39 | docs(004): procedimiento para actualizar precios del catálogo [T018] (#39) |
| 2026-10-18 | #40 | docs(003): el secreto de registro pasa a users (opción aprobada del PR #31) (#40) |
| 2026-10-18 |  | test(003): cita RF-003-05, RF-003-07 y RF-003-22 y prueba el índice de recuperación [T001][T004] |
| 2026-10-18 |  | Merge branch 'spec/003-bd-modelo-secreto-registro' into feat/003-bd-identidad |
| 2026-10-18 |  | docs(003): corrige la redacción del sondeo y de las huellas y propone separar el outcome duplicado |
| 2026-10-18 |  | Merge branch 'dev' of https://github.com/leonardoguz220/VaquitaSuchas into feat/003-bd-identidad |
| 2026-10-18 |  | docs(003): T001 también cubre CA-003-27 [T001] |
| 2026-10-18 |  | feat(003): crea banned_identities con huellas irreversibles por tipo [T005] |
| 2026-10-18 |  | feat(003): crea la tabla password_reset_tokens [T004] |
| 2026-10-18 |  | feat(003): crea phone_verification_tokens y registra las FK en cascada justificadas por el modelo [T003] |
| 2026-10-18 |  | feat(003): crea la tabla users con identidad única y el secreto de registro [T002] |
| 2026-10-18 |  | test(003): agrega las pruebas de integridad de usuarios, tokens y huellas de baneo [T001] |
| 2026-10-18 | #35 | feat(004): modelo, búsqueda y seed del catálogo de servicios [T001-T005] (#35) |
| 2026-10-18 |  | docs(003): aplica al modelo el secreto de registro en users aprobado en el PR #31 |
| 2026-10-18 | #38 | feat(000): agrega logs estructurados con reqId y redacción de datos sensibles [T020] (#38) |
| 2026-10-18 | #34 | feat(003): pantallas de registro y verificación del celular con Telegram [T023, T024] (#34) |
| 2026-10-18 | #36 | feat(000): agrega shared/jobs con JobRunner, bloqueo asesor, cron opcional y maintenance.cleanup [T028] (#36) |
| 2026-10-18 | #33 | feat(000): agrega GET /health con comprobación de la base de datos [T023] (#33) |
| 2026-10-18 | #30 | ci(000): workflow manual Migrate staging [T044] (#30) |
| 2026-10-18 | #31 | docs(003): propone guardar el secreto de registro en users para que el sondeo pueda canjearlo (#31) |
| 2026-10-18 | #26 | feat(000): convenciones del esquema, db:check, seed, reset y respaldo de la base [T013-T015] (#26) |
| 2026-10-18 | #32 | Chore/sync main into dev 2 (#32) |
| 2026-10-18 | #24 | feat(000): base del frontend: Next.js, utilidades, componentes ui, layout y proxy /api [T005, T034–T038] (#24) |
| 2026-10-18 | #27 | feat(000): agrega AuthGuard, AdminGuard y JobsTokenGuard con puerto AuthSessionPort [T032] (#27) |
| 2026-10-18 | #28 | docs(fe): completa los mockups del MVP, P1 y P2 (41 pantallas) (#28) |
| 2026-10-18 | #25 | feat(000): agrega DomainError, AllExceptionsFilter y ValidationPipe global [T019] (#25) |
| 2026-10-18 | #23 | feat(000): ejecutor de migraciones y migraciones base 0001-0004 [T007-T012] (#23) |
| 2026-10-18 | #22 | feat(000): agrega TxEventBus, el bus de eventos transaccional [T056] (#22) |
| 2026-10-18 | #21 | chore(000): entorno local de base de datos y paquete database [T002][T003] (#21) |
| 2026-10-18 | #20 | feat(000): agrega DbService con transacciones y bloqueos asesores, y Clock [T021] (#20) |
| 2026-10-18 | #19 | feat(000): agrega toLaPazParts y formatBsCents al dominio compartido [T022] (#19) |
| 2026-10-18 | #18 | docs(fe): agrega los mockups del MVP como referencia visual del frontend (#18) |
| 2026-10-18 | #17 | fix(claude): corre Jest con --experimental-vm-modules en el hook post-edit (#17) |
| 2026-10-18 | #16 | test(000): cubre RF-000-03 con un test de backend/.env.example [T018] (#16) |
| 2026-10-18 | #14 | feat(000): valida las variables de entorno al arrancar [T017][T018] (#14) |
| 2026-10-18 | #15 | Chore/sync main into dev (#15) |
| 2026-10-18 | #9 | Feat/000 be preparacion backend (#9) |
| 2026-10-18 | #12 | fix(claude): entrecomilla la descripción de los agentes de implementación (#12) |
| 2026-10-18 | #11 | chore: verifica lint y tests antes del push y protege la configuración de Claude Code (#11) |
| 2026-10-18 | #10 | feat(000): backend NestJS base en ESM y README raíz [T004][T006] (#10) |
| 2026-10-18 | #8 | chore(000): crea la raíz del monorepo con workspaces y herramientas comunes [T001] (#8) |
| 2026-10-18 | #7 | chore: protect dev and qa branches and document branch flow (#6) (#7) |
| 2026-10-18 | #6 | chore: protect dev and qa branches and document branch flow (#6) |
| 2026-10-18 |  | chore: add Claude Code setup and mark specs as approved |
| 2026-10-18 |  | docs: apply approved clarifications to specs |
| 2026-10-18 |  | docs: add plans, data models, contracts and tasks for specs 000-010 |
| 2026-10-18 |  | docs(003): verify phone with a Telegram bot and close remaining questions |
| 2026-10-17 |  | docs(010): integrate round 2 decisions across specs and context |
| 2026-10-17 |  | docs(010): add join requests with prepayment and chat |
| 2026-10-17 |  | docs(spec): 002 open question on long delays and unpaid charges |
| 2026-10-17 |  | docs(spec): 007 reputation as a 0-5 star rating |
| 2026-10-17 |  | docs: add system overview for team review and record Render for PostgreSQL |
| 2026-10-17 |  | docs(specs): credit change history to the team |
| 2026-10-17 |  | docs: reorganize repo into context/, ia/ and layered folders |
| 2026-10-17 |  | docs(spec): 002 fix 403/404 for other members' receipts |
| 2026-10-17 |  | docs: align nestjs skill with 403/404 rule from specs |
| 2026-10-17 |  | feat: add 5 project-specific skills (vaquita-*) |
| 2026-10-17 |  | chore: add agent-skills (MIT) and tooling guide |
| 2026-10-17 |  | docs(spec): 009 administration |
| 2026-10-17 |  | docs(spec): 008 free slots |
| 2026-10-17 |  | docs(spec): 007 reputation |
| 2026-10-17 |  | docs(spec): 006 dashboard and reports |
| 2026-10-17 |  | docs(spec): 005 notifications |
| 2026-10-17 |  | docs(spec): 004 services catalog |
| 2026-10-17 |  | docs(spec): 003 users and authentication |
| 2026-10-17 |  | docs(spec): 002 charges and payments |
| 2026-10-17 |  | docs(spec): 001 shared subscriptions |
| 2026-10-17 |  | docs(spec): 000 project setup |
| 2026-10-17 |  | docs(specs): add roadmap, open questions bank and spec templates |
| 2026-10-17 |  | chore: add Spec Kit (constitution, templates and speckit skills) |
| 2026-10-17 |  | docs: add project README, rules and SDD workflow |

Ver [[Estado-actual]] y [[Desarrollo-por-tarea]].
