/**
 * Todo el texto de la landing vive aquí.
 *
 * Owner ya resuelve el bilingüismo con un toggle es/en dentro del propio
 * formulario de alta (app/components/signup-form.tsx) y la Sección 11 del
 * alcance deja abierta la pregunta de si PayMyLoan será bilingüe.
 * Centralizar el copy cuesta lo mismo hoy y evita el retrofit que el
 * documento advierte que "cuesta el doble".
 *
 * Los textos entre corchetes —[POR DEFINIR]— son datos que el alcance deja
 * como pregunta abierta. No se inventan: se dejan visibles para que Spencer
 * los cierre.
 */

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

const es = {
  meta: {
    title: "PayMyLoan.ai — Servicing de préstamos privados",
    description:
      "Préstamos privados con garantía inmobiliaria administrados en un solo lugar: el prestatario paga por ACH, el prestamista ve qué se pagó y de qué propiedad, y ambos trabajan sobre los mismos términos, documentos y saldo.",
  },

  nav: {
    skip: "Saltar al formulario de registro",
    brand: "PayMyLoan",
    brandSuffix: ".ai",
    links: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#costo", label: "Costo del pago" },
      { href: "#seguridad", label: "Seguridad" },
    ],
    login: "Iniciar sesión",
    cta: "Crear cuenta",
    themeToggle: "Cambiar tema",
    langToggle: "Cambiar idioma",
  },

  hero: {
    eyebrow: "Servicing de préstamos privados",
    title: "Un solo saldo en el que ambos confían.",
    deck: "PayMyLoan.ai administra préstamos privados con garantía inmobiliaria: el prestatario paga por ACH, el prestamista ve exactamente qué se pagó y de qué propiedad, y ambos trabajan sobre los mismos términos, documentos y saldo.",
    points: [
      "Pago por ACH: 0.8% con tope de $5.00 por transacción",
      "Términos aceptados por las dos partes, con fecha, hora e IP",
      "Verificación en dos pasos obligatoria para prestamistas",
    ],
    trustLabel: "Operado por",
    trust: [
      "Dueño a Dueño LLC",
      "Pagos procesados por Stripe",
      "ACH Direct Debit",
    ],
  },

  form: {
    eyebrow: "Alta de usuario",
    title: "Crear cuenta",
    subtitle:
      "Con una sola cuenta administras los préstamos que diste y los que estás pagando.",
    intentLabel: "¿Qué vas a hacer primero?",
    intents: [
      { value: "lender", label: "Doy un préstamo", hint: "Prestamista" },
      { value: "borrower", label: "Pago un préstamo", hint: "Prestatario" },
    ],
    intentNote:
      "Puedes ser prestamista en un préstamo y prestatario en otro. Esto solo define qué ves al entrar; el rol real vive en cada préstamo, no en tu cuenta.",
    name: "Nombre completo",
    namePh: "Como aparece en el pagaré",
    email: "Correo electrónico",
    emailPh: "correo@ejemplo.com",
    phone: "Teléfono",
    phonePh: "Ej. 555 123 4567",
    password: "Contraseña",
    passwordPh: "Mínimo 12 caracteres",
    passwordConfirm: "Confirmar contraseña",
    passwordConfirmPh: "Repite la contraseña",
    show: "Mostrar",
    hide: "Ocultar",
    rules: {
      length: "12 caracteres o más",
      case: "Una mayúscula y una minúscula",
      number: "Al menos un número",
    },
    terms: "Acepto los",
    termsLink: "Términos de servicio",
    termsAnd: "y el",
    privacyLink: "Aviso de privacidad",
    submit: "Crear cuenta",
    submitting: "Creando cuenta…",
    twofaNote:
      "Al terminar el registro te pediremos configurar la verificación en dos pasos. Para prestamistas es obligatoria.",
    inviteNote: "¿Te invitaron por correo?",
    inviteLink: "Abre el enlace de tu invitación",
    inviteNoteEnd: "para unirte directo al préstamo.",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Inicia sesión",
    errors: {
      summary: "Revisa los campos marcados.",
      name: "Escribe tu nombre completo.",
      email: "Escribe un correo válido.",
      phone: "Escribe un teléfono de al menos 10 dígitos.",
      password: "La contraseña no cumple los requisitos.",
      passwordConfirm: "Las contraseñas no coinciden.",
      terms: "Necesitas aceptar los términos para crear la cuenta.",
      intent: "Elige qué vas a hacer primero.",
      submit: "No pudimos crear la cuenta. Intenta de nuevo en unos segundos.",
    },
    success: {
      title: "Revisa tu correo",
      body: "Te enviamos un enlace de verificación a",
      note: "El enlace vence en 24 horas. Si no llega, revisa spam o escribe a servicing@paymyloan.ai.",
      again: "Usar otro correo",
    },
    devNote:
      "Front únicamente: todavía no hay backend conectado, el envío se simula.",
  },

  benefits: {
    eyebrow: "Qué resuelve",
    title: "Lo que hoy vive en hojas de cálculo y correos sueltos.",
    lead: "Un préstamo privado se administra hoy con transferencias por separado y una hoja que solo una de las partes mantiene. Nadie tiene una sola fuente de verdad sobre cuánto se debe, cuánto de eso fue capital y cuándo vence.",
    items: [
      {
        title: "Términos que ambos aceptaron",
        body: "Propiedad, monto, tasa, estructura y vencimiento se capturan una vez y las dos partes los aceptan dentro de la plataforma. Los términos aceptados no se editan encima: un cambio genera una versión nueva que vuelve a pedir la aceptación de ambos.",
      },
      {
        title: "El saldo se calcula, no se negocia por correo",
        body: "Calendario completo con desglose de capital, interés y saldo remanente, para interest only, amortizado a plazo o con balloon. Cada pago que entra se aplica con una regla explícita: mora, después interés, después capital.",
      },
      {
        title: "Un ACH devuelto no se ve como cobrado",
        body: "El ACH liquida en días hábiles y puede devolverse. Mientras eso pasa el pago se muestra en tránsito, no como recibido, y la devolución avisa a las dos partes. Es la diferencia entre un saldo real y uno optimista.",
      },
    ],
  },

  how: {
    eyebrow: "Cómo empieza",
    title: "Cuatro pasos hasta el primer calendario de pagos.",
    steps: [
      {
        title: "Crea tu cuenta",
        body: "Cualquiera de las dos partes da de alta el préstamo y captura la propiedad que queda en garantía: dirección, tipo y, si la tienes, la parcela.",
      },
      {
        title: "Invita a la otra parte",
        body: "Se envía por correo un enlace de acceso único. Quien lo recibe crea su contraseña y entra directo al préstamo, sin buscar nada.",
      },
      {
        title: "Ambos aceptan los términos",
        body: "La contraparte revisa monto, tasa, plazo y vencimiento. Acepta, o rechaza con comentario. Cada aceptación queda registrada con fecha, hora e IP.",
      },
      {
        title: "El préstamo se activa",
        body: "Con las dos aceptaciones se genera el calendario de pagos y ambos ven el mismo saldo desde su tablero.",
      },
    ],
  },

  cost: {
    eyebrow: "Costo del pago",
    title: "El ACH tiene tope. Por eso funciona para mensualidades grandes.",
    lead: "El procesamiento cuesta 0.8% con tope de $5.00 por transacción. Cualquier monto arriba de $625 paga el tope, así que entre más grande la mensualidad, más barato sale en porcentaje.",
    tableHead: ["Mensualidad", "Comisión ACH", "% efectivo"],
    rows: [
      ["$400", "$3.20", "0.80%"],
      ["$625", "$5.00", "0.80%"],
      ["$1,200", "$5.00", "0.42%"],
      ["$2,500", "$5.00", "0.20%"],
      ["$5,000", "$5.00", "0.10%"],
    ],
    compareLabel: "Comparación",
    compare:
      "Un pago de $2,400 cuesta $5.00 por ACH. La misma transacción con tarjeta costaría cerca de $70.",
    pendingLabel: "Pendiente de definir",
    pending:
      "Cuota de la plataforma: [POR DEFINIR]. Quién absorbe la comisión de proceso —prestatario, prestamista o plataforma—: [POR DEFINIR].",
  },

  security: {
    eyebrow: "Seguridad",
    title: "Aquí se mueve dinero de terceros. El acceso se trata así.",
    items: [
      {
        title: "Verificación en dos pasos obligatoria",
        body: "Para prestamistas no es opcional: son quienes controlan a dónde va el dinero.",
      },
      {
        title: "Permisos por préstamo, no por rol global",
        body: "Cada consulta se filtra por tu participación en ese préstamo. No hay rol que abra todo.",
      },
      {
        title: "Nunca guardamos números de cuenta",
        body: "Stripe guarda el método de pago. Nosotros guardamos su identificador y los últimos cuatro dígitos.",
      },
      {
        title: "Bitácora de los eventos que importan",
        body: "Cambios de términos, aceptaciones, aprobación de payoff, cambio de cuenta bancaria y descarga de documentos quedan registrados.",
      },
      {
        title: "Aviso ante cualquier cambio bancario",
        body: "Se notifica a las dos partes. Es el vector de fraude clásico en servicing y se trata como tal.",
      },
      {
        title: "Documentos privados por préstamo",
        body: "Pagaré, deed of trust y settlement statement se sirven con enlace de vigencia corta, nunca con URL pública.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Empieza",
    title: "Da de alta tu primer préstamo.",
    body: "Crea la cuenta, captura los términos e invita a la otra parte. El calendario se genera cuando ambos aceptan.",
    cta: "Crear cuenta",
    secondary: "Escríbenos a servicing@paymyloan.ai",
  },

  footer: {
    tagline: "Servicing de préstamos privados con garantía inmobiliaria.",
    entity: "Subsidiaria de Dueño a Dueño LLC",
    email: "servicing@paymyloan.ai",
    links: [
      { href: "#", label: "Términos de servicio" },
      { href: "#", label: "Aviso de privacidad" },
    ],
    linksNote: "[PENDIENTES DE REDACCIÓN]",
    rights: "Todos los derechos reservados.",
  },
};

type Copy = typeof es;

const en: Copy = {
  meta: {
    title: "PayMyLoan.ai — Private loan servicing",
    description:
      "Private real-estate-secured loans handled in one place: the borrower pays by ACH, the lender sees exactly what was paid and on which property, and both work from the same terms, documents and balance.",
  },

  nav: {
    skip: "Skip to the sign-up form",
    brand: "PayMyLoan",
    brandSuffix: ".ai",
    links: [
      { href: "#como-funciona", label: "How it works" },
      { href: "#costo", label: "Payment cost" },
      { href: "#seguridad", label: "Security" },
    ],
    login: "Log in",
    cta: "Create account",
    themeToggle: "Switch theme",
    langToggle: "Switch language",
  },

  hero: {
    eyebrow: "Private loan servicing",
    title: "One balance both sides trust.",
    deck: "PayMyLoan.ai services private real-estate-secured loans: the borrower pays by ACH, the lender sees exactly what was paid and on which property, and both work from the same terms, documents and balance.",
    points: [
      "ACH payments: 0.8%, capped at $5.00 per transaction",
      "Terms accepted by both parties, with date, time and IP",
      "Two-factor authentication required for lenders",
    ],
    trustLabel: "Operated by",
    trust: [
      "Dueño a Dueño LLC",
      "Payments processed by Stripe",
      "ACH Direct Debit",
    ],
  },

  form: {
    eyebrow: "Sign up",
    title: "Create account",
    subtitle:
      "One account covers both the loans you gave and the ones you are paying.",
    intentLabel: "What will you do first?",
    intents: [
      { value: "lender", label: "I am lending", hint: "Lender" },
      { value: "borrower", label: "I am paying a loan", hint: "Borrower" },
    ],
    intentNote:
      "You can be the lender on one loan and the borrower on another. This only sets what you see first; the real role lives on each loan, not on your account.",
    name: "Full name",
    namePh: "As it appears on the note",
    email: "Email address",
    emailPh: "email@example.com",
    phone: "Phone",
    phonePh: "E.g. 555 123 4567",
    password: "Password",
    passwordPh: "12 characters minimum",
    passwordConfirm: "Confirm password",
    passwordConfirmPh: "Repeat the password",
    show: "Show",
    hide: "Hide",
    rules: {
      length: "12 characters or more",
      case: "One uppercase and one lowercase letter",
      number: "At least one number",
    },
    terms: "I accept the",
    termsLink: "Terms of service",
    termsAnd: "and the",
    privacyLink: "Privacy notice",
    submit: "Create account",
    submitting: "Creating account…",
    twofaNote:
      "After sign-up we will ask you to set up two-factor authentication. For lenders it is required.",
    inviteNote: "Were you invited by email?",
    inviteLink: "Open your invitation link",
    inviteNoteEnd: "to join the loan directly.",
    haveAccount: "Already have an account?",
    login: "Log in",
    errors: {
      summary: "Check the highlighted fields.",
      name: "Enter your full name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number with at least 10 digits.",
      password: "The password does not meet the requirements.",
      passwordConfirm: "The passwords do not match.",
      terms: "You need to accept the terms to create the account.",
      intent: "Choose what you will do first.",
      submit: "We could not create the account. Try again in a moment.",
    },
    success: {
      title: "Check your email",
      body: "We sent a verification link to",
      note: "The link expires in 24 hours. If it does not arrive, check spam or write to servicing@paymyloan.ai.",
      again: "Use a different email",
    },
    devNote:
      "Front end only: no backend is wired yet, the submission is simulated.",
  },

  benefits: {
    eyebrow: "What it solves",
    title: "What today lives in spreadsheets and loose emails.",
    lead: "A private loan is handled today with separate transfers and a spreadsheet only one side maintains. Nobody has a single source of truth on how much is owed, how much of it was principal, and when the loan matures.",
    items: [
      {
        title: "Terms both parties accepted",
        body: "Property, amount, rate, structure and maturity are captured once and both parties accept them inside the platform. Accepted terms are never edited in place: a change creates a new version that reopens acceptance for both.",
      },
      {
        title: "The balance is computed, not negotiated by email",
        body: "A full schedule with principal, interest and remaining balance, for interest only, fully amortized or balloon structures. Every payment received is applied under an explicit rule: late fees, then interest, then principal.",
      },
      {
        title: "A returned ACH never shows as collected",
        body: "ACH settles in business days and can be returned. While that happens the payment shows as in transit, not received, and a return notifies both parties. That is the difference between a real balance and an optimistic one.",
      },
    ],
  },

  how: {
    eyebrow: "Getting started",
    title: "Four steps to the first payment schedule.",
    steps: [
      {
        title: "Create your account",
        body: "Either party sets up the loan and captures the property held as collateral: address, type and, if you have it, the parcel number.",
      },
      {
        title: "Invite the other party",
        body: "A single-use access link goes out by email. Whoever receives it sets a password and lands directly on the loan.",
      },
      {
        title: "Both accept the terms",
        body: "The counterparty reviews amount, rate, term and maturity. They accept, or decline with a comment. Each acceptance is recorded with date, time and IP.",
      },
      {
        title: "The loan goes active",
        body: "With both acceptances the payment schedule is generated and both sides see the same balance from their dashboard.",
      },
    ],
  },

  cost: {
    eyebrow: "Payment cost",
    title: "ACH is capped. That is what makes it work for large payments.",
    lead: "Processing costs 0.8%, capped at $5.00 per transaction. Anything above $625 pays the cap, so the larger the monthly payment, the cheaper it gets as a percentage.",
    tableHead: ["Monthly payment", "ACH fee", "Effective %"],
    rows: [
      ["$400", "$3.20", "0.80%"],
      ["$625", "$5.00", "0.80%"],
      ["$1,200", "$5.00", "0.42%"],
      ["$2,500", "$5.00", "0.20%"],
      ["$5,000", "$5.00", "0.10%"],
    ],
    compareLabel: "For comparison",
    compare:
      "A $2,400 payment costs $5.00 by ACH. The same transaction on a card would cost close to $70.",
    pendingLabel: "Still to be defined",
    pending:
      "Platform fee: [TO BE DEFINED]. Who absorbs the processing fee —borrower, lender or platform—: [TO BE DEFINED].",
  },

  security: {
    eyebrow: "Security",
    title: "Third-party money moves here. Access is treated accordingly.",
    items: [
      {
        title: "Two-factor authentication required",
        body: "For lenders it is not optional: they control where the money goes.",
      },
      {
        title: "Permissions per loan, not per global role",
        body: "Every query is filtered by your participation in that loan. No role opens everything.",
      },
      {
        title: "We never store bank account numbers",
        body: "Stripe holds the payment method. We hold its identifier and the last four digits.",
      },
      {
        title: "An audit log of the events that matter",
        body: "Term changes, acceptances, payoff approvals, bank account changes and document downloads are all recorded.",
      },
      {
        title: "Alerts on any banking change",
        body: "Both parties are notified. It is the classic fraud vector in servicing and it is treated as one.",
      },
      {
        title: "Documents private per loan",
        body: "Promissory note, deed of trust and settlement statement are served with short-lived links, never a public URL.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Get started",
    title: "Set up your first loan.",
    body: "Create the account, capture the terms and invite the other party. The schedule is generated once both accept.",
    cta: "Create account",
    secondary: "Write to servicing@paymyloan.ai",
  },

  footer: {
    tagline: "Servicing for private real-estate-secured loans.",
    entity: "A subsidiary of Dueño a Dueño LLC",
    email: "servicing@paymyloan.ai",
    links: [
      { href: "#", label: "Terms of service" },
      { href: "#", label: "Privacy notice" },
    ],
    linksNote: "[COPY PENDING]",
    rights: "All rights reserved.",
  },
};

export const copy: Record<Lang, Copy> = { es, en };
