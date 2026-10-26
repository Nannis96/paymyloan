export const lender = {
  dashboardLender: { title: "Panel de Prestamista", subtitle: "Control total sobre tu capital y rendimientos.", metrics: { availableCapital: "Capital (Disponible / Desplegado)", capitalDeployed: "Capital Desplegado", nextPayments: "Próximos Pagos (30 días)", avgInterest: "Tasa Promedio", activeBorrowers: "Prestatarios Activos" }, sections: { commitmentLetters: "Cartas de Compromiso Enviadas", upcomingClosings: "Próximos Cierres / Payoffs", activeLoans: "Préstamos Activos (Retorno)", }, tableHeaders: { borrower: "Prestatario", amount: "Monto", status: "Estado", type: "Tipo", date: "Fecha", action: "Acción", loan: "Préstamo", rateBalance: "Tasa / Saldo" }, labels: { cap: "Cap:", int: "Int:" },
    offersSent: {
      title: "Ofertas Enviadas",
      subtitle: "Gestiona las cotizaciones que has enviado a prestatarios.",
      table: {
        property: "Propiedad",
        amount: "Monto Ofertado",
        rate: "Tasa Propuesta",
        status: "Estado",
        date: "Fecha Enviada",
        action: "Ver Trato"
      },
      status: {
        SUBMITTED: "Enviada",
        SELECTED: "Aceptada",
        DECLINED: "Rechazada",
        WITHDRAWN: "Retirada"
      },
      empty: "No has enviado ninguna oferta aún."
    },
    actions: { marketplace: "Explorar Mercado", viewContracts: "Ver mis contratos", viewContractBtn: "Ver contrato" }  , toggle: { open: "Abierto a negocios", closed: "No aceptando préstamos" }, table: { date: "Fecha", borrower: "Prestatario", property: "Propiedad", total: "Pago Total", principal: "Capital", interest: "Interés" }, emptyHistory: "El resto del historial se renderizará aquí.", loading: "Cargando dashboard...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al cargar la información del dashboard", errorNetwork: "Error de red desconocido", unassigned: "Sin asignar", borrowerFallback: "Deudor", emptyCommitments: "No hay compromisos pendientes", emptyClosings: "No hay cierres próximos en el sistema.", emptyLoans: "Sin préstamos activos", emptyPayments: "No hay pagos procesados recientemente.", mimic: { greeting: "Buenos dias, {name}.", portfolioSub: "{company} — resumen de portafolio.", stats: { capitalDeployed: "Capital desplegado", acrossActive: "En {n} prestamos activos", monthlyIncome: "Ingreso mensual", interestPayments: "Pagos de interes", newDeals: "Nuevos tratos hoy", matchCriteria: "Coinciden con tus criterios", maturingSoon: "Proximos a vencer", within60: "En menos de 60 dias" }, alerts: { maturityTitle: "Alerta de vencimiento", maturityMsg: "{address} vence en {days} dias — {date}", maturitySub: "{amount} al {rate}% · Contacta al prestatario para liquidacion o extension." }, cards: { activeLoans: "Prestamos activos", viewAll: "Ver todos", upcomingPayments: "Proximos pagos", allPayments: "Todos los pagos" }, browseCta: { title: "{n} nuevos tratos coinciden con tus criterios", sub: "Memphis · TN · MS · Hasta 75% LTV · 12%+", btn: "Explorar tratos" }, badges: { active: "Activo", closing: "Cerrando", maturity: "{n}d para vencer", pending: "Pendiente", received: "Recibido" }, data: { loan1Addr: "3802 University Cove", loan1Sub: "Fondeado 22 Sept · 12 meses", loan1Amt: "$115,000", loan1Rate: "12% · $1,150/mes", loan2Addr: "1144 Oakwood Dr", loan2Sub: "Fondeado 3 Ago · 12 meses", loan2Amt: "$95,000", loan2Rate: "12% · $950/mes", loan3Addr: "4215 Raleigh Ave", loan3Sub: "Cierre en progreso", loan3Amt: "$75,000", loan3Rate: "11% · $687.50/mes", pay1Date: "Vence 1 Oct", pay2Date: "Vence 1 Oct", pay3Date: "Pagado 1 Sept", pay4Date: "Pagado 1 Sept" },
    sidebar: { menu: "Menú", dashboard: "Tablero", browse: "Explorar tratos", active: "Préstamos activos", payments: "Pagos", offers: "Ofertas enviadas", settings: "Configuración", preferences: "Preferencias", entities: "Entidades", verifyMsg: "Completar verificación", contacts: "Contactos", affiliates: "Afiliados"},  
    settings: {
        title: "Configuracion",
        sub: "Administra tu cuenta, notificaciones y facturacion.",
        verifyBanner: { text1: "Tu perfil no esta verificado.", text2: "Completa la verificacion para desbloquear ofertas.", btn: "Verificar ahora — $99" },
        profile: { title: "Perfil", sub: "Tu nombre, correo y contraseña.", edit: "Editar", name: "Nombre completo", email: "Correo electronico", pass: "Contraseña", phone: "Telefono", unassigned: "No proporcionado" },
        verification: { title: "Verificacion", sub: "Estado de verificacion de identidad y negocio.", biz: "Negocio verificado", id: "Identidad verificada", unverified: "No verificado" },
        notifs: { title: "Notificaciones", sub: "Elige que actualizaciones recibes.", offer: "Oferta de prestamista recibida", status: "Actualizaciones de trato", approved: "Verificacion aprobada", news: "Noticias de la plataforma" },
        billing: { title: "Suscripcion y facturacion", sub: "Tu plan actual y metodo de pago.", manage: "Administrar", plan: "Plan actual", subPlan: "Suscripcion mensual", method: "Metodo de pago", free: "Gratis", notActive: "No activa", none: "Ninguno" },
        account: { title: "Cuenta", sub: "Cierra o desactiva tu cuenta.", close: "Cerrar cuenta" },
        accountSecurity: { title: "Seguridad de la cuenta", sub: "2FA, sesiones activas y bloqueo de emergencia.", buttonLabel: "Administrar seguridad", back: "← Volver a configuracion", alertTitle: "Actividad sospechosa reportada", alertSub: "Si alguien mas esta intentando acceder a tu cuenta, congelala inmediatamente abajo. Si necesitas ayuda, llamanos al", freezeTitle: "Congelar tu cuenta", freezeSub: "Bloquea inmediatamente inicios de sesion, ofertas, pagos y cambios. Reversible.", freezeBtn: "Congelar mi cuenta ahora", sessionsTitle: "Sesiones activas", loggedInDev: "Dispositivos conectados", thisDevice: "Este dispositivo", current: "Actual", revoke: "Revocar", revokeAll: "Revocar las demas sesiones", secActionsTitle: "Seguridad de la cuenta", password: "Contraseña", phone: "Numero de telefono", email: "Correo electronico", bank: "Cuenta bancaria / ACH", change: "Cambiar", secCallout: "Todos los cambios en la cuenta requieren 2FA.", secCalloutSub: "Recibiras un SMS para verificar tu identidad antes de que cualquier cambio sea visible. Los cambios bancarios tienen una retencion de seguridad adicional de 24 horas.", eventsTitle: "Eventos de seguridad recientes", flagged: "MARCADO", confirmed: "CONFIRMADO", emergencyTitle: "¿Necesitas ayuda inmediata?", emergencyText1: "Llama a PayMyLoan directamente: ", emergencyText2: "Podemos verificar tu identidad por telefono y congelar o restaurar tu cuenta de inmediato. Nunca compartas tus codigos 2FA." }
      }
    }
  },

  dashboardBookkeeper: { title: "Panel de Contabilidad", subtitle: "Registros claros y exportables de capital e intereses para el cierre contable.", metrics: { activeLoans: "Préstamos Activos", totalInterest: "Intereses Pagados (YTD)", totalPrincipal: "Capital Pagado (YTD)" }, exportBtn: "Exportar Reporte Anual", tableHeaders: { property: "Propiedad", borrower: "Prestatario", lender: "Prestamista", interest: "Interés", principal: "Capital", action: "Acción" }, loading: "Cargando registros contables...", empty: "No hay registros disponibles.", errorAuth: "Sesión no válida o sin permisos de contabilidad.", errorFetch: "Error al cargar los datos contables.", errorNetwork: "Error de red desconocido" },
dashboardBorrower: { title: "Panel de Prestatario", subtitle: "Tus préstamos, propiedades y saldos en un solo lugar.", metrics: { totalOwed: "Saldo Total Pendiente", nextDue: "Próximo Vencimiento", properties: "Propiedades en Garantía", pmlRating: "Calificación PML" }, tabs: { needsFunding: "Necesitan Fondeo", approved: "Aprobados", funded: "Fondeados / Cerrados", completed: "Completados" }, trackerTitle: "Próximos Cierres", trackerEmpty: "No hay cierres próximos rastreados.", needFunding: "Necesitan Fondeo (Need Funding)", loanApproved: "Aprobados por Prestamista", currentLoans: "Préstamos Actuales (Current Loans)", completedLoans: "Completados", emptyTable: "La tabla de préstamos en vivo se renderizará aquí.", emptyDocs: "Las cartas de compromiso y estados de liquidación generados aparecerán aquí.", tableHeaders: { property: "Propiedad", amount: "Monto / Saldo", rehabDrawn: "Rehab Retirado", lender: "Prestamista", rate: "Tasa", status: "Estado", date: "Fecha / Próx Pago", action: "Acción", history: "Historial" }, actions: { pitchDeck: "Generar Pitch Deck", payoff: "Solicitar Liquidación", payments: "Gestionar Pagos", viewContracts: "Contratos", drawRequest: "Solicitar Retiro (Draw)", extensionRequest: "Solicitar Extensión", resolveLate: "Resolver Atraso", rateLender: "Calificar Prestamista" }, loading: "Cargando dashboard...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al cargar la información del dashboard", errorNetwork: "Error de red desconocido", lenderFallback: "Empresa Prestamista", emptyNeedFunding: "Sin solicitudes pendientes", emptyApproved: "Sin préstamos por aceptar", emptyActive: "Sin préstamos activos", emptyCompleted: "Sin préstamos completados", reviewCommitment: "REVISAR COMPROMISO", paidOff: "Liquidado:" },  contractsList: { title: "Contratos y Préstamos", subtitle: "Listado de acuerdos. Lo que ves aquí depende de tu rol en la plataforma.", table: { id: "ID", concept: "Concepto", property: "Propiedad", client: "Cliente", financials: "Términos Financieros", status: "Estado", actions: "Acciones" }, status: { active: "Activo", inactive: "Inactivo" }, viewDetails: "Detalles", back: "Volver al panel", loading: "Cargando contratos...", empty: "No se encontraron contratos.", errorAuth: "No tienes permisos para ver estos contratos o tu sesión expiró.", errorFetch: "Error al obtener contratos", errorNetwork: "Error de red desconocido", unassigned: "Sin asignar", borrowerFallback: "Deudor", noTerms: "Sin términos", total: "Total:", perMonth: "/mes", interest: "% Int.", },

  commitmentLetterDoc: {
    label: "Carta de Compromiso — Generada automáticamente por PayMyLoan.ai",
    print: "Imprimir",
    download: "Descargar PDF",
    docType: "Carta de Compromiso de Préstamo Privado",
    title: "Carta de Compromiso de Préstamo",
    subtitle: "Este compromiso está sujeto a las condiciones enumeradas a continuación y expira 24 horas después de su emisión.",
    sections: {
      parties: "Partes",
      property: "Propiedad",
      terms: "Términos del préstamo",
      fees: "Tarifas pagaderas al cierre",
      conditions: "Condiciones del compromiso",
      agreement: "Acuerdo"
    },
    labels: {
      lender: "Prestamista",
      lenderSig: "Firmante del prestamista",
      borrower: "Prestatario",
      borrowerSig: "Firmante del prestatario",
      address: "Dirección de la propiedad",
      propType: "Tipo de propiedad",
      exit: "Estrategia de salida",
      loanAmount: "Monto del préstamo",
      purchaseFunded: "Precio de compra fondeado",
      rehabFunded: "Remodelación fondeada",
      interestRate: "Tasa de interés",
      monthlyPayment: "Pago mensual de intereses",
      perDiem: "Per diem",
      term: "Plazo del préstamo",
      maturity: "Fecha de vencimiento",
      ltv: "Loan-to-value (LTV)",
      disbursement: "Desembolso de remodelación",
      origination: "Originación (1 punto)",
      appraisal: "Tarifa de avalúo",
      admin: "Tarifa de administración",
      wire: "Tarifa de transferencia",
      pmlFee: "Tarifa de plataforma PML (facilitación)",
      totalFees: "Total de tarifas al cierre",
      lenderSigRole: "Firma del prestamista",
      borrowerSigRole: "Firma del prestatario",
      signed: "Firmado:"
    },
    values: {
      heldBack: "retenido en retiros",
      perAnnum: "anual (año de 360 días)",
      io: "(solo interés)",
      drawBased: "Basado en retiros — el prestamista libera tras inspección",
      esignedBy: "Firma electrónica de",
      footerGen: "Generado por PayMyLoan.ai",
      footerId: "ID del Documento:",
      footerLegal: "Este documento es legalmente vinculante tras la ejecución electrónica de ambas partes.",
      footerTag: "Construido para Main Street, No Wall Street"
    },
    pmlFeeNote: "La tarifa de plataforma PML ($1,150) se paga a PayMyLoan LLC al cierre. Las instrucciones de transferencia se han proporcionado directamente a la compañía de títulos. Esta tarifa aplica porque PayMyLoan.ai facilitó la conexión entre prestatario y prestamista.",
    conditionsList: [
      "Avalúo satisfactorio confirmando ARV de no menos de $165,000",
      "Evidencia de seguro de propiedad con el prestamista nombrado como asegurado adicional",
      "Título limpio y póliza de seguro de título al cierre",
      "Documentos de la entidad prestataria (operating agreement, carta EIN)",
      "Acuerdo de compraventa ejecutado",
      "Alcance de trabajo y cotizaciones de contratistas para presupuesto de remodelación",
      "Todas las tarifas enumeradas arriba pagadas al cierre vía el estado de liquidación (settlement statement)",
      "Este compromiso expira 24 horas después de su emisión a menos que sea aceptado por el prestatario"
    ],
    agreementTexts: [
      "Al firmar a continuación, ambas partes aceptan los términos y condiciones establecidos en esta Carta de Compromiso. Este documento se ejecuta de acuerdo con la Ley de Firmas Electrónicas en el Comercio Global y Nacional (E-SIGN Act) y la Ley Uniforme de Transacciones Electrónicas (UETA). Las firmas electrónicas tienen el mismo peso legal que las firmas manuscritas.",
      "Este compromiso no constituye una garantía de fondeo. El fondeo está sujeto a la satisfacción de todas las condiciones enumeradas anteriormente y a la finalización de una revisión final al cierre."
    ],
    errorState: {
      title: "Documento no disponible",
      desc: "No pudimos generar la Carta de Compromiso para este contrato. Esto suele ocurrir por dos razones:",
      reason1Title: "1. Faltan los términos financieros",
      reason1Desc: "Debes ir a la opción de 'Emitir Carta de Compromiso' primero para definir montos, tasas y tarifas de cierre.",
      reason2Title: "2. Permisos o enlace incorrecto",
      reason2Desc: "El contrato pertenece a otra cuenta, no tienes acceso a él, o el enlace no existe.",
      btnContract: "Volver al contrato",
      btnAll: "Ir a mis contratos"
    }
  },

  lenderVerify: {
    topSkip: "Omitir — explorar tratos primero",
    badge: "Verificación de Prestamista",
    steps: ["Preferencias", "Criterios", "Experiencia", "Revisión"],
    stepTitles: [
      "Tus preferencias de inversión",
      "Criterios del trato",
      "Tu experiencia",
      "Revisa y envía"
    ],
    stepSubs: [
      "Nos ayuda a emparejarte con los tratos correctos. Puedes actualizar esto en cualquier momento.",
      "Define tus criterios para que solo te mostremos tratos que encajen.",
      "Unas breves preguntas sobre tu historial de préstamos.",
      "¿Todo se ve bien? Envía para obtener tu insignia de Prestamista Verificado."
    ],
    form: {
      minLoan: "Monto mínimo de préstamo",
      maxLoan: "Monto máximo de préstamo",
      fundsAvailable: "Fondos disponibles para prestar",
      selectRange: "Selecciona un rango",
      fundsOptions: ["Menos de $100,000", "$100,000 - $250,000", "$250,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000+"],
      prefTerms: "Plazos de préstamo preferidos",
      maxLtv: "LTV máximo que prestarás",
      selectLtv: "Selecciona LTV máximo",
      ltvHint: "Loan-to-value basado en ARV.",
      geoPref: "Preferencia geográfica",
      geoPrefPh: "Ej. Texas, Mississippi, Arkansas",
      geoHint: "Estados o ciudades donde prefieres prestar.",
      propTypes: "Tipos de propiedad",
      propOptions: ["Residencial unifamiliar", "Multifamiliar (2-4 unidades)", "Multifamiliar (5+ unidades)", "Comercial"],
      loansFunded: "¿Cuántos préstamos has fondeado?",
      selectExp: "Selecciona experiencia",
      loansOptions: ["Este es mi primer préstamo", "1 - 3 préstamos", "4 - 10 préstamos", "11 - 25 préstamos", "25+ préstamos"],
      fundSource: "¿Cómo estás fondeando estos préstamos?",
      selectSource: "Selecciona fuente",
      sourceOptions: ["Ahorros personales / efectivo", "IRA auto-dirigida / 401K", "Fondos de entidad (LLC, fideicomiso)", "Fondo / capital agrupado"],
      entityType: "Tipo de entidad (opcional)",
      selectEntity: "Saltar por ahora",
      entityOptions: ["Individuo / nombre personal", "LLC", "Fideicomiso", "Corporación", "IRA auto-dirigida / 401K"],
      entityHint: "Puedes agregar detalles de la entidad y banco más tarde en configuración."
    },
    review: {
      alert: "Revisa tu perfil de prestamista. Una vez enviado, podrás hacer ofertas en tratos que cumplan tus criterios.",
      badgeTitle: "Prestamista Verificado",
      badgeDesc: "Esta insignia aparecerá en tu perfil para que los prestatarios sepan que eres un prestamista serio."
    },
    actions: { back: "Atrás", continue: "Continuar", submit: "Enviar perfil" }
  },

  commitmentLetter: { title: "Carta de Compromiso", subtitle: "Acuerdo vinculante entre el prestatario y el prestamista.", fees: { title: "Resumen de Tarifas (Al Cierre)", origination: "Puntos de Originación", processing: "Tarifa de Procesamiento", underwriting: "Tarifa de Underwriting", platform: "Tarifa de Conexión PML", totalDue: "Total a pagar al cierre (Prestatario)" }, actions: { accept: "Aceptar y Firmar", decline: "Rechazar" }, achModal: { title: "Configurar Domiciliación (ACH)", subtitle: "Para completar la firma, selecciona la cuenta bancaria de donde se descontarán automáticamente tus pagos mensuales a partir de la fecha de inicio.", selectAccount: "Selecciona una cuenta vinculada", confirmBtn: "Confirmar ACH y Firmar", cancel: "Cancelar" }, disclaimer: "Al aceptar, esta carta se enviará automáticamente a la notaría (Title Company) y a la aseguradora. Dueño a Dueño LLC opera como un conector tecnológico, no origina, fondea, ni administra el préstamo por sí mismo.", loading: "Cargando carta de compromiso...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al obtener los términos del contrato", errorAccept: "Error al aceptar los términos", errorReject: "Error al rechazar los términos", errorNetwork: "Error de red desconocido", paidTo: "Pagado a Dueño a Dueño LLC", customFeeFallback: "Tarifa", rejectCommentPh: "Motivo del rechazo (opcional)...", rejecting: "Rechazando...", accepting: "Aceptando..." },

  issueCommitment: { title: "Emitir Carta de Compromiso", subtitle: "Configura las tarifas para el trato REF:", closingFeesTitle: "Tarifas al Cierre (Closing Fees)", originationPoints: "Puntos de Originación (%)", processingFee: "Tarifa de Procesamiento ($)", underwritingFee: "Tarifa de Underwriting ($)", docPrepFee: "Doc Prep Fee ($)", customFeeName: "Nombre Tarifa Custom", customFeeNamePh: "Ej. Appraisal Fee", customFeeAmount: "Monto Custom ($)", penaltiesTitle: "Penalizaciones (Post-Cierre)", latePenalty: "Late Payment Penalty", latePenaltyPh: "Ej. 5% o $50", prePayPenalty: "Pre-Pay Penalty", prePayPenaltyPh: "Ej. 1% del saldo", phPoints: "Ej. 2", phFee: "Ej. 500", systemNoteTitle: "Nota del Sistema:", systemNote: "La Tarifa de Conexión del Marketplace (1 punto, mín $999) será agregada automáticamente al resumen final por la plataforma si aplica para este trato.", submit: "Generar y Emitir Carta", submitting: "Emitiendo...", errorFetch: "Error al emitir la carta de compromiso", errorNetwork: "Error de red desconocido" },
};
