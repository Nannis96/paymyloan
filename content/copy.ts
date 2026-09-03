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
    cta: "Ingresar",
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
    title: "Sé de los primeros en probarlo",
    subtitle:
      "Déjanos tus datos para ser de los primeros en abrir tu cuenta. Te avisaremos en cuanto la plataforma esté lista para ti.",
    intentLabel: "¿Para qué deseas una cuenta?",
    intents: [
      { value: "lender", label: "Daré un préstamo", hint: "Prestamista" },
      { value: "borrower", label: "Quiero un préstamo", hint: "Prestatario" },
    ],
    intentNote:
      "No te cobraremos nada ahora. Solo guardaremos tu lugar en la fila.",
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
    submit: "Quiero Registrarme",
    submitting: "Registrando tu solicitud…",
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
  loginPage: {
    title: "Inicia sesión",
    subtitle: "Ingresa tus credenciales para administrar préstamos.",
    cardTitle: "ACCESO SEGURO",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "correo@ejemplo.com",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Ingresa tu contraseña",
    submit: "INGRESAR",
    forgot: "OLVIDÉ MI CONTRASEÑA",
    back: "VOLVER AL INICIO",
  },

  pmlHero: {
    badge: "Gestión de Préstamos con IA",
    subtitle: "PML — Prestamista de Dinero Privado. PayMyLoan.ai. Ambas partes del acuerdo.",
    title1: "De la propuesta",
    title2: "al pago final.",
    title3: "Una sola plataforma.",
    by: "por PayMyLoan.ai",
    desc: "La propuesta. La solicitud de préstamo. El compromiso. El procesamiento de pagos. La liquidación. Todo en un solo lugar — tanto para prestatarios como para prestamistas.",
    cta1: "Quiero acceso anticipado",
    cta2: "Ver cómo funciona",
  },

  whoItHelps: {
    eyebrow: "A quién ayuda",
    title1: "Una plataforma.",
    title2: "Seis problemas resueltos.",
    lead: "PML elimina el caos de los préstamos privados — dando a los prestatarios claridad y a los prestamistas control, para que cada trato se cierre limpiamente.",
    cards: [
      {
        role: "Prestatario",
        icon: "🏗️",
        title: "Del pitch al pago en un solo lugar",
        points: [
          "Todos los préstamos en un solo panel",
          "Genera pitches y cartas de compromiso",
          "Pagos automatizados — nunca más te atrases",
          "Pagos finales instantáneos y calificación PML"
        ]
      },
      {
        role: "Prestamista",
        icon: "🏦",
        title: "Sabe quién pagó, qué se debe y qué sigue",
        points: [
          "Seguimiento de pagos de todos los prestatarios",
          "Evalúa prestatarios antes de comprometer capital",
          "Genera cartas de compromiso y pagos finales",
          "Controla tu visibilidad en el mercado"
        ]
      },
      {
        role: "Contador Interno",
        icon: "📒",
        title: "Registros limpios, cero persecuciones",
        points: [
          "División de capital vs interés en cada pago",
          "Cada préstamo vinculado a una propiedad",
          "Registros exportables — sin captura manual",
          "No más correos mensuales pidiendo detalles"
        ]
      },
      {
        role: "Contador Público",
        icon: "🧾",
        title: "Listo para el cierre anual — a un clic",
        points: [
          "Ingresos y gastos por intereses separados claramente",
          "Cada préstamo documentado por propiedad",
          "Reporte anual completo — exportable al instante",
          "No más rebuscar en correos para obtener registros"
        ]
      },
      {
        role: "Compañía de Títulos",
        icon: "🏛️",
        title: "Pagos finales antes del cierre — no después",
        points: [
          "Estados de liquidación enviados directamente",
          "Ambas partes confirmadas con la misma cifra",
          "Sin apuros de último minuto en la mesa de firma",
          "Cierres limpios en cada ocasión"
        ]
      },
      {
        role: "Aseguradora",
        icon: "🛡️",
        title: "Cláusula hipotecaria — precisa siempre",
        points: [
          "Datos del prestamista extraídos de su perfil PML",
          "Cláusula de acreedor hipotecario siempre al día",
          "Sin solicitudes manuales de detalles del prestamista",
          "Cada propiedad y préstamo documentado"
        ]
      }
    ],
    stats: [
      { value: "< 30s", label: "Pago final generado" },
      { value: "2", label: "Lados. Una plataforma." },
      { value: "0", label: "Hojas de cálculo necesarias" },
      { value: "100%", label: "Listo para el CPA a fin de año" }
    ]
  },

  beforeAfter: {
    eyebrow: "Antes vs Después",
    title: "Dos inversores. Mismo negocio. Diferentes herramientas.",
    before: {
      badge: "Sin PML",
      icon: "😤",
      items: [
        "Prestatario: ni idea a quién llamar para obtener una respuesta rápida del prestamista",
        "Prestatario: préstamos dispersos en 3 bancos, 2 prestamistas privados y una hoja de cálculo",
        "Prestatario: tu contador persiguiéndote cada mes para explicar qué préstamo es cuál",
        "Prestamista: ni idea de quién pagó, cuánto o cuándo — hasta que algo sale mal",
        "Prestamista: carrera de último minuto para calcular el pago final mientras la notaría espera"
      ]
    },
    after: {
      badge: "Con PML",
      icon: "😎",
      items: [
        "Prestatario: todos los préstamos en un solo lugar — cada saldo, cada pago, cada propiedad",
        "Prestatario: envía tu pitch y carta de compromiso a un prestamista en minutos",
        "Prestatario: pago final generado al instante — sin esperas, sin idas y vueltas",
        "Prestamista: sabes exactamente quién pagó, qué cantidad y cuándo — en tiempo real",
        "Prestamista: historial de pagos e intereses listos para entregar directo a tu contador"
      ]
    }
  },

  soundFamiliar: {
    eyebrow: "¿Te suena familiar?",
    title: "Los préstamos de dinero privado funcionan en caos. No tiene por qué ser así.",
    cards: [
      { role: "Prestatario", icon: "📝", title: "“Armar un pitch toma una eternidad.”", desc: "Dar formato a un resumen del trato, solicitud de préstamo y carta de compromiso para cada prestamista toma horas de trabajo manual. PML genera todo en minutos." },
      { role: "Prestatario", icon: "🤝", title: "“La carta de compromiso está en algún lugar de mi correo.”", desc: "Las cartas de compromiso se pierden en hilos, sin firmar o extraviadas. PML mantiene cada compromiso vinculado al préstamo desde el primer día." },
      { role: "Prestatario", icon: "💳", title: "“El procesamiento de pagos es un desastre.”", desc: "Transferencias manuales, Zelle, cheques — no hay un sistema consistente. PML centraliza el procesamiento de pagos para que cada transacción sea rastreada y confirmada." },
      { role: "Prestamista", icon: "📋", title: "“¿Dónde está la solicitud del prestatario?”", desc: "Los prestamistas necesitan una solicitud estandarizada de cada prestatario antes de comprometerse. PML da a los prestatarios una solicitud integrada que alimenta directamente al prestamista." },
      { role: "Prestamista", icon: "🔍", title: "“Necesito verificar a quién le estoy prestando.”", desc: "Búsqueda de entidades, verificación de antecedentes, historial crediticio — los prestamistas arriesgan capital real y necesitan evaluar a los prestatarios. PML centraliza esa debida diligencia en un solo lugar." },
      { role: "Prestamista", icon: "🏘️", title: "“No tengo un flujo de tratos consistente.”", desc: "Los prestamistas con capital ocioso necesitan que los prestatarios calificados los encuentren. El mercado de PML conecta a los prestamistas con flujo de tratos evaluado automáticamente." },
      { role: "Prestamista", icon: "📊", title: "“Mi contador necesita el desglose de intereses — otra vez.”", desc: "PML rastrea el capital vs. intereses en cada pago y exporta reportes limpios que tu contador realmente puede usar." },
      { role: "Prestatario", icon: "💸", title: "“Olvidé hacer el pago.”", desc: "Las transferencias manuales se olvidan. Los pagos atrasados dañan las relaciones con los prestamistas y pueden detonar cláusulas de incumplimiento. PML automatiza los pagos para que nada se escape." }
    ],
    solution: {
      icon: "✅",
      title: "PML arregla ambos lados.",
      desc: "Una plataforma. Los prestatarios obtienen claridad, velocidad y organización. Los prestamistas obtienen rastreo de pagos, registros de intereses y liquidaciones instantáneas. Construido para dinero privado."
    }
  },

  liveActivity: {
    eyebrow: "Actividad en vivo",
    title1: "El mercado monetario privado,",
    title2: "en tiempo real.",
    desc: "Cada solicitud de préstamo, cada trato activo, cada transacción cerrada — rastreada en PML.",
    stats: {
      requested: {
        label: "Préstamos Solicitados",
        value: "47",
        desc: "Solicitudes de préstamo activas en el mercado",
        live: "EN VIVO"
      },
      current: {
        label: "Préstamos Actuales",
        value: "312",
        desc: "Préstamos siendo administrados activamente",
        metric: "$48.2M total pendiente"
      },
      closed: {
        label: "Préstamos Cerrados",
        value: "1,204",
        desc: "Total de tratos completados en PML",
        metric: "$187.4M total fondeado ✓"
      }
    },
    map: {
      title: "Actividad de Tratos — Estados Unidos",
      legendRequested: "Solicitado",
      legendCurrent: "Actual",
      legendClosed: "Cerrado"
    }
  },

  comingSoon: {
    eyebrow: "Próximamente",
    title1: "El Mercado de ",
    title2: "Dinero Privado.",
    desc: "Donde los prestatarios con tratos se conectan directamente con prestamistas que tienen capital listo para desplegar. Dentro de PML, los prestatarios pueden generar un pitch deck, crear una carta de compromiso y obtener fondeo — todo en un solo lugar.",
    card1: {
      eyebrow: "Para Prestamistas",
      title: "Explora Prestatarios Buscando Capital",
      desc: "Ve un feed en vivo de prestatarios buscando fondos activamente. Revisa el perfil PML de cada prestatario — historial de préstamos, pagos a tiempo, total pedido — antes de comprometer un solo dólar.",
      points: [
        "Explora solicitudes de préstamo activas con detalles completos",
        "Revisa la Calificación PML + perfil completo antes de comprometerte",
        "Envía hojas de términos directamente dentro de la plataforma",
        "Construye tu perfil de prestamista — tratos fondeados, capital desplegado, tiempo de respuesta, calificación"
      ]
    },
    card2: {
      eyebrow: "Perfiles PML",
      title: "Ambas Partes Construyen Credibilidad.",
      desc: "Prestatarios y prestamistas ganan un perfil público de PML basado en su historial real dentro de la plataforma.",
      borrowerLabel: "Perfil del Prestatario",
      borrowerStats: [
        { label: "Préstamos Totales", value: "14" },
        { label: "Tasa de Pago a Tiempo", value: "97%" },
        { label: "Total Pedido", value: "$2.4M" },
        { label: "Calificación PML", value: "A+" }
      ],
      lenderLabel: "Perfil del Prestamista",
      lenderStats: [
        { label: "Tratos Fondeados", value: "31" },
        { label: "Total de Capital Desplegado", value: "$4.1M" },
        { label: "Tiempo Prom. de Respuesta", value: "< 24hrs" },
        { label: "Calificación PML", value: "A+" }
      ]
    }
  },

  featuresGrid: {
    eyebrow: "Qué obtienes",
    title: "Todo para gestionar préstamos privados limpiamente.",
    items: [
      {
        label: "01 — PRESTATARIO",
        title: "Todos los préstamos en un solo lugar",
        desc: "Cada préstamo privado, cada propiedad, cada saldo — un solo panel. Se acabó el buscar entre correos y hojas de cálculo."
      },
      {
        label: "02 — PRESTATARIO",
        title: "Estados de cuenta de liquidación al instante",
        desc: "Genera una liquidación exacta al día en segundos. Envíala directo a la compañía de títulos. Sin esperar a tu prestamista."
      },
      {
        label: "03 — PRESTATARIO",
        title: "Generador de propuestas (Pitch Deck)",
        desc: "Llena los datos de tu trato dentro de PML y genera al instante una propuesta profesional para enviar a los prestamistas — detalles de la propiedad, solicitud, términos y finanzas formateados automáticamente."
      },
      {
        label: "04 — PRESTAMISTA",
        title: "Rastreo de pagos",
        desc: "Sabe exactamente quién pagó, cuánto y cuándo. Cada prestatario. Cada préstamo. Siempre al día."
      },
      {
        label: "05 — PRESTAMISTA",
        title: "Rastreo de intereses para contadores",
        desc: "División de capital vs interés en cada pago — limpio, exportable y listo para tu contador o CPA."
      },
      {
        label: "06 — AMBOS",
        title: "Mismos números, ambas partes",
        desc: "Prestatario y prestamista inician sesión y ven los mismos datos en vivo. Sin disputas. Sin sorpresas en el cierre. Nunca."
      }
    ]
  },

  dashboardSplit: {
    eyebrow: "Tablero",
    title: "Ambas partes ven la misma verdad.",
    desc1: "Prestatarios y prestamistas tienen un inicio de sesión privado con datos del préstamo en vivo. Lo que debes y lo que te deben — siempre sincronizado.",
    desc2: 'No más llamadas preguntando "¿cuál es mi saldo?". No más disputas en el cierre. Todos ven el mismo número.',
    mockLogo: "PML.ai",
    mockBadge: "● En vivo",
    mockCard1Label: "Liquidación total — Válida hasta el 31 de Ago",
    mockCard1Value: "$292,955.54",
    mockCard1Sub: "↓ $95.34/día después del 31 de Ago",
    mockCard2Label: "Capital",
    mockCard2Value: "$290,000",
    mockCard3Label: "Interés Acumulado",
    mockCard3Value: "$2,955.54",
  },

  profilesDirectory: {
    eyebrow: "Perfiles y Directorio",
    title1: "Tu reputacion ",
    title2: "te sigue.",
    desc: "Cada trato, cada pago, cada prestamo construye tu perfil PML. Los prestatarios encuentran prestamistas. Los prestamistas evaluan a los prestatarios. Ambas partes saben exactamente con quien estan tratando.",
    borrower: {
      badge: "Perfil del Prestatario",
      name: "Spencer Shadrach",
      location: "Memphis, TN · Inversor Inmobiliario",
      stat1Label: "Prestamos Totales",
      stat1Value: "14",
      stat2Label: "Tasa de Pago a Tiempo",
      stat2Value: "97%",
      stat3Label: "Calificacion PML",
      stat3Value: "A+"
    },
    lender: {
      badge: "Directorio de Prestamistas",
      title: "Encuentra un Prestamista",
      subtitle: "Busca prestamistas activos en prestamos privados",
      lender1Name: "NextGen Growth LLC",
      lender1Desc: "Memphis, TN · Hasta $500K · 10–13%",
      lender1Deals: "31 tratos",
      lender2Name: "Private Capital Group",
      lender2Desc: "Nashville, TN · Hasta $1M · 10–12%",
      lender2Deals: "18 tratos",
      lender3Name: "Préstamos Southland LLC",
      lender3Desc: "Birmingham, AL · Hasta $300K · 11–14%",
      lender3Deals: "9 ofertas"
    }
  },

  pmlCta: {
    title1: "Tus préstamos,",
    title2: "organizados.",
    brand: "PML",
    brandSuffix: " — PayMyLoan.ai",
    desc: "Únete a la lista de acceso anticipado. Sé de los primeros cuando lancemos."
  },
  pmlFooter: {
    by: "por PayMyLoan.ai",
    rights: "PML / PayMyLoan.ai — Préstamos Privados, Finalmente Organizados."
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
    cta: "Log in",
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
    title: "Be One of the First to Try It",
    subtitle:
      "Leave us your information to be among the first to open your account. We’ll let you know as soon as the platform is ready for you.",
    intentLabel: "What would you like an account for?",
    intents: [
      { value: "lender", label: "I will provide a loan", hint: "Lender" },
      { value: "borrower", label: "I want a loan", hint: "Borrower" },
    ],
    intentNote:
      "You won’t be charged anything now. We’re simply saving your place in line.",
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
    submitting: "Submitting your request…",
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

  loginPage: {
    title: "Log In",
    subtitle: "Enter your credentials to manage your loans.",
    cardTitle: "SECURE LOGIN",
    emailLabel: "Email address",
    emailPlaceholder: "email@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    submit: "SIGN IN",
    forgot: "I'VE FORGOTTEN MY PASSWORD",
    back: "BACK TO HOME",
  },

  pmlHero: {
    badge: "AI-Powered Loan Management",
    subtitle: "PML — Private Money Lender. PayMyLoan.ai. Both sides of the deal.",
    title1: "From pitch",
    title2: "to payoff.",
    title3: "One platform.",
    by: "by PayMyLoan.ai",
    desc: "The pitch. The loan request. The commitment. Payment processing. The payoff. All in one place — for borrowers and lenders alike.",
    cta1: "Get Early Access",
    cta2: "See how it works",
  },

  whoItHelps: {
    eyebrow: "Who It Helps",
    title1: "One platform.",
    title2: "Six problems solved.",
    lead: "PML takes the chaos out of private lending — giving borrowers clarity and lenders control, so every deal closes clean.",
    cards: [
      {
        role: "Borrower",
        icon: "🏗️",
        title: "From pitch to payoff in one place",
        points: [
          "All loans in one dashboard",
          "Generate pitches & commitment letters",
          "Automated payments — never miss again",
          "Instant payoffs & PML rating"
        ]
      },
      {
        role: "Lender",
        icon: "🏦",
        title: "Know who paid, what's owed, what's next",
        points: [
          "Payment tracking across all borrowers",
          "Vet borrowers before committing capital",
          "Generate commitment letters & payoffs",
          "Control visibility in the marketplace"
        ]
      },
      {
        role: "Bookkeeper",
        icon: "📒",
        title: "Clean records, zero chasing",
        points: [
          "Principal vs. interest split on every payment",
          "Every loan tied to a property",
          "Exportable records — no manual entry",
          "No more monthly emails asking for details"
        ]
      },
      {
        role: "CPA",
        icon: "🧾",
        title: "Year-end ready — one click",
        points: [
          "Interest income/expense clearly separated",
          "Every loan documented by property",
          "Full year report — exportable instantly",
          "No digging through emails for records"
        ]
      },
      {
        role: "Title Company",
        icon: "🏛️",
        title: "Payoffs before closing day — not after",
        points: [
          "Instant payoff statements sent directly",
          "Both parties confirmed on same number",
          "No last-minute scrambles at the table",
          "Clean closing every time"
        ]
      },
      {
        role: "Insurance Company",
        icon: "🛡️",
        title: "Mortgagee clause — accurate every time",
        points: [
          "Lender info pulled from PML profile",
          "Mortgagee clause always up to date",
          "No manual requests for lender details",
          "Every property, every loan, documented"
        ]
      }
    ],
    stats: [
      { value: "< 30s", label: "Payoff generated" },
      { value: "2", label: "Sides. One platform." },
      { value: "0", label: "Spreadsheets needed" },
      { value: "100%", label: "CPA-ready at year end" }
    ]
  },

  beforeAfter: {
    eyebrow: "Before vs After",
    title: "Two investors. Same business. Different tools.",
    before: {
      badge: "Without PML",
      icon: "😤",
      items: [
        "Borrower: no idea who to call to get a quick answer from the lender",
        "Borrower: loans scattered across 3 banks, 2 private lenders, and a spreadsheet",
        "Borrower: bookkeeper hounding you every month to explain which loan is which",
        "Lender: no idea who paid, how much, or when — until something goes wrong",
        "Lender: closing day scramble to calculate the payoff while title is waiting"
      ]
    },
    after: {
      badge: "With PML",
      icon: "😎",
      items: [
        "Borrower: all loans in one place — every balance, every payment, every property",
        "Borrower: send your pitch + commitment letter to a lender in minutes",
        "Borrower: payoff generated instantly — no waiting, no back-and-forth",
        "Lender: know exactly who paid, what amount, and when — in real time",
        "Lender: interest tracking and payment history handed directly to your bookkeeper"
      ]
    }
  },

  soundFamiliar: {
    eyebrow: "Sound familiar?",
    title: "Private money lending runs on chaos. It doesn't have to.",
    cards: [
      { role: "Borrower", icon: "📝", title: "“Building a pitch takes forever.”", desc: "Formatting a deal summary, loan request, and commitment letter for each lender is hours of manual work. PML generates all of it in minutes." },
      { role: "Borrower", icon: "🤝", title: "“The commitment letter is somewhere in my email.”", desc: "Commitment letters get buried in threads, unsigned, or lost. PML keeps every commitment tied to the loan from day one." },
      { role: "Borrower", icon: "💳", title: "“Payment processing is a mess.”", desc: "Manual wires, Zelle, checks — no consistent system. PML centralizes payment processing so every transaction is tracked and confirmed." },
      { role: "Lender", icon: "📋", title: "“Where's the borrower application?”", desc: "Lenders need a standardized application from every borrower before committing. PML gives borrowers a built-in application that feeds directly to the lender." },
      { role: "Lender", icon: "🔍", title: "“I need to verify who I'm lending to.”", desc: "Entity lookup, background check, credit history — lenders are putting up real capital and need to vet borrowers before signing. PML centralizes that due diligence in one place." },
      { role: "Lender", icon: "🏘️", title: "“I don't have consistent deal flow.”", desc: "Lenders with capital sitting idle need qualified borrowers to find them. PML's marketplace connects lenders with vetted deal flow automatically." },
      { role: "Lender", icon: "📊", title: "“My bookkeeper needs the interest breakdown — again.”", desc: "PML tracks principal vs. interest on every payment and exports clean reports your bookkeeper can actually use." },
      { role: "Borrower", icon: "💸", title: "“I forgot to make the payment.”", desc: "Manual wires get missed. Late payments damage lender relationships and can trigger default clauses. PML automates payments so nothing slips." }
    ],
    solution: {
      icon: "✅",
      title: "PML fixes both sides.",
      desc: "One platform. Borrowers get clarity, speed, and organization. Lenders get payment tracking, interest records, and instant payoffs. Built for private money."
    }
  },

  liveActivity: {
    eyebrow: "Live Activity",
    title1: "The private money market,",
    title2: "in real time.",
    desc: "Every loan request, every active deal, every closed transaction — tracked on PML.",
    stats: {
      requested: {
        label: "Loans Requested",
        value: "47",
        desc: "Active loan requests in marketplace",
        live: "LIVE"
      },
      current: {
        label: "Loans Current",
        value: "312",
        desc: "Loans actively being serviced",
        metric: "$48.2M total outstanding"
      },
      closed: {
        label: "Loans Closed",
        value: "1,204",
        desc: "Total deals completed on PML",
        metric: "$187.4M total funded ✓"
      }
    },
    map: {
      title: "Deal Activity — United States",
      legendRequested: "Requested",
      legendCurrent: "Current",
      legendClosed: "Closed"
    }
  },

  comingSoon: {
    eyebrow: "Coming Soon",
    title1: "The Private Money ",
    title2: "Marketplace.",
    desc: "Where borrowers with deals connect directly with lenders who have capital ready to deploy. Inside PML, borrowers can generate a pitch deck, create a commitment letter, and get funded — all in one place.",
    card1: {
      eyebrow: "For Lenders",
      title: "Browse Borrowers Looking for Capital",
      desc: "See a live feed of borrowers actively seeking funds. View each borrower's PML profile — loans history, payment track record, total borrowed — before committing a dollar.",
      points: [
        "Browse active loan requests with full deal details",
        "View each borrower's PML Rating + full profile before committing",
        "Send term sheets directly inside the platform",
        "Build your lender profile — deals funded, capital deployed, response time, rating"
      ]
    },
    card2: {
      eyebrow: "PML Profiles",
      title: "Both Sides Build Credibility.",
      desc: "Borrowers and lenders each earn a public PML profile based on their real track record on the platform.",
      borrowerLabel: "Borrower Profile",
      borrowerStats: [
        { label: "Total Loans", value: "14" },
        { label: "On-Time Payment Rate", value: "97%" },
        { label: "Total Borrowed", value: "$2.4M" },
        { label: "PML Borrower Rating", value: "A+" }
      ],
      lenderLabel: "Lender Profile",
      lenderStats: [
        { label: "Deals Funded", value: "31" },
        { label: "Total Capital Deployed", value: "$4.1M" },
        { label: "Avg. Response Time", value: "< 24hrs" },
        { label: "PML Lender Rating", value: "A+" }
      ]
    }
  },
  featuresGrid: {
    eyebrow: "What you get",
    title: "Everything to run private loans cleanly.",
    items: [
      {
        label: "01 — BORROWER",
        title: "All Loans in One Place",
        desc: "Every private loan, every property, every balance — one dashboard. No more hunting across emails and spreadsheets."
      },
      {
        label: "02 — BORROWER",
        title: "Instant Payoff Statements",
        desc: "Generate a payoff accurate to the day in seconds. Send it straight to title. No waiting on your lender."
      },
      {
        label: "03 — BORROWER",
        title: "Pitch Deck Generator",
        desc: "Fill out your deal inside PML and instantly generate a professional pitch to send to lenders — property details, loan request, terms, and financials all formatted automatically."
      },
      {
        label: "04 — LENDER",
        title: "Payment Tracking",
        desc: "Know exactly who paid, how much, and when. Every borrower. Every loan. Always current."
      },
      {
        label: "05 — LENDER",
        title: "Interest Tracking for Bookkeepers",
        desc: "Principal vs. interest split on every payment — clean, exportable, and ready for your bookkeeper or CPA."
      },
      {
        label: "06 — BOTH",
        title: "Same Numbers, Both Sides",
        desc: "Borrower and lender log in and see the same live data. No disputes. No surprises at closing. Ever."
      }
    ]
  },

  dashboardSplit: {
    eyebrow: "Dashboard",
    title: "Both sides see the same truth.",
    desc1: "Borrowers and lenders each get a private login with live loan data. What you owe, what you're owed — always in sync.",
    desc2: 'No more calls asking "what\'s my balance?" No more disputes at closing. Everyone looks at the same number.',
    mockLogo: "PML.ai",
    mockBadge: "● Live",
    mockCard1Label: "Total Payoff — Good Through Aug 31",
    mockCard1Value: "$292,955.54",
    mockCard1Sub: "↓ $95.34/day after Aug 31",
    mockCard2Label: "Principal",
    mockCard2Value: "$290,000",
    mockCard3Label: "Accrued Interest",
    mockCard3Value: "$2,955.54",
  },

  profilesDirectory: {
    eyebrow: "Profiles & Directory",
    title1: "Your reputation ",
    title2: "follows you.",
    desc: "Every deal, every payment, every loan builds your PML profile. Borrowers find lenders. Lenders vet borrowers. Both sides know exactly who they're dealing with.",
    borrower: {
      badge: "Borrower Profile",
      name: "Spencer Shadrach",
      location: "Memphis, TN · Real Estate Investor",
      stat1Label: "Total Loans",
      stat1Value: "14",
      stat2Label: "On-Time Payment Rate",
      stat2Value: "97%",
      stat3Label: "PML Borrower Rating",
      stat3Value: "A+"
    },
    lender: {
      badge: "Lender Directory",
      title: "Find a Lender",
      subtitle: "Search lenders actively doing private loans",
      lender1Name: "NextGen Growth LLC",
      lender1Desc: "Memphis, TN · Up to $500K · 10–13%",
      lender1Deals: "31 deals",
      lender2Name: "Private Capital Group",
      lender2Desc: "Nashville, TN · Up to $1M · 10–12%",
      lender2Deals: "18 deals",
      lender3Name: "Southland Lending LLC",
      lender3Desc: "Birmingham, AL · Up to $300K · 11–14%",
      lender3Deals: "9 deals"
    }
  },

  pmlCta: {
    title1: "Your loans,",
    title2: "organized.",
    brand: "PML",
    brandSuffix: " — PayMyLoan.ai",
    desc: "Join the early access list. Be first when we launch."
  },
  pmlFooter: {
    by: "by PayMyLoan.ai",
    rights: "PML / PayMyLoan.ai — Private Lending, Finally Organized."
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
