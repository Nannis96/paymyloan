# Admin Dashboard — Tareas del front (APIs por conectar)

Uso: dime "ejecuta AF-03" (o varias) y la hago. Cada tarea es chica y verificable. Marca `[x]` al terminar.
`dep:` = tarea previa. `BACK:` = depende de una tarea del back (ver `paymyloan-back/Docs/TAREAS_ADMIN_BACK.md`). `⛔` = necesita decisión tuya.
Patrón de conexión: ver "Cómo conectar una API nueva" en [TAREAS_FRONT.md](TAREAS_FRONT.md) (`API_ROUTES` + `api<T>()` + `toList()`).

## Estado actual por vista (`app/adminDashboard/`)

| Vista | Estado | API |
|---|---|---|
| Overview | ✅ conectada (revenue extra = `null` en back) | `GET /api/admin/overview` |
| All deals | ✅ conectada (sin paginación, `pageSize=50`) | `GET /api/contracts` |
| Lenders | 🟡 solo lista | `GET /api/admin/lenders` |
| Borrowers | 🟡 filtra `/api/users` en cliente | `GET /api/users` |
| Verifications | ✅ lista + aprobar/rechazar | `GET /api/admin/verifications`, `POST .../approve\|reject` |
| Audit logs | ✅ conectada (`audit-logs/` y `AuditLogsView`, duplicadas) | `GET /api/audit-logs` |
| Users (`users/page`) | ✅ lista + activar/desactivar + editar + eliminar | `GET`/`PATCH`/`DELETE /api/users[/:id]`, `POST /api/admin/users/:id/activate\|deactivate` |
| Add user | ✅ crea | `POST /api/users` |
| Revenue, Affiliates, Promo codes, Catalog, Settings | ❌ placeholder | back no existe (ver back AB-05..AB-09) |

Existen en el back y **no se usan** en el admin: activate/deactivate, `PATCH`/`DELETE /api/users/:id`, `GET`/`DELETE /api/admin/lenders/:id`, CRUD de `companies`, detalle/schedule/balance/transactions de contrato, `PATCH /api/contracts/:id`, `POST /api/transactions/:id/reverse`, 2FA, `PATCH /api/auth/me`, notificaciones.

## A. Limpieza (sin back)
- [x] **AF-01** `LendersView`, `BorrowersView`, `AllDealsView` usan `${BASE_URL}/api/...` a mano → pasar a `API_ROUTES` + `api<T>()` (agregar `API_ROUTES.contracts.base`/`admin.lenders` si falta). `VerificationsView` y `AuditLogsView` también migran de `apiFetch` crudo a `api<T>()`.
- [x] **AF-02** Borrar `AdminViews.tsx` (legacy, con mocks `|| 34`, `$3.8M`; nadie lo importa — verificar con grep) y unificar `audit-logs/AuditLogsClient.tsx` vs `AdminViewsComponents/AuditLogsView.tsx` (dejar uno).
- [x] **AF-03** Reemplazar `any` por tipos de `app/types/api.ts` en las vistas admin (`Contract`, `SafeUser`, `Paginated<T>`); agregar `AdminOverview`, `VerificationRequest`, `AdminLender` a `types/api.ts`.
- [x] **AF-04** `OverviewView`: ocultar/atenuar las tarjetas de revenue que vienen `null` (`subscriptions`, `interestShare`, `affiliatePayouts`, `net`) en vez de mostrar 0.

## B. Gestión de usuarios (back ya listo)
- [x] **AF-05** Botón Activar/Desactivar en `users/page` → `POST /api/admin/users/:id/activate|deactivate`. Si responde `temporaryPassword`, mostrarla en un modal (una sola vez). Manejar `TWO_FACTOR_REQUIRED` (ver AF-12).
- [x] **AF-06** Editar usuario (nombre/email/teléfono) → `PATCH /api/users/:id`. dep: AF-05.
- [x] **AF-07** Eliminar usuario (soft delete) con confirmación → `DELETE /api/users/:id`.
- [ ] **AF-08** `add-user`: mostrar `temporaryPassword`/`emailSent` de la respuesta del `POST` y el error `EMAIL_TAKEN` por campo.
- [ ] **AF-09** Unificar `users/page` con la tabla de Borrowers/Lenders (misma tabla con filtro de rol) para no duplicar `GET /api/users`.

## C. Lenders (back ya listo)
- [ ] **AF-10** Detalle de lender (drawer/página) → `GET /api/admin/lenders/:id` (empresas, conteo de deudores y contratos activos).
- [ ] **AF-11** Empresas del lender: crear / editar (incluye `status`, `isOpenToDeals`) / borrar → `POST|PATCH|DELETE /api/admin/lenders/:id/companies[/:companyId]`; manejar `EIN_TAKEN`, `LENDER_HAS_ACTIVE_CONTRACTS`. dep: AF-10.
- [ ] **AF-12** Banner "activa 2FA para operar" cuando una escritura devuelve `403 TWO_FACTOR_REQUIRED`, con flujo `2fa/setup` → `2fa/verify` → mostrar recovery codes (una vez). Sin esto ninguna acción de B/C/D funciona para un Admin sin 2FA.
- [ ] **AF-13** Lenders: búsqueda y paginación (`?page&pageSize&search`; el back ya las soporta).

## D. Contratos / pagos (back ya listo)
- [ ] **AF-14** All deals: paginación + filtro por `status` (hoy `pageSize=50` fijo). Revisar qué filtros acepta `GET /api/contracts` en `API_REFERENCE.md`.
- [ ] **AF-15** Detalle de contrato (solo lectura) → `GET /api/contracts/:id`, `/schedule`, `/balance`.
- [ ] **AF-16** Transacciones del contrato → `GET /api/contracts/:id/transactions`; botón Revertir (solo ADMIN) → `POST /api/transactions/:id/reverse` (`TRANSACTION_NOT_REVERSIBLE`). dep: AF-15.
- [ ] **AF-17** Editar contrato → `PATCH /api/contracts/:id` (el back ya permite Admin). dep: AF-15. ⛔ confirmar qué campos debe poder editar el Admin.

## E. Auditoría / verificaciones
- [ ] **AF-18** Audit logs: filtros `action`, `entityType` y rango de fechas en la UI (el back ya filtra `action`/`entityType`/paginación).
- [ ] **AF-19** Verifications: mostrar motivo al rechazar (revisar si el body de `reject` acepta `reason`) y refrescar el KPI de Overview.

## F. Settings / perfil del admin
- [ ] **AF-20** `SettingsView`: editar perfil propio → `PATCH /api/auth/me` (email exige `currentPassword`).
- [ ] **AF-21** `SettingsView`: seguridad → activar/desactivar 2FA, regenerar recovery codes, `logout-all`. Reusa AF-12 (⛔ D2 de TAREAS_FRONT: componente compartido).
- [ ] **AF-22** Campana de notificaciones en el topbar → `GET /api/notifications`, `unread-count`, `read`, `read-all`. ⛔ confirmar si el Admin recibe notificaciones (hoy son de lender/borrower).

## G. Bloqueadas por back (placeholders)
- [ ] **AF-23** Revenue → `BACK: AB-05`.
- [ ] **AF-24** Affiliates → `BACK: AB-06`.
- [ ] **AF-25** Promo codes → `BACK: AB-07`.
- [ ] **AF-26** Catalog → `BACK: AB-08` ⛔ no hay definición de qué es el "catálogo" (ver AB-08).
- [ ] **AF-27** Settings de plataforma (fees, flags) → `BACK: AB-09`.
- [ ] **AF-28** Overview: acciones "Send lender alert" / "Clear all" → `BACK: AB-10`.
- [ ] **AF-29** Borrowers: columnas `entityName`, deals, verificación → `BACK: AB-03`, `AB-02`.
