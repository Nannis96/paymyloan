export const borrower = {
  dashboardBorrower: {
    title: "Borrower Dashboard",
    subtitle: "Overview of your loans and deals.",
    metrics: { totalOwed: "Total Owed", nextDue: "Next Due", properties: "Properties", pmlRating: "PML Rating" },
    tabs: { needsFunding: "Needs Funding", approved: "Approved", funded: "Funded", completed: "Completed", paidOff: "Paid Off" },
    summaryCards: {
      entity: {
        title: "Entity Summary",
        name: "Entity Name",
        type: "Entity Type",
        ein: "EIN",
        state: "State of Formation",
        unverified: "Unverified entity"
      },
      businessScore: {
        title: "Business Score",
        deals: "Deals closed",
        onTime: "On-time payments",
        volume: "Total borrowed"
      },
      creditScore: {
        title: "Credit Score",
        score: "Score",
        status: "Status",
        pending: "Pending"
      }
    },
    widgets: {
      education: {
        title: "Education and Training",
        sub: "Learn best practices and strategies."
      },
      refi: {
        title: "Ready to refinance?",
        sub: "Get a quote in minutes."
      },
      insurance: {
        title: "Need insurance?",
        sub: "Get an instant quote."
      }
    }
  },

  feeAgreement: {
    docType: "Acuerdo de Tarifas del Prestatario",
    title: "Acuerdo de Tarifas del Prestatario",
    subtitle: "Este acuerdo se celebra al momento de publicar el trato en PayMyLoan.ai. No se deben tarifas al firmar. Todas las tarifas listadas se deben unicamente bajo los eventos descritos a continuacion. Este documento autoriza a PayMyLoan.ai a cobrar las tarifas aplicables al cierre mediante el estado de liquidacion.",
    sections: { borrower: "Prestatario", platformFees: "Tarifas de la plataforma", auth: "Autorizacion", ack: "Reconocimientos del prestatario" },
    borrower: { entity: "Nombre de la entidad", sig: "Firmante", address: "Direccion de la propiedad", date: "Fecha del acuerdo", dealId: "ID del trato" },
    platformFees: {
      desc1: "Las siguientes tarifas aplican a los prestatarios que usan PayMyLoan.ai. Todas las tarifas se deben al ocurrir el evento descrito — no al momento de firmar este acuerdo.",
      desc2Pre: "Estas tarifas son cobradas por PayMyLoan.ai y son ",
      desc2Bold: "independientes de cualquier tarifa que cobre el prestamista.",
      desc2Post: " Los prestamistas en PML conocen nuestra tarifa de plataforma y la consideran en los terminos de su oferta.",
      table: { fee: "Tarifa", amount: "Monto", when: "Cuando se debe" },
      items: [
        { name: "Suscripcion mensual", amt: "$99/mes", when: "Mensual, iniciando al publicar el trato. Exenta si el prestatario tiene un codigo promocional valido o enlace de referido." },
        { name: "Tarifa de verificacion", amt: "$99 (unica vez)", when: "Cuando un prestamista solicita verificacion de identidad completa." },
        { name: "Tarifa de conexion al prestamista", amt: "1% del prestamo", when: "Al cierre — solo si PML conecto al prestatario con el prestamista. Pagada en el estado de liquidacion." }
      ],
      totalDue: "Total a pagar hoy",
      totalAmt: "$0",
      note: "La tarifa de conexion del 1% aplica solo si PayMyLoan.ai facilito la presentacion entre prestatario y prestamista. Si traes a tu propio prestamista, esta tarifa no aplica. El monto exacto se basa en el monto final fondeado."
    },
    auth: {
      desc1: "Al firmar este acuerdo, el prestatario autoriza a PayMyLoan.ai a:",
      items: [
        "1. Incluir la tarifa de conexion (1% del monto fondeado) como una linea en el estado de liquidacion al cierre, a ser pagada por el prestatario a PayMyLoan LLC.",
        "2. Enviar este acuerdo firmado a la compania de titulos o abogado de cierre que maneje la transaccion como autorizacion para cobrar la tarifa de la plataforma al cierre.",
        "3. Cobrar la suscripcion mensual aplicable comenzando cuando se publique el trato (exenta con un codigo promocional valido o enlace de referido)."
      ],
      desc2: "El prestatario reconoce que estas tarifas se divulgan en su totalidad, que no se debe ninguna tarifa al momento de esta firma, y que la tarifa de conexion del 1% esta condicionada a que PayMyLoan.ai lo conecte exitosamente con un prestamista que fondee el trato."
    },
    ack: {
      items: [
        "Entiendo que una <strong>tarifa de conexion del 1%</strong> ($1,150 estimado) se cobrara al cierre via el estado de liquidacion si PayMyLoan.ai me conecto con mi prestamista.",
        "Entiendo que una <strong>suscripcion de $99/mes</strong> comienza cuando publico mi trato. Esta tarifa es exenta si tengo un codigo promocional o enlace de referido.",
        "Autorizo a PayMyLoan.ai a enviar este acuerdo firmado a mi compania de titulos como autorizacion para incluir la tarifa de plataforma en el estado de liquidacion.",
        "He leido y acepto los <strong>Terminos de Servicio</strong> y el <strong>Aviso de Privacidad</strong> de PayMyLoan.ai."
      ]
    },
    sig: {
      label: "Firma electronica del prestatario",
      esignedBy: "Firma electronica de",
      signedAt: "Firmado:",
      ipAndDoc: "IP: 68.105.xxx.xxx · ID del Documento:"
    },
    action: {
      note: "Este es un acuerdo legalmente vinculante bajo la Ley E-SIGN y UETA. Tu firma electronica tiene el mismo peso legal que una firma manuscrita. No se requiere pago ahora.",
      btn: "Firmar y publicar mi trato"
    },
    footer: {
      gen: "Generado por PayMyLoan.ai · ID del Documento:",
      legal: "PayMyLoan LLC · Construido para Main Street, No Wall Street · paymyloan.ai"
    }
  },

  counterOffer: {
    title: "Contraoferta",
    subtitle: "3802 University Cove — revisa los terminos y responde",
    deal: {
      requested: "solicitado",
      months: "meses",
      arv: "ARV",
      ltv: "LTV",
      rehab: "Rehab"
    },
    thread: {
      original: "Solicitud original",
      yourOffer: "Tu oferta",
      borrowerCounter: "Contraoferta del prestatario",
      awaiting: "Esperando tu respuesta",
      noChange: "Sin cambios",
      reqLower: "Solicito menor",
      reqHigher: "Solicito mayor",
      metHalfway: "Punto medio"
    },
    terms: {
      amount: "Monto",
      rate: "Tasa",
      term: "Plazo",
      points: "Puntos"
    },
    actions: {
      title: "Responder a la contraoferta de",
      sub: "acepta, rechaza o envia otra contraoferta.",
      accept: "Aceptar estos terminos",
      decline: "Rechazar",
      counter: "Enviar contraoferta",
      formTitle: "Enviar una contraoferta",
      noteLabel: "Nota al prestatario",
      notePh: "Explica tu contraoferta...",
      sendBtn: "Enviar contraoferta"
    }
  },

  managePayments: { title: "Gestión de Pagos", subtitle: "Administra tus cuentas bancarias por entidad y revisa tus próximos cobros automáticos (ACH).", autopay: "Autopay (ACH)", autopayDesc: "Los pagos se deducirán automáticamente de la cuenta asociada a la entidad prestataria en su fecha de vencimiento.", addAccount: "Vincular Cuenta a Entidad", entityLabel: "Entidad:", addAccountModal: { title: "Vincular Cuenta Bancaria", subtitle: "Selecciona la entidad prestataria y vincula su cuenta bancaria de forma segura.", selectEntity: "Selecciona la entidad (LLC/Corp)", routingLabel: "Número de Ruta (Routing)", accountLabel: "Número de Cuenta (Account)", submit: "Vincular con Stripe", cancel: "Cancelar" }, upcomingTitle: "Próximos Cargos Programados", historyTitle: "Historial de Transacciones", back: "Volver al panel" },

  onboarding: {
    topSkip: "Omitir por ahora",
    title: "Configura tu cuenta",
    subtitle: "Completa tu perfil para publicar tratos y conectar con prestamistas. Puedes actualizar esto después en configuración.",
    roleBar: { signedInAs: "Conectado como", account: "cuenta", switchRole: "Cambiar rol" },
    alert: "Recomendamos agregar un método de verificación para que los prestamistas puedan confirmar tu identidad antes de enviar ofertas.",
    tabs: { verification: "Verificación", contact: "Contacto", banking: "Banco / ACH" },
    verification: { govId: "Identificación Oficial", govIdDesc: "Sube licencia o pasaporte. Requerido para fondeos mayores a $50K.", authApp: "App Autenticadora", authAppDesc: "Protege tu cuenta con un código temporal de Google Authenticator o similar.", phoneSms: "Teléfono / SMS", entityDocs: "Docs de Entidad / LLC", entityDocsDesc: "Sube tu acta constitutiva u operating agreement si operas bajo una LLC." },
    contact: { email: "Correo electrónico", phone: "Número de teléfono", mailing: "Dirección postal", mailingDesc: "Requerida para envíos de documentos de liquidación y copias físicas." },
    banking: { bankAcc: "Cuenta bancaria (ACH)", bankAccDesc: "Conecta tu cuenta para pagos mensuales automáticos. Requiere número de ruta y cuenta.", wireInst: "Instrucciones Wire (Solo prestamistas)", wireInstDesc: "Configura tu cuenta receptora para liquidaciones. Solo los últimos 4 dígitos aparecen en documentos." },
    badges: { moreSecure: "Más seguro", lessSecure: "Menos seguro", verified: "Verificado" },
    actions: { upload: "+ Subir", add: "+ Agregar", update: "Actualizar", connect: "+ Conectar", learnMore: "Saber más" },
    cta: "Ir al panel principal"
  },

  submitDeal: {
    title: "Publicar un trato",
    subtitle: "Publica tu solicitud de préstamo y deja que los prestamistas compitan por tu trato.",
    steps: ["Tipo de préstamo", "Propiedad", "Finanzas", "Revisión"],
    stepHint: "Paso {current} de {total} — {stepName}",
    loanType: {
      title: "Selecciona el tipo de préstamo",
      sub: "¿Qué tipo de financiamiento estás buscando?",
      bridge: "Préstamo Puente (Bridge)",
      bridgeSub: "Corto plazo, solo interés. Ideal para fix & flip.",
      slowFlip: "Slow Flip / Financiamiento",
      slowFlipSub: "Largo plazo, amortizado.",
      rental: "Renta a Largo Plazo",
      rentalSub: "Para propiedades estabilizadas."
    },
    property: {
      title: "Detalles de la propiedad",
      sub: "Cuéntanos sobre la propiedad que estás financiando.",
      address: "Dirección de la propiedad",
      addressPh: "Ej. 123 Main St, Memphis, TN",
      addressHint: "Empieza a escribir — autocompletaremos detalles y el ARV desde registros públicos.",
      addressLookup: "Buscando...",
      addressSuccess: "Autocompletado desde registros públicos",
      addressFail: "No se pudo autocompletar — ingresa los detalles manualmente.",
      city: "Ciudad",
      state: "Estado",
      zip: "Código postal",
      propType: "Tipo de propiedad",
      propTypes: ["Residencial unifamiliar", "Multifamiliar (2-4 unidades)", "Multifamiliar (5+ unidades)", "Comercial", "Terreno"],
      occupancy: "Ocupación",
      occupancies: ["Vacante", "Ocupada por el dueño", "Ocupada por inquilino"],
      beds: "Recámaras",
      baths: "Baños",
      sqft: "Pies cuadrados",
      condition: "Condición de la propiedad",
      conditions: ["Necesita rehab total", "Trabajo ligero", "Lista para mudarse"],
      desc: "Breve descripción (opcional)",
      descPh: "Ej. Casa de 3/2 en zona céntrica. Techo nuevo..."
    },
    financials: {
      title: "Finanzas del préstamo",
      sub: "Tus números ayudan a los prestamistas a evaluar el trato rápidamente.",
      purchasePrice: "Precio de compra",
      loanAmount: "Monto solicitado",
      loanHint: "Monto que necesitas del prestamista.",
      arv: "Valor estimado (ARV)",
      arvHint: "Valor estimado después de todas las reparaciones.",
      rehab: "Costo estimado de remodelación",
      desiredTerm: "Plazo deseado",
      terms: ["6 meses", "9 meses", "12 meses", "18 meses"],
      maxRate: "Tasa de interés máxima aceptada",
      maxRates: ["10%", "12%", "14%", "Cualquiera — mostrar todas"],
      ltvLabel: "Loan-to-value (LTV)",
      ltvHigh: "LTV Alto — algunos prestamistas podrían declinar. Considera aumentar el enganche.",
      ltvMod: "LTV Moderado. La mayoría considerarán esto.",
      ltvGood: "La mayoría prefiere un LTV menor a 70%. Estás en buena posición.",
      exitLabel: "Estrategia de salida",
      exits: ["Vender después de rehab", "Refinanciar (BRRRR)", "Rentar y mantener", "Financiamiento de dueño"]
    },
    liveCalc: {
      title: "Cálculo en vivo",
      purchase: "Precio de compra",
      loan: "Monto solicitado",
      rehab: "Ppto. Remodelación",
      arv: "Estimación ARV",
      ltv: "LTV (Préstamo ÷ ARV)",
      monthly: "Pago mensual est. @ {rate}",
      warning: "LTV superior al 75% — la mayoría de los prestamistas requieren reducir el préstamo o aumentar el capital aportado."
    },
    review: {
      visTitle: "Tu trato será visible para todos los prestamistas en la plataforma.",
      visSub: "Los prestamistas verán los detalles de tu trato, dirección y finanzas. Tu identidad personal nunca se muestra sin tu aprobación.",
      title: "Revisa tu trato",
      sub: "Confirma que todo se ve bien antes de publicar.",
      secType: "Tipo de préstamo",
      secProp: "Propiedad",
      secFin: "Finanzas",
      secBiz: "Tu negocio",
      edit: "Editar",
      btnPost: "Publicar mi trato",
      postNote: "Tu trato se publicará de inmediato. Los prestamistas serán notificados.\nPuedes editarlo o eliminarlo en cualquier momento desde tu panel."
    },
    actions: { back: "← Atrás", continue: "Continuar →", review: "Revisar y publicar" }
  },

  payoff: { title: "Solicitud de Liquidación", requestBtn: "Solicitar Liquidación", expectedDate: "Fecha esperada de cierre", successAlert: "Solicitud enviada al prestamista.", processing: "Procesando...", errorFetch: "Error al procesar la solicitud", errorNetwork: "Error de red desconocido" },

  vetting: { title: "Aplicación y Verificación", subtitle: "Completa este proceso una sola vez para acceder a capital privado.", feeNotice: "Tarifa de aplicación (no reembolsable)", form: { bankStatements: "Estados de Cuenta (Últimos 3 meses)", idUpload: "Identificación Oficial", submitAndPay: "Pagar $99 y Enviar", selectFile: "Seleccionar archivo", dealHistory: "Historial de Proyectos", dealHistoryDesc: "Ingresa hasta 5 direcciones de proyectos recientes.", addressLabel: "Dirección", addressPh: "Ej. 123 Main St, Austin, TX", addAddress: "+ Agregar otra dirección", consentCredit: "Autorizo a Dueño a Dueño LLC y sus prestamistas asociados a realizar una verificación de crédito (Credit Pull).", consentBackground: "Autorizo a Dueño a Dueño LLC a realizar una verificación de antecedentes (Background Check).", consentAlert: "Debes aceptar las verificaciones de crédito y antecedentes para continuar.", step: "Paso", of: "de", next: "Siguiente", back: "Atrás", saveAndContinueLater: "Guardar y continuar después", savedAlert: "Tu progreso ha sido guardado. Puedes regresar en cualquier momento." } },

  borrowerOnboarding: {
    title: "Un paso antes de publicar",
    subtitle: "Cuentanos sobre tu negocio para que los prestamistas sepan con quien trabajan.\nToma unos 60 segundos.",
    steps: ["Cuenta", "Negocio", "Publicar trato"],
    step1: {
      tag: "Perfil del negocio",
      title: "Sobre tu entidad",
      sub: "Se usa para mostrar a los prestamistas quien esta detras del trato. No se requiere informacion personal en esta etapa.",
      entityName: "Nombre de la entidad",
      entityNamePh: "Ej. Memphis Realty LLC",
      entityType: "Tipo de entidad",
      entityTypeSelect: "Seleccionar",
      entityTypes: ["LLC", "Corporacion", "Land trust", "Nombre personal", "Otro"],
      ein: "RFC / EIN",
      einPh: "XX-XXXXXXX",
      states: "Estados en los que operas",
      statesPh: "Ej. TN, MS, AR",
      statesHint: "Ayuda a los prestamistas a encontrar tratos en su area.",
      experience: "Anos de experiencia en bienes raices",
      expSelect: "Seleccionar",
      exps: ["Menos de 1 ano", "1 - 3 anos", "3 - 5 anos", "5 - 10 anos", "10+ anos"],
      lockedNotice: {
        bold: "La verificacion de identidad es opcional por ahora.",
        text: " La direccion personal, fecha de nacimiento, RFC/SSN y una identificacion oficial solo son requeridos cuando un prestamista decida fondear tu trato."
      }
    },
    step2: {
      tag: "Listo para publicar",
      title: "Tu perfil esta listo",
      sub: "Esto es lo que veran los prestamistas. Ya puedes publicar tu primer trato.",
      reviewTitle: "Negocio",
      unlockedLater: "Se desbloquea cuando un prestamista quiere fondear",
      locked1: "Direccion personal y fecha de nacimiento",
      locked2: "RFC / Numero de Seguro Social",
      locked3: "Identificacion oficial",
      lockedBadge: "Bloqueado"
    },
    footer: {
      step: "Paso",
      of: "de",
      back: "Atras",
      continue: "Continuar",
      post: "Publicar mi primer trato",
      skip: "Omitir por ahora — completare esto despues",
      submitting: "Procesando..."
    }
  },

  rateLender: { title: "Calificar al Prestamista", subtitle: "Tu préstamo ha finalizado. ¿Cómo fue tu experiencia con", ratingLabel: "Calificación", reviewLabel: "Reseña pública (opcional)", reviewPh: "Escribe sobre tu experiencia trabajando con este prestamista...", submit: "Enviar Calificación", success: "¡Gracias! Tu calificación ha sido publicada en el perfil del prestamista.", close: "Cerrar" },

  leaveReview: { pageTitle: "Dejar una reseña", pageSub: "Las reseñas se desbloquean después de que un trato se cierra. Son públicas, están vinculadas a tu cuenta y no pueden ser anónimas. PML puede marcar o eliminar reseñas que violen nuestros términos.", closedBadge: "Cerrado", rateTitle: "Califica a tu prestamista", rateSub: "Tu reseña honesta ayuda a otros prestatarios a tomar decisiones informadas.", tapToRate: "Toca para calificar", labels: ["", "Malo", "Por debajo del promedio", "Bueno", "Genial", "Excepcional"], writeReview: "Escribe tu reseña", reviewPh: "¿Cómo fue la experiencia trabajando con este prestamista? Comunicación, velocidad, equidad...", tagsTitle: "¿Qué destacó? (opcional)", tags: ["Fondeo rápido", "Comunicación clara", "Términos justos", "Flexible", "Profesional", "Trabajaría con él de nuevo"], importantNote: "Importante: No incluyas números de teléfono, correos electrónicos ni información de contacto fuera de la plataforma en tu reseña. Las reseñas son públicas y están vinculadas a tu nombre real.", submitBtn: "Enviar reseña", skipBtn: "Omitir por ahora", submittedTitle: "Reseña enviada", submittedSub: "Gracias. Tu reseña ahora está visible en el perfil de {name}. {name} también tendrá la oportunidad de calificarte a ti como prestatario.", backBtn: "Volver al panel" },
};
