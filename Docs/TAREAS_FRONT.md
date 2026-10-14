# PayMyLoan — Tareas del front (derivadas de ESTADO_Y_PLAN_FRONT.md)

Uso: dime "ejecuta T0.1" (o varias) y la hago. Cada tarea es chica, cerrable y verificable.
Marca `[x]` al terminar. `dep:` = tareas que deben estar hechas antes. `⛔` = necesita decisión tuya (ver D-*).

## Cómo conectar una API nueva (patrón T0.1)

1. Ruta en `app/lib/endpoints.ts` (`API_ROUTES`), nunca una URL escrita en la vista.
2. En la vista, usar `api<T>()` de `app/lib/apiFetch.ts`: añade el token, devuelve `data` y lanza `ApiError` (`status`, `code`, `message`) si falla.
3. Listas: envolver con `toList()` (el back responde `data: [...]` o `data: { items: [...] }`).

```tsx
import { api, toList, ApiError } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

// GET lista
const users = toList<User>(await api(API_ROUTES.users.base));

// POST con body
try {
  await api(API_ROUTES.borrowers.meLoanRequests, {
    method: "POST",
    body: JSON.stringify({ amount: 100000 }),
  });
} catch (e) {
  if (e instanceof ApiError && e.code === "TWO_FACTOR_REQUIRED") { /* CTA 2FA */ }
  else setError(e instanceof Error ? e.message : "Error");
}
```

Notas: ante 401 renueva la sesión con el refresh token y reintenta una vez; si no puede, limpia sesión y redirige a `/login`. `apiFetch` sigue disponible si necesitas el `Response` crudo.

## Decisiones pendientes (de §7)
- D1: Mockups lender corregidos: ¿los entrega Spencer o los reconstruyo yo? (recomendado: yo)
- D2: Settings/Security: ¿componente compartido `components/ambos/` con props de rol? (recomendado: sí)
- D3: ¿"Mis cotizaciones" del lender lo cubre marketplace o falta endpoint en back?
- D4: ¿Aceptación de ToS: endpoint o solo checkbox en registro?
- D5: ¿Mapa entra en v1?

---

## Paso 0 — Base técnica
- [x] **T0.1** ~~Crear `app/lib/api.ts`~~ Ya existía `app/lib/apiFetch.ts` (base URL vive en `endpoints.ts`, Authorization y 401→login). Se le agregó `api<T>()` + `ApiError` con errores tipados `{error:{code,message}}`. **HECHA 2026-10-14.**
- [x] **T0.2** En `apiFetch.ts`: 401 → `POST /auth/refresh` y reintento una vez (renovación compartida entre llamadas concurrentes, porque el back rota el token). Si falla → limpia sesión y `/login`. **HECHA 2026-10-14.**
- [ ] **T0.3** Sincronizar `endpoints.ts`: quitar `/terms/propose`, agregar mensajes, notificaciones, reviews, verificaciones, overview, transactions, 2FA, become-*.
- [ ] **T0.4** Reemplazar `API_URL` duplicados en vistas por `API_ROUTES`/`api.ts`. dep: T0.1, T0.3
- [ ] **T0.5** Arreglar `logout-all` (URL relativa + sin Authorization) y centralizar `LogoutButton`. dep: T0.1
- [ ] **T0.6** Guard por rol en layouts (ADMIN/LENDER/BORROWER) + redirección post-login consistente.
- [ ] **T0.7** Tipos TS de DTOs (contract, loanRequest, quote, notification, message, review) desde `Docs/API_REFERENCE.md`.

## Paso 1 — Mockups/vistas lender corregidos ⛔ D1
- [ ] **T1.1** `lender/messaging`: versión lender (hilo con borrower, menú lender).
- [ ] **T1.2** `lender/notifications`: notificaciones reales de lender (cotización seleccionada, términos aceptados/rechazados, mensaje, pago vencido, verificación).
- [ ] **T1.3** `lender/review`: calificar al borrower (`direction`).
- [ ] **T1.4** `lender/settings` y `lender/security`: sin "Post a deal", "Bank/ACH", "Verify now $99" (según D2).
- [ ] **T1.5** `lender/counter-offer`: lado lender (responder contraoferta del deudor).
- [ ] **T1.6** `lender/payment-schedule`: vista de lo que el lender *recibe*.
- [ ] **T1.7** `lender/payoff-request`: aprobar/recibir payoff, no solicitarlo.
- [ ] **T1.8** Mover `affiliate-dashboard.html` fuera de `lender/`; limpiar `browse-deals.html` (quitar "Submit a deal").
- [ ] **T1.9** Limpiar `MessagesView.tsx` (lender) del contenido de deudor.
- [ ] **T1.10** Limpiar `NotificationsView.tsx` (lender) de textos "your lender / my deals".

## Paso 2 — Auth completa (dep: T0.1)
- [ ] **T2.1** Página forgot password (`POST /auth/password/forgot`).
- [ ] **T2.2** Página reset password (`POST /auth/password/reset`).
- [ ] **T2.3** `PATCH /auth/me` en Settings (nombre/teléfono/email) — borrower.
- [ ] **T2.4** `PATCH /auth/me` en Settings — lender.
- [ ] **T2.5** Cambio de contraseña borrower (`POST /borrowers/me/password`).
- [ ] **T2.6** 2FA setup + verify (QR/TOTP) en `AccountSecurityModal`.
- [ ] **T2.7** 2FA disable + recovery codes.
- [ ] **T2.8** `Verify2FA.tsx`: quitar/marcar lo no soportado (reenvío SMS).
- [ ] **T2.9** Vista "cuenta pendiente de aprobación" para usuarios inactivos.
- [ ] **T2.10** Manejar `TWO_FACTOR_REQUIRED` (403) con CTA a configurar 2FA. dep: T2.6

## Paso 3 — Borrower: ciclo de la solicitud (dep: T0.x)
- [ ] **T3.1** Dashboard borrower: usar `GET /borrowers/me` + loan-requests reales.
- [ ] **T3.2** `DealView`: `GET loan-requests/:id` (detalle solo lectura).
- [ ] **T3.3** `DealView`: editar mientras `DRAFT` (`PATCH`).
- [ ] **T3.4** `DealView`: publicar y retirar (`publish`, `withdraw`).
- [ ] **T3.5** Targets: agregar/quitar (`DELETE .../targets/:lenderCompanyId`).
- [ ] **T3.6** Listado de cotizaciones recibidas (`GET .../quotes`).
- [ ] **T3.7** Seleccionar cotización (`.../quotes/:quoteId/select`) y redirigir al contrato. dep: T3.6
- [ ] **T3.8** Visibilidad pública/privada del deal según `visibility`.

## Paso 4 — Lender: marketplace y ofertas
- [ ] **T4.1** `browse-deals/[id]` y `marketplace/[id]` con `GET /marketplace/loan-requests/:id`.
- [ ] **T4.2** Filtros en `BrowseDealsView`.
- [ ] **T4.3** Nueva vista `make-offer` (estructura, entidad, firmante) → `POST quotes`. dep: T4.1
- [ ] **T4.4** Retirar oferta (`DELETE quotes`).
- [ ] **T4.5** `OffersSentView` con estados reales SUBMITTED/SELECTED/DECLINED. ⛔ D3

## Paso 5 — Contratos
- [ ] **T5.1** `issue-commitment`: cargar/editar terms en DRAFT (`POST terms`).
- [ ] **T5.2** `issue-commitment`: CRUD de fees (`terms/:id/fees`).
- [ ] **T5.3** `issue-commitment`: `submit` terms. dep: T5.1, T5.2
- [ ] **T5.4** `CommitmentLetterDocView` con datos reales.
- [ ] **T5.5** Borrower: mostrar fees en commitment/`FeeAgreementView`.
- [ ] **T5.6** Historial de versiones de términos (`GET terms`).
- [ ] **T5.7** Cancelar contrato (`POST cancel`).
- [ ] **T5.8** Agregar/quitar co-deudores.
- [ ] **T5.9** Reflejar estados `DRAFT → PENDING_ACCEPTANCE → ACTIVE` en ambos dashboards.

## Paso 6 — Pagos y calendario
- [ ] **T6.1** Lender `PaymentsView`: schedule + dueSoon + balance reales.
- [ ] **T6.2** Lender: lista de transacciones (`GET transactions`).
- [ ] **T6.3** Lender: registrar pago manual (`payments/manual`).
- [ ] **T6.4** Borrower `payments` con schedule/transactions reales.
- [ ] **T6.5** Borrower `missed-payment` derivado de schedule.
- [ ] **T6.6** KPIs del dashboard lender (capital desplegado, ingreso mensual, vencimientos).
- [ ] **T6.7** Admin: reversar transacción.

## Paso 7 — Mensajería (mismo patrón, dos roles)
- [ ] **T7.1** Borrower: bandeja de hilos (`threads`).
- [ ] **T7.2** Borrower: hilo + enviar + marcar leído.
- [ ] **T7.3** Lender: bandeja de hilos.
- [ ] **T7.4** Lender: hilo + enviar + marcar leído.
- [ ] **T7.5** Estado vacío para `403 MESSAGING_NOT_ALLOWED`.

## Paso 8 — Notificaciones
- [ ] **T8.1** Campana con `unread-count` (header, ambos roles).
- [ ] **T8.2** Listado + marcar leída / todas (componente compartido).
- [ ] **T8.3** Deep-link según `type`.

## Paso 9 — Reviews y ratings
- [ ] **T9.1** Formulario de review (`leave-a-review`, según `direction`).
- [ ] **T9.2** Reviews pendientes (`/me/reviews/pending`).
- [ ] **T9.3** Perfil público con rating (lender y borrower) + score card.

## Paso 10 — Lender: entidades, verificación, deudores
- [ ] **T10.1** CRUD de `LenderCompany` en `EntitiesView`.
- [ ] **T10.2** Flujo de verificación de entidad (`VerificationView`).
- [ ] **T10.3** Estado verified/pending/unverified real en sidebar (quitar `isVerified=false`).
- [ ] **T10.4** Mis deudores: lista + detalle + desvincular.
- [ ] **T10.5** Rol dual (`become-lender` / `become-borrower`) en Settings.
- [ ] **T10.6** Verificación del borrower (`borrowers/me/verification`).

## Paso 11 — Admin
- [ ] **T11.1** `OverviewView` con `admin/overview`.
- [ ] **T11.2** Cola de verificaciones: listar + aprobar/rechazar.
- [ ] **T11.3** Lenders: lista + detalle (`admin/lenders`).
- [ ] **T11.4** Empresas de lender: crear/editar/borrar.
- [ ] **T11.5** Usuarios: activar/desactivar.
- [ ] **T11.6** Usuarios: editar/borrar (`PATCH/DELETE users/:id`).
- [ ] **T11.7** Pulir audit-logs.
- [ ] **T11.8** Borrowers / AllDeals (bloqueado por AD-010 en back).

## Paso 12 — Bloqueado por back (no empezar)
Counter-offer, extension, draw, payoff, documents/PDF, ACH, preferencias lender, pre-qualification, invite por correo, afiliados, bookkeeper, billing.

## Transversal (aplicar al cerrar cada tarea de vista)
- i18n en `content/copy.ts` + modo oscuro.
- Checklist visual contra el HTML de `pml_v4/`.
- Prueba manual de ruta feliz con usuarios del seed.

## Orden sugerido
T0.1→T0.7 → T2.x (2FA antes de ofertar/emitir) → T3 → T4 → T5 → T6 → T7/T8 → T9 → T10 → T11. T1.x en paralelo cuando D1 esté resuelta.
