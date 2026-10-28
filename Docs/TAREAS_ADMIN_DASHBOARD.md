# Admin Dashboard — Tareas del front (APIs por conectar)

Uso: dime "ejecuta AF-03" (o varias) y la hago. Cada tarea es chica y verificable. Marca `[x]` al terminar.
`dep:` = tarea previa. `BACK:` = depende de una tarea del back (ver `paymyloan-back/Docs/TAREAS_ADMIN_BACK.md`). `⛔` = necesita decisión tuya.
Patrón de conexión: ver "Cómo conectar una API nueva" en [TAREAS_FRONT.md](TAREAS_FRONT.md) (`API_ROUTES` + `api<T>()` + `toList()`).

## Estado actual por vista (`app/adminDashboard/`)

| Vista | Estado | API |
|---|---|---|
| Overview | ✅ conectada (revenue extra = `null` en back) | `GET /api/admin/overview` |
| All deals | ✅ conectada (sin paginación, `pageSize=50`) | `GET /api/contracts` |
| Lenders | ✅ lista con búsqueda + paginación (20 por página) + ficha en drawer (`LenderDetailDrawer`) con CRUD de empresas | `GET /api/admin/lenders?page&pageSize&search`, `GET /api/admin/lenders/:id`, `POST\|PATCH\|DELETE /api/admin/lenders/:id/companies[/:companyId]` |
| Borrowers | ✅ usa `UsersTable` (rol `BORROWER` + acciones de usuario) | `GET /api/users` |
| Verifications | ✅ lista + aprobar/rechazar | `GET /api/admin/verifications`, `POST .../approve\|reject` |
| Audit logs | ✅ conectada (`audit-logs/` y `AuditLogsView`, duplicadas) | `GET /api/audit-logs` |
| Users (`users/page`) | ✅ `UsersTable` con filtro de rol: lista + activar/desactivar + editar + eliminar | `GET`/`PATCH`/`DELETE /api/users[/:id]`, `POST /api/admin/users/:id/activate\|deactivate` |
| Add user | ✅ crea (solo ADMIN/BOOKKEEPER/INSURANCE_COMPANY) + contraseña temporal + `EMAIL_TAKEN` | `POST /api/users` |
| Settings (`SettingsView.tsx`) | ✅ perfil propio + 2FA (activar/desactivar/regenerar códigos) + `logout-all`. Ajustes de plataforma → AF-27 | `GET`/`PATCH /api/auth/me`, `POST /api/auth/2fa/setup\|verify\|disable\|recovery-codes`, `POST /api/auth/logout-all` |
| Revenue, Affiliates, Promo codes, Catalog | ❌ placeholder | back no existe (ver back AB-05..AB-09) |

Existen en el back y **no se usan** en el admin: `DELETE /api/admin/lenders/:id`, detalle/schedule/balance/transactions de contrato, `PATCH /api/contracts/:id`, `POST /api/transactions/:id/reverse`, notificaciones (el Admin no recibe ninguna, ver AF-22).

## Revisión de cambios del otro front (2026-10-22)

Revisado el historial de `andresgaraagr` (rama `anesFrontend`, ya mergeada en `develop` → `fix-brenda` con `eccf53f`).

- **Dashboard de admin: casi sin cambios.** Su último trabajo (contratos, draws, payoff, extension-request, missed-payment, SubmitOfferModal) es todo de `lenderDashboard/` y `borrowerDashboard/`. AF-01..09 siguen intactos (`git diff 8e444e7 fix-brenda -- app/adminDashboard` solo muestra lo de abajo).
- **Única excepción: 2FA en Settings del admin** — commit `8be4dd5` (2026-10-16, "lender & admin : qr code 2fa"):
  - Componente compartido nuevo `app/components/dashboards/settings/TwoFactorSetupModal.tsx`: `2fa/setup` → QR (`qrcode.react`, dependencia nueva) + secreto manual → `2fa/verify` con código de 6 dígitos → muestra recovery codes una vez, con botón para descargarlos en `.txt`. Props `isOpen/onClose/onSuccess`.
  - Lo usan `SettingsView` del admin (entonces en `PlaceholderViews.tsx`, hoy `AdminViewsComponents/SettingsView.tsx`) y `lenderViewsComponents/security/AccountSecurityView.tsx` del lender. Esto resuelve la decisión ⛔ D2 de TAREAS_FRONT (componente compartido).
  - El admin solo puede **activar** 2FA (el botón se oculta si ya está activo). No hay desactivar ni regenerar recovery codes en ningún dashboard. `logout-all` existe solo en el lender.
- **Login con 2FA ya existe** desde 2026-09-16 (`a2eeeb7`, `app/login/page.tsx` → `API_ROUTES.auth.login2fa`).
- **Deuda técnica de ese código** (no rompe nada, a limpiar cuando se toque AF-12/AF-21):
  - ~~`TwoFactorSetupModal` (AF-12) y `SettingsView` (AF-20/21) usaban `fetch` crudo~~ — ya migrados a `api<T>()`. Era: con `BASE_URL` y token a mano en vez de `api<T>()`, así que un token vencido no se renueva (con `apiFetch` sí). Mismo patrón que se quitó en AF-01.
  - `TwoFactorSetupModal` tiene 2 errores de lint previos en su `useEffect` (setState síncrono y `fetchSetupData` usado antes de declararse). No rompe en runtime; arreglarlo cambia cómo abre el modal, coordinar con el otro front.
  - ~~`SettingsView` con `useState<any>`, textos dentro del componente y viviendo en `PlaceholderViews.tsx`~~ → resuelto en AF-20/21.
  - Solo se llega a Settings desde las pestañas de `adminDashboard/page.tsx`. El link del sidebar de `layout.tsx` apunta a `/adminDashboard/settings`, que no tiene ruta (404). Pasa igual con deals/lenders/borrowers/verifications/revenue/etc.: es previo a esta revisión.

## A. Limpieza (sin back)
- [x] **AF-01** `LendersView`, `BorrowersView`, `AllDealsView` usan `${BASE_URL}/api/...` a mano → pasar a `API_ROUTES` + `api<T>()` (agregar `API_ROUTES.contracts.base`/`admin.lenders` si falta). `VerificationsView` y `AuditLogsView` también migran de `apiFetch` crudo a `api<T>()`.
- [x] **AF-02** Borrar `AdminViews.tsx` (legacy, con mocks `|| 34`, `$3.8M`; nadie lo importa — verificar con grep) y unificar `audit-logs/AuditLogsClient.tsx` vs `AdminViewsComponents/AuditLogsView.tsx` (dejar uno).
- [x] **AF-03** Reemplazar `any` por tipos de `app/types/api.ts` en las vistas admin (`Contract`, `SafeUser`, `Paginated<T>`); agregar `AdminOverview`, `VerificationRequest`, `AdminLender` a `types/api.ts`.
- [x] **AF-04** `OverviewView`: ocultar/atenuar las tarjetas de revenue que vienen `null` (`subscriptions`, `interestShare`, `affiliatePayouts`, `net`) en vez de mostrar 0.

## B. Gestión de usuarios (back ya listo)
- [x] **AF-05** Botón Activar/Desactivar en `users/page` → `POST /api/admin/users/:id/activate|deactivate`. Si responde `temporaryPassword`, mostrarla en un modal (una sola vez). Manejar `TWO_FACTOR_REQUIRED` (ver AF-12).
- [x] **AF-06** Editar usuario (nombre/email/teléfono) → `PATCH /api/users/:id`. dep: AF-05.
- [x] **AF-07** Eliminar usuario (soft delete) con confirmación → `DELETE /api/users/:id`.
- [x] **AF-08** `add-user`: mostrar `temporaryPassword`/`emailSent` de la respuesta del `POST` y el error `EMAIL_TAKEN` por campo.
- [x] **AF-09** Unificar `users/page` con la tabla de Borrowers/Lenders (misma tabla con filtro de rol) para no duplicar `GET /api/users`.

## C. Lenders (back ya listo)
- [x] **AF-10** Detalle de lender (drawer/página) → `GET /api/admin/lenders/:id` (empresas, conteo de deudores y contratos activos).
- [x] **AF-11** Empresas del lender: crear / editar (incluye `status`, `isOpenToDeals`) / borrar → `POST|PATCH|DELETE /api/admin/lenders/:id/companies[/:companyId]`; manejar `EIN_TAKEN`, `LENDER_HAS_ACTIVE_CONTRACTS`. dep: AF-10.
- [x] **AF-12** Banner "activa 2FA para operar" cuando una escritura devuelve `403 TWO_FACTOR_REQUIRED`, con flujo `2fa/setup` → `2fa/verify` → mostrar recovery codes (una vez). Sin esto ninguna acción de B/C/D funciona para un Admin sin 2FA.
  - **Nota 2026-10-22:** el flujo setup → verify → recovery codes **ya existe** (`TwoFactorSetupModal`, ver revisión arriba) y un Admin puede activar 2FA desde Settings. Falta solo el banner: cuando `UsersTable` / `add-user` reciben `TWO_FACTOR_REQUIRED` (hoy solo muestran un mensaje, AF-05..08), abrir `TwoFactorSetupModal` y reintentar. De paso, migrar el modal a `api<T>()`.
  - **Hecho 2026-10-23:** `TwoFactorRequiredBanner` (aviso + botón "Activar 2FA" que abre `TwoFactorSetupModal`) en `UsersTable` (lista y modal de edición), `add-user` y la ficha del lender (`LenderDetailDrawer`). El back lee el 2FA de la BD en cada escritura: al activarlo basta con repetir la acción (sin reintento automático). El modal ahora usa `api<T>()` y `z-[200]` para quedar encima del drawer.
- [x] **AF-13** Lenders: búsqueda y paginación (`?page&pageSize&search`; el back ya las soporta).

## D. Contratos / pagos (back ya listo)
- [ ] **AF-14** All deals: paginación + filtro por `status` (hoy `pageSize=50` fijo). Revisar qué filtros acepta `GET /api/contracts` en `API_REFERENCE.md`.
- [ ] **AF-15** Detalle de contrato (solo lectura) → `GET /api/contracts/:id`, `/schedule`, `/balance`.
- [ ] **AF-16** Transacciones del contrato → `GET /api/contracts/:id/transactions`; botón Revertir (solo ADMIN) → `POST /api/transactions/:id/reverse` (`TRANSACTION_NOT_REVERSIBLE`). dep: AF-15.
- [ ] **AF-17** Editar contrato → `PATCH /api/contracts/:id` (el back ya permite Admin). dep: AF-15. ⛔ confirmar qué campos debe poder editar el Admin.

## E. Auditoría / verificaciones
- [x] **AF-18** Audit logs: filtros `action`, `entityType` y rango de fechas en la UI (el back ya filtra `action`/`entityType`/paginación).
  - **Hecho 2026-10-23:** filtro de `action` (texto con sugerencias, igualdad exacta como el back) y select de `entityType`. Además se corrigió la tabla: esperaba `actorRole`/`actorName`/`description`, que el back **no** manda (devuelve el `AuditLog` crudo), así que actor y descripción salían vacíos. Ahora muestra sistema/usuario (id corto), entidad + id y `metadata`. Se quitó el filtro de rol (mandaba `actorRole`, que el back ignora). **Rango de fechas no se hizo**: el back no acepta `from`/`to` y filtrar solo la página cargada engaña → ver AF-30.
- [x] **AF-19** Verifications: mostrar motivo al rechazar (revisar si el body de `reject` acepta `reason`) y refrescar el KPI de Overview.
  - **Hecho 2026-10-23:** `reject` exige `{ reason }` (antes iba fijo "Rechazado por el administrador"): ahora se pide con `prompt` y se muestra en las rechazadas (`rejectionReason`). Errores sin `alert`: banner de 2FA (AF-12) y aviso si otro Admin ya la revisó (`VERIFICATION_NOT_PENDING`, recarga la lista). Textos a `content/{es,en}/admin.ts`. El KPI de Overview no necesitó cambio: Overview se vuelve a montar al cambiar de pestaña y pide `/admin/overview` de nuevo. Ojo: el badge "2" de Verificaciones en el sidebar de `layout.tsx` está escrito a mano (mock previo).

## F. Settings / perfil del admin
- [x] **AF-20** `SettingsView`: editar perfil propio → `PATCH /api/auth/me` (email exige `currentPassword`).
- [x] **AF-21** `SettingsView`: seguridad → activar/desactivar 2FA, regenerar recovery codes, `logout-all`. Reusa AF-12 (⛔ D2 de TAREAS_FRONT: componente compartido).
  - **Nota 2026-10-22:** **activar 2FA ya está** (otro front, `8be4dd5`) y D2 quedó resuelto con `TwoFactorSetupModal`. Falta: desactivar (`2fa/disable`), regenerar recovery codes (`2fa/recovery-codes`) y `logout-all` (copiar de `AccountSecurityView` del lender). Antes de seguir, coordinar con el otro front: lo que se agregue va en el componente compartido para que también lo tenga el lender.
  - **Hecho 2026-10-23 (AF-20 + AF-21):** `SettingsView` se movió a su propio archivo (`AdminViewsComponents/SettingsView.tsx`, ya no en `PlaceholderViews.tsx`) y usa `api<T>()`. Perfil: nombre/teléfono/correo con `PATCH /api/auth/me`; al cambiar correo pide `currentPassword` y, como el back revoca las sesiones, manda al login (`EMAIL_TAKEN` / `INVALID_CREDENTIALS` por campo). Seguridad: activar (modal compartido), desactivar (`2fa/disable`) y regenerar códigos (`2fa/recovery-codes`) con contraseña + código, y `logout-all`. Desactivar/regenerar quedaron solo en el admin (no en el componente compartido): pasarlos a `app/components/dashboards/settings/` si el lender los necesita.
- [ ] **AF-22** Campana de notificaciones en el topbar → `GET /api/notifications`, `unread-count`, `read`, `read-all`. ⛔ confirmar si el Admin recibe notificaciones (hoy son de lender/borrower).
  - **Revisado 2026-10-23 — no se hizo, bloqueada por back.** Ningún `type` de notificación tiene como destinatario al Admin (tabla en `API_REFERENCE.md` §Notificaciones: todas van a Lender, Borrower o la contraparte de un mensaje), así que la campana estaría siempre vacía. Primero el back debe definir notificaciones de Admin (p. ej. verificación nueva enviada, empresa suspendida, contrato en mora). Los endpoints no piden rol, así que cuando existan basta con copiar la campana del lender/borrower al topbar del admin.

## G. Bloqueadas por back (placeholders)
- [ ] **AF-23** Revenue → `BACK: AB-05`.
- [ ] **AF-24** Affiliates → `BACK: AB-06`.
- [ ] **AF-25** Promo codes → `BACK: AB-07`.
- [ ] **AF-26** Catalog → `BACK: AB-08` ⛔ no hay definición de qué es el "catálogo" (ver AB-08).
- [ ] **AF-27** Settings de plataforma (fees, flags) → `BACK: AB-09`.
- [ ] **AF-28** Overview: acciones "Send lender alert" / "Clear all" → `BACK: AB-10`.
- [ ] **AF-29** Borrowers: columnas `entityName`, deals, verificación → `BACK: AB-03`, `AB-02`.
- [ ] **AF-30** Audit logs: rango de fechas, filtro por rol del actor y nombre del actor en la tabla → `BACK:` falta `from`/`to` y `actorRole` en `listAuditLogsQuerySchema`, e incluir `actorUser { name, role }` en `listAuditLogs` (hoy solo viene `actorUserId`).
