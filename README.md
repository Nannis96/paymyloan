# PayMyLoan.ai — Landing de registro

Landing pública de [paymyloan.ai](https://paymyloan.ai) con el alta de usuarios.
**Solo front**: no hay base de datos, ni sesión, ni backend. El resto del
producto descrito en `../paymyloan-alcance.html` se construye aparte.

## Qué incluye

- Una sola página con el formulario de registro en el hero (`#registro`).
- Secciones de apoyo tomadas del documento de alcance: qué resuelve, cómo
  empieza, costo del pago por ACH y seguridad.
- Español e inglés con un toggle en el encabezado; todo el texto vive en
  `content/copy.ts`.
- Tema claro y oscuro: sigue al sistema y el visitante puede forzarlo.
- Su propio contenedor Docker, independiente de Owner.

## Stack

Las versiones se alinean con el proyecto Owner para que el código sea
portable entre los dos repositorios.

| Pieza | Versión |
|---|---|
| Next.js (App Router, Turbopack) | 16.1.1 |
| React | 19.2.3 |
| Tailwind CSS | v4 (`@tailwindcss/postcss`) |
| Iconos | `lucide-react` |
| TypeScript | 5.x |

Sin Prisma, sin NextAuth, sin Stripe: nada de eso hace falta todavía.

## Correr con Docker

Producción (imagen compilada, `output: standalone`, detrás de nginx + TLS):

```bash
cp .env.example .env      # opcional en local
docker compose up --build
# http://localhost (en local, sin certificado)
```

`docker-compose.yml` levanta tres servicios: `landing` (la app Next.js, sin
puertos publicados al host), `nginx` (reverse proxy que sí publica 80 y
443, configurables con `HTTP_PORT`/`HTTPS_PORT`) y `certbot` (renueva el
certificado de Let's Encrypt solo, corriendo `certbot renew` cada 12h). Solo
nginx queda expuesto; la landing únicamente es alcanzable dentro de la red
interna de compose. La configuración de nginx vive en `nginx/nginx.conf` y
`nginx/conf.d/`.

### Dominio y HTTPS en el servidor de producción

El dominio de producción es **paymyloan.ai** (con `www.paymyloan.ai`),
configurado en `nginx/conf.d/default.conf`. La primera vez que se despliega
en el servidor real, con el DNS ya apuntando ahí y el puerto 80 abierto:

```bash
./init-letsencrypt.sh
```

Este script resuelve el problema de arranque (nginx necesita un certificado
para levantar el bloque 443, pero Let's Encrypt necesita nginx sirviendo el
reto ACME por HTTP para emitirlo): genera un certificado temporal, levanta
nginx, pide el certificado real a Let's Encrypt vía webroot
(`/.well-known/acme-challenge/`), recarga nginx y deja el stack completo
corriendo. Se corre **una sola vez**; después de eso, el servicio `certbot`
se encarga de renovarlo automáticamente y `nginx` recarga su configuración
cada 6h para tomar el certificado renovado sin downtime. Los parámetros TLS
(protocolos, cifrados) están fijos en `nginx/conf.d/default.conf`, no se
descargan de ningún lado.

Los certificados quedan en `./certbot/conf` (bind mount, fuera de git —
ver `.gitignore`). Para probar el flujo sin gastar el límite de emisiones
de Let's Encrypt: `STAGING=1 ./init-letsencrypt.sh`.

Desarrollo con recarga en caliente:

```bash
docker compose -f docker-compose.dev.yml up --build
# http://localhost:3000
```

Sin Docker: `npm install && npm run dev`.

> Las variables `NEXT_PUBLIC_*` se incrustan al **compilar**, no se leen en
> runtime. Para cambiarlas en la imagen de producción hay que reconstruir
> (`docker compose up --build`), y por eso viajan como `args` de build en
> `docker-compose.yml`, no como `environment`.

## Dónde se conecta el backend

Todo el envío pasa por un solo archivo: **`app/lib/registro.ts`**.

Mientras `NEXT_PUBLIC_REGISTRO_ENDPOINT` esté vacío, el formulario valida en
el cliente y simula la respuesta sin mandar nada a ningún lado (en desarrollo
aparece un aviso visible bajo el botón). Cuando exista el endpoint basta con
poblar la variable: no hay que tocar los componentes.

El contrato que envía es:

```ts
{
  intent: "lender" | "borrower",   // intención de uso, NO un rol
  nombre, correo, telefono, password,
  aceptaTerminos: true,
  idioma: "es" | "en"
}
```

## Decisiones que conviene revisar

- **`intent` no es un rol.** La Sección 7 del alcance define que el rol vive
  en `LoanParty` —la relación persona ↔ préstamo—, no en el `User`. El campo
  del formulario solo decide qué se le muestra al entrar, y el texto bajo el
  control se lo dice al visitante. Si el backend lo persiste, que sea como
  preferencia de onboarding.
- **Contraseña de 12 caracteres.** Owner pide 6. Aquí se maneja dinero de
  terceros y el alcance marca la seguridad como prioridad transversal, así
  que el piso se subió. Si Spencer prefiere alinearse con Owner, se cambia en
  `app/components/RegisterForm.tsx` (constante `reglas`) y en el copy.
- **Bilingüe.** La pregunta 13 del alcance sigue abierta. El copy quedó
  centralizado y traducido para no pagar el retrofit después; si se decide
  que la landing es solo en inglés, se borra el toggle y la mitad `es`.
- **Datos entre corchetes.** `[POR DEFINIR]` en la sección de costo marca las
  preguntas 2 y 5 del alcance (cuota de la plataforma y quién absorbe la
  comisión). No se inventó un precio. Los enlaces de Términos y Aviso de
  privacidad apuntan a `#` hasta que existan los documentos.
- **Sin correo de contacto todavía.** El pie, el CTA final y la nota de
  éxito del formulario mencionaban `servicing@paymyloan.ai`; se quitó
  porque ese buzón todavía no existe. Cuando haya un canal de soporte real
  se agrega de vuelta en `content/copy.ts` (`footer.entity`-adjacent,
  `finalCta` y `form.success.note`).

## Estructura

```
app/
  layout.tsx            fuentes, metadata, tema antes del primer paint
  page.tsx              entrada
  globals.css           tokens del sistema visual + tema claro/oscuro
  lib/registro.ts       único punto de salida del formulario
  components/
    SiteShell.tsx       contexto de idioma y tema
    SiteHeader.tsx      navegación, toggles, CTA
    Hero.tsx            propuesta + formulario
    RegisterForm.tsx    alta de usuario
    Benefits.tsx  HowItWorks.tsx  CostTable.tsx  Security.tsx
    FinalCta.tsx  SiteFooter.tsx  ui.tsx
content/
  copy.ts               todo el texto, es + en
```

## Sistema visual

Sale del documento de alcance, que es la única pieza con marca PayMyLoan.
No se reutiliza la identidad de Owner (amarillo y azul oscuro): el alcance
define un sitio propio e independiente.

- **Tipografía**: Spectral (títulos), IBM Plex Sans (cuerpo), IBM Plex Mono
  (metadatos y cifras).
- **Color**: crema `#F1F3EE` y tinta `#17201B` en claro, verde `#1D6B45` de
  acento; la paleta oscura es la del propio documento.
- **Forma**: radios de 2px, reglas de 1px, dos filos de 2px que enmarcan la
  página. Sin degradados ni sombras grandes.

Los tokens viven en `app/globals.css` y se exponen como utilidades de
Tailwind (`bg-surface`, `text-ink-2`, `border-rule`). Apuntan a variables
CSS, así que el cambio de tema no necesita variantes `dark:` en el JSX.
