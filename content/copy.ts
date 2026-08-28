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
    namePh: "Como aparece en el contrato",
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
      note: "El enlace vence en 24 horas. Si no llega, revisa spam.",
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
  },

  footer: {
    tagline: "Servicing de préstamos privados con garantía inmobiliaria.",
    entity: "Subsidiaria de Dueño a Dueño LLC",
    links: [
      { href: "#", label: "Términos de servicio" },
      { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
    ],
    linksNote: "Términos de servicio: [PENDIENTE DE REDACCIÓN]",
    rights: "Todos los derechos reservados.",
  },

  privacy: {
    eyebrow: "Legal",
    title: "Aviso de privacidad",
    updated: "Última actualización: 28 de agosto de 2026",
    back: "Volver al inicio",
    intro: [
      "Este aviso explica qué datos personales recaba PayMyLoan.ai, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos sobre ellos.",
      "PayMyLoan.ai está en fase de acceso anticipado: hoy solo recabamos los datos del formulario de lista de espera. Antes de activar el servicing completo de préstamos, actualizaremos este aviso para cubrir los datos del préstamo —propiedad en garantía, términos, pagos y documentos— que se sumarán entonces.",
    ],
    sections: [
      {
        heading: "1. Quién es responsable de tus datos",
        paragraphs: [
          "PayMyLoan.ai es la marca bajo la que Dueño a Dueño LLC opera este sitio y, más adelante, la plataforma de servicing de préstamos privados.",
          "Domicilio para efectos de este aviso: [PENDIENTE DE DEFINIR].",
          "Ley aplicable y autoridad ante la que puedes acudir si no resolvemos tu solicitud: [PENDIENTE DE DEFINIR].",
        ],
      },
      {
        heading: "2. Qué datos recabamos hoy",
        paragraphs: [
          "Mientras estamos en acceso anticipado, el único dato que recabamos es el que dejas en el formulario de lista de espera:",
        ],
        list: [
          "Nombre completo",
          "Correo electrónico",
          "Teléfono",
          "Contraseña, que se guarda cifrada; nadie en PayMyLoan.ai puede leerla en texto plano",
          "Si buscas dar un préstamo o recibir uno (solo define qué ves al entrar; no crea ninguna obligación)",
          "Que aceptaste los términos de servicio y este aviso, con fecha y hora",
          "Idioma en el que llenaste el formulario",
        ],
      },
      {
        heading: "3. Qué datos vamos a recabar cuando actives un préstamo",
        paragraphs: [
          "En cuanto dar de alta o aceptar un préstamo esté disponible, se sumarán los datos propios del servicing:",
        ],
        list: [
          "Dirección, tipo y, si aplica, número de parcela de la propiedad en garantía",
          "Monto, tasa, estructura y vencimiento del préstamo, y cada versión de esos términos que aceptaste",
          "Historial de pagos: fecha, monto y cómo se aplicó a mora, interés y capital",
          "El identificador de tu método de pago y sus últimos cuatro dígitos; el número de cuenta completo lo guarda Stripe, no nosotros",
          "Los documentos del préstamo que aceptaste: pagaré, deed of trust y settlement statement",
          "Fecha, hora e IP de cada aceptación de términos, cambio de cuenta bancaria y descarga de documento",
        ],
      },
      {
        heading: "4. Para qué usamos tus datos",
        paragraphs: [],
        list: [
          "Avisarte cuando tu acceso a la plataforma esté listo",
          "Crear tu cuenta y, más adelante, administrar el préstamo que diste o que estás pagando",
          "Calcular el saldo, aplicar pagos y generar el calendario de pagos",
          "Verificar tu identidad y activar la verificación en dos pasos, obligatoria para prestamistas",
          "Detectar y avisar de cambios sospechosos, como un cambio de cuenta bancaria",
          "Cumplir obligaciones legales y fiscales relacionadas con el servicing de préstamos",
        ],
        note: "No usamos tus datos para publicidad ni los vendemos a terceros.",
      },
      {
        heading: "5. Con quién compartimos tus datos",
        paragraphs: [],
        list: [
          "Con la otra parte del mismo préstamo, pero solo lo necesario para administrarlo: no ve tu contraseña ni el número completo de tu cuenta bancaria",
          "Con Stripe, que procesa los pagos por ACH y guarda el método de pago; nosotros solo guardamos su identificador y los últimos cuatro dígitos",
          "Con autoridades, si una ley o una orden judicial nos obliga",
        ],
        note: "No compartimos ni vendemos tus datos con fines de mercadotecnia.",
      },
      {
        heading: "6. Cómo protegemos tus datos",
        paragraphs: [],
        list: [
          "Verificación en dos pasos obligatoria para prestamistas, porque son quienes controlan a dónde va el dinero",
          "Permisos por préstamo: cada consulta se filtra por tu participación en ese préstamo específico, no por un rol que abre todo",
          "Nunca guardamos números de cuenta completos; eso vive en Stripe",
          "Bitácora de los eventos que importan: cambios de términos, aceptaciones, aprobación de payoff, cambio de cuenta bancaria y descarga de documentos",
          "Aviso a ambas partes ante cualquier cambio de cuenta bancaria, el vector de fraude más común en servicing",
          "Documentos privados por préstamo, servidos con enlaces de vigencia corta, nunca con URL pública",
        ],
      },
      {
        heading: "7. Cuánto tiempo conservamos tus datos",
        paragraphs: [
          "Si estás en la lista de espera, conservamos tus datos hasta que abras una cuenta o hasta que nos pidas eliminarlos.",
          "Si tienes un préstamo activo, conservamos los datos del préstamo mientras dure la relación y el tiempo adicional que exija la ley aplicable a documentos financieros. Plazo exacto: [PENDIENTE DE DEFINIR].",
        ],
      },
      {
        heading: "8. Tus derechos y cómo ejercerlos",
        paragraphs: [
          "Puedes pedirnos acceder a tus datos, corregirlos, cancelarlos u oponerte a un uso específico. También puedes retirar tu consentimiento en cualquier momento; para la lista de espera basta con que nos lo pidas. Retirar tu consentimiento no afecta el tratamiento que ya hicimos antes de la solicitud.",
          "Canal para ejercer estos derechos: [PENDIENTE DE DEFINIR — hoy no existe todavía un correo de contacto para PayMyLoan.ai].",
        ],
      },
      {
        heading: "9. Cookies y almacenamiento local",
        paragraphs: [
          "El sitio no usa cookies de rastreo ni de publicidad. Guarda dos preferencias en el almacenamiento local de tu navegador —tema claro u oscuro e idioma— que nunca salen de tu dispositivo. Puedes borrarlas desde la configuración de tu navegador.",
        ],
      },
      {
        heading: "10. Menores de edad",
        paragraphs: [
          "PayMyLoan.ai no está dirigido a menores de edad y no recaba a sabiendas datos de menores de 18 años.",
        ],
      },
      {
        heading: "11. Cambios a este aviso",
        paragraphs: [
          "Si cambiamos este aviso de forma importante —por ejemplo, al activar el servicing completo del préstamo— lo publicaremos aquí con una nueva fecha de actualización antes de tratar los datos nuevos.",
        ],
      },
      {
        heading: "12. Contacto",
        paragraphs: [
          "Correo de contacto para privacidad: [PENDIENTE DE DEFINIR].",
          "Mientras ese canal no exista, puedes usar el mismo correo con el que te registraste en la lista de espera; te responderemos desde ahí en cuanto esté disponible.",
        ],
      },
    ],
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
    namePh: "As it appears on the contract",
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
      note: "The link expires in 24 hours. If it does not arrive, check spam.",
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
  },

  footer: {
    tagline: "Servicing for private real-estate-secured loans.",
    entity: "A subsidiary of Dueño a Dueño LLC",
    links: [
      { href: "#", label: "Terms of service" },
      { href: "/aviso-de-privacidad", label: "Privacy notice" },
    ],
    linksNote: "Terms of service: [COPY PENDING]",
    rights: "All rights reserved.",
  },

  privacy: {
    eyebrow: "Legal",
    title: "Privacy notice",
    updated: "Last updated: August 28, 2026",
    back: "Back to home",
    intro: [
      "This notice explains what personal data PayMyLoan.ai collects, what we use it for, who we share it with, and how you can exercise your rights over it.",
      "PayMyLoan.ai is in early access: today we only collect the data from the wait-list sign-up form. Before we turn on full loan servicing, we will update this notice to cover loan data —collateral property, terms, payments and documents— that will be added at that point.",
    ],
    sections: [
      {
        heading: "1. Who is responsible for your data",
        paragraphs: [
          "PayMyLoan.ai is the brand under which Dueño a Dueño LLC operates this site and, later, the private loan servicing platform.",
          "Address for the purposes of this notice: [TO BE DEFINED].",
          "Applicable law and the authority you can turn to if we do not resolve your request: [TO BE DEFINED].",
        ],
      },
      {
        heading: "2. What data we collect today",
        paragraphs: [
          "While we are in early access, the only data we collect is what you leave on the wait-list sign-up form:",
        ],
        list: [
          "Full name",
          "Email address",
          "Phone number",
          "Password, stored encrypted; no one at PayMyLoan.ai can read it in plain text",
          "Whether you are looking to lend or to borrow (this only sets what you see when you log in; it creates no obligation)",
          "That you accepted the terms of service and this notice, with date and time",
          "The language you used to fill out the form",
        ],
      },
      {
        heading: "3. What data we will collect once you open a loan",
        paragraphs: [
          "As soon as setting up or accepting a loan is available, servicing-specific data will be added:",
        ],
        list: [
          "Address, type and, if applicable, parcel number of the collateral property",
          "Amount, rate, structure and maturity of the loan, and every version of those terms you accepted",
          "Payment history: date, amount, and how it was applied to late fees, interest and principal",
          "Your payment method's identifier and its last four digits; the full account number is held by Stripe, not by us",
          "The loan documents you accepted: promissory note, deed of trust and settlement statement",
          "Date, time and IP address of every term acceptance, bank account change and document download",
        ],
      },
      {
        heading: "4. What we use your data for",
        paragraphs: [],
        list: [
          "Letting you know when your access to the platform is ready",
          "Creating your account and, later, administering the loan you gave or are paying",
          "Computing the balance, applying payments and generating the payment schedule",
          "Verifying your identity and enabling two-factor authentication, required for lenders",
          "Detecting and flagging suspicious changes, such as a bank account change",
          "Meeting legal and tax obligations related to loan servicing",
        ],
        note: "We do not use your data for advertising and we do not sell it to third parties.",
      },
      {
        heading: "5. Who we share your data with",
        paragraphs: [],
        list: [
          "The other party on the same loan, but only what is needed to administer it: they never see your password or your full bank account number",
          "Stripe, which processes ACH payments and holds the payment method; we only store its identifier and the last four digits",
          "Authorities, if required by law or a court order",
        ],
        note: "We do not share or sell your data for marketing purposes.",
      },
      {
        heading: "6. How we protect your data",
        paragraphs: [],
        list: [
          "Two-factor authentication required for lenders, since they control where the money goes",
          "Permissions per loan: every query is filtered by your participation in that specific loan, never by a role that opens everything",
          "We never store full account numbers; that lives with Stripe",
          "An audit log of the events that matter: term changes, acceptances, payoff approvals, bank account changes and document downloads",
          "Both parties are notified of any bank account change, the most common fraud vector in servicing",
          "Documents are private per loan, served with short-lived links, never a public URL",
        ],
      },
      {
        heading: "7. How long we keep your data",
        paragraphs: [
          "If you are on the wait list, we keep your data until you open an account or until you ask us to delete it.",
          "If you have an active loan, we keep the loan data for as long as the relationship lasts, plus any additional time required by law for financial records. Exact period: [TO BE DEFINED].",
        ],
      },
      {
        heading: "8. Your rights and how to exercise them",
        paragraphs: [
          "You can ask us to access your data, correct it, delete it, or object to a specific use. You can also withdraw your consent at any time; for the wait list, simply asking us is enough. Withdrawing consent does not affect processing we already carried out before the request.",
          "Channel to exercise these rights: [TO BE DEFINED — there is no contact email for PayMyLoan.ai yet].",
        ],
      },
      {
        heading: "9. Cookies and local storage",
        paragraphs: [
          "The site does not use tracking or advertising cookies. It stores two preferences in your browser's local storage —light or dark theme and language— that never leave your device. You can clear them from your browser settings.",
        ],
      },
      {
        heading: "10. Minors",
        paragraphs: [
          "PayMyLoan.ai is not directed at minors and does not knowingly collect data from anyone under 18.",
        ],
      },
      {
        heading: "11. Changes to this notice",
        paragraphs: [
          "If we change this notice in a material way —for example, when we turn on full loan servicing— we will publish it here with a new update date before we process the new data.",
        ],
      },
      {
        heading: "12. Contact",
        paragraphs: [
          "Contact email for privacy: [TO BE DEFINED].",
          "Until that channel exists, you can use the same email you signed up with on the wait list; we will reply from there as soon as it is available.",
        ],
      },
    ],
  },
};

export const copy: Record<Lang, Copy> = { es, en };
