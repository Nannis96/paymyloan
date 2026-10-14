export const shared = {
  meta: {
    title: "PayMyLoan.ai — Servicing de préstamos privados",
    description: "Préstamos privados con garantía inmobiliaria administrados en un solo lugar...",
  },

  uiComponents: {
    status: {
      active: "Activo",
      archived: "Archivado",
      pending: "Pendiente",
      paid: "Pagado",
      late: "Atrasado",
      new: "Nuevo"
    },
    dealCard: {
      loanRequest: "Monto",
      arv: "ARV",
      maxRate: "Tasa Máx",
      rehab: "Rehab",
      ltv: "LTV",
      offers: "ofertas",
      offer: "oferta",
      makeOffer: "Hacer oferta",
      counterOffer: "Contraoferta"
    },
    map: {
      loading: "Cargando mapa...",
      errorTitle: "No se pudo cargar el mapa.",
      reload: "Recargar pagina"
    }
  },

  competitive: {
    hero: {
      label: "Posicionamiento Competitivo",
      title1: "$80 mil millones al año.",
      title2: "Aún operando en hojas de cálculo.",
      sub: "En 15,000 cierres inmobiliarios, ni un solo prestamista privado tenía software diseñado para él. Hojas de cálculo. Pagos manuales. Sin verificación. Sin ACH. PayMyLoan arregla eso."
    },
    values: [
      { num: "$80B+", label: "Originaciones de préstamos privados al año", desc: "Más de 300,000 préstamos inmobiliarios privados cierran cada año en EE. UU. — construido por un prestatario que ha estado en ambos lados." },
      { num: "10,000+", label: "Prestamistas activos sin software", desc: "Más de 10,000 prestamistas de dinero privado activos en EE. UU. Ninguno tenía un sistema construido para ellos. PML es ese sistema.", highlight: true },
      { num: "100%", label: "Gratis para prestamistas — siempre", desc: "Sin tarifa de plataforma, sin cargo mensual, sin porcentaje de retornos. Los prestamistas no pagan nada." }
    ],
    pain: {
      title: "El problema que resuelve PML",
      before: "Antes de PayMyLoan",
      after: "Con PayMyLoan",
      rows: [
        { b: "Rastrear préstamos en una hoja de cálculo — sin alertas, sin automatización", a: "Panel de préstamos en vivo — cada trato, cada pago, cada estado en un solo lugar" },
        { b: "Calcular liquidaciones (payoffs) manualmente cada vez — propenso a errores, consume tiempo", a: "Cartas de liquidación a un clic con cálculo por día automático a la tasa original del contrato" },
        { b: "Perseguir a los prestatarios para los pagos — sin recordatorios automáticos", a: "Cobros ACH el día 1 — automatizado, cumple con Nacha, con rastro de auditoría completo" },
        { b: "Sin formato de trato estándar — cada prestatario envía información diferente", a: "Envío de tratos estandarizado — chequeo LTV, autocompletado ARV de RentCast, paquete de evaluación completo" },
        { b: "Sin verificación — préstale a cualquiera, averigua después", a: "Score PML, historial de pagos, verificación de antecedentes + crédito, verificación de entidad" },
        { b: "Sin rastro de mensajes — tratos cerrados por texto y correo", a: "Mensajería atada al trato — hilo de conversación completo, intercambio de archivos, bloqueo de información de contacto" },
        { b: "Documentos de cierre en hilos de correo — imposibles de encontrar después", a: "Subida tokenizada de la notaría — documentos archivados en la carpeta del trato automáticamente al cierre" },
        { b: "Encontrar tratos solo de boca en boca", a: "Mercado de tratos — navega por tratos de prestatarios verificados que coincidan con tus criterios" }
      ]
    },
    comparison: {
      title: "Cómo se compara PayMyLoan",
      cols: { pml: "PayMyLoan", alt1: "LenderKit / Peer Lending", alt2: "CRM Genérico", alt3: "Hoja de Cálculo" },
      rows: [
        { label: "Construido para préstamos privados", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "Gratis para prestamistas", pml: "yes", c1: "no", c2: "no", c3: "yes" },
        { label: "Pagos automatizados ACH", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "Cartas de liquidación a un clic", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Mercado de prestatarios / flujo de tratos", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "Verificación de prestatarios (score + antecedentes)", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Barreras de seguridad 2FA (banco, login)", pml: "yes", c1: "no", c2: "partial", c3: "no" },
        { label: "Mercado institucional de refi (3.0)", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Automatización subida docs por notaría", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Compatible con móviles", pml: "yes", c1: "partial", c2: "partial", c3: "no" }
      ]
    },
    mantra: {
      q1: "\"La mayoría de los inversores quieren un retorno SOBRE su dinero. Los mejores quieren el retorno DE su dinero.\"",
      main1: "Deja de administrar tu negocio de préstamos ",
      main2: "en una hoja de cálculo.",
      q2: "\"Construido para Main Street. Por fin.\""
    },
    cta: {
      lender: "Soy prestamista — comenzar gratis",
      borrower: "Soy prestatario"
    }
  },

  founderStory: {
    hero: {
      label: "La historia detrás de PayMyLoan.ai",
      title: "Construido por un prestatario que se cansó de ver a los prestamistas batallar.",
      sub: "Después de pedir prestado casi $100 millones a prestamistas privados durante una década en bienes raíces, noté algo. Todos y cada uno de ellos administraban su negocio de la misma forma rota. Así que construí lo que necesitaban — desde el lado del prestatario en la mesa."
    },
    sections: { s1: "Dónde empezó esto", s2: "Cómo lo construimos", s3: "Qué construimos" },
    p1: "He estado pidiendo dinero privado para tratos inmobiliarios por más de diez años. Decenas de millones de dólares en cientos de transacciones. En algún momento el número se acercó a los cien millones de dólares prestados por prestamistas privados en Tennessee y más allá.",
    p2: "Y en todo ese tiempo, a través de todos esos tratos, nunca trabajé con un solo prestamista no institucional que tuviera algún tipo de sistema para administrar su negocio de préstamos.",
    painList: {
      title: "Cómo se veía realmente \"administrar un negocio de préstamos privados\"",
      items: [
        "Hojas de cálculo en Excel para rastrear préstamos, pagos y saldos",
        "Revisar una cuenta bancaria para ver si un prestatario pagó este mes",
        "Cadenas de correo entrecortadas en lugar de hojas de términos reales",
        "Correos de ida y vuelta para recolectar el seguro antes del cierre",
        "Sin una forma estándar de verificar a un nuevo prestatario — solo referencias e intuición",
        "Prestatarios que no tenían idea de cómo presentar un trato en un formato claro",
        "Sin pagos automáticos configurados al cierre",
        "Sin correos automatizados cuando los pagos vencían, se hacían o se atrasaban",
        "Escarbar en documentos de cierre para recordar los términos originales para una liquidación",
        "Cartas de compromiso enviadas tarde — o nunca"
      ]
    },
    p3Pre: "Comencé a trabajar con prestamistas institucionales — compañías de hard money, fondos regionales — y la diferencia era del día a la noche. Tenían sistemas. Tenían software. Tenían listas de verificación, formatos de trato estandarizados, rastreo de pagos automatizado. ",
    p3Bold: "Habían construido infraestructura alrededor de sus operaciones de préstamo.",
    p4: "Main Street no había hecho eso. Nadie estaba ayudando al prestamista privado cotidiano a administrar su negocio de la forma en que los prestamistas institucionales administran el suyo.",
    quote1: {
      text: "\"Le pregunté a mis abogados — de 15,000 cierres con prestamistas privados, ¿acaso uno solo de ellos tenía algún sistema, proceso o software para administrar su operación de préstamos?\"",
      cite: "— Spencer Shadrach, Fundador"
    },
    p5: "La respuesta fue no. Ni uno solo.",
    p6: "Esa era la brecha. Y yo estaba en una posición única para llenarla — porque había visto ambos lados. Sabía lo que los prestatarios necesitaban para comunicarse claramente. Sabía lo que los prestamistas necesitaban para sentirse seguros y mantenerse organizados. Y tenía las relaciones, el historial de tratos y el equipo para construir la solución.",
    p7: "Comenzamos con lo básico — las cosas que causaban la mayor fricción diaria en ambos lados.",
    milestones: [
      { title: "El problema de la carta de compromiso", desc: "Prestatario y prestamista acuerdan los términos. ¿Y luego? Usualmente un correo entrecortado, un PDF hecho en Word, o nada en absoluto. Lo automatizamos. Oferta aceptada — carta de compromiso generada y enviada a todas las partes en segundos." },
      { title: "El problema del rastreo de pagos", desc: "Nadie debería revisar su cuenta bancaria para ver si le pagaron. Construimos un rastreo de pagos ACH que confirma el pago en el momento en que se procesa — con notificaciones automáticas a ambos lados. No más incertidumbre." },
      { title: "El problema de la liquidación (payoff)", desc: "El prestatario llama, dice que está listo para vender. El prestamista busca el pagaré original, encuentra el documento de cierre, hace las matemáticas a mano, envía un número por correo. Toma horas. Lo redujimos a segundos — liquidación exacta al centavo, PDF fechado, enviado directamente a la notaría." },
      { title: "El problema de presentar el trato (pitch)", desc: "Los prestatarios reconocen un buen trato cuando lo ven. Plasmar ese conocimiento en papel — en un formato que un prestamista pueda evaluar en minutos — es una habilidad diferente. Construimos el Analizador de Tratos. Ingresa la dirección, y la plataforma extrae detalles de la propiedad, comparables y datos de renta automáticamente. Los prestatarios pueden analizar y presentar un trato en minutos, en un formato estandarizado que todo prestamista puede leer de la misma forma." },
      { title: "El problema del mercado", desc: "Todo prestatario quiere más prestamistas. Todo prestamista quiere más tratos de calidad. Así que construimos el Mercado de Fondeo — un lugar donde los prestatarios pueden publicar tratos verificados y los prestamistas de todo el país pueden encontrarlos y fondearlos. Préstamos privados sin fronteras." },
      { title: "El problema de la verificación", desc: "He pedido prestado casi $100 millones a prestamistas privados. La mayoría no tenía idea. Sin verificación de antecedentes. Sin historial. Sin revisión de crédito. Solo una referencia y un apretón de manos. Construimos el Score PML para Prestatarios — un puntaje de reputación basado en historial de pagos real, historial de tratos, antecedentes y reseñas de prestamistas. Un prestamista en California ahora puede fondear a un prestatario en Tennessee y saber exactamente con quién está tratando." }
    ],
    quote2: {
      text: "\"Lo que se necesitaba era un prestatario que pudiera verlo desde ambas perspectivas — contratar a un equipo de desarrolladores y construir el software que los prestamistas de dinero privado nunca construyeron para sí mismos.\"",
      cite: "— Spencer Shadrach, Fundador"
    },
    solutionList: [
      "Deja de administrar tu negocio de préstamos en hojas de cálculo",
      "Deja de perseguir cheques de prestatarios y rezar para que pasen",
      "Deja de escarbar en documentos de cierre para recordar términos",
      "Verifica a cada prestatario — crédito, antecedentes, historial — antes de fondear",
      "Evalúa cada trato en un formato estandarizado construido para decisiones",
      "Pagos automáticos — ACH programado al cierre, rastreado en tiempo real",
      "Cartas de compromiso generadas y enviadas en segundos",
      "Liquidaciones calculadas al centavo con un solo clic",
      "Un mercado donde el capital nuevo te encuentra a ti",
      "Gratis para prestamistas. Siempre."
    ],
    closing1: "Así es como se ven los préstamos privados cuando son construidos por alguien que ha estado en ambos lados de la mesa — y se rehusó a aceptar que \"hojas de cálculo e intuición\" era suficiente.",
    closing2: "PayMyLoan.ai. Construido para Main Street. Por fin.",
    ctaBand: {
      title: "¿Listo para administrar tu negocio de préstamos como un negocio real?",
      sub: "Gratis para prestamistas. Siempre. Crea tu cuenta y explora tratos en vivo en minutos.",
      btnLight: "Ver la demo primero",
      btnPurple: "Crear tu cuenta de prestamista"
    }
  },

  contractDetail: { title: "Detalle del Contrato", subtitle: "Información completa, partes involucradas y tabla de amortización.", parties: "Partes Involucradas", financials: "Términos Financieros", breakdownTitle: "Historial de Pagos", exportReport: "Exportar Reporte (CPA Ready)", labels: { lender: "Prestamista", borrower: "Prestatario", amount: "Monto Total", term: "Plazo", interest: "Interés", loanType: "Tipo de Préstamo", downPayment: "Enganche / Depósito", rent: "Pago Mensual" }, table: { date: "Fecha", status: "Estado", totalOwed: "Total", principal: "Capital", interest: "Interés", escrow: "Escrow", balance: "Saldo Restante" }, paymentStatus: { paid: "Pagado", pending: "Pendiente", late: "Atrasado", partial: "Parcial" }, pagination: { prev: "Anterior", next: "Siguiente", page: "Página", of: "de" }, back: "Volver a contratos", loading: "Cargando detalles del contrato...", errorNotFound: "No se encontró el contrato.", errorAuth: "No tienes permisos para ver este contrato.", errorFetch: "Error al cargar el contrato", errorNetwork: "Error de red desconocido", months: "meses", noTerms: "Sin términos", emptyPayments: "No hay pagos registrados para este contrato.", generateReportAlert: "Generando reporte CSV/PDF para el CPA...", lenderFallback: "Empresa Prestamista", borrowerFallback: "Prestatario (Deudor)", },

  errors: { code500: "Error Interno", title500: "¡Ups! Algo salió mal", message500: "Parece que algo salió mal de nuestro lado. Estamos trabajando en mejorar la experiencia de nuestros usuarios. Por favor, intenta de nuevo.", tryAgain: "Intentar de nuevo", code404: "Error 404", title404: "Página no encontrada", message404: "No pudimos encontrar la página que buscas. Es posible que el enlace sea incorrecto o la página ya no exista.", goHome: "Volver al inicio", goBack: "Retroceder" },

  marketplace: { 
    back: "Volver al panel", 
    title: "Explorar Tratos", 
    subtitle: "Descubre solicitudes de prestamo publicas buscando fondeo en tu area.", 
    filters: { all: "Todos", bridge: "Puente", slowFlip: "Slow flip", new: "Nuevos" },
    mapView: "Vista de mapa",
    listView: "Vista de lista",
    table: { address: "Propiedad (Ciudad, Estado)", amount: "Monto Solicitado", term: "Plazo", borrowerScore: "Calificacion PML", action: "Ver Trato", closingDate: "Cierre (Est.)" }, 
    empty: "No hay tratos publicos disponibles en este momento.", 
    loading: "Cargando tratos...", 
    errorAuth: "Sesion no valida o no iniciada.", 
    errorFetch: "Error al obtener tratos", 
    errorNetwork: "Error de red desconocido", 
    dealDetails: { title: "Detalle del Trato", back: "Volver a explorar", overview: "Resumen del Trato", propertyDetails: "Detalles de la Propiedad", borrowerProfile: "Perfil del Prestatario", fundDeal: "Contactar / Enviar Oferta", arv: "Valor Estimado (ARV)", rehab: "Presupuesto de Remodelacion", aiComps: "Comparables (RentCast API)", verifiedInvestor: "Inversor Verificado", identityConfirmed: "Identidad confirmada", pmlRating: "Calificacion PML", history: "Historial", fundingVerification: "Verificacion de Fondeo", completed: "Completada", dealsCompleted: "tratos completados", months: "meses", postedAgo: "Publicado hace {days} dias", loanTypeStr: "Prestamo puente", identityShielded: "Identidad oculta", shieldNote: "Rostro, nombre y entidad estan ocultos hasta que envies una oferta y el prestatario acepte.", score: "Puntaje", goodStanding: "Al Corriente", memberSince: "Miembro desde", identityVerified: "Identidad verificada", stats: { propsOwned: "Propiedades", activePurchases: "Compras/Ano", currentLoans: "Prestamos PML", totalBorrowed: "Total Pedido PML", onTime: "Pagos a Tiempo", dealsClosed: "Tratos Cerrados PML" }, dealDocs: "Documentos del trato:", docPurchase: "Contrato de compra", docTitleMiss: "Falta info de titulo", docInsMiss: "Falta seguro", unlockBar: "Envia una oferta para desbloquear la identidad completa.", unlockSub: "Nombre, rostro, entidad y contacto visibles despues de que el prestatario acepte.", requestDocs: "Solicitar docs", dealNumbers: "Numeros del Trato", loanRequested: "Monto Solicitado", rateTerm: "Tasa / Plazo", ltvLabel: "Loan-to-Value", ltvCap: "dentro del limite de 75%", purchasePrice: "Precio de Compra", rehabBudget: "Ppto. Remodelacion", allInCost: "Costo Total", profitArv: "Ganancia al ARV", titleCompany: "Compania de Titulos", insuranceCo: "Aseguradora", mapTitle: "Ubicacion + Comparables", mapSubj: "Propiedad", mapSales: "Comps Venta", mapRental: "Comps Renta", salesComps: "Comps Venta", rentalComps: "Comps Renta", sold: "Vendido", activeListing: "Listado activo", leased: "Rentado", submitOffer: "Enviar una Oferta", formLoanAmount: "Monto del Prestamo", formRate: "Tasa de Interes (%)", formTerm: "Plazo", formPoints: "Puntos", formDraw: "Estructura de Retiros", formDrawFull: "Todo al cierre", formDraws: "En partes", formMsg: "Mensaje al prestatario (opcional)", formMsgPh: "Presentate o anota alguna condicion...", calcMoInt: "Interes mensual (IO)", calcTotalInt: "Interes total ganado", btnSubmit: "Enviar oferta", btnDraft: "Guardar borrador", offerNote: "Enviar una oferta desbloquea la identidad completa del prestatario y abre el canal de mensajes para este trato. El prestatario no vera tu informacion de contacto hasta que acepte." } 
  },

  affiliates: {
    title: "Programa de afiliados",
    subtitle: "Gana el 25% de todo lo que PML recauda de los prestatarios que refieras — al cierre y cada mes.",
    metrics: {
      totalEarned: "Total ganado",
      earnedSub: "+$250 este mes",
      activeRef: "Referidos activos",
      refSub: "2 tratos fondeados",
      monthlyRes: "Residual mensual",
      resSub: "Recurrente cada mes",
      nextPayout: "Próximo pago",
      payoutSub: "$91.16 pendiente"
    },
    link: {
      title: "Tu enlace de referido",
      sub: "Comparte este enlace. Cualquier persona que se registre y publique un trato te genera comisión — sin límite.",
      copyBtn: "Copiar enlace",
      copied: "¡Copiado!",
      hint: "Código promo: {code} — el prestatario obtiene su primer mes gratis, tú ganas 25% a partir del mes 2."
    },
    how: {
      title: "Cómo funciona",
      sub: "Proceso simple de tres pasos. Sin necesidad de aplicación.",
      steps: [
        { title: "Comparte tu enlace", desc: "Envíalo a inversores inmobiliarios, comunidades Sub2, grupos de Slow Flip o cualquiera que busque dinero privado." },
        { title: "Publican un trato", desc: "Cuando se registran con tu enlace y fondean un préstamo, ganas $250 al cierre por cada $100K prestados." },
        { title: "Cobra mensualmente", desc: "Ganas $45.58/mes residual por cada $100K durante la vida del préstamo. Se paga el día 1 de cada mes." }
      ]
    },
    table: {
      title: "Desglose de ganancias",
      sub: "En un préstamo puente de $100K — tu 25% de las tarifas de PML.",
      col1: "Tipo de tarifa", col2: "PML recauda", col3: "Tu cuota (25%)", col4: "Cuándo se paga",
      rows: [
        ["Punto de originación (1%)", "$1,000", "$250.00", "Al cierre"],
        ["Tarifa mensual de servicing", "$83.33 / mes", "$20.83 / mes", "Mensual"],
        ["Suscripción de membresía", "$99.00 / mes", "$24.75 / mes", "Mensual"]
      ],
      totalRow: "Total residual mensual",
      totalYear: "Total estimado 12 meses por $100K"
    }
  },

  affiliateDashboard: {
    title: "Panel de Afiliado",
    subtitle: "Rastrea tus referidos, comisiones y pagos",
    refBadge: {
      label: "Tu código de referido",
      linkFormat: "paymyloan.ai/?ref="
    },
    stats: {
      earned: { label: "Total ganado", trend: "+{amount} este mes" },
      pending: { label: "Pago pendiente", sub: "Se paga el {date}" },
      active: { label: "Referidos activos", sub: "Ganando mensual" },
      closed: { label: "Tratos cerrados", sub: "Historico" }
    },
    chart: {
      title: "Ganancias mensuales",
      sub: "Comisiones de suscripciones + interes compartido + tarifas de cierre",
      periods: ["3M", "6M", "1A"]
    },
    table: {
      title: "Mis referidos",
      filters: ["Todos", "Activos", "Cerrados", "Pendientes"],
      cols: ["Prestatario", "Propiedad", "Préstamo", "Estado", "Tarifa cierre", "Mensual"],
      status: { active: "Activo", closed: "Liquidado", pending: "Cierre pendiente" },
      ended: "Finalizado"
    },
    payouts: {
      nextTitle: "Próximo pago — {date}",
      monthly: "Comisiones mensuales",
      closing: "Tarifa de cierre ({name})",
      bonus: "Bono (5+ referidos activos)",
      total: "Pago total",
      accountTitle: "Cuenta de pago",
      scheduleLabel: "Calendario de pagos",
      scheduleValue: "Día 1 de cada mes",
      minLabel: "Pago mínimo",
      allTimeLabel: "Pagado históricamente",
      edit: "Editar"
    },
    shareTools: {
      title: "Herramientas para compartir",
      sub: "Usa estos enlaces para referir prestatarios a PayMyLoan.ai",
      items: [
        { label: "Enlace de referido", val: "paymyloan.ai/?ref={code}" },
        { label: "Página para prestatarios", val: "paymyloan.ai/borrowers?ref={code}" },
        { label: "Publicar trato directo", val: "paymyloan.ai/post?ref={code}" },
        { label: "Código de referido", val: "{code}" }
      ],
      copyBtn: "Copiar enlace",
      copyCodeBtn: "Copiar código"
    },
    sidebar: {
      portalName: "Portal de Afiliados",
      dashboard: "Tablero",
      earnings: "Historial de Ganancias",
      referrals: "Mis Referidos",
      shareTools: "Compartir",
      account: "Cuenta",
      payouts: "Pagos"
    },
    comingSoon: "Esta sección estará disponible próximamente."
  },

  profile: { title: "Perfil PML", borrower: "Prestatario", lender: "Prestamista", stats: { totalLoans: "Préstamos Totales", onTime: "Tasa de Pago a Tiempo", totalVolume: "Volumen Total", rating: "Calificación PML" }, history: "Historial de Proyectos", emptyHistory: "No hay proyectos completados aún.", mapHistory: "Mapear historial aquí..." },

  inviteModal: { title: "Invitar al Portal", subtitle: "Comparte este enlace para un trato directo. Los tratos privados (sin marketplace) tienen $0 de tarifa de conexión.", copyLink: "Copiar enlace", linkCopied: "¡Copiado!", emailLabel: "O envía una invitación por correo:", emailPh: "correo@ejemplo.com", sendBtn: "Enviar Invitación", sending: "Enviando...", successMsg: "Invitación enviada exitosamente.", close: "Cerrar" },

  documentVault: { title: "Bóveda de Documentos", subtitle: "Sube, revisa o descarga documentos legales asociados a este trato.", uploadBtn: "Subir Documento", uploading: "Subiendo...", empty: "No hay documentos en esta bóveda.", table: { name: "Nombre del Documento", date: "Fecha de Subida", status: "Estado", action: "Acción" }, actions: { download: "Descargar", sign: "Firmar" }, status: { signed: "Firmado", pending: "Firma Pendiente", file: "Archivo" } },

  settings: {
    title: "Configuración",
    subtitle: "Gestiona tu cuenta, preferencias y configuraciones de producto.",
    banner: "Permite que cualquier miembro del equipo vea préstamos, pagos y actividad.",
    inviteBtn: "Invitar miembros →",
    sections: {
      personal: "Configuración personal",
      account: "Configuración de cuenta",
      product: "Configuración de producto"
    },
    cards: {
      personalDetails: { title: "Detalles personales", desc: "Información de contacto, contraseña, métodos de autenticación y sesiones activas." },
      communication: { title: "Preferencias de comunicación", desc: "Personaliza los correos, SMS y notificaciones push que recibes." },
      developers: { title: "Desarrolladores", desc: "Claves API, endpoints de webhooks y configuraciones de integración." },
      businessProfile: { title: "Perfil del negocio", desc: "Detalles de la cuenta, tipo de entidad, información pública y dominios." },
      banking: { title: "Bancos y pagos", desc: "Cuentas bancarias, configuración ACH, instrucciones para transferencias." },
      team: { title: "Equipo y seguridad", desc: "Miembros del equipo, roles, seguridad de la cuenta y recursos compartidos." },
      notifications: { title: "Notificaciones", desc: "Gestiona quién en tu equipo recibe correos de pagos, liquidaciones y retrasos." },
      billing: { title: "Suscripción y tarifas", desc: "Tu plan actual, ciclo de facturación, códigos promocionales y desglose de comisiones." },
      affiliate: { title: "Programa de afiliados", desc: "Tu enlace de referido, ganancias, historial de pagos y panel de afiliado." },
      compliance: { title: "Cumplimiento y documentos", desc: "IDs subidos, documentos LLC, contratos firmados y exportaciones heredadas." },
      features: { title: "Funciones de la cuenta", desc: "Administra las funciones de tu cuenta, vistas previas y configuraciones beta." },
      perks: { title: "Beneficios", desc: "Descuentos y herramientas de socios disponibles para miembros de PayMyLoan.ai." },
      bridgeLoans: { title: "Préstamos puente", desc: "Términos por defecto, reglas de comisiones de originación y preferencias de liquidación." },
      slowFlip: { title: "Slow flip / Financiamiento", desc: "Configuraciones de amortización, preferencias de estados PITI, escrow y cobros." },
      wireSecurity: { title: "Seguridad de transferencias", desc: "Administra tu cuenta receptora, verificación telefónica y configuraciones de fraude." },
      reporting: { title: "Reportes", desc: "Reportes programados, exportaciones de datos y analíticas de pagos." },
      payments: { title: "Pagos y ACH", desc: "Métodos de pago, procesamiento ACH, moneda y configuración de checkout." },
      dealMap: { title: "Mapa de tratos y descubrimiento", desc: "Duración de ventana privada, mapa vs lista y configuraciones de visibilidad de tratos." }
    },
    footer: { feedback: "Enviar comentarios", shortcuts: "Atajos de teclado", privacy: "Aviso de privacidad", terms: "Términos de servicio" }
  },

  billing: { bannerTitle: "Prueba Gratuita", bannerText: "Te quedan 3 días de tu prueba gratuita de 7 días.", bannerCta: "Activar Suscripción", title: "Suscripción Mensual", subtitle: "Para continuar usando PayMyLoan.ai como prestatario, activa tu suscripción de $9/mes.", planName: "Plan Prestatario Activo", planPrice: "$9.00 / mes", cardLabel: "Información de Tarjeta (Stripe)", payBtn: "Suscribirse por $9/mes", processing: "Procesando...", secureNote: "Pagos procesados de forma segura por Stripe. Puedes cancelar en cualquier momento." },

  notifications: { title: "Notificaciones", empty: "No tienes notificaciones nuevas.", markRead: "Marcar todas como leídas" },
};
