# Ponytail audit — paymyloan

Alcance: sobre-ingeniería y complejidad. No cubre bugs, seguridad ni rendimiento.
Estado: solo lectura, nada aplicado. Ordenado de mayor a menor recorte.
Líneas aproximadas (`wc -l` sobre ~27k líneas TS/TSX; 196 archivos versionados).

> Verificación pendiente en los `delete:`: los "sin importar" salen de un grep por nombre de archivo/símbolo
> en `app/` y `content/`. Antes de borrar, confirmar con `tsc --noEmit` / `next build`.

---

## 1. delete: código muerto (≈ 2 800 líneas, 19 archivos)

Ningún archivo los importa. Reemplazo: nada.

| Archivo | Líneas | Nota |
|---|---:|---|
| `app/adminDashboard/AdminViews.tsx` | 455 | Copia vieja del dashboard admin (el header dice `app/admin/`); la ruta real usa `AdminViewsComponents/*` |
| `app/lenderDashboard/LenderDashboardView.tsx` | 219 | Duplicado de `lenderViewsComponents/DashboardView.tsx` (el header dice `app/lender/...`) |
| `app/components/ui/BorrowerScoreCard.tsx` | 219 | |
| `app/components/borrower/PitchDeckModal.tsx` | 256 | |
| `app/components/borrower/LeaveReview.tsx` | 197 | duplica `borrowerDashboard/leave-a-review/page.tsx` (225) |
| `app/components/borrower/BorrowerTables.tsx` | 169 | |
| `app/components/lender/LenderTables.tsx` | 159 | |
| `app/components/ambos/Verify2FA.tsx` | 177 | |
| `app/components/borrower/AddBankModal.tsx` | 141 | `AddAccountModal` sí se usa; dos modales para lo mismo |
| `app/components/ambos/InviteModal.tsx` | 138 | |
| `app/components/borrower/RateLenderModal.tsx` | 124 | |
| `app/components/landing/TermsOfService.tsx` | 121 | |
| `app/components/layout/DashboardShell.tsx` | 118 | Todos los dashboards usan `SiteShell` |
| `app/components/landing/CostTable.tsx` | 77 | |
| `app/components/landing/FinalCta.tsx` | 32 | |
| `app/components/landing/Benefits.tsx` | 31 | |
| `app/components/landing/HowItWorks.tsx` | 30 | |
| `app/components/ambos/NotificationsPanel.tsx` | 26 | |
| `app/components/borrower/BillingBanner.tsx` | 23 | |

Cola: tras borrarlos, sus claves en `content/copy.ts` (es + en) quedan huérfanas — ver §6.

## 2. delete: exports muertos en `app/components/ui.tsx`

`InsightCard`, `ToggleBar`, `StatCell`, `BTN_SECONDARY` — 0 usos fuera del archivo. Reemplazo: nada. (~100 líneas).
`ProgressBar`, `StepsNav`, `FilterChip`, `DealCard`, `SettingCard`, `BTN_PRIMARY` tienen 1 solo consumidor: candidatos a inlinear si no se van a reutilizar.

## 3. delete: rutas del cliente de API nunca usadas — `app/lib/endpoints.ts`

25 de las ~45 claves de `API_ROUTES` no se referencian: `auth.refresh`, `auth.logoutAll`, `auth.passwordForgot/Reset`, `users.activate/deactivate`, `lenders.adminBase/adminById/adminCompanies/adminCompanyById/meCompanies/meCompanyById/meBorrowers/meBorrowerById`, `borrowers.mePassword/meLoanRequestById/withdrawLoanRequest/loanRequestQuotes/selectQuote`, `contracts.borrowerById/proposeTerms/submitTerms/acceptTerms/rejectTerms`, `marketplace.loanRequestById`.
Reemplazo: nada; añadir cuando exista la pantalla. (~25 líneas). Ojo: grep por `.clave`, revisar destructuring antes de borrar.

## 4. delete: `app/lib/registro.ts` casi entero

`register/page.tsx` solo importa el tipo `Intent`. `registrarUsuario`, `REGISTRO_SIMULADO` y la lógica de "simular respuesta tras 700 ms" no se llaman; el header dice "el backend todavía no existe", ya falso.
Reemplazo: mover `type Intent = "lender" | "borrower"` a donde se use. (~45 líneas, 1 archivo).

## 5. yagni: ~25 páginas `page.tsx` de 4 líneas que solo montan una vista

`app/lenderDashboard/*/page.tsx` (9), `app/borrowerDashboard/{messages,notifications,settings,settings/security,ach-setup/[id],page}.tsx`, más `deals`, `fee-agreement`, `onboarding`, `submit-deal` (9 líneas con `SiteShell`).
Cada vista vive en `*ViewsComponents/` y su página solo hace `return <XView />`. Reemplazo: poner el contenido de la vista directamente en `page.tsx` (una capa menos, ~25 archivos menos), o dejar la vista y borrar el wrapper si la ruta no se necesita. Además `lenderDashboard/layout.tsx` ya envuelve en `SiteShell`, así que `SiteShell isMinimal` repetido en cada página borrower es redundante si el layout lo aplica.
Ídem `app/Borrower/page.tsx` y `app/Lender/page.tsx`: dos páginas de 9 líneas, duplican el trabajo de `app/page.tsx` con landing por modo (revisar si ambas rutas son necesarias).

## 6. yagni: `content/copy.ts` — 4 241 líneas, un solo archivo es y en

15 % del repo. Todo el texto de todas las pantallas (incluidas las muertas de §1) viaja en el bundle de cliente en ambos idiomas, y `en: Copy = {...}` repite la estructura entera.
Reemplazo: partir por pantalla/dominio (`copy/landing.ts`, `copy/admin.ts`…) y cargar solo el idioma activo; o `next-intl` si se espera un tercer idioma. Primero borrar las claves huérfanas tras §1 (estimado: 300-500 líneas es+en).

## 7. stdlib/shrink: 34 archivos con `fetch` + `localStorage.getItem("accessToken")` copiado

34 lecturas directas del token, 47 `fetch(`, 8 repeticiones del guard `router.push("/login")` si no hay token / `role !== X`, y el patrón `Array.isArray(json.data) ? json.data : json.data?.items || []` repetido.
Reemplazo: un `apiFetch(url, init)` de ~15 líneas en `app/lib/` (añade header, parsea `json.data`, redirige a `/login` en 401) y un hook `useAuthedUser(role)` para el guard. Cada pantalla pierde 10-20 líneas de try/catch/loading; estimado −500 líneas.
`auth.refresh` existe en las rutas pero nadie lo llama — o se implementa en `apiFetch` o se borra.

## 8. shrink: `NEXT_PUBLIC_API_URL` redefinido en 10 archivos

`const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"` copiado en `adminDashboard/users`, `add-user`, `AuditLogsView`, `contracts/*` (5 archivos), `bookkeeperDashboard`, aunque `endpoints.ts` ya exporta `BASE_URL`. Reemplazo: importar `API_ROUTES` (o exportar `BASE_URL`) y borrar las 10 constantes. −10 líneas más una fuente única de verdad.

## 9. yagni: pares duplicados borrower/lender con ~70 % de diff mínimo

- `BorrowerMessagesView.tsx` (251) vs `lender/MessagesView.tsx` (248): ~165 líneas de diff tras normalizar nombres.
- `BorrowerNotificationsView.tsx` (235) vs `lender/NotificationsView.tsx` (235).
- `marketplace/page.tsx` (240) + `marketplace/[id]/page.tsx` (470) vs `BrowseDealsView.tsx` (322) + `browse-deals/[id]/page.tsx` (278): mismo listado/detalle de deals en ruta pública y en dashboard.
- `contracts/[id]/commitment/page.tsx` (317), `commitment-doc/page.tsx` (446), `issue-commitment/page.tsx` (150) y `lenderDashboard/commitment-letter` + `CommitmentLetterDocView` (260): cuatro vistas de la misma carta de compromiso.
Reemplazo: una vista parametrizada por rol (`<MessagesView role="lender" />`); no es un refactor ligero, pero es el mayor bloque duplicado después de §1. Estimado −700 a −900 líneas.

## 10. yagni: onboarding / registro / aplicación repetidos

`register/page.tsx` (273), `onboarding/page.tsx` (239), `apply/page.tsx` (192), `lender-optin/page.tsx` (207), `borrowerDashboard/onboarding` → `BorrowerOnboardingView` (311), `invite-flow/page.tsx` (378), `lenderDashboard/verify/page.tsx` (293, wizard de 4 pasos) y `lenderDashboard/verification` → `VerificationView`. Comparten constantes `LABEL`/`INPUT` pegadas en cada archivo y el mismo wizard con `ProgressBar`+`StepsNav`. Hay dos rutas `verify` y `verification` en el lender.
Reemplazo: un `<FormField>`/`<Wizard>` compartido y decidir cuál de `verify`/`verification` es la ruta viva. Hoy el commit "borrower from onboarding to invite flow" dejó `onboarding` aparentemente superado por `invite-flow`: confirmar y borrar uno.

## 11. native: 1 901 clases Tailwind con hex arbitrario (`bg-[#635bff]`, `text-[#0a2540]`…)

Hay tokens (`bg-accent`, `text-ink`, `border-rule`) y a la vez ~1 900 colores hex pegados, sobre todo en `adminDashboard/layout.tsx`, `CatalogView`, `OverviewView`. Dos sistemas de diseño en paralelo.
Reemplazo: usar los tokens que ya existen en `globals.css`; borra la mitad de la variabilidad visual y habilita dark mode real (hoy `layout.tsx` de admin está fijo en claro). No reduce líneas pero sí complejidad.

## 12. shrink: `PlaceholderViews.tsx` — cinco vistas idénticas

`RevenueView`, `AffiliatesView`, `VerificationsView`, `PromoCodesView`, `SettingsView` difieren solo en la clave de copy. Reemplazo: `const Placeholder = ({k}) => …` y un `VIEW_MAP` que apunte a él. −40 líneas. De paso `CatalogView`/`catalog/page.tsx` también es una tabla vacía con "pendiente".

## 13. shrink: Admin dashboard con `VIEW_MAP` dentro del render

`adminDashboard/page.tsx`: el `VIEW_MAP` se recrea en cada render dentro de un IIFE en el JSX, tipado `Record<string, any>`; el `navItems` y el sidebar repiten `id` y clave. Reemplazo: `VIEWS` constante de módulo + `Object.entries` para el nav. −20 líneas. Además hay dos rutas admin para lo mismo: `adminDashboard/users`, `catalog`, `audit-logs` como páginas **y** como tabs de `page.tsx`; elegir una.
Nota: `adminDashboard/users/page.tsx` enlaza a `/admin` y `/admin/add-user`, rutas que no existen (`/adminDashboard/...`). Fuera de alcance (bug), registrar aparte.

## 14. shrink: wrappers que solo delegan / páginas de contenido estático con `SiteShell` + `Content`

Patrón `export default function XPage(){ return <SiteShell><XContent/></SiteShell> }` seguido de `function XContent()` en ~15 páginas (`billing`, `affiliates`, `apply`, `founder-story`, `competitive-positioning`, `adminDashboard/users`…). Si `SiteShell` se mueve a un `layout.tsx` por segmento (como ya hacen `lenderDashboard` y `adminDashboard`), la mitad de cada archivo desaparece. −6 líneas × 15.

## 15. native: `html2pdf.js` (dependencia pesada, un solo uso)

Solo `contracts/[id]/commitment-doc/page.tsx` lo importa, y la misma página ya ofrece `window.print()`. Reemplazo: `window.print()` con `@media print` (CSS). Elimina `html2pdf.js` y su árbol (`html2canvas` + `jspdf`, ~600 KB). Mantener solo si se exige descarga directa sin diálogo.

## 16. native: `lucide-react` desde 43 archivos (v. ^0.577)

No es un problema por sí mismo (tree-shaken), pero conviene anotarlo junto a `settings/page.tsx` que importa 19 íconos solo para un listado de enlaces. Sin acción necesaria; mencionar si se quiere recortar bundle.

## 17. delete: `any` y comentarios que mienten

57 usos de `: any` / `any[]` (`currentUser`, `contracts`, `users` en admin). No es sobre-ingeniería, pero `VIEW_MAP: Record<string, any>` obliga a pasar `contracts/users/setActiveTab` a vistas que no los usan. Reemplazo: cada vista toma las props que necesita o llama su propio fetch. Headers de archivo con rutas viejas (`// app/admin/page.tsx`, `// app/lender/...`) → borrar, no aportan.

## 18. delete: infra con alcance de más (verificar con quien despliega)

`docker-compose.yml` (62), `docker-compose.dev.yml` (21), `Dockerfile` (64), `nginx/*` (68+), `init-letsencrypt.sh` (71): ~290 líneas de despliegue propio para un front Next.js. Reemplazo: si el destino es Vercel/Netlify, borrar todo; si es un VPS propio, dejar. Decisión del equipo, no del código.

## 19. delete: artefactos en el repo

- `.claude/worktrees/calm-purring-biscuit` está **versionado** (entrada de worktree en git). Reemplazo: añadir `.claude/worktrees/` a `.gitignore` y `git rm --cached`.
- `Docs/API_REFERENCE.md` (1 738 líneas): referencia del backend, vive en este repo y se desincroniza (contiene rutas que `endpoints.ts` no usa). Reemplazo: enlace al repo/OpenAPI del backend.
- `next-env.d.ts` versionado (lo regenera Next; suele ir en `.gitignore`).

## 20. yagni: `app/lib/preferencias.ts`, `crm.ts`

`crm.ts` es un webhook a GoHighLevel con URL hardcodeada; se usa solo desde `register/page.tsx`. Está bien como archivo de 1 función, pero la URL debería ir a `NEXT_PUBLIC_*` y el tipo `CRMPayload` duplica `RegistroPayload` (§4). Reemplazo: un solo tipo. −10 líneas.

---

## Resumen

| # | Tag | Corte | Líneas |
|---|---|---|---:|
| 1 | delete | 19 archivos sin importar | −2 800 |
| 9 | yagni | pares borrower/lender y commitment ×4 | −700…−900 |
| 7 | shrink | `apiFetch` + `useAuthedUser` | −500 |
| 6 | yagni | copy.ts huérfano / partir | −300…−500 |
| 5 | yagni | wrappers `page.tsx` | −100 (25 archivos) |
| 18 | delete | infra Docker/nginx (decisión) | −290 |
| 2,3,4,12,13,14 | delete/shrink | exports, rutas, registro, placeholders, VIEW_MAP, shells | −250 |

net: −4 500 a −5 000 líneas posibles, −1 dep (`html2pdf.js` y transitivas) posible.

Orden sugerido de ejecución (cuando se autorice): §1 → §4/§3/§2 → §8 → §7 → §12-14 → §5 → §9/§10 → §6 → §15.
