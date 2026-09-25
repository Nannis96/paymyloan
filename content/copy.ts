/**
 * Todo el texto de la landing vive aqui.
 */

export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];

const es = {
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
      makeOffer: "Hacer oferta"
    },
    scoreCard: {
      tapToSee: "Toca para ver prestatario",
      seeScore: "Ver calificación",
      seeDeal: "Ver info del trato",
      underCap: "Límite 75%",
      matchedStrip: "Conectado — Tratos directos sin comisión",
      lockedStrip: "Conecta para ver el perfil",
      scoreLbl: "Score PML",
      scoreHidden: "Score oculto",
      deals: "Tratos",
      onTime: "A tiempo",
      funded: "Fondeado",
      extensions: "Ext.",
      cardTiers: "Niveles de tarjeta",
      rookie: { name: "Novato", desc: "0–2 tratos · blanco/azul" },
      pro: { name: "Pro", desc: "3–9 tratos · oro oscuro" },
      allStar: { name: "Estrella", desc: "10+ tratos · holográfico" },
      limited: { name: "Limitada", desc: "10+ tratos · 0 atrasos" },
      fields: { loan: "Monto", rate: "Tasa", term: "Plazo", arv: "ARV", type: "Tipo", market: "Mercado" }
    }
  },

  prototype: {
    lenderDeals: {
      eyebrow: "Mercado de Fondeo",
      title: "Explorar Tratos en Vivo",
      subtitle: "Cada trato está pre-evaluado. Busca por tipo, ubicación o calificación...",
      search: { type: "Cualquier Tipo", locationPh: "📍 Ciudad, Estado o ZIP", score: "Cualquier Calificación", ltv: "Cualquier LTV", btn: "Buscar →" },
      mapTitle: "Tratos Cerca de Ti",
      legendActive: "Trato Activo", legendFunded: "Fondeado / Cerrado", fundedTitle: "Fondeados Recientemente",
      blurText: "+ 24 tratos más en vivo", blurBtn: "Crea tu Cuenta Gratis para Desbloquear →", btnConnect: "Conectar con Prestatario →"
    },
    lenderDemo: {
      eyebrow: "Demo",
      title: "Mira cómo funciona para Prestamistas",
      subtitle: "Ve cómo PML hace que prestar dinero privado no requiera esfuerzo...",
      videoTitle: "Video Recorrido para Prestamista",
      videoSub: "Demo completa de la plataforma — explora tratos, evalúa prestatarios, fondea y administra",
      videoComing: "Video Próximamente",
      steps: [
        { num: "1", label: "Explora Tratos" }, { num: "2", label: "Pide el Perfil" },
        { num: "3", label: "Revisa el Trato" }, { num: "4", label: "Fija Términos" }, { num: "5", label: "Fondea y Cobra" }
      ],
      benefits: [
        { icon: "🔍", title: "Evaluación Completa", desc: "FICO, antecedentes e historial verificados antes de que veas el trato." },
        { icon: "🏠", title: "Análisis del Trato", desc: "Comps, ARV, LTV, alcance — todo en una pantalla. Sin adivinar." },
        { icon: "🆓", title: "Gratis Siempre", desc: "Sin suscripción. Sin tarifa mensual. 1 punto al cierre es el único costo." },
        { icon: "🏦", title: "Pagos ACH Automáticos", desc: "Pagos recolectados automáticamente cada mes. Sin perseguir a nadie." },
        { icon: "⚡", title: "Liquidaciones Instantáneas", desc: "Generadas a demanda — capital, interés, por día. Exacto en segundos." },
        { icon: "📄", title: "Cartas Automáticas", desc: "Enviadas a la notaría y seguro al acordar el trato. Sin trabajo manual." }
      ],
      ctaTitle1: "¿Listo para ", ctaTitle2: "Desplegar Capital con Confianza?",
      ctaSub: "Únete gratis. Explora tratos en vivo ahora mismo. Sin tarjeta de crédito.",
      btn1: "Crear Cuenta de Prestamista Gratis →", btn2: "Explorar Tratos Primero"
    },
    lenderProblems: {
      eyebrow: "Problemas que Resolvemos",
      title: "Construido para cada dolor de cabeza de los prestamistas",
      subtitle: "Si has estado en el negocio, has vivido cada uno de estos. PML fue construido para eliminarlos.",
      probs: [
        { num: "01", icon: "📄", title: "Caos en la Carta de Compromiso", pain: '"Envié la carta tres veces..."', solution: "La carta se genera y envía automáticamente a la notaría...", tag: "✓ Generada Automáticamente" },
        { num: "02", icon: "🧮", title: "Dolor en el Cálculo de Liquidación", pain: '"El prestatario necesita el saldo..."', solution: "Solicita un saldo en cualquier momento...", tag: "✓ Estados de Liquidación Instantáneos" },
        { num: "03", icon: "🏦", title: "Persiguiendo Pagos Mensuales", pain: '"Es día 10. Aún no hay pago..."', solution: "Pagos ACH configurados al cierre, ejecutados automáticamente...", tag: "✓ Cobro Automático ACH" },
        { num: "04", icon: "📚", title: "La Contabilidad es un Desastre", pain: '"Mi contador necesita el historial..."', solution: "Invita a tu contador a tu portal. Acceso de solo lectura...", tag: "✓ Acceso para Contadores" },
        { num: "05", icon: "🔍", title: "Evaluación Lenta de Prestatarios", pain: '"Presté $180K. Seis meses después me entero..."', solution: "Cada prestatario es evaluado antes de publicar...", tag: "✓ FICO · Antecedentes · Historial" },
        { num: "06", icon: "🏠", title: "Adivinando Sobre el Trato", pain: '"Me dicen que el ARV es $300K..."', solution: "Comps, ARV, recámaras, LTV, calificación...", tag: "✓ Evaluación Integrada" },
        { num: "07", icon: "💰", title: "Topas con un Límite de Fondeo", pain: '"Quiero prestar más pero la administración..."', solution: "Cuando los pagos corren solos y las cartas se envían solas...", tag: "✓ Escala Sin Gastos Extra", gold: true }
      ]
    },
    lenderWho: {
      eyebrow: "Para Quién Es",
      title: "Construido para Main Street, no Wall Street",
      subtitle: "Si tienes capital para desplegar y quieres retornos de deuda inmobiliaria sin los dolores de cabeza — esto es para ti.",
      cards: [
        { icon: "💼", title: "Prestamistas Privados", bullets: ["Tienes $50K–$2M+ para desplegar en deuda", "Quieres 10–14% asegurado por bienes raíces", "Estás cansado de gestionar en Excel", "Quieres que tu dinero esté protegido antes de prestar"], btn: "Este Soy Yo →" },
        { icon: "🏗️", title: "Inversores que Prestan", bullets: ["Haces fix & flip y prestas a otros por un lado", "Necesitas un lugar para gestionar todo", "Quieres tratos evaluados sin hacer el trabajo", "Conoces el negocio — solo quieres mejores herramientas"], btn: "Este Soy Yo →" },
        { icon: "🏛️", title: "Family Offices e IRAs", bullets: ["Despliegas capital de retiro o fideicomisos", "La transparencia y cumplimiento son innegociables", "Necesitas registros limpios para el administrador", "Buscas alto rendimiento sin bolsa de valores"], btn: "Este Soy Yo →" }
      ]
    },
    lenderDiff: {
      eyebrow: "Qué Nos Hace Diferentes",
      title: "Ninguna Otra Plataforma Hace Esto",
      subtitle: "Cualquier otro mercado te cobra, esconde al prestatario o junta tu dinero con otros. Nosotros no hacemos nada de eso.",
      table: {
        hPml: "PayMyLoan.ai", hC1: "Fund That Flip", hC2: "Groundfloor", hC3: "Hard Money Broker",
        rows: [
          { label: "Gratis para unirse", pml: "✅ Siempre", c1: "❌", c2: "❌", c3: "❌ 1–2pts" },
          { label: "FICO + antecedentes", pml: "✅ Ambos", c1: "❌ Interno", c2: "❌ Solo grado", c3: "❌ Hazlo tú" },
          { label: "Expediente completo", pml: "✅ Completo", c1: "❌ Caja negra", c2: "❌ Resumen", c3: "❌ Varía" },
          { label: "Relación directa", pml: "✅ Siempre", c1: "❌ Plataforma", c2: "❌ Mixto", c3: "⚠️ Vía broker" },
          { label: "Cobro ACH automático", pml: "✅ Integrado", c1: "⚠️ Manual", c2: "⚠️ Manual", c3: "❌ Hazlo tú" },
          { label: "Tarifa al prestamista", pml: "1pt solo al cierre", c1: "Gestión", c2: "Spread", c3: "1–2pts frontal" }
        ]
      },
      mantra: { h1: "La mayoría quiere un retorno ", h2: "sobre", h3: " su dinero.", h4: "Los mejores quieren el retorno ", h5: "de", h6: " su dinero.", p: "Construimos PayMyLoan.ai para quitarle el dolor de cabeza a los préstamos privados — para que despliegues con confianza y duermas tranquilo." },
      csEyebrow: "Próximamente", csTitle: "Emparejamiento Inteligente",
      csCards: [
        { icon: "⚙️", title: "Configura tus Criterios", desc: "Define tipo, área, montos y LTV máximo. Tu feed solo muestra tratos que encajan." },
        { icon: "⭐", title: "Calificación Mínima", desc: "Fija un mínimo de Calificación PML. Tratos pre-filtrados sin revisar a los no calificados." },
        { icon: "🔔", title: "Alertas de Tratos", desc: "Recibe notificación al instante que un trato que encaja entra al mercado. Sé el primero." }
      ]
    },

    lenderLanding: {
      hero: {
        badge: "Para Prestamistas Privados",
        title1: "Conviértete en un",
        title2: " Imán de Tratos.",
        sub: "Escanea tratos en tu mercado, despliega tu capital y déjanos el resto a nosotros. Evaluación de prestatarios, análisis del trato, rastreo de pagos, cartas de liquidación — todo listo. Tú solo di que sí.",
        btn1: "Explorar tratos abiertos",
        btn2: "Crear cuenta gratis"
      },
      ribbon: {
        title: "PML usa IA para potenciar todo tu negocio de préstamos",
        items: [
          { short: "VP", title: "Verificar Prestatarios", desc: "Te conecta con los mejores clientes" },
          { short: "AT", title: "Análisis de Tratos", desc: "Toma decisiones en segundos" },
          { short: "CA", title: "Comunicación Automática", desc: "Papeleo de oficina resuelto" },
          { short: "1 hr/sem", title: "Gestiona tu Negocio", desc: "Adminístralo en una hora a la semana" },
          { short: "MF", title: "Mercado de Fondeo", desc: "Accede a tratos en todo el país" },
          { short: "SPA", title: "Sistema de Pagos Automáticos", desc: "Pagos gestionados automáticamente" },
          { short: "1-Clic", title: "Liquidación en 1 Clic", desc: "Cartas de liquidación al instante" }
        ]
      },
      features: {
        label: "Lo que obtienes",
        title: "Conviértete en un Profesional.",
        sub: "Cada herramienta que necesitas para encontrar grandes prestatarios, analizar rápido y recibir tus pagos a tiempo — siempre.",
        cards: [
          { title: "No más pagos perdidos", desc: "PML envía recordatorios automáticos a tus prestatarios antes de cada fecha de vencimiento. Las penalizaciones por atraso se rastrean automáticamente. Te notificamos en el momento en que se procesa un pago — sin perseguir a nadie, sin hojas de cálculo, sin llamadas incómodas." },
          { title: "Presta más dinero", desc: "Establece tus criterios una vez y deja que el flujo de tratos llegue a ti. Entre más capital despliegues a través de PML, más crece tu perfil de prestamista — atrayendo mejores prestatarios con historiales sólidos. Escala tu cartera sin escalar tus costos operativos." },
          { title: "Busca a los mejores prestatarios en todo el país", desc: "Filtra tratos por estado, tamaño del préstamo, LTV, tipo de propiedad y calificación del prestatario. Cada prestatario en PML tiene su identidad verificada con un historial de pagos real. Encuentra al operador adecuado para tu capital — sin importar en qué parte del país estén." },
          { title: "Analiza tratos y prestatarios en minutos — con IA", desc: "La IA de PML detecta señales de alerta antes de que fondees — advertencias de LTV, puntajes de confianza del ARV, brechas en el alcance y análisis del historial del prestatario. Lo que antes tomaba horas de debida diligencia, ahora toma minutos. Toma mejores decisiones, más rápido. Próximamente." }
        ]
      },
      how: {
        label: "Cómo funciona",
        title: "Tres pasos. Cero complicaciones.",
        sub: "Tú pones el capital. PML hace el resto.",
        steps: [
          { title: "Configura tus criterios una vez", desc: "Dile a PML tus preferencias de préstamo — estados, tamaños de préstamo, LTV máximo, tipos de propiedad, tasa mínima. Toma 5 minutos. Tu feed mostrará automáticamente tratos de prestatarios verificados que encajen." },
          { title: "Explora tratos y haz ofertas", desc: "Cada trato muestra finanzas completas — precio de compra, ARV, LTV, presupuesto de remodelación, calificación del prestatario. Entra, establece tus términos, envía una hoja de términos. El prestatario acepta, hace contraoferta o rechaza. Todo en la plataforma." },
          { title: "Recibe pagos. PML hace el resto.", desc: "Una vez fondeado, PML rastrea cada pago, envía recordatorios al prestatario, gestiona aprobaciones de retiros, genera cartas de liquidación y te notifica de toda actividad. Tú revisas y apruebas. Así de simple." }
        ]
      },
      calc: {
        title: "Ve lo que tu dinero puede ganar.",
        sub: "Los prestamistas privados en PML promedian un 10–13% anual. Cero carga administrativa. Ajusta los controles para ver tus retornos proyectados.",
        cap: "Capital a desplegar",
        rate: "Tasa de interés promedio",
        loans: "Número de préstamos",
        mo: "Ingreso mensual por interés",
        moSub: "Pagos de solo interés de los prestatarios",
        yr: "Ingreso anual por interés",
        yrSub: "Asumiendo despliegue completo",
        total: "Retorno total del año 1",
        totalSub: "Los prestamistas conservan el 90% del interés en tratos conectados por PML",
        loansSuffix: "préstamos"
      },
      cta: {
        title: "Conviértete en un Imán de Tratos.",
        sub: "Escanea tratos. Despliega tu capital. Nosotros hacemos el resto. Los prestamistas siempre usan PayMyLoan.ai gratis.",
        btn1: "Crear cuenta gratis",
        btn2: "Explorar tratos abiertos"
      }
    },
    // --- NUEVO OBJETO INFO PRESTAMISTA ---
    lenderInfo: {
      demo: {
        eyebrow: "Cómo funciona",
        title: "Prestatarios listos y calificados.",
        subtitle: "Los inversores están publicando tratos de fix-and-flip, préstamos puente y rentas a largo plazo en tu área. Evalúa perfiles reales y despliega capital sin comisiones ocultas.",
        steps: [ { num: "1", label: "Crea tu Perfil Gratis" }, { num: "2", label: "Filtra Tratos por LTV y ARV" }, { num: "3", label: "Revisa Calificación PML" }, { num: "4", label: "Emite Cartas de Compromiso" }, { num: "5", label: "Cobra Pagos ACH Mensuales" } ],
        benefits: [ { title: "Verifica historial, comps y números del trato" }, { title: "Evalúa el LTV y la calificación PML del prestatario" }, { title: "Envía ofertas en un solo clic, totalmente gratis" }, { title: "Rastreo de pagos y tabla de amortización" }, { title: "Genera Cartas de Pago (Payoff) en segundos" }, { title: "Comparte acceso seguro con tu contador" } ],
        ctaTitle1: "Inversores buscan ", ctaTitle2: "tu capital.",
        ctaSub: "Únete gratis y explora tratos en vivo de prestatarios verificados hoy mismo. Sin cuotas mensuales ni cobros ocultos por invertir tu dinero.",
        btn1: "Ver tratos ahora →", btn2: "Ver mapa de tratos"
      },
      calculator: {
        eyebrow: "Calculadora de Retornos",
        title: "Ve lo que tu dinero puede ganar.",
        subtitle: "Ajusta la calculadora para ver tus retornos proyectados. Los prestamistas en PML promedian entre 11-13% anual con cero administración.",
        probs: [ { title: "Capital a Desplegar" }, { title: "Tasa de Interés Promedio" }, { title: "Número de Préstamos" } ]
      },
      who: {
        eyebrow: "Tipos de Prestamista",
        title: "Dos tipos de prestamistas. Una plataforma.",
        subtitle: "Ya sea que lleves años prestando o apenas vayas a iniciar, PML soluciona lo que cada inversor necesita.",
        cards: [
          { icon: "💼", title: "Prestamista Experimentado", bullets: ["Sabes qué buscar en un prestatario sólido", "Buscas volumen sin ahogarte en PDFs", "Prefieres liquidaciones automáticas", "Requieres reportes limpios para impuestos"] },
          { icon: "🏗️", title: "Prestamista Nuevo", bullets: ["Tienes el capital listo pero no la red", "Necesitas ayuda evaluando el ARV y LTV", "Buscas historiales de pago confiables", "Quieres seguridad y contratos estándar"] }
        ]
      },
      diff: {
        title: "PML vs. la forma antigua",
        subtitle: "Plataformas opacas, fondos compartidos y correos sueltos — o una plataforma directa.",
        table: {
          hPml: "PayMyLoan.ai", hC1: "La forma antigua",
          rows: [
            { label: "Sourcing de tratos", pml: "Filtra tratos en vivo cerca de ti", c1: "Depender de contactos y networking lento" },
            { label: "Evaluación de riesgo", pml: "Score PML, FICO y ARV auto-verificados", c1: "Adivinar y pedir reportes de crédito manuales" },
            { label: "Transparencia de capital", pml: "Tu dinero, tus tratos directos (1 a 1)", c1: "Fondos de inversión (REIT) donde pierdes el control" },
            { label: "Cierres", pml: "Carta de compromiso digital e instantánea", c1: "Idas y vueltas con notarias y abogados" },
            { label: "Cobranza", pml: "Pagos ACH automatizados cada mes", c1: "Rezar para que te hagan la transferencia" },
            { label: "Costo de uso", pml: "Siempre gratis para el prestamista", c1: "Pagar tarifas de plataforma o management fees" }
          ]
        },
        mantra: { h1: "Empieza a ", h2: "ganar ", h3: "rendimientos ", h4: "con tu dinero ", h5: "hoy", h6: " mismo.", p: "Los prestamistas usan la plataforma sin costo. Sin tarifas mensuales ni costos ocultos. Solo retornos." }
      }
    },

    borrowerLanding: {
      hero: {
        badge: "Para Prestatarios Inmobiliarios",
        title1: "Tú traes el trato.",
        title2: " Nosotros el resto.",
        sub: "Muestra a los prestamistas quién eres, de qué trata el trato y por qué cuadran los números — en minutos. Consigue fondeo, mantén feliz a tu prestamista y pasa al siguiente trato. PML se encarga de todo lo demás.",
        btn1: "Publicar trato gratis",
        btn2: "Mira cómo funciona"
      },
      proof: {
        items: [
          { val: "24–72 hrs", label: "Tiempo prom. para 1ra oferta" },
          { val: "$0", label: "Al publicar con enlace afiliado" },
          { val: "Sin buró", label: "Solo préstamos sobre activos" },
          { val: "1-clic", label: "Cartas de liquidación y retiros" }
        ]
      },
      features: {
        label: "Lo que obtienes",
        title: "Conviértete en un Profesional.",
        sub: "Todo lo que necesitas para encontrar dinero rápido, cerrar limpio y seguir volviendo.",
        cards: [
          { title: "No más errores ni desorganización", desc: "Cada documento, trato y pago vive en un solo lugar. Hojas de términos, retiros, extensiones, cartas de liquidación — organizados automáticamente. No más buscar en correos o perder papeleo." },
          { title: "No más pagos perdidos", desc: "Recordatorios automáticos antes de cada vencimiento. Tu panel muestra exactamente qué se debe y cuándo. Paga a tiempo siempre — protege tu relación con el prestamista y tu calificación." },
          { title: "Liquidaciones en minutos", desc: "Elige la fecha y PML genera el monto exacto al instante — calculado a la tasa original de tu contrato en un año de 360 días. PDF oficial listo en segundos. Sin llamadas ni matemáticas." },
          { title: "Construye tu Score PML", desc: "Cada pago a tiempo, liquidación limpia y retiro completado construye tu calificación. Los prestamistas lo ven antes de fondear. Mejor score = aprobaciones rápidas, mejores tasas y más competencia por tus tratos." },
          { title: "Únete al mercado de fondeo", desc: "Publica tu trato y entra a un mercado de prestamistas privados verificados buscando desplegar capital. Sin brokers. Sin intermediarios. Los prestamistas compiten — tú eliges la mejor oferta." },
          { title: "Usa IA para presentar tus tratos", desc: "La IA de PML analiza tu trato y te ayuda a presentarlo de la mejor manera — confianza en ARV, claridad del alcance, LTV. Entra al mercado con un pitch que destaque. Próximamente." }
        ]
      },
      how: {
        label: "Cómo funciona",
        title: "Publica tu trato. Consigue fondeo. Repite.",
        sub: "Sin bancos. Sin brokers. Sin rodeos.",
        steps: [
          { title: "Publica tu trato en 5 minutos", desc: "Ingresa la dirección, monto, ARV y presupuesto de remodelación. Tu trato se publica de inmediato — prestamistas verificados en tu mercado lo ven y pueden enviarte ofertas." },
          { title: "Los prestamistas compiten. Tú eliges.", desc: "Múltiples prestamistas pueden enviarte hojas de términos. Compara tasas, plazos, puntos y tarifas lado a lado. Acepta, contraoferta o rechaza con un clic. Sin brokers en el medio." },
          { title: "PML maneja todo después del cierre.", desc: "Recordatorios de pago, retiros, cartas de liquidación, extensiones — todo en tu panel. Mantén feliz a tu prestamista, construye tu calificación y vuelve para tu siguiente trato con un historial más fuerte." }
        ]
      },
      cta: {
        title1: "Tú traes el trato.",
        title2: "Nosotros el resto.",
        sub: "Publica gratis con un código de referido, o $99/mes. Sin bancos, sin revisión de crédito, sin rodeos. Los prestamistas en tu mercado están listos ahora mismo.",
        btn1: "Publicar trato gratis",
        btn2: "Ver una demo en vivo"
      }
    },

    modes: { lender: "💰 Tengo Fondos", borrower: "🏗️ Busco Fondeo" },
    tabs: {
      lender: ["Info", "Tratos en Vivo", "Demo", "Problemas que Resolvemos", "Para Quién Es", "Diferenciadores"],
      borrower: ["Info", "Encontrar Prestamistas", "Demo", "Problemas que Resolvemos", "Para Quién Es", "Diferenciadores"]
    },
    sidebar: {
      title: "Comienza Gratis", subLender: "Gratis para siempre para prestamistas.", subBorrower: "Publica tu primer trato gratis.",
      emailPh: "Correo electrónico", passPh: "Contraseña", btnCreate: "Crear Cuenta Gratis →", or: "o", btnSignIn: "Iniciar Sesión",
      noteLender: "Gratis para siempre. Sin tarjeta de crédito.", noteBorrower: "Gratis por 7 días. Tarjeta requerida para activar.",
      postLenderQ: "¿Buscas fondear un trato?", postLenderA: "→ Explorar Tratos", postBorrowerQ: "¿Ya tienes cuenta?", postBorrowerA: "→ Publicar un Trato"
    },
    placeholders: { liveDeals: "La vista del Mapa y las Tarjetas de Tratos irán aquí...", demo: "El video demo irá aquí...", problems: "El grid de problemas irá aquí...", who: "Las tarjetas de para quién es irán aquí...", diff: "La tabla comparativa irá aquí..." }
  },

  welcomeModal: { brand: "PayMyLoan", brandSuffix: ".ai", tagline: "Préstamos privados — simplificados.", question: "¿Cómo podemos ayudarte hoy?", lender: { icon: "💰", title: "¿Tienes fondos para desplegar?", sub: "Quiero fondear tratos inmobiliarios" }, borrower: { icon: "🏗️", title: "¿Quieres fondear un trato?", sub: "Necesito capital para mi siguiente trato" }, signin: { icon: "🔑", title: "Iniciar sesión", sub: "Accede a tu portal" } },
  nav: { skip: "Saltar al formulario de registro", brand: "PayMyLoan", brandSuffix: ".ai", links: [ { href: "#como-funciona", label: "Cómo funciona" }, { href: "#costo", label: "Costo de la plataforma" }, { href: "#seguridad", label: "Seguridad" }, ], features: "Funcionalidades", howItWorks: "Cómo funciona", login: "Iniciar sesión", logout: "Cerrar sesión", cta: "Ingresar", themeToggle: "Cambiar tema", langToggle: "Cambiar idioma", backToDashboard: "Volver al panel", },
  landingNav: { lenders: "Para Prestamistas", borrowers: "Para Prestatarios", why: "Por qué PML", demo: "Demo", affiliates: "Afiliados", signIn: "Iniciar sesión", getStarted: "Comenzar gratis" },
  hero: { eyebrow: "Servicing de préstamos privados", title: "Un solo saldo en el que ambos confían.", deck: "PayMyLoan.ai administra préstamos privados con garantía inmobiliaria: el prestatario paga por ACH, el prestamista ve exactamente qué se pagó y de qué propiedad, y ambos trabajan sobre los mismos términos, documentos y saldo.", points: [ "Pago por ACH: 0.8% con tope de $5.00 por transacción", "Términos aceptados por las dos partes, con fecha, hora e IP", "Verificación en dos pasos obligatoria para prestamistas", ], trustLabel: "Operado por", trust: [ "Dueño a Dueño LLC", "Pagos procesados por Stripe", "ACH Direct Debit", ], },
  form: {
    title: "Crea tu cuenta",
    subtitle: "Unete gratis. No requiere tarjeta de credito.",
    intents: [
      { value: "borrower", label: "Tengo un trato", hint: "Prestatario" },
      { value: "lender", label: "Tengo capital", hint: "Prestamista" }
    ],
    firstName: "Nombre",
    firstNamePh: "Juan",
    lastName: "Apellido",
    lastNamePh: "Perez",
    email: "Correo electronico",
    emailPh: "juan@ejemplo.com",
    phone: "Telefono celular",
    phonePh: "(901) 555-0100",
    phoneHint: "Para alertas de tratos y seguridad de la cuenta.",
    password: "Contraseña",
    passwordPh: "Al menos 8 caracteres",
    submit: "Crear cuenta",
    submitting: "Creando...",
    or: "o",
    googleAuth: "Continuar con Google",
    termsPre: "Al crear una cuenta, aceptas nuestros ",
    termsLink: "Terminos de Servicio",
    termsAnd: " y ",
    privacyLink: "Aviso de Privacidad",
    termsPost: ".",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Inicia sesion",
    errors: {
      summary: "Revisa los campos marcados.",
      firstName: "Ingresa tu nombre.",
      lastName: "Ingresa tu apellido.",
      email: "Ingresa un correo valido.",
      phone: "Ingresa un telefono de 10 digitos.",
      password: "La contraseña debe tener al menos 8 caracteres.",
      intent: "Elige tu tipo de cuenta.",
      submit: "Error al crear la cuenta. Intenta de nuevo.",
    },
    success: {
      title: "Revisa tu correo",
      subtitle: "Enviamos un enlace de confirmacion a",
      step1Pre: "Abre el correo de ",
      step1Bold: "PayMyLoan.ai",
      step2Pre: "Haz clic en ",
      step2Bold: "Confirmar mi correo electronico",
      step3: "Seras llevado directamente a tu panel",
      resend: "Reenviar correo de confirmacion",
      resendDone: "¡Enviado!",
      spamPre: "¿No lo encuentras? Revisa tu ",
      spamBold: "carpeta de spam",
      spamPost: " y marcanos como seguros.",
      again: "Usar otro correo"
    }
  },
  loginPage: { title: "Inicia sesión", subtitle: "Ingresa tus credenciales para administrar préstamos.", cardTitle: "ACCESO SEGURO", emailLabel: "Correo electrónico", emailPlaceholder: "correo@ejemplo.com", passwordLabel: "Contraseña", passwordPlaceholder: "Ingresa tu contraseña", submit: "INGRESAR", forgot: "OLVIDÉ MI CONTRASEÑA", back: "VOLVER AL INICIO", noAccount: "¿Aún no tienes cuenta?", signup: "Regístrate aquí", processing: "Procesando...", twoFactorTitle: "VERIFICACIÓN 2FA", twoFactorDesc: "Ingresa el código de 6 dígitos de tu aplicación autenticadora o un código de recuperación.", twoFactorLabel: "Código de verificación", twoFactorPlaceholder: "Ej. 123456", twoFactorVerifying: "Verificando...", twoFactorConfirm: "CONFIRMAR", twoFactorCancel: "Cancelar", errorDefault: "Error al iniciar sesión", error2FA: "Código 2FA incorrecto o expirado", errorNetwork: "Error de red desconocido", },
  pmlHero: { badge: "Gestión de Préstamos con IA", subtitle: "PML — Prestamista de Dinero Privado. PayMyLoan.ai. Ambas partes del acuerdo.", title1: "De la propuesta", title2: "al pago final.", title3: "Una sola plataforma.", by: "por PayMyLoan.ai", desc: "La propuesta. La solicitud de préstamo. El compromiso. El procesamiento de pagos. La liquidación. Todo en un solo lugar — tanto para prestatarios como para prestamistas.", cta1: "Quiero acceso anticipado", cta2: "Ver cómo funciona", },
  whoItHelps: { eyebrow: "A quién ayuda", title1: "Una plataforma.", title2: "Seis problemas resueltos.", lead: "PML elimina el caos de los préstamos privados — dando a los prestatarios claridad y a los prestamistas control, para que cada trato se cierre limpiamente.", cards: [ { role: "Prestatario", icon: "🏗️", title: "Del pitch al pago en un solo lugar", points: [ "Todos los préstamos en un solo panel", "Genera pitches y cartas de compromiso", "Pagos automatizados — nunca más te atrases", "Pagos finales instantáneos y calificación PML" ] }, { role: "Prestamista", icon: "🏦", title: "Sabe quién pagó, qué se debe y qué sigue", points: [ "Seguimiento de pagos de todos los prestatarios", "Evalúa prestatarios antes de comprometer capital", "Genera cartas de compromiso y pagos finales", "Controla tu visibilidad en el mercado" ] }, { role: "Contador Interno", icon: "📒", title: "Registros limpios, cero persecuciones", points: [ "División de capital vs interés en cada pago", "Cada préstamo vinculado a una propiedad", "Registros exportables — sin captura manual", "No más correos mensuales pidiendo detalles" ] }, { role: "Contador Público", icon: "🧾", title: "Listo para el cierre anual — a un clic", points: [ "Ingresos y gastos por intereses separados claramente", "Cada préstamo documentado por propiedad", "Reporte anual completo — exportable al instante", "No más rebuscar en correos para obtener registros" ] }, { role: "Compañía de Títulos", icon: "🏛️", title: "Pagos finales antes del cierre — no después", points: [ "Estados de liquidación enviados directamente", "Ambas partes confirmadas con la misma cifra", "Sin apuros de último minuto en la mesa de firma", "Cierres limpios en cada ocasión" ] }, { role: "Aseguradora", icon: "🛡️", title: "Cláusula hipotecaria — precisa siempre", points: [ "Datos del prestamista extraídos de su perfil PML", "Cláusula de acreedor hipotecario siempre al día", "Sin solicitudes manuales de detalles del prestamista", "Cada propiedad y préstamo documentado" ] } ], stats: [ { value: "< 30s", label: "Pago final generado" }, { value: "2", label: "Lados. Una plataforma." }, { value: "0", label: "Hojas de cálculo necesarias" }, { value: "100%", label: "Listo para el CPA a fin de año" } ] },
  beforeAfter: { eyebrow: "Antes vs Después", title: "Dos inversores. Mismo negocio. Diferentes herramientas.", before: { badge: "Sin PML", icon: "😤", items: [ "Prestatario: ni idea a quién llamar para obtener una respuesta rápida del prestamista", "Prestatario: préstamos dispersos en 3 bancos, 2 prestamistas privados y una hoja de cálculo", "Prestatario: tu contador persiguiéndote cada mes para explicar qué préstamo es cuál", "Prestamista: ni idea de quién pagó, cuánto o cuándo — hasta que algo sale mal", "Prestamista: carrera de último minuto para calcular el pago final mientras la notaría espera" ] }, after: { badge: "Con PML", icon: "😎", items: [ "Prestatario: todos los préstamos en un solo lugar — cada saldo, cada pago, cada propiedad", "Prestatario: envía tu pitch y carta de compromiso a un prestamista en minutos", "Prestatario: pago final generado al instante — sin esperas, sin idas y vueltas", "Prestamista: sabes exactamente quién pagó, qué cantidad y cuándo — en tiempo real", "Prestamista: historial de pagos e intereses listos para entregar directo a tu contador" ] } },
  soundFamiliar: { eyebrow: "¿Te suena familiar?", title: "Los préstamos de dinero privado funcionan en caos. No tiene por qué ser así.", cards: [ { role: "Prestatario", icon: "📝", title: "“Armar un pitch toma una eternidad.”", desc: "Dar formato a un resumen del trato, solicitud de préstamo y carta de compromiso para cada prestamista toma horas de trabajo manual. PML genera todo en minutos." }, { role: "Prestatario", icon: "🤝", title: "“La carta de compromiso está en algún lugar de mi correo.”", desc: "Las cartas de compromiso se pierden en hilos, sin firmar o extraviadas. PML mantiene cada compromiso vinculado al préstamo desde el primer día." }, { role: "Prestatario", icon: "💳", title: "“El procesamiento de pagos es un desastre.”", desc: "Transferencias manuales, Zelle, cheques — no hay un sistema consistente. PML centraliza el procesamiento de pagos para que cada transacción sea rastreada y confirmada." }, { role: "Prestamista", icon: "📋", title: "“¿Dónde está la solicitud del prestatario?”", desc: "Los prestamistas necesitan una solicitud estandarizada de cada prestatario antes de comprometerse. PML da a los prestatarios una solicitud integrada que alimenta directamente al prestamista." }, { role: "Prestamista", icon: "🔍", title: "“Necesito verificar a quién le estoy prestando.”", desc: "Búsqueda de entidades, verificación de antecedentes, historial crediticio — los prestamistas arriesgan capital real y necesitan evaluar a los prestatarios. PML centraliza esa debida diligencia en un solo lugar." }, { role: "Prestamista", icon: "🏘️", title: "“No tengo un flujo de tratos consistente.”", desc: "Los prestamistas con capital ocioso necesitan que los prestatarios calificados los encuentren. El mercado de PML conecta a los prestamistas con flujo de tratos evaluado automáticamente." }, { role: "Prestamista", icon: "📊", title: "“Mi contador necesita el desglose de intereses — otra vez.”", desc: "PML rastrea el capital vs. intereses en cada pago y exporta reportes limpios que tu contador realmente puede usar." }, { role: "Prestatario", icon: "💸", title: "“Olvidé hacer el pago.”", desc: "Las transferencias manuales se olvidan. Los pagos atrasados dañan las relaciones con los prestamistas y pueden detonar cláusulas de incumplimiento. PML automatiza los pagos para que nada se escape." } ], solution: { icon: "✅", title: "PML arregla ambos lados.", desc: "Una plataforma. Los prestatarios obtienen claridad, velocidad y organización. Los prestamistas obtienen rastreo de pagos, registros de intereses y liquidaciones instantáneas. Construido para dinero privado." } },
  liveActivity: { eyebrow: "Actividad en vivo", title1: "El mercado monetario privado,", title2: "en tiempo real.", desc: "Cada solicitud de préstamo, cada trato activo, cada transacción cerrada — rastreada en PML.", stats: { requested: { label: "Préstamos Solicitados", value: "47", desc: "Solicitudes de préstamo activas en el mercado", live: "EN VIVO" }, current: { label: "Préstamos Actuales", value: "312", desc: "Préstamos siendo administrados activamente", metric: "$48.2M total pendiente" }, closed: { label: "Préstamos Cerrados", value: "1,204", desc: "Total de tratos completados en PML", metric: "$187.4M total fondeado ✓" } }, map: { title: "Actividad de Tratos — Estados Unidos", legendRequested: "Solicitado", legendCurrent: "Actual", legendClosed: "Cerrado" } },
  comingSoon: { eyebrow: "Próximamente", title1: "El Mercado de ", title2: "Dinero Privado.", desc: "Donde los prestatarios con tratos se conectan directamente con prestamistas que tienen capital listo para desplegar. Dentro de PML, los prestatarios pueden generar un pitch deck, crear una carta de compromiso y obtener fondeo — todo en un solo lugar.", card1: { eyebrow: "Para Prestamistas", title: "Explora Prestatarios Buscando Capital", desc: "Ve un feed en vivo de prestatarios buscando fondos activamente. Revisa el perfil PML de cada prestatario — historial de préstamos, pagos a tiempo, total pedido — antes de comprometer un solo dólar.", points: [ "Explora solicitudes de préstamo activas con detalles completos", "Revisa la Calificación PML + perfil completo antes de comprometerte", "Envía hojas de términos directamente dentro de la plataforma", "Construye tu perfil de prestamista — tratos fondeados, capital desplegado, tiempo de respuesta, calificación" ] }, card2: { eyebrow: "Perfiles PML", title: "Ambas Partes Construyen Credibilidad.", desc: "Prestatarios y prestamistas ganan un perfil público de PML basado en su historial real dentro de la plataforma.", borrowerLabel: "Perfil del Prestatario", borrowerStats: [ { label: "Préstamos Totales", value: "14" }, { label: "Tasa de Pago a Tiempo", value: "97%" }, { label: "Total Pedido", value: "$2.4M" }, { label: "Calificación PML", value: "A+" } ], lenderLabel: "Perfil del Prestamista", lenderStats: [ { label: "Tratos Fondeados", value: "31" }, { label: "Total de Capital Desplegado", value: "$4.1M" }, { label: "Tiempo Prom. de Respuesta", value: "< 24hrs" }, { label: "Calificación PML", value: "A+" } ] } },
  featuresGrid: { eyebrow: "Qué obtienes", title: "Todo para gestionar préstamos privados limpiamente.", items: [ { label: "01 — PRESTATARIO", title: "Todos los préstamos en un solo lugar", desc: "Cada préstamo privado, cada propiedad, cada saldo — un solo panel. Se acabó el buscar entre correos y hojas de cálculo." }, { label: "02 — PRESTATARIO", title: "Estados de cuenta de liquidación al instante", desc: "Genera una liquidación exacta al día en segundos. Envíala directo a la compañía de títulos. Sin esperar a tu prestamista." }, { label: "03 — PRESTATARIO", title: "Generador de propuestas (Pitch Deck)", desc: "Llena los datos de tu trato dentro de PML y genera al instante una propuesta profesional para enviar a los prestamistas — detalles de la propiedad, solicitud, términos y finanzas formateados automáticamente." }, { label: "04 — PRESTAMISTA", title: "Rastreo de pagos", desc: "Sabe exactamente quién pagó, cuánto y cuándo. Cada prestatario. Cada préstamo. Siempre al día." }, { label: "05 — PRESTAMISTA", title: "Rastreo de intereses para contadores", desc: "División de capital vs interés en cada pago — limpio, exportable y listo para tu contador o CPA." }, { label: "06 — AMBOS", title: "Mismos números, ambas partes", desc: "Prestatario y prestamista inician sesión y ven los mismos datos en vivo. Sin disputas. Sin sorpresas en el cierre. Nunca." } ] },
  dashboardSplit: { eyebrow: "Tablero", title: "Ambas partes ven la misma verdad.", desc1: "Prestatarios y prestamistas tienen un inicio de sesión privado con datos del préstamo en vivo. Lo que debes y lo que te deben — siempre sincronizado.", desc2: 'No más llamadas preguntando "¿cuál es mi saldo?". No más disputas en el cierre. Todos ven el mismo número.', mockLogo: "PML.ai", mockBadge: "● En vivo", mockCard1Label: "Liquidación total — Válida hasta el 31 de Ago", mockCard1Value: "$292,955.54", mockCard1Sub: "↓ $95.34/día después del 31 de Ago", mockCard2Label: "Capital", mockCard2Value: "$290,000", mockCard3Label: "Interés Acumulado", mockCard3Value: "$2,955.54", },
  profilesDirectory: { eyebrow: "Perfiles y Directorio", title1: "Tu reputación ", title2: "te sigue.", desc: "Cada trato, cada pago, cada préstamo construye tu perfil PML. Los prestatarios encuentran prestamistas. Los prestamistas evalúan a los prestatarios. Ambas partes saben exactamente con quién están tratando.", borrower: { badge: "Perfil del Prestatario", name: "Liam Brown", location: "Memphis, TN · Inversor Inmobiliario", stat1Label: "Préstamos Totales", stat1Value: "14", stat2Label: "Tasa de Pago a Tiempo", stat2Value: "97%", stat3Label: "Calificación PML", stat3Value: "A+" }, lender: { badge: "Directorio de Prestamistas", title: "Encuentra un Prestamista", subtitle: "Busca prestamistas activos en préstamos privados", lender1Name: "NextGen Growth LLC", lender1Desc: "Memphis, TN · Hasta $500K · 10–13%", lender1Deals: "31 tratos", lender2Name: "Private Capital Group", lender2Desc: "Nashville, TN · Hasta $1M · 10–12%", lender2Deals: "18 tratos", lender3Name: "Préstamos Southland LLC", lender3Desc: "Birmingham, AL · Hasta $300K · 11–14%", lender3Deals: "9 ofertas" } },
  pmlCta: { title1: "Tus préstamos,", title2: "organizados.", brand: "PML", brandSuffix: " — PayMyLoan.ai", desc: "Únete a la lista de acceso anticipado. Sé de los primeros cuando lancemos." },
  pmlFooter: { by: "por PayMyLoan.ai", rights: "PML / PayMyLoan.ai — Préstamos Privados, Finalmente Organizados." },
  benefits: { eyebrow: "Qué resuelve", title: "Lo que hoy vive en hojas de cálculo y correos sueltos.", lead: "Un préstamo privado se administra hoy con transferencias por separado y una hoja que solo una de las partes mantiene. Nadie tiene una sola fuente de verdad sobre cuánto se debe, cuánto de eso fue capital y cuándo vence.", items: [ { title: "Términos que ambos aceptaron", body: "Propiedad, monto, tasa, estructura y vencimiento se capturan una vez y las dos partes los aceptan dentro de la plataforma. Los términos aceptados no se editan encima: un cambio genera una versión nueva que vuelve a pedir la aceptación de ambos.", }, { title: "El saldo se calcula, no se negocia por correo", body: "Calendario completo con desglose de capital, interés y saldo remanente, para interest only, amortizado a plazo o con balloon. Cada pago que entra se aplica con una regla explícita: mora, después interés, después capital.", }, { title: "Un ACH devuelto no se ve como cobrado", body: "El ACH liquida en días hábiles y puede devolverse. Mientras eso pasa el pago se muestra en tránsito, no como recibido, y la devolución avisa a las dos partes. Es la diferencia entre un saldo real y uno optimista.", }, ], },
  how: { eyebrow: "Cómo empieza", title: "Cuatro pasos hasta el primer calendario de pagos.", steps: [ { title: "Crea tu cuenta", body: "Cualquiera de las dos partes da de alta el préstamo y captura la propiedad que queda en garantía: dirección, tipo y, si la tienes, la parcela.", }, { title: "Invita a la otra parte", body: "Se envía por correo un enlace de acceso único. Quien lo recibe crea su contraseña y entra directo al préstamo, sin buscar nada.", }, { title: "Ambos aceptan los términos", body: "La contraparte revisa monto, tasa, plazo y vencimiento. Acepta, o rechaza con comentario. Cada aceptación queda registrada con fecha, hora e IP.", }, { title: "El préstamo se activa", body: "Con las dos aceptaciones se genera el calendario de pagos y ambos ven el mismo saldo desde su tablero.", }, ], },
  cost: { eyebrow: "Costo de la plataforma", title: "Estructura transparente, sin comisiones ocultas.", lead: "Los costos están definidos. El procesamiento ACH cuesta el costo base de ACH + $9/mes por préstamo (topado a $99/mes).", tableHead: ["Tipo de Tarifa", "Monto", "Cuándo se cobra"], rows: [ ["Suscripción Prestatario", "$9.00 / mes", "Mensual tras 7 días de prueba"], ["Aplicación / Vetting", "$99.00", "Pago único al aplicar"], ["Conexión Marketplace", "1% (Mín. $999)", "Solo al cierre (Tratos públicos)"], ["Tratos Privados", "$0.00", "Invitación directa"], ["Procesamiento ACH", "Costo ACH + $9", "Mensual por préstamo (Max $99)"], ], compareLabel: "Aviso Legal de la Plataforma", compare: "Dueño a Dueño LLC opera únicamente como una plataforma de conexión tecnológica. No somos prestamistas ni brókers. Todas las tarifas se desglosan antes del cierre.", pendingLabel: "Sobre las tarifas del Prestamista", pending: "Los prestamistas configuran sus propias tarifas (Originación, Procesamiento, Underwriting, Doc Prep) y penalizaciones, las cuales se suman a tu Carta de Compromiso.", },
  security: { eyebrow: "Seguridad", title: "Aquí se mueve dinero de terceros. El acceso se trata así.", items: [ { title: "Verificación en dos pasos obligatoria", body: "Para prestamistas no es opcional: son quienes controlan a dónde va el dinero.", }, { title: "Permisos por préstamo, no por rol global", body: "Cada consulta se filtra por tu participación en ese préstamo. No hay rol que abra todo.", }, { title: "Nunca guardamos números de cuenta", body: "Stripe guarda el método de pago. Nosotros guardamos su identificador y los últimos cuatro dígitos.", }, { title: "Bitácora de los eventos que importan", body: "Cambios de términos, aceptaciones, aprobación de payoff, cambio de cuenta bancaria y descarga de documentos quedan registrados.", }, { title: "Aviso ante cualquier cambio bancario", body: "Se notifica a las dos partes. Es el vector de fraude clásico en servicing y se trata como tal.", }, { title: "Documentos privados por préstamo", body: "Pagaré, deed of trust y settlement statement se sirven con enlace de vigencia corta, nunca con URL pública.", }, ], },
  finalCta: { eyebrow: "Empieza", title: "Da de alta tu primer préstamo.", body: "Crea la cuenta, captura los términos e invita a la otra parte. El calendario se genera cuando ambos aceptan.", cta: "Crear cuenta", },
  footer: { tagline: "Servicing de préstamos privados con garantía inmobiliaria.", entity: "Subsidiaria de Dueño a Dueño LLC", links: [ { href: "#", label: "Términos de servicio" }, { href: "/aviso-de-privacidad", label: "Aviso de privacidad" }, ], linksNote: "Términos de servicio: [PENDIENTE DE REDACCIÓN]", rights: "Todos los derechos reservados.", },
  privacy: { eyebrow: "Legal", title: "Aviso de privacidad", updated: "Última actualización: 28 de agosto de 2026", back: "Volver al inicio", intro: [ "Este aviso explica qué datos personales recaba PayMyLoan.ai, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos sobre ellos.", "PayMyLoan.ai está en fase de acceso anticipado: hoy solo recabamos los datos del formulario de lista de espera. Antes de activar el servicing completo de préstamos, actualizaremos este aviso para cubrir los datos del préstamo —propiedad en garantía, términos, pagos y documentos— que se sumarán entonces.", ], sections: [ { heading: "1. Quién es responsable de tus datos", paragraphs: [ "PayMyLoan.ai es la marca bajo la que Dueño a Dueño LLC opera este sitio y, más adelante, la plataforma de servicing de préstamos privados.", "Domicilio para efectos de este aviso: [PENDIENTE DE DEFINIR].", "Ley aplicable y autoridad ante la que puedes acudir si no resolvemos tu solicitud: [PENDIENTE DE DEFINIR].", ], }, { heading: "2. Qué datos recabamos hoy", paragraphs: [ "Mientras estamos en acceso anticipado, el único dato que recabamos es el que dejas en el formulario de lista de espera:", ], list: [ "Nombre completo", "Correo electrónico", "Teléfono", "Contraseña, que se guarda cifrada; nadie en PayMyLoan.ai puede leerla en texto plano", "Si buscas dar un préstamo o recibir uno (solo define qué ves al entrar; no crea ninguna obligación)", "Que aceptaste los términos de servicio y este aviso, con fecha y hora", "Idioma en el que llenaste el formulario", ], }, { heading: "3. Qué datos vamos a recabar cuando actives un préstamo", paragraphs: [ "En cuanto dar de alta o aceptar un préstamo esté disponible, se sumarán los datos propios del servicing:", ], list: [ "Dirección, tipo y, si aplica, número de parcela de la propiedad en garantía", "Monto, tasa, estructura y vencimiento del préstamo, y cada versión de esos términos que aceptaste", "Historial de pagos: fecha, monto y cómo se aplicó a mora, interés y capital", "El identificador de tu método de pago y sus últimos cuatro dígitos; el número de cuenta completo lo guarda Stripe, no nosotros", "Los documentos del préstamo que aceptaste: pagaré, deed of trust y settlement statement", "Fecha, hora e IP de cada aceptación de términos, cambio de cuenta bancaria y descarga de documento", ], }, { heading: "4. Para qué usamos tus datos", paragraphs: [], list: [ "Avisarte cuando tu acceso a la plataforma esté listo", "Crear tu cuenta y, más adelante, administrar el préstamo que diste o que estás pagando", "Calcular el saldo, aplicar pagos y generar el calendario de pagos", "Verificar tu identidad y activar la verificación en dos pasos, obligatoria para prestamistas", "Detectar y avisar de cambios sospechosos, como un cambio de cuenta bancaria", "Cumplir obligaciones legales y fiscales relacionadas con el servicing de préstamos", ], note: "No usamos tus datos para publicidad ni los vendemos a terceros.", }, { heading: "5. Con quién compartimos tus datos", paragraphs: [], list: [ "Con la otra parte del mismo préstamo, pero solo lo necesario para administrarlo: no ve tu contraseña ni el número completo de tu cuenta bancaria", "Con Stripe, que procesa los pagos por ACH y guarda el método de pago; nosotros solo guardamos su identificador y los últimos cuatro dígitos", "Con autoridades, si una ley o una orden judicial nos obliga", ], note: "No compartimos ni vendemos tus datos con fines de mercadotecnia.", }, { heading: "6. Cómo protegemos tus datos", paragraphs: [], list: [ "Verificación en dos pasos obligatoria para prestamistas, porque son quienes controlan a dónde va el dinero", "Permisos por préstamo: cada consulta se filtra por tu participación en ese préstamo específico, no por un rol que abre todo", "Nunca guardamos números de cuenta completos; eso vive en Stripe", "Bitácora de los eventos que importan: cambios de términos, aceptaciones, aprobación de payoff, cambio de cuenta bancaria y descarga de documentos", "Aviso a ambas partes ante cualquier cambio de cuenta bancaria, el vector de fraude más común en servicing", "Documentos privados por préstamo, servidos con enlaces de vigencia corta, nunca con URL pública", ], }, { heading: "7. Cuánto tiempo conservamos tus datos", paragraphs: [ "Si estás en la lista de espera, conservamos tus datos hasta que abras una cuenta o hasta que nos pidas eliminarlos.", "Si tienes un préstamo activo, conservamos los datos del préstamo mientras dure la relación y el tiempo adicional que exija la ley aplicable a documentos financieros. Plazo exacto: [PENDIENTE DE DEFINIR].", ], }, { heading: "8. Tus derechos y cómo ejercerlos", paragraphs: [ "Puedes pedirnos acceder a tus datos, corregirlos, cancelarlos u oponerte a un uso específico. También puedes retirar tu consentimiento en cualquier momento; para la lista de espera basta con que nos lo pidas. Retirar tu consentimiento no afecta el tratamiento que ya hicimos antes de la solicitud.", "Canal para ejercer estos derechos: [PENDIENTE DE DEFINIR — hoy no existe todavía un correo de contacto para PayMyLoan.ai].", ], }, { heading: "9. Cookies y almacenamiento local", paragraphs: [ "El sitio no usa cookies de rastreo ni de publicidad. Guarda dos preferencias en el almacenamiento local de tu navegador —tema claro u oscuro e idioma— que nunca salen de tu dispositivo. Puedes borrarlas desde la configuración de tu navegador.", ], }, { heading: "10. Menores de edad", paragraphs: [ "PayMyLoan.ai no está dirigido a menores de edad y no recaba a sabiendas datos de menores de 18 años.", ], }, { heading: "11. Cambios a este aviso", paragraphs: [ "Si cambiamos este aviso de forma importante —por ejemplo, al activar el servicing completo del préstamo— lo publicaremos aquí con una nueva fecha de actualización antes de tratar los datos nuevos.", ], }, { heading: "12. Contacto", paragraphs: [ "Correo de contacto para privacidad: [PENDIENTE DE DEFINIR].", "Mientras ese canal no exista, puedes usar el mismo correo con el que te registraste en la lista de espera; te responderemos desde ahí en cuanto esté disponible.", ], }, ], },
  dashboardAdmin: { title: "Panel de Administración", subtitle: "Métricas globales y salud de la plataforma.", metrics: { activeLoans: "Préstamos Activos", totalVolume: "Volumen Procesado (ACH)", platformRevenue: "Ingresos Totales (0.8%)", pendingVerifications: "Verificaciones Pendientes" }, recentActivity: "Actividad Reciente del Sistema", addUserBtn: "Agregar Usuario", viewUsersBtn: "Ver Usuarios", viewContractsBtn: "Ver Contratos", loading: "Cargando métricas...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al cargar datos del administrador.", errorNetwork: "Error de red desconocido" },
  adminUsersList: { title: "Usuarios del sistema", subtitle: "Directorio de administradores, prestamistas y prestatarios.", table: { name: "Nombre", type: "Tipo", email: "Correo electrónico", phone: "Teléfono", role: "Rol", status: "Estado" }, back: "Volver al panel", addUserBtn: "Agregar Usuario", loading: "Cargando usuarios...", empty: "No hay usuarios registrados.", errorAuth: "No tienes permisos de administrador o tu sesión expiró.", errorFetch: "Error al obtener usuarios.", errorNetwork: "Error de red desconocido", active: "Activo", inactive: "Inactivo", na: "N/D" },
  adminAddUser: { title: "Crear Usuario", subtitle: "Da de alta manualmente a un administrador, prestamista o prestatario.", roleLabel: "Rol en la plataforma", roles: { admin: "Administrador", lender: "Prestamista", borrower: "Prestatario" }, nameLabel: "Nombre completo", namePh: "Ej. Jane Doe", emailLabel: "Correo electrónico", emailPh: "correo@ejemplo.com", phoneLabel: "Teléfono", phonePh: "Ej. 555 123 4567", submit: "Registrar cuenta", back: "Volver al panel", submitting: "Registrando...", phoneHint: "Debe tener exactamente 10 dígitos (opcional).", errorFetch: "Error al crear el usuario.", errorNetwork: "Error de red desconocido", successTitle: "¡Usuario creado exitosamente!", successDesc1: "Se ha registrado la cuenta para", successTempPw: "Contraseña temporal generada:", successCreateAnother: "Crear otro", successViewList: "Ver listado" },
  twoFactorPage: {
    securityAlert: { title: "Verificacion de seguridad requerida", desc: "Cualquier cambio en la informacion bancaria, contraseñas o detalles de contacto requiere confirmacion de identidad." },
    contexts: {
      login: { title: "Verifica tu identidad", sub: "Enviamos un codigo de 6 digitos a tu telefono. Ingresalo abajo para continuar." },
      publish: { title: "Confirma tu identidad para publicar", sub: "Tu trato esta listo para publicarse. Confirma tu identidad." },
      bank: { title: "Confirma el cambio bancario", sub: "Ingresa el codigo enviado a tu telefono para autorizar este cambio bancario." },
      password: { title: "Confirma el cambio de contraseña", sub: "Ingresa el codigo enviado a tu telefono para confirmar tu nueva contraseña." },
      phone: { title: "Verifica tu nuevo numero", sub: "Ingresa el codigo enviado a tu NUEVO telefono para completar la actualizacion." },
      email: { title: "Confirma el cambio de correo", sub: "Ingresa el codigo enviado a tu telefono para confirmar este cambio de correo." }
    },
    codeSent: "Codigo enviado al",
    expiresIn: "El codigo expira en",
    expired: "Expirado",
    verifyBtn: "Verificar",
    verifying: "Verificando...",
    noCode: "¿No recibiste el codigo?",
    resend: "Reenviar",
    wrongDevice: "¿Usas otro dispositivo?",
    backLogin: "Volver a iniciar sesion",
    report: "Reportar actividad sospechosa"
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
  dashboardLender: { title: "Panel de Prestamista", subtitle: "Control total sobre tu capital y rendimientos.", metrics: { availableCapital: "Capital (Disponible / Desplegado)", capitalDeployed: "Capital Desplegado", nextPayments: "Próximos Pagos (30 días)", avgInterest: "Tasa Promedio", activeBorrowers: "Prestatarios Activos" }, sections: { commitmentLetters: "Cartas de Compromiso Enviadas", upcomingClosings: "Próximos Cierres / Payoffs", activeLoans: "Préstamos Activos (Retorno)", }, tableHeaders: { borrower: "Prestatario", amount: "Monto", status: "Estado", type: "Tipo", date: "Fecha", action: "Acción", loan: "Préstamo", rateBalance: "Tasa / Saldo" }, labels: { cap: "Cap:", int: "Int:" }, recentPayments: "Últimos Pagos Recibidos", actions: { marketplace: "Explorar Mercado", viewContracts: "Ver mis contratos" }, toggle: { open: "Abierto a negocios", closed: "No aceptando préstamos" }, table: { date: "Fecha", borrower: "Prestatario", property: "Propiedad", total: "Pago Total", principal: "Capital", interest: "Interés" }, emptyHistory: "El resto del historial se renderizará aquí.", loading: "Cargando dashboard...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al cargar la información del dashboard", errorNetwork: "Error de red desconocido", unassigned: "Sin asignar", borrowerFallback: "Deudor", emptyCommitments: "No hay compromisos pendientes", emptyClosings: "No hay cierres próximos en el sistema.", emptyLoans: "Sin préstamos activos", emptyPayments: "No hay pagos procesados recientemente." },
  auditLogs: { searchPlaceholder: "Buscar por accion o descripcion...", allRoles: "Todos los Roles", system: "Sistema / Webhooks", admins: "Administradores", lenders: "Prestamistas", borrowers: "Prestatarios", totalRecords: "Total de registros:", dateHour: "Fecha / Hora", actor: "Actor", action: "Accion", description: "Descripcion del Evento", noRecords: "No se encontraron registros de auditoria.", page: "Página", of: "de", prev: "Anterior", next: "Siguiente" },
  pitchDeckModal: { step: "Paso", of: "de", title: "Crear Nuevo Pitch Deck", purchasePrice: "Precio de Compra ($)", purchasePricePh: "Ej. 150000", rehabAmount: "Monto de Remodelación ($)", rehabAmountPh: "Ej. 45000", loanAmount: "Monto Solicitado ($)", loanAmountPh: "Ej. 250000", loanType: "Tipo de Préstamo", loanTypeSelect: "Selecciona el tipo", loanTerm: "Plazo del Préstamo", loanTermSelect: "Selecciona el plazo", term12: "12 Meses", term24: "24 Meses", term36: "36 Meses", years: "Años", address: "Dirección de la Propiedad", addressPh: "Ej. 123 Main St, Austin, TX", type: "Tipo", typeRes: "Residencial", typeCom: "Comercial", typeLand: "Terreno", arvLabel: "ARV / ", value: "Valor Estimado ($)", valuePh: "Ej. 350000", privacyLabel: "Privacidad del Trato", public: "Público (Marketplace)", private: "Privado (Solo invitados)", photos: "Fotos de la Propiedad", dragDrop: "Arrastra tus fotos aquí", supportedFiles: "Soporta JPG, PNG (Max 5MB)", photoGuidelines: "Frente, Cocina, Baños, Patio, Techo", rentcastTitle: "Comparables generados (RentCast API)", rentcastParams: "Búsqueda: 0.5 millas, mismos pies cuadrados, últimos 6 meses", aiEvaluated: "AI Evaluado", saleComps: "Comparables Venta", rentComps: "Comparables Renta", rentcastPending: "Pendiente: La API de RentCast poblará esto automáticamente después de ingresar la dirección.", back: "Atrás", processing: "Procesando...", publish: "Publicar Pitch Deck", next: "Siguiente", successTitle: "Pitch Deck Publicado!", successDesc: "Tu solicitud ha sido enviada. Los prestamistas ahora pueden ver tu trato y enviar ofertas.", backToDash: "Volver al Dashboard" },
  dashboardBookkeeper: { title: "Panel de Contabilidad", subtitle: "Registros claros y exportables de capital e intereses para el cierre contable.", metrics: { activeLoans: "Préstamos Activos", totalInterest: "Intereses Pagados (YTD)", totalPrincipal: "Capital Pagado (YTD)" }, exportBtn: "Exportar Reporte Anual", tableHeaders: { property: "Propiedad", borrower: "Prestatario", lender: "Prestamista", interest: "Interés", principal: "Capital", action: "Acción" }, loading: "Cargando registros contables...", empty: "No hay registros disponibles.", errorAuth: "Sesión no válida o sin permisos de contabilidad.", errorFetch: "Error al cargar los datos contables.", errorNetwork: "Error de red desconocido" },
  dashboardBorrower: { title: "Panel de Prestatario", subtitle: "Tus préstamos, propiedades y saldos en un solo lugar.", metrics: { totalOwed: "Saldo Total Pendiente", nextDue: "Próximo Vencimiento", properties: "Propiedades en Garantía", pmlRating: "Calificación PML" }, tabs: { needsFunding: "Necesitan Fondeo", approved: "Aprobados", funded: "Fondeados / Cerrados", completed: "Completados" }, trackerTitle: "Próximos Cierres", trackerEmpty: "No hay cierres próximos rastreados.", needFunding: "Necesitan Fondeo (Need Funding)", loanApproved: "Aprobados por Prestamista", currentLoans: "Préstamos Actuales (Current Loans)", completedLoans: "Completados", emptyTable: "La tabla de préstamos en vivo se renderizará aquí.", emptyDocs: "Las cartas de compromiso y estados de liquidación generados aparecerán aquí.", tableHeaders: { property: "Propiedad", amount: "Monto / Saldo", rehabDrawn: "Rehab Retirado", lender: "Prestamista", rate: "Tasa", status: "Estado", date: "Fecha / Próx Pago", action: "Acción", history: "Historial" }, actions: { pitchDeck: "Generar Pitch Deck", payoff: "Solicitar Liquidación", payments: "Gestionar Pagos", viewContracts: "Contratos" }, loading: "Cargando dashboard...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al cargar la información del dashboard", errorNetwork: "Error de red desconocido", lenderFallback: "Empresa Prestamista", emptyNeedFunding: "Sin solicitudes pendientes", emptyApproved: "Sin préstamos por aceptar", emptyActive: "Sin préstamos activos", emptyCompleted: "Sin préstamos completados", reviewCommitment: "REVISAR COMPROMISO", paidOff: "Liquidado:" },
  contractsList: { title: "Contratos y Préstamos", subtitle: "Listado de acuerdos. Lo que ves aquí depende de tu rol en la plataforma.", table: { id: "ID", concept: "Concepto", property: "Propiedad", client: "Cliente", financials: "Términos Financieros", status: "Estado", actions: "Acciones" }, status: { active: "Activo", inactive: "Inactivo" }, viewDetails: "Detalles", back: "Volver al panel", loading: "Cargando contratos...", empty: "No se encontraron contratos.", errorAuth: "No tienes permisos para ver estos contratos o tu sesión expiró.", errorFetch: "Error al obtener contratos", errorNetwork: "Error de red desconocido", unassigned: "Sin asignar", borrowerFallback: "Deudor", noTerms: "Sin términos", total: "Total:", perMonth: "/mes", interest: "% Int.", },
  contractDetail: { title: "Detalle del Contrato", subtitle: "Información completa, partes involucradas y tabla de amortización.", parties: "Partes Involucradas", financials: "Términos Financieros", breakdownTitle: "Historial de Pagos", exportReport: "Exportar Reporte (CPA Ready)", labels: { lender: "Prestamista", borrower: "Prestatario", amount: "Monto Total", term: "Plazo", interest: "Interés", loanType: "Tipo de Préstamo", downPayment: "Enganche / Depósito", rent: "Pago Mensual" }, table: { date: "Fecha", status: "Estado", totalOwed: "Total", principal: "Capital", interest: "Interés", escrow: "Escrow", balance: "Saldo Restante" }, paymentStatus: { paid: "Pagado", pending: "Pendiente", late: "Atrasado", partial: "Parcial" }, pagination: { prev: "Anterior", next: "Siguiente", page: "Página", of: "de" }, back: "Volver a contratos", loading: "Cargando detalles del contrato...", errorNotFound: "No se encontró el contrato.", errorAuth: "No tienes permisos para ver este contrato.", errorFetch: "Error al cargar el contrato", errorNetwork: "Error de red desconocido", months: "meses", noTerms: "Sin términos", emptyPayments: "No hay pagos registrados para este contrato.", generateReportAlert: "Generando reporte CSV/PDF para el CPA...", lenderFallback: "Empresa Prestamista", borrowerFallback: "Prestatario (Deudor)", },
  errors: { code500: "Error Interno", title500: "¡Ups! Algo salió mal", message500: "Parece que algo salió mal de nuestro lado. Estamos trabajando en mejorar la experiencia de nuestros usuarios. Por favor, intenta de nuevo.", tryAgain: "Intentar de nuevo", code404: "Error 404", title404: "Página no encontrada", message404: "No pudimos encontrar la página que buscas. Es posible que el enlace sea incorrecto o la página ya no exista.", goHome: "Volver al inicio", },
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
    dealDetails: { title: "Detalle del Trato", back: "Volver al mercado", overview: "Resumen del Trato", propertyDetails: "Detalles de la Propiedad", borrowerProfile: "Perfil del Prestatario", fundDeal: "Contactar / Enviar Oferta", arv: "Valor Estimado (ARV)", rehab: "Presupuesto de Remodelacion", aiComps: "Comparables (RentCast API)", verifiedInvestor: "Inversor Verificado", identityConfirmed: "Identidad confirmada", pmlRating: "Calificacion PML", history: "Historial", fundingVerification: "Verificacion de Fondeo", completed: "Completada", dealsCompleted: "tratos completados", months: "meses" } 
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

  submitDeal: {
    title: "Publicar un trato",
    subtitle: "Publica tu solicitud de préstamo y deja que los prestamistas compitan por tu trato.",
    steps: ["Tipo de préstamo", "Propiedad", "Finanzas", "Documentos", "Revisión"],
    stepHint: "Paso {current} de {total} — {stepName}",
    loanTypeBadge: "Préstamo Puente seleccionado • 6 a 18 meses, solo interés",
    property: {
      title: "Detalles de la propiedad",
      sub: "Cuéntanos sobre la propiedad que estás financiando.",
      address: "Dirección de la propiedad",
      addressPh: "Ej. 123 Main St, Memphis, TN",
      addressHint: "Empieza a escribir — autocompletaremos los detalles desde registros públicos.",
      city: "Ciudad",
      state: "Estado",
      zip: "Código postal",
      propType: "Tipo de propiedad",
      occupancy: "Ocupación",
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
      sub: "Ingresa tus números. Estimaremos tu costo mensual.",
      purchasePrice: "Precio de compra",
      loanAmount: "Monto solicitado",
      arv: "Valor estimado (ARV)",
      rehab: "Presupuesto de rehab",
      desiredTerm: "Plazo deseado",
      maxRate: "Tasa de interés máxima",
      maxRateOptions: ["10%", "12%", "14%", "Cualquiera — mostrar todas"],
      calcTitle: "Costo mensual estimado",
      calcInterest: "Pago de solo interés",
      calcMembership: "Membresía PML",
      calcServicing: "Tarifa de servicing PML",
      calcOrigination: "Punto de originación (1%)",
      calcTotal: "Total mensual (est.)",
      mo: "/ mes",
      oneTime: "pago único"
    },
    actions: { back: "Atrás", continue: "Continuar", submit: "Publicar trato", change: "Cambiar" }
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

  catalog: {
    title: "Catálogo de productos",
    createBtn: "Crear producto",
    tabs: ["Todos los productos", "Funcionalidades", "Cupones", "Códigos promo", "Ofertas afiliados", "Tablas de precios"],
    filters: { all: "Todos", active: "Activos", archived: "Archivados", search: "Buscar productos...", filterBtn: "1 filtro" },
    table: {
      name: "Nombre", updated: "Actualizado", category: "Categoría", pricing: "Precio", created: "Creado", status: "Estado"
    },
    categories: { loan: "Producto de préstamo", sub: "Suscripción", affiliate: "Afiliado", edu: "Educación", deposit: "Depósito", saas: "SaaS" },
    pagination: { showing: "1 - 8 de 8 resultados" }
  },

  commitmentLetter: { title: "Carta de Compromiso", subtitle: "Acuerdo vinculante entre el prestatario y el prestamista.", fees: { title: "Resumen de Tarifas (Al Cierre)", origination: "Puntos de Originación", processing: "Tarifa de Procesamiento", underwriting: "Tarifa de Underwriting", platform: "Tarifa de Conexión PML", totalDue: "Total a pagar al cierre (Prestatario)" }, actions: { accept: "Aceptar y Firmar", decline: "Rechazar" }, achModal: { title: "Configurar Domiciliación (ACH)", subtitle: "Para completar la firma, selecciona la cuenta bancaria de donde se descontarán automáticamente tus pagos mensuales a partir de la fecha de inicio.", selectAccount: "Selecciona una cuenta vinculada", confirmBtn: "Confirmar ACH y Firmar", cancel: "Cancelar" }, disclaimer: "Al aceptar, esta carta se enviará automáticamente a la notaría (Title Company) y a la aseguradora. Dueño a Dueño LLC opera como un conector tecnológico, no origina, fondea, ni administra el préstamo por sí mismo.", loading: "Cargando carta de compromiso...", errorAuth: "Sesión no válida o no iniciada.", errorFetch: "Error al obtener los términos del contrato", errorAccept: "Error al aceptar los términos", errorReject: "Error al rechazar los términos", errorNetwork: "Error de red desconocido", paidTo: "Pagado a Dueño a Dueño LLC", customFeeFallback: "Tarifa", rejectCommentPh: "Motivo del rechazo (opcional)...", rejecting: "Rechazando...", accepting: "Aceptando..." },
  payoff: { title: "Solicitud de Liquidación", requestBtn: "Solicitar Liquidación", expectedDate: "Fecha esperada de cierre", successAlert: "Solicitud enviada al prestamista.", processing: "Procesando...", errorFetch: "Error al procesar la solicitud", errorNetwork: "Error de red desconocido" },
  profile: { title: "Perfil PML", borrower: "Prestatario", lender: "Prestamista", stats: { totalLoans: "Préstamos Totales", onTime: "Tasa de Pago a Tiempo", totalVolume: "Volumen Total", rating: "Calificación PML" }, history: "Historial de Proyectos", emptyHistory: "No hay proyectos completados aún.", mapHistory: "Mapear historial aquí..." },
  vetting: { title: "Aplicación y Verificación", subtitle: "Completa este proceso una sola vez para acceder a capital privado.", feeNotice: "Tarifa de aplicación (no reembolsable)", form: { bankStatements: "Estados de Cuenta (Últimos 3 meses)", idUpload: "Identificación Oficial", submitAndPay: "Pagar $99 y Enviar", selectFile: "Seleccionar archivo", dealHistory: "Historial de Proyectos", dealHistoryDesc: "Ingresa hasta 5 direcciones de proyectos recientes.", addressLabel: "Dirección", addressPh: "Ej. 123 Main St, Austin, TX", addAddress: "+ Agregar otra dirección", consentCredit: "Autorizo a Dueño a Dueño LLC y sus prestamistas asociados a realizar una verificación de crédito (Credit Pull).", consentBackground: "Autorizo a Dueño a Dueño LLC a realizar una verificación de antecedentes (Background Check).", consentAlert: "Debes aceptar las verificaciones de crédito y antecedentes para continuar.", step: "Paso", of: "de", next: "Siguiente", back: "Atrás", saveAndContinueLater: "Guardar y continuar después", savedAlert: "Tu progreso ha sido guardado. Puedes regresar en cualquier momento." } },
  issueCommitment: { title: "Emitir Carta de Compromiso", subtitle: "Configura las tarifas para el trato REF:", closingFeesTitle: "Tarifas al Cierre (Closing Fees)", originationPoints: "Puntos de Originación (%)", processingFee: "Tarifa de Procesamiento ($)", underwritingFee: "Tarifa de Underwriting ($)", docPrepFee: "Doc Prep Fee ($)", customFeeName: "Nombre Tarifa Custom", customFeeNamePh: "Ej. Appraisal Fee", customFeeAmount: "Monto Custom ($)", penaltiesTitle: "Penalizaciones (Post-Cierre)", latePenalty: "Late Payment Penalty", latePenaltyPh: "Ej. 5% o $50", prePayPenalty: "Pre-Pay Penalty", prePayPenaltyPh: "Ej. 1% del saldo", phPoints: "Ej. 2", phFee: "Ej. 500", systemNoteTitle: "Nota del Sistema:", systemNote: "La Tarifa de Conexión del Marketplace (1 punto, mín $999) será agregada automáticamente al resumen final por la plataforma si aplica para este trato.", submit: "Generar y Emitir Carta", submitting: "Emitiendo...", errorFetch: "Error al emitir la carta de compromiso", errorNetwork: "Error de red desconocido" },
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
  loanTypes: { interestOnlyShort: "Interest Only (Corto Plazo)", interestOnlyLong: "Interest Only (Largo Plazo)", fullyAmortized: "Totalmente Amortizado", constructionDraw: "Construction Draw Loan (Próximamente)" },
  notifications: { title: "Notificaciones", empty: "No tienes notificaciones nuevas.", markRead: "Marcar todas como leídas" },
  rateLender: { title: "Calificar al Prestamista", subtitle: "Tu préstamo ha finalizado. ¿Cómo fue tu experiencia con", ratingLabel: "Calificación", reviewLabel: "Reseña pública (opcional)", reviewPh: "Escribe sobre tu experiencia trabajando con este prestamista...", submit: "Enviar Calificación", success: "¡Gracias! Tu calificación ha sido publicada en el perfil del prestamista.", close: "Cerrar" },
  dashboardLayout: { overview: "General", deals: "Tratos", products: "Productos", account: "Cuenta", nav: { home: "Inicio", balances: "Saldos", payments: "Pagos", lenders: "Prestamistas", myDeals: "Mis Tratos", submitDeal: "Publicar un Trato", bridgeLoans: "Préstamos Puente", termSheets: "Term Sheets", affiliates: "Afiliados", settings: "Configuración", billing: "Facturación", reporting: "Reportes" } },
  bankModal: { title: "Agregar Cuenta Bancaria", subtitle: "Requerido para pagos ACH y cobro de tarifas mensuales. Encriptación bancaria de 256 bits.", securityNote: "Tu información bancaria está encriptada y nunca se comparte con prestamistas o prestatarios.", tabs: { instant: "⚡ Conexión Instantánea", manual: "Entrada Manual" }, instant: { desc: "Conecta tu banco al instante. No necesitas números de ruta, solo inicia sesión en tu banco.", plaidBtn: "Conectar con Plaid", orManual: "— o ingresa manualmente —", manualBtn: "Ingresar Detalles de Cuenta Manualmente" }, manual: { holder: "Nombre del Titular", bankName: "Nombre del Banco", routing: "Número de Ruta", account: "Número de Cuenta", confirmAccount: "Confirmar Número de Cuenta", type: "Tipo de Cuenta", types: ["Cheques", "Ahorros", "Cheques Negocio"], microNote: "⚡ Enviaremos dos micro-depósitos (menos de $1) para verificar tu cuenta en 1–2 días hábiles. Confirmarás los montos para completar la configuración.", submitBtn: "Guardar y Verificar Cuenta" }, success: { title: "Cuenta Bancaria Conectada", desc: "Tu cuenta está verificada y lista para pagos ACH. Las tarifas mensuales se cobrarán automáticamente el día 1 de cada mes.", doneBtn: "Aceptar" } },
  whyPml: {
      hero: {
        eyebrow: "Por qué PayMyLoan.ai",
        title: "¿Quién eres?",
        subtitle: "Elige tu rol y te mostraremos exactamente qué hace PML por ti."
      },
      roles: {
        lender: "Soy Prestamista",
        borrower: "Soy Prestatario"
      },
      lender: {
        hero: {
          badge: "Para Prestamistas Privados",
          title1: "Administra todo tu negocio de préstamos",
          title2: "desde tu pantalla.",
          subtitle: "La mayoría de los prestamistas privados siguen usando hojas de cálculo y correos. PML lo reemplaza todo: los prestatarios hacen el trabajo pesado, tú tomas las decisiones."
        },
        cards: [
          {
            title: "Evalúa al prestatario sin mover un dedo",
            desc: "Cada prestatario completa verificación de identidad antes de publicar un trato. Verás su calificación PML, basada en su historial real de pagos dentro de la plataforma.",
            points: ["Identidad y entidad verificadas en el registro", "Score PML visible en cada tarjeta de trato", "Los pagos atrasados bajan su score permanentemente", "Requiere verificación de identidad antes de fondear"]
          },
          {
            title: "Evalúa el trato con números reales",
            desc: "Los prestatarios ingresan precio de compra, ARV y presupuesto de remodelación. PML calcula el LTV automáticamente. Tu feed solo muestra tratos que coinciden con tus criterios.",
            points: ["Barra de LTV con tope automático ajustable", "Filtra por estado, monto, LTV y tipo de propiedad", "Negocia o envía contraofertas directamente", "Finanzas completas visibles antes de dar clic"]
          },
          {
            title: "Nunca más pierdas un pago",
            desc: "PML rastrea cada fecha de vencimiento y envía recordatorios al prestatario. Si hay un atraso, te notificamos y se registra en su score. No tienes que perseguir a nadie.",
            points: ["Recordatorios automáticos antes del vencimiento", "Cargos por mora aplicados automáticamente", "Notificación instantánea al registrarse el pago", "Panel de historial de pagos mes a mes"]
          },
          {
            title: "Genera liquidaciones (payoffs) en segundos",
            desc: "El prestatario solicita su liquidación en la plataforma y PML calcula el monto exacto basado en la tasa original en un año de 360 días. PDF fechado y generado al instante.",
            points: ["El prestatario elige la fecha, PML hace la matemática", "Cálculo en base a año de 360 días", "PDF oficial de liquidación listo en segundos", "Tasa de contrato original — sin sorpresas"]
          },
          {
            title: "Solicitudes de retiro (Draws) simplificadas",
            desc: "El prestatario envía fotos, video con GPS y lista de verificación por la plataforma. Tú revisas y apruebas con un clic. El dinero se libera vía ACH. Sin correos perdidos.",
            points: ["Requiere mínimo 6 fotos y video de 60s", "Verificación GPS y de fecha/hora en multimedia", "Lista de inspección requerida antes de enviar", "Transferencia ACH automática al aprobar"]
          },
          {
            title: "Extensiones seguras y protegidas",
            desc: "Si el proyecto se retrasa, el prestatario solicita una extensión a la misma tasa y términos. Firma electrónicamente y autoriza el pago de tarifas. Tu dinero sigue protegido.",
            points: ["Misma tasa y términos, un plazo adicional completo", "Firma electrónica y autorización ACH inicial", "Cobro de comisión de extensión automático", "Nuevo calendario de pagos autogenerado"]
          }
        ],
        mantra: {
          quote: "La mayoría quiere un retorno SOBRE su dinero. Los mejores quieren el retorno DE su dinero.",
          author: "PayMyLoan.ai — Construido para Main Street, no Wall Street"
        },
        cta: {
          title: "Los prestamistas usan PML gratis siempre.",
          subtitle: "Sin tarifas mensuales. Sin costos ocultos. Solo retornos y una plataforma que trabaja tan duro como tú.",
          btnGhost: "Explorar tratos",
          btnPrimary: "Crear cuenta gratis →"
        }
      },
      borrower: {
        hero: {
          badge: "Para Prestatarios Inmobiliarios",
          title1: "Deja de perseguir prestamistas.",
          title2: "Deja que ellos vengan a ti.",
          subtitle: "Otras plataformas te ponen en la silla fría: correos, comisiones y esperas de semanas. PML lo cambia: publica una vez y los prestamistas en tu área te encontrarán."
        },
        cards: [
          {
            title: "Sin bancos. Sin revisión de crédito.",
            desc: "El dinero privado se basa en activos, no en crédito. A los prestamistas de PML les importa el valor de la propiedad, tu ARV y tu plan, no tu score FICO o tu relación deuda/ingreso.",
            points: ["Sin W-2s, declaraciones de impuestos ni solicitudes bancarias", "Los prestamistas evalúan el trato, no tu historial crediticio", "Cierres en días, no en meses", "Funciona para LLCs, corporaciones e individuos"]
          },
          {
            title: "Los prestamistas compiten. Tú eliges.",
            desc: "Publica una vez y deja que el mercado trabaje. Prestamistas privados verificados ven tu trato y envían hojas de términos. Compara, negocia y acepta sin intermediarios.",
            points: ["Ve todas las ofertas lado a lado (tasa, puntos, plazo)", "Contraoferta directamente en la plataforma", "Sin tarifas de brokers ni intermediarios", "Las primeras ofertas suelen llegar en 24–72 horas"]
          },
          {
            title: "Nunca más olvides un pago",
            desc: "Tu panel de PML muestra cada pago, monto y fecha de vencimiento. Recordatorios automáticos te avisan con tiempo. Pagar a tiempo sube tu score como prestatario.",
            points: ["Recordatorios automáticos antes del vencimiento", "Historial de pagos completo siempre visible", "Los pagos a tiempo mejoran tu Score PML", "Los pagos atrasados se registran permanentemente"]
          },
          {
            title: "Genera tu propia carta de liquidación",
            desc: "¿Listo para vender o refinanciar? Selecciona la fecha y PML generará el monto exacto de liquidación en un PDF al instante. Sin llamadas ni esperas por tu prestamista.",
            points: ["Elige cualquier fecha, PML hace el cálculo", "Carta oficial en PDF lista en segundos", "Cálculo exacto basado en año de 360 días", "Tasa de contrato original — sin tasas de castigo"]
          },
          {
            title: "Retiros (Draws) rápidos y simples",
            desc: "Sube fotos, un video rápido y completa el checklist directamente desde tu teléfono. PML lo verifica y lo envía al prestamista. Al aprobar, los fondos llegan vía ACH.",
            points: ["Sube fotos, video y checklist desde el celular", "El prestamista revisa y aprueba en la plataforma", "Fondos liberados automáticamente vía ACH", "Historial completo de retiros por proyecto"]
          },
          {
            title: "¿Necesitas más tiempo? Pide una extensión.",
            desc: "Si tu proyecto toma más tiempo, solicita una extensión antes del vencimiento. Obtienes un término adicional con las mismas condiciones. Lo firmas, se aprueba y estás cubierto.",
            points: ["Misma tasa y términos — sin renegociar", "Firma electrónica directamente en el panel", "El prestamista aprueba sin llamadas incómodas", "Nuevo calendario de pagos se genera al aprobar"]
          }
        ],
        mantra: {
          quote: "Construido para Main Street, no Wall Street.",
          author: "PayMyLoan.ai — Dinero privado, hecho simple."
        },
        cta: {
          title: "Los prestamistas en tu mercado te esperan.",
          subtitle: "Publica gratis tu primer trato con un código de referido, o paga $99/mes. Sin bancos. Sin brokers. Sin esperas.",
          btnGhost: "Buscar prestamistas",
          btnPrimary: "Publicar trato gratis →"
        }
      }
    },
    lenderFaq: {
      hero: { 
        label: "Confianza y Seguridad", 
        title: "¿Está seguro mi dinero en PayMyLoan?", 
        sub: "Cada pregunta que un prestamista inteligente se hace antes de invertir su capital — respondida directamente." 
      },
      trustBadges: [
        { title: "2FA en todos los cambios", sub: "Banco, contraseña, correo — protegidos" },
        { title: "Prestatario verificado", sub: "Antecedentes + crédito + entidad" },
        { title: "Documentos archivados", sub: "Pagaré + deed of trust" },
        { title: "Garantía inmobiliaria", sub: "Límite estricto de 75% LTV" },
        { title: "ACH automatizado", sub: "Cobros el día 1 de cada mes" }
      ],
      faqGroups: [
        {
          title: "Sobre PayMyLoan",
          items: [
            { q: "¿Qué es PayMyLoan y quién lo construyó?", a: "PayMyLoan fue construido por un inversor inmobiliario que ha pedido prestado aproximadamente $100 millones a prestamistas privados en 15,000 cierres. Tras ver a cada uno de esos prestamistas administrar sus préstamos en hojas de cálculo —sin software, sin automatización, sin un proceso estandarizado— construimos la infraestructura que debieron haber tenido desde el principio.<br><br>PayMyLoan no es un fondo. No retenemos tu dinero. Somos el sistema operativo entre prestatarios y prestamistas." },
            { q: "¿PayMyLoan retiene o toca mi dinero?", a: "No. PayMyLoan es una plataforma, no un fondo ni un custodio. Transfieres tu capital directamente a la compañía de títulos al cierre. Los pagos mensuales se debitan por ACH directamente desde la cuenta del prestatario a la tuya. PML nunca retiene tu capital.<br><br><strong>El único dinero que recauda PML</strong> son las tarifas de la plataforma cobradas a los prestatarios (suscripción + tarifa de conexión en la hoja de liquidación). Tu capital va directo." },
            { q: "¿Es PayMyLoan un prestamista o broker con licencia?", a: "PayMyLoan es una plataforma tecnológica que facilita conexiones entre prestamistas privados y prestatarios. No somos un broker hipotecario, prestamista con licencia, ni agente de valores. Todas las decisiones de préstamo se toman directamente entre el prestamista y el prestatario. Debes consultar a un abogado con licencia en tu estado antes de otorgar préstamos privados si tienes dudas sobre los requisitos legales." }
          ]
        },
        {
          title: "Tu dinero y seguridad",
          items: [
            { q: "¿Cómo está protegida mi cuenta bancaria contra el fraude?", a: "Cada cambio en la cuenta bancaria o información ACH pasa por un filtro de seguridad de 3 capas:<br><ul><li><strong>SMS 2FA</strong> — código enviado a tu teléfono registrado. Debe ingresarse para continuar.</li><li><strong>Correo de alerta inmediata</strong> — enviado a tu dirección de correo actual en el momento en que se intenta un cambio, incluso antes de confirmarse.</li><li><strong>Retención de seguridad de 24 horas</strong> — la nueva información bancaria no entra en vigor hasta 24 horas después, dándote tiempo para detectar y detener cambios no autorizados.</li></ul><br>Si recibes un correo de alerta sobre un cambio que no solicitaste, llámanos de inmediato. Podemos congelar tu cuenta al instante." },
            { q: "¿Qué sucede si un prestatario deja de pagar?", a: "PayMyLoan automatiza las notificaciones y el rastro de documentos, pero el cobro del préstamo es tu derecho como prestamista — tu pagaré y escritura de fideicomiso (deed of trust) son tus instrumentos legales.<br><ul><li>Día 1 de retraso: el prestatario recibe correo + alerta SMS</li><li>Día 15: aviso formal al prestatario Y al prestamista registrado</li><li>Pago devuelto/Sin fondos: ambas partes son notificadas de inmediato, y se registra en el historial de pagos del prestatario</li></ul><br>PML no realiza cobranzas en tu nombre. Tu préstamo está garantizado por una escritura de fideicomiso contra la propiedad. Trabaja con tu abogado para los procedimientos formales de incumplimiento y ejecución hipotecaria si es necesario.", highlight: "Prestamistas inteligentes: el título y la escritura de fideicomiso son tu protección — no la plataforma. Siempre trabaja a través de una compañía de títulos autorizada al cierre." },
            { q: "¿Cómo me protege el límite del 75% LTV?", a: "Para prestatarios no verificados, PayMyLoan impone un límite estricto del 75% LTV (Préstamo ÷ ARV). Esto significa que incluso si el prestatario incumple y la propiedad se vende con descuento, hay un colchón de capital del 25% antes de que tu capital esté en riesgo.<br><br>Como prestamista, puedes establecer un umbral de LTV más alto para prestatarios que ya conoces y confías — pero el 75% es el límite por defecto para nuevas relaciones." },
            { q: "¿Puede alguien acceder a mi cuenta desde un dispositivo nuevo sin mi conocimiento?", a: "No. Cada inicio de sesión desde un dispositivo no reconocido activa un código SMS a tu teléfono. Sin ese código, el acceso se bloquea. También verás un registro de todas las sesiones activas en tu configuración de seguridad — y puedes revocar cualquier sesión al instante desde cualquier dispositivo." }
          ]
        },
        {
          title: "Evaluación de prestatarios",
          items: [
            { q: "¿Cómo evalúa PayMyLoan a los prestatarios?", a: "Los prestatarios pasan por hasta 4 filtros de verificación a medida que avanza su trato:<ul><li><strong>Filtro 1 — Registro:</strong> nombre, correo, teléfono</li><li><strong>Filtro 2 — Perfil:</strong> nombre de la entidad, EIN, años de experiencia</li><li><strong>Filtro 3 — Publicar:</strong> verificación telefónica 2FA, historial</li><li><strong>Filtro 4 — Identidad (cuando un prestamista quiere fondear):</strong> SSN, ID oficial, verificación de antecedentes, revisión de crédito suave — tarifa única de $99 para el prestatario</li></ul><br>Hasta que se complete la verificación de identidad, el prestatario aparece como \"No verificado\" y los prestamistas pueden ver ese estado en cada tarjeta de trato." },
            { q: "¿Qué me dice el Score PML?", a: "El Score PML refleja el historial verificado de un prestatario en la plataforma: número de tratos fondeados, tasa de pagos a tiempo, extensiones solicitadas y liquidaciones completadas. Se actualiza después de cada trato cerrado y cada pago.<br><ul><li><strong>Novato (0–2 tratos):</strong> nuevo en la plataforma</li><li><strong>Pro (3–9 tratos):</strong> historial establecido</li><li><strong>Estrella (10+ tratos):</strong> historial comprobado</li><li><strong>Edición Limitada:</strong> 10+ tratos, cero pagos atrasados, cero extensiones</li></ul><br>El score no reemplaza tu debida diligencia — pero te da una señal estandarizada que ningún prestamista basado en hojas de cálculo ha tenido antes." },
            { q: "¿Puedo ver el puntaje de crédito de un prestatario?", a: "Sí — para prestatarios con identidad verificada. PML realiza una <strong>revisión suave (soft pull)</strong> (no afecta el puntaje de crédito del prestatario). Verás el número de puntaje real y el nivel (750+ Excelente · 700–749 Bueno · 650–699 Regular · menos de 650 Pobre).<br><br>Un puntaje bajo muestra una advertencia amarilla en la tarjeta del trato pero NO bloquea automáticamente un acuerdo. Muchos inversores inmobiliarios experimentados tienen crédito personal más bajo pero historiales sólidos. Tú decides." }
          ]
        },
        {
          title: "Pagos y liquidaciones",
          items: [
            { q: "¿Cómo funciona el ACH — cuándo llega el dinero a mi cuenta?", a: "Los pagos mensuales de intereses se debitan de la cuenta bancaria del prestatario el día 1 de cada mes a través de Stripe ACH Debit + verificación bancaria de Plaid. La liquidación en tu cuenta generalmente toma 2–3 días hábiles.<br><br>El <strong>período inicial (stub period)</strong> (el mes parcial desde la fecha de cierre hasta fin de mes) se cobra en la hoja de liquidación al cierre en efectivo — no vía ACH. Tu primer débito ACH es el día 1 del mes siguiente al mes de cierre.<br><br>Ejemplo: Cierre el 15 de Septiembre → primer ACH el 1 de Noviembre." },
            { q: "¿Cómo funcionan las liquidaciones (payoffs)?", a: "Cuando un prestatario solicita una liquidación, PML genera una carta de liquidación automáticamente utilizando la tasa de interés original del contrato (no una tasa de penalización). Recibirás:<ul><li>Monto de liquidación válido hasta una fecha específica</li><li>Monto por día (per diem) para días adicionales</li><li>Carta de liquidación en PDF firmada</li><li>Alerta SMS inmediata</li></ul><br><strong>Protección contra fraude de transferencias:</strong> Las instrucciones completas de transferencia nunca se envían por correo electrónico. La carta de liquidación muestra solo los últimos 4 dígitos de tu cuenta. Prestatarios y compañías de títulos deben llamarte directamente para recibir los detalles completos.", highlight: "Siempre verifica los cambios en las instrucciones de transferencia llamando — nunca te bases solo en un correo electrónico." },
            { q: "¿Cuáles son las tarifas? ¿Me cobran algo como prestamista?", a: "<strong>Los prestamistas no pagan nada. Nunca.</strong><br><br>PML cobra a los prestatarios:<ul><li>Suscripción de $99/mes (comienza al publicar un trato)</li><li>Tarifa única de verificación de identidad de $99</li><li>10% del interés mensual — solo cuando PML conectó el trato</li><li>1% de tarifa de conexión al prestamista — cobrada al cierre en la hoja de liquidación cuando PML conectó el trato</li></ul><br>Tratos por invitación directa (tú invitaste al prestatario o ellos a ti) — tanto el 10% del interés mensual como el 1% de conexión son condonados para el prestatario." }
          ]
        }
      ],
      cta: { 
        title: "¿Listo para poner tu capital a trabajar?", 
        sub: "Las cuentas de prestamista siempre son gratis. Explora tratos en menos de 2 minutos.", 
        btn: "Crear cuenta gratis de prestamista" 
      }
    },
    lenderOptin: {
      hero: {
        eyebrow: "Gratis para prestamistas privados",
        title1: "Despliega tu capital ",
        title2: "más rápido.",
        body: "Obtén la checklist de 7 puntos que todo prestamista privado debe revisar antes de transferir fondos — además de un curso de 5 correos sobre cómo construir un sistema que proteja tu capital y lo mantenga trabajando.",
        proofs: ["Gratis. Sin tarjeta de crédito.", "PML siempre es gratis para prestamistas", "Cancela tu suscripción en cualquier momento"]
      },
      form: {
        title: "Obtén la checklist",
        sub: "Enviada al instante a tu bandeja de entrada",
        previewTitle: "Qué incluye — Checklist de 7 puntos",
        items: ["El título de propiedad está limpio", "El seguro está en orden", "El ARV es justificable", "El LTV es igual o menor a 75%", "El prestatario tiene capital en riesgo", "Proceso de retiros acordado por escrito", "Liquidación calculada correctamente"],
        fName: "Nombre",
        fNamePh: "Juan",
        email: "Correo electrónico",
        emailPh: "juan@ejemplo.com",
        capitalLabel: "¿Cuánto capital despliegas al año?",
        capSelect: "Selecciona un rango",
        capOptions: ["Menos de $250K", "$250K – $500K", "$500K – $1M", "$1M – $5M", "$5M+"],
        submit: "Enviarme la checklist",
        sending: "Enviando...",
        disclaimer: "Cero spam. Solo contenido útil para prestamistas privados. Cancela cuando quieras."
      },
      gets: {
        title: "Qué obtienes",
        sub: "La checklist más 5 correos que te enseñan a construir un sistema de préstamos real",
        cards: [
          { icon: "✓", title: "La checklist de 7 puntos", body: "Todo lo que debes verificar antes de transferir — título, seguro, LTV, retiros, liquidación. Entregada inmediatamente." },
          { icon: "📈", title: "El desglose de ROI", body: "Exactamente cuánto te generan $100K, $250K y $500K prestados al 12% por mes — y cómo maximizarlo." },
          { icon: "🎯", title: "Acceso a tratos en vivo", body: "Explora tratos publicados por prestatarios en PayMyLoan.ai. Ve el LTV, el mercado y el monto antes de crear una cuenta." }
        ]
      },
      sequence: {
        title: "La secuencia de 5 correos",
        sub: "Enviados durante 10 días — práctico, sin relleno",
        dayLabel: "Día",
        steps: [
          { day: "0", subject: "Tu checklist de prestamista privado (7 cosas a verificar antes de transferir)", desc: "Entrega instantánea — la checklist + intro a PML", tag: "Lead magnet", tagColor: "purple" },
          { day: "2", subject: "La mayoría de los prestamistas pierden dinero por este error", desc: "El costo real de no tener un sistema — y qué hacer al respecto", tag: "Punto de dolor", tagColor: "purple" },
          { day: "4", subject: "Tienes capital. Hay tratos publicados esta semana.", desc: "Explora tratos en vivo — no requiere cuenta", tag: "Prueba social", tagColor: "purple" },
          { day: "7", subject: "¿Cuánto estás ganando por cada dólar desplegado?", desc: "Las matemáticas detrás de $100K, $250K, $500K desplegados al 12%", tag: "ROI / Mates", tagColor: "purple" },
          { day: "10", subject: "Una pregunta antes de dejar de escribirte", desc: "Vía rápida o envío lento — tú eliges", tag: "Bifurcación", tagColor: "green" }
        ]
      }
    }
};

type Copy = typeof es;

const en: Copy = {
  meta: {
    title: "PayMyLoan.ai — Private loan servicing",
    description: "Private real-estate-secured loans handled in one place: the borrower pays by ACH, the lender sees exactly what was paid and on which property...",
  },

  uiComponents: {
    status: {
      active: "Active",
      archived: "Archived",
      pending: "Pending",
      paid: "Paid",
      late: "Late",
      new: "New"
    },
    dealCard: {
      loanRequest: "Loan request",
      arv: "ARV",
      maxRate: "Max rate",
      rehab: "Rehab",
      ltv: "LTV",
      offers: "offers",
      offer: "offer",
      makeOffer: "Make offer"
    },
    scoreCard: {
      tapToSee: "Tap to see borrower",
      seeScore: "See borrower score",
      seeDeal: "See deal info",
      underCap: "Under 75% cap",
      matchedStrip: "Matched — Direct deals fee-free",
      lockedStrip: "Match to unlock profile",
      scoreLbl: "PML Score",
      scoreHidden: "Score hidden",
      deals: "Deals",
      onTime: "On-time",
      funded: "Funded",
      extensions: "Ext.",
      cardTiers: "Card tiers",
      rookie: { name: "Rookie", desc: "0–2 deals · white/blue" },
      pro: { name: "Pro", desc: "3–9 deals · dark gold" },
      allStar: { name: "All-Star", desc: "10+ deals · black holographic" },
      limited: { name: "Limited", desc: "10+ deals · 0 late" },
      fields: { loan: "Loan", rate: "Rate", term: "Term", arv: "ARV", type: "Type", market: "Market" }
    }
  },

  prototype: {
    lenderDeals: {
      eyebrow: "Funding Marketplace",
      title: "Browse Live Deals",
      subtitle: "Every deal is pre-vetted. Search by type, location, or borrower score...",
      search: { type: "All Loan Types", locationPh: "📍 City, State or ZIP", score: "Any Borrower Score", ltv: "Any LTV", btn: "Search →" },
      mapTitle: "Deals Near You",
      legendActive: "Active Deal", legendFunded: "Funded / Closed", fundedTitle: "Recently Funded",
      blurText: "+ 24 more live deals", blurBtn: "Create Free Account to Unlock →", btnConnect: "Connect with Borrower →"
    },
    lenderDemo: {
      eyebrow: "Demo",
      title: "See How It Works for Lenders",
      subtitle: "Watch how PML makes private lending effortless — from finding a deal to collecting payments automatically.",
      videoTitle: "Lender Walkthrough Video",
      videoSub: "Full platform demo — browse deals, vet borrowers, fund, and manage",
      videoComing: "Video Coming Soon",
      steps: [
        { num: "1", label: "Browse Live Deals" }, { num: "2", label: "Request Profile" },
        { num: "3", label: "Review Deal File" }, { num: "4", label: "Set Your Terms" }, { num: "5", label: "Fund & Collect" }
      ],
      benefits: [
        { icon: "🔍", title: "Full Borrower Screening", desc: "FICO, background check, and deal history verified before you ever see the deal." },
        { icon: "🏠", title: "Complete Deal Underwriting", desc: "Comps, rental comps, ARV, LTV, scope — everything on one screen. No guessing." },
        { icon: "🆓", title: "Free Forever for Lenders", desc: "No subscription. No monthly fee. 1pt at closing is the only cost." },
        { icon: "🏦", title: "ACH Auto-Payments", desc: "Payments collected automatically every month. No chasing borrowers." },
        { icon: "⚡", title: "Instant Payoff Statements", desc: "Generated on demand — principal, interest, per diem. Accurate in seconds." },
        { icon: "📄", title: "Auto Commitment Letters", desc: "Auto-sent to title and insurance the moment a deal is agreed. No manual work." }
      ],
      ctaTitle1: "Ready to ", ctaTitle2: "Deploy Capital With Confidence?",
      ctaSub: "Join free. Browse live deals right now. No credit card needed.",
      btn1: "Create Free Lender Account →", btn2: "Browse Deals First"
    },
    lenderProblems: {
      eyebrow: "Problems We Solve",
      title: "Built for Every Headache Private Lenders Face",
      subtitle: "If you've been in private lending, you've lived every one of these. PML was built to kill them.",
      probs: [
        { num: "01", icon: "📄", title: "Commitment Letter Chaos", pain: '"I emailed the commitment letter three times..."', solution: "Commitment letter auto-generated and sent directly to title...", tag: "✓ Auto-Generated & Sent" },
        { num: "02", icon: "🧮", title: "Payoff Calculation Headaches", pain: '"Borrower needs a payoff by Monday..."', solution: "Request a payoff anytime — PML calculates principal...", tag: "✓ Instant Payoff Statements" },
        { num: "03", icon: "🏦", title: "Chasing Monthly Payments", pain: '"It\'s the 10th. Still no payment..."', solution: "ACH payments set up at closing, run automatically...", tag: "✓ ACH Auto-Collection" },
        { num: "04", icon: "📚", title: "Bookkeeping Is a Disaster", pain: '"My accountant needs payment history..."', solution: "Invite your bookkeeper to your portal. Read-only access...", tag: "✓ Bookkeeper Portal Access" },
        { num: "05", icon: "🔍", title: "Can't Vet Borrowers Fast Enough", pain: '"I lent $180K. Six months later I find out..."', solution: "Every borrower screened before their deal goes live...", tag: "✓ FICO · Background · History" },
        { num: "06", icon: "🏠", title: "Guessing on the Deal", pain: '"Borrower says ARV is $300K..."', solution: "Comps, rental comps, ARV, bed/bath, LTV, deal score...", tag: "✓ Full Deal Underwriting" },
        { num: "07", icon: "💰", title: "You Hit a Ceiling on Lending", pain: '"I want to deploy more capital but admin is eating 10 hours a week..."', solution: "When payments run automatically, payoffs generate themselves...", tag: "✓ Scale Without the Overhead", gold: true }
      ]
    },
    lenderWho: {
      eyebrow: "Who Is This For",
      title: "Built for Main Street, Not Wall Street",
      subtitle: "If you have capital to deploy and want real estate debt returns without the headaches — this is for you.",
      cards: [
        { icon: "💼", title: "Individual Private Lenders", bullets: ["You have $50K–$2M+ to deploy into real estate debt", "You want 10–14% returns secured by real property", "You're tired of managing loans on spreadsheets", "You want to know your money is protected before you lend"], btn: "This Is Me →" },
        { icon: "🏗️", title: "RE Investors Who Also Lend", bullets: ["You flip houses and lend to other investors on the side", "You need one place to manage your active portfolio", "You want vetted deals without doing the underwriting yourself", "You know the business — you just want better tools"], btn: "This Is Me →" },
        { icon: "🏛️", title: "Self-Directed IRA & Family Offices", bullets: ["You're deploying retirement or trust capital into debt", "Compliance, documentation, and transparency are non-negotiable", "You need clean records for your administrator or accountant", "You want high-yield alternatives without stock market exposure"], btn: "This Is Me →" }
      ]
    },
    lenderDiff: {
      eyebrow: "What Makes Us Different",
      title: "No Other Platform Does This",
      subtitle: "Every other marketplace charges you, hides the borrower, or pools your money. We do none of that.",
      table: {
        hPml: "PayMyLoan.ai", hC1: "Fund That Flip", hC2: "Groundfloor", hC3: "Hard Money Broker",
        rows: [
          { label: "Free to join", pml: "✅ Always", c1: "❌", c2: "❌", c3: "❌ 1–2pts" },
          { label: "FICO + background on borrower", pml: "✅ Both", c1: "❌ Internal", c2: "❌ Grade only", c3: "❌ DIY" },
          { label: "Full deal file — comps, ARV, scope", pml: "✅ Complete", c1: "❌ Black box", c2: "❌ Summary", c3: "❌ Varies" },
          { label: "Direct lender-borrower relationship", pml: "✅ Always direct", c1: "❌ Platform lends", c2: "❌ Pooled", c3: "⚠️ Via broker" },
          { label: "Automated ACH loan servicing", pml: "✅ Built-in", c1: "⚠️ Manual", c2: "⚠️ Manual", c3: "❌ You handle it" },
          { label: "Fee to lender", pml: "1pt at closing only", c1: "Mgmt + servicing", c2: "Spread off returns", c3: "1–2pts upfront" }
        ]
      },
      mantra: { h1: "Most investors want a return ", h2: "on", h3: " their money.", h4: "The best ones want the return ", h5: "of", h6: " their money.", p: "We built PayMyLoan.ai to take every headache out of private lending — so you deploy with confidence and sleep at night." },
      csEyebrow: "Coming Soon", csTitle: "Smart Matching for Lenders",
      csCards: [
        { icon: "⚙️", title: "Set Your Lending Criteria", desc: "Define loan type, area, amount range, max LTV. Your feed only shows deals that fit your box." },
        { icon: "⭐", title: "Minimum Borrower Score", desc: "Set a PML score minimum. Pre-filtered deals — no sorting through unqualified borrowers." },
        { icon: "🔔", title: "Deal Match Alerts", desc: "Get notified the moment a matching deal hits the marketplace. First look before other lenders." }
      ]
    },

    lenderLanding: {
      hero: {
        badge: "For Private Lenders",
        title1: "Become a",
        title2: " Deal Magnet.",
        sub: "Scan for deals in your market, deploy your capital, and let us handle everything else. Borrower vetting, deal underwriting, payment tracking, payoff letters — all done. You just say yes.",
        btn1: "Browse open deals",
        btn2: "Create free account"
      },
      ribbon: {
        title: "PML uses AI to power your entire lending business",
        items: [
          { short: "VB", title: "Vet Borrowers", desc: "Match you with top clients" },
          { short: "DU", title: "Deal Underwriting", desc: "Make a decision in seconds" },
          { short: "ACOP", title: "Auto Communication", desc: "Office paperwork handled" },
          { short: "1 hr/wk", title: "Manage Your Business", desc: "Run it in an hour a week" },
          { short: "DFM", title: "Deal Funding Marketplace", desc: "Access live deals nationwide" },
          { short: "AMPS", title: "Auto Payment System", desc: "Payments managed automatically" },
          { short: "1-Click", title: "Single Click Payoff", desc: "Instant payoff letters, done" }
        ]
      },
      features: {
        label: "What you get",
        title: "Become a Lending Pro.",
        sub: "Every tool you need to find great borrowers, underwrite fast, and get paid on time — every time.",
        cards: [
          { title: "No more missed payments", desc: "PML sends automated reminders to your borrowers before every due date. Late fees are tracked automatically. You are notified the moment a payment posts — no chasing, no spreadsheets, no uncomfortable calls." },
          { title: "Lend more money", desc: "Set your criteria once and let the deal flow come to you. The more capital you deploy through PML, the more your lender profile builds — attracting better borrowers with stronger track records. Scale your book without scaling your overhead." },
          { title: "Search for the best borrowers nationwide", desc: "Filter deals by state, loan size, LTV, property type, and borrower score. Every borrower on PML is identity-verified with a real payment history. Find the right operator for your capital — wherever they are in the country." },
          { title: "Underwrite deals and borrowers in minutes — powered by AI", desc: "PML's AI surfaces red flags before you fund — LTV warnings, ARV confidence scores, scope gaps, and borrower history analysis. What used to take hours of due diligence now takes minutes. Make better decisions, faster. Coming soon." }
        ]
      },
      how: {
        label: "How it works",
        title: "Three steps. Zero overhead.",
        sub: "You bring the capital. PML does the rest.",
        steps: [
          { title: "Set your criteria once", desc: "Tell PML your lending preferences — states, loan sizes, max LTV, property types, minimum rate. Takes 5 minutes. Your feed automatically surfaces matching deals from verified borrowers." },
          { title: "Browse deals and make offers", desc: "Every deal shows full financials — purchase price, ARV, LTV, rehab budget, borrower score. Click in, set your terms, send a term sheet. Borrower accepts, counters, or declines. All in the platform." },
          { title: "Get paid. PML handles the rest.", desc: "Once funded, PML tracks every payment, sends borrower reminders, handles draw approvals, generates payoff letters, and notifies you of every activity. You review and approve. That's it." }
        ]
      },
      calc: {
        title: "See what your money can earn.",
        sub: "Private lenders on PML average 10–13% annually. Zero management overhead. Adjust the sliders to see your projected returns.",
        cap: "Capital to deploy",
        rate: "Average interest rate",
        loans: "Number of loans",
        mo: "Monthly interest income",
        moSub: "IO payments from borrowers",
        yr: "Annual interest income",
        yrSub: "Assuming full deployment",
        total: "Total year-1 return",
        totalSub: "Lenders keep 90% of interest on PML-connected deals",
        loansSuffix: "loans"
      },
      cta: {
        title: "Become a Deal Magnet.",
        sub: "Scan for deals. Deploy your capital. We handle the rest. Lenders are always free on PayMyLoan.ai.",
        btn1: "Create free lender account",
        btn2: "Browse open deals"
      }
    },
    // --- NEW LENDER INFO OBJECT ---
    lenderInfo: {
      demo: {
        eyebrow: "How it works",
        title: "Qualified borrowers ready to go.",
        subtitle: "Investors are posting bridge, slow flip, and buy-and-hold deals in your area right now. Review real deal profiles and deploy capital with no hidden fees.",
        steps: [ { num: "1", label: "Create Your Free Profile" }, { num: "2", label: "Filter Deals by LTV & ARV" }, { num: "3", label: "Review PML Score" }, { num: "4", label: "Issue Term Sheets" }, { num: "5", label: "Collect ACH Payments" } ],
        benefits: [ { title: "Verify deal numbers, scope, and comps" }, { title: "Evaluate borrower's LTV and PML score" }, { title: "Send term sheets in one click, 100% free" }, { title: "Payment tracking and amortization table" }, { title: "Generate Payoff Letters in seconds" }, { title: "Share secure access with your CPA" } ],
        ctaTitle1: "Real estate borrowers ", ctaTitle2: "looking for your money.",
        ctaSub: "Join free and browse live deals from verified borrowers today. No monthly subscriptions, no hidden fees to deploy your capital.",
        btn1: "Browse deals now →", btn2: "View deal map"
      },
      calculator: {
        eyebrow: "Earnings Calculator",
        title: "See what your money can earn.",
        subtitle: "Adjust the sliders to see your projected returns. PML lenders average 11–13% annually with zero management overhead.",
        probs: [ { title: "Capital to Deploy" }, { title: "Avg. Interest Rate" }, { title: "Number of Loans" } ]
      },
      who: {
        eyebrow: "Lender Profiles",
        title: "Two types of lenders. One platform.",
        subtitle: "Whether you've been lending for years or are just getting started, PML handles the five things every lender needs.",
        cards: [
          { icon: "💼", title: "Seasoned Lender", bullets: ["You know what to look for in a borrower", "You need volume without PDF chaos", "You prefer automated payoffs", "You need clean records for taxes"] },
          { icon: "🏗️", title: "New to Lending", bullets: ["You have capital but not the network", "You need help evaluating ARV & LTV", "You seek reliable payment histories", "You want security and standard docs"] }
        ]
      },
      diff: {
        title: "PML vs. the old way",
        subtitle: "Opaque platforms, pooled funds, and scattered emails — or one direct platform.",
        table: {
          hPml: "PayMyLoan.ai", hC1: "The old way",
          rows: [
            { label: "Deal sourcing", pml: "Filter live deals near you", c1: "Rely on contacts and slow networking" },
            { label: "Risk assessment", pml: "PML Score, FICO & verified ARV", c1: "Guessing and pulling manual credit reports" },
            { label: "Capital transparency", pml: "Your money, your direct deals (1 to 1)", c1: "REIT funds where you lose control" },
            { label: "Closing", pml: "Instant digital commitment letter", c1: "Back-and-forth with title and lawyers" },
            { label: "Collection", pml: "Automated ACH payments every month", c1: "Pray they remember to wire the money" },
            { label: "Cost to use", pml: "Always free for lenders", c1: "Pay platform fees or management fees" }
          ]
        },
        mantra: { h1: "Start ", h2: "earning ", h3: "returns ", h4: "on your money ", h5: "today", h6: ".", p: "Lenders use the platform for free. No monthly fees. No hidden costs. Just returns." }
      }
    },

    borrowerLanding: {
      hero: {
        badge: "For Real Estate Borrowers",
        title1: "You bring the deal.",
        title2: " We do the rest.",
        sub: "Show lenders who you are, what the deal is, and why it pencils — in minutes. Get funded, keep your lender happy, and move on to the next deal. PML handles everything in between.",
        btn1: "Post your deal free",
        btn2: "See how it works"
      },
      proof: {
        items: [
          { val: "24–72 hrs", label: "Average time to first offer" },
          { val: "$0", label: "Due at posting with affiliate link" },
          { val: "No credit", label: "Asset-based lending only" },
          { val: "1-click", label: "Payoff letters, draw requests" }
        ]
      },
      features: {
        label: "What you get",
        title: "Become a Borrowing Pro.",
        sub: "Everything you need to find money fast, close clean, and keep coming back.",
        cards: [
          { title: "No more clerical errors or disorganization", desc: "Every document, deal, and payment lives in one place. Term sheets, draw requests, extensions, payoff letters — organized automatically. No more digging through emails or losing paperwork." },
          { title: "No more missed payments", desc: "Automated reminders before every due date. Your dashboard shows exactly what is owed and when. Pay on time, every time — protect your lender relationship and your borrower score." },
          { title: "Payoffs in minutes", desc: "Pick your payoff date and PML generates the exact amount instantly — calculated at your original contract rate on a 360-day year. Official payoff letter PDF ready in seconds. No calls, no waiting, no math." },
          { title: "Build your PML Credit Score", desc: "Every on-time payment, clean payoff, and completed draw builds your PML borrower score. Lenders see it before they fund. A higher score means faster approvals, better rates, and more lenders competing for your deals." },
          { title: "Join the funding marketplace", desc: "Post your deal and step into a marketplace of verified private lenders actively looking to deploy capital in your market. No broker. No middleman. Lenders compete for your deal — you pick the best offer." },
          { title: "Use AI to pitch your deals", desc: "PML's AI analyzes your deal and helps you present it in the strongest possible light — ARV confidence, scope clarity, LTV positioning. Walk into the marketplace with a pitch that stands out. Coming soon." }
        ]
      },
      how: {
        label: "How it works",
        title: "Post your deal. Get funded. Do it again.",
        sub: "No banks. No brokers. No runaround.",
        steps: [
          { title: "Post your deal in 5 minutes", desc: "Enter your property address, loan amount, ARV, and rehab budget. Your deal goes live immediately — verified private lenders in your market see it and can send you offers." },
          { title: "Lenders compete. You pick the best offer.", desc: "Multiple lenders can send you term sheets. Compare rate, term, points, and fees side by side. Accept, counter, or decline with one click. No broker in the middle." },
          { title: "PML handles everything after closing.", desc: "Payment reminders, draw requests, payoff letters, extensions — all in one dashboard. Keep your lender happy, build your score, and come back for your next deal with a stronger track record." }
        ]
      },
      cta: {
        title1: "You bring the deal.",
        title2: "We do the rest.",
        sub: "Post free with a referral code, or $99/month. No banks, no credit checks, no runaround. Lenders in your market are ready right now.",
        btn1: "Post your deal free",
        btn2: "See a live demo"
      }
    },

    modes: { lender: "💰 Have Funds", borrower: "🏗️ Need Funding" },
    tabs: {
      lender: ["Info", "Live Deals", "Demo", "Problems We Solve", "Who Is This For", "What Makes Us Different"],
      borrower: ["Info", "Find Lenders", "Demo", "Problems We Solve", "Who Is This For", "What Makes Us Different"]
    },
    sidebar: {
      title: "Start for Free", subLender: "Free forever for lenders.", subBorrower: "Post your first deal free.",
      emailPh: "Email address", passPh: "Password", btnCreate: "Create Free Account →", or: "or", btnSignIn: "Sign In",
      noteLender: "Free forever for lenders. No credit card.", noteBorrower: "Free for 7 days. Credit card required to activate.",
      postLenderQ: "Looking to fund a deal?", postLenderA: "→ Browse All Deals", postBorrowerQ: "Already have an account?", postBorrowerA: "→ Post a Deal"
    },
    placeholders: { liveDeals: "Map and Deal Cards view will go here...", demo: "Demo video will go here...", problems: "Problems grid will go here...", who: "Who is this for cards will go here...", diff: "Comparison table will go here..." }
  },

  welcomeModal: { brand: "PayMyLoan", brandSuffix: ".ai", tagline: "Private money lending — simplified.", question: "How can we help you today?", lender: { icon: "💰", title: "Have Funds to Deploy?", sub: "I want to fund real estate deals" }, borrower: { icon: "🏗️", title: "Want a Deal Funded?", sub: "I need capital for my next deal" }, signin: { icon: "🔑", title: "User Sign In", sub: "Access your portal" } },
  nav: { skip: "Skip to the sign-up form", brand: "PayMyLoan", brandSuffix: ".ai", links: [ { href: "#como-funciona", label: "How it works" }, { href: "#costo", label: "Platform cost" }, { href: "#seguridad", label: "Security" }, ], features: "Features", howItWorks: "How it works", login: "Log in", logout: "Log out", cta: "Log in", themeToggle: "Switch theme", langToggle: "Switch language", backToDashboard: "Back to dashboard", },
  landingNav: { lenders: "For Lenders", borrowers: "For Borrowers", why: "Why PML", demo: "Demo", affiliates: "Affiliates", signIn: "Sign in", getStarted: "Get started free" },
  hero: { eyebrow: "Private loan servicing", title: "One balance both sides trust.", deck: "PayMyLoan.ai services private real-estate-secured loans: the borrower pays by ACH, the lender sees exactly what was paid and on which property, and both work from the same terms, documents and balance.", points: [ "ACH payments: 0.8%, capped at $5.00 per transaction", "Terms accepted by both parties, with date, time and IP", "Two-factor authentication required for lenders", ], trustLabel: "Operated by", trust: [ "Dueño a Dueño LLC", "Payments processed by Stripe", "ACH Direct Debit", ], },
  form: {
    title: "Create your account",
    subtitle: "Free to join. No credit card required.",
    intents: [
      { value: "borrower", label: "I have a deal", hint: "Borrower" },
      { value: "lender", label: "I have capital", hint: "Lender" }
    ],
    firstName: "First name",
    firstNamePh: "John",
    lastName: "Last name",
    lastNamePh: "Smith",
    email: "Email address",
    emailPh: "john@example.com",
    phone: "Cell phone",
    phonePh: "(901) 555-0100",
    phoneHint: "For deal alerts and account security.",
    password: "Password",
    passwordPh: "At least 8 characters",
    submit: "Create account",
    submitting: "Creating...",
    or: "or",
    googleAuth: "Continue with Google",
    termsPre: "By creating an account you agree to our ",
    termsLink: "Terms of Service",
    termsAnd: " and ",
    privacyLink: "Privacy Policy",
    termsPost: ".",
    haveAccount: "Already have an account?",
    login: "Sign in",
    errors: {
      summary: "Check the highlighted fields.",
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter a valid email address.",
      phone: "Enter a 10-digit phone number.",
      password: "Password must be at least 8 characters.",
      intent: "Choose your account type.",
      submit: "Error creating account. Try again.",
    },
    success: {
      title: "Check your email",
      subtitle: "We sent a confirmation link to",
      step1Pre: "Open the email from ",
      step1Bold: "PayMyLoan.ai",
      step2Pre: "Click ",
      step2Bold: "Confirm my email address",
      step3: "You'll be taken directly to posting your first deal",
      resend: "Resend confirmation email",
      resendDone: "Sent!",
      spamPre: "Can't find it? Check your ",
      spamBold: "spam or junk folder",
      spamPost: " and mark us as safe.",
      again: "Use a different email"
    }
  },
  loginPage: { title: "Log In", subtitle: "Enter your credentials to manage your loans.", cardTitle: "SECURE LOGIN", emailLabel: "Email address", emailPlaceholder: "email@example.com", passwordLabel: "Password", passwordPlaceholder: "Enter your password", submit: "SIGN IN", forgot: "I'VE FORGOTTEN MY PASSWORD", back: "BACK TO HOME", noAccount: "Don't have an account yet?", signup: "Sign up here", processing: "Processing...", twoFactorTitle: "2FA VERIFICATION", twoFactorDesc: "Enter the 6-digit code from your authenticator app or a recovery code.", twoFactorLabel: "Verification code", twoFactorPlaceholder: "E.g. 123456", twoFactorVerifying: "Verifying...", twoFactorConfirm: "CONFIRM", twoFactorCancel: "Cancel", errorDefault: "Failed to log in", error2FA: "Incorrect or expired 2FA code", errorNetwork: "Unknown network error", },
  pmlHero: { badge: "AI-Powered Loan Management", subtitle: "PML — Private Money Lender. PayMyLoan.ai. Both sides of the deal.", title1: "From pitch", title2: "to payoff.", title3: "One platform.", by: "by PayMyLoan.ai", desc: "The pitch. The loan request. The commitment. Payment processing. The payoff. All in one place — for borrowers and lenders alike.", cta1: "Get Early Access", cta2: "See how it works", },
  whoItHelps: { eyebrow: "Who It Helps", title1: "One platform.", title2: "Six problems solved.", lead: "PML takes the chaos out of private lending — giving borrowers clarity and lenders control, so every deal closes clean.", cards: [ { role: "Borrower", icon: "🏗️", title: "From pitch to payoff in one place", points: [ "All loans in one dashboard", "Generate pitches & commitment letters", "Automated payments — never miss again", "Instant payoffs & PML rating" ] }, { role: "Lender", icon: "🏦", title: "Know who paid, what's owed, what's next", points: [ "Payment tracking across all borrowers", "Vet borrowers before committing capital", "Generate commitment letters & payoffs", "Control visibility in the marketplace" ] }, { role: "Bookkeeper", icon: "📒", title: "Clean records, zero chasing", points: [ "Principal vs. interest split on every payment", "Every loan tied to a property", "Exportable records — no manual entry", "No more monthly emails asking for details" ] }, { role: "CPA", icon: "🧾", title: "Year-end ready — one click", points: [ "Interest income/expense clearly separated", "Every loan documented by property", "Full year report — exportable instantly", "No digging through emails for records" ] }, { role: "Title Company", icon: "🏛️", title: "Payoffs before closing day — not after", points: [ "Instant payoff statements sent directly", "Both parties confirmed on same number", "No last-minute scrambles at the table", "Clean closing every time" ] }, { role: "Insurance Company", icon: "🛡️", title: "Mortgagee clause — accurate every time", points: [ "Lender info pulled from PML profile", "Mortgagee clause always up to date", "No manual requests for lender details", "Every property, every loan, documented" ] } ], stats: [ { value: "< 30s", label: "Payoff generated" }, { value: "2", label: "Sides. One platform." }, { value: "0", label: "Spreadsheets needed" }, { value: "100%", label: "CPA-ready at year end" } ] },
  beforeAfter: { eyebrow: "Before vs After", title: "Two investors. Same business. Different tools.", before: { badge: "Without PML", icon: "😤", items: [ "Borrower: no idea who to call to get a quick answer from the lender", "Borrower: loans scattered across 3 banks, 2 private lenders, and a spreadsheet", "Borrower: bookkeeper hounding you every month to explain which loan is which", "Lender: no idea who paid, how much, or when — until something goes wrong", "Lender: closing day scramble to calculate the payoff while title is waiting" ] }, after: { badge: "With PML", icon: "😎", items: [ "Borrower: all loans in one place — every balance, every payment, every property", "Borrower: send your pitch + commitment letter to a lender in minutes", "Borrower: payoff generated instantly — no waiting, no back-and-forth", "Lender: know exactly who paid, what amount, and when — in real time", "Lender: interest tracking and payment history handed directly to your bookkeeper" ] } },
  soundFamiliar: { eyebrow: "Sound familiar?", title: "Private money lending runs on chaos. It doesn't have to.", cards: [ { role: "Borrower", icon: "📝", title: "“Building a pitch takes forever.”", desc: "Formatting a deal summary, loan request, and commitment letter for each lender is hours of manual work. PML generates all of it in minutes." }, { role: "Borrower", icon: "🤝", title: "“The commitment letter is somewhere in my email.”", desc: "Commitment letters get buried in threads, unsigned, or lost. PML keeps every commitment tied to the loan from day one." }, { role: "Borrower", icon: "💳", title: "“Payment processing is a mess.”", desc: "Manual wires, Zelle, checks — no consistent system. PML centralizes payment processing so every transaction is tracked and confirmed." }, { role: "Lender", icon: "📋", title: "“Where's the borrower application?”", desc: "Lenders need a standardized application from every borrower before committing. PML gives borrowers a built-in application that feeds directly to the lender." }, { role: "Lender", icon: "🔍", title: "“I need to verify who I'm lending to.”", desc: "Entity lookup, background check, credit history — lenders are putting up real capital and need to vet borrowers before signing. PML centralizes that due diligence in one place." }, { role: "Lender", icon: "🏘️", title: "“I don't have consistent deal flow.”", desc: "Lenders with capital sitting idle need qualified borrowers to find them. PML's marketplace connects lenders with vetted deal flow automatically." }, { role: "Lender", icon: "📊", title: "“My bookkeeper needs the interest breakdown — again.”", desc: "PML tracks principal vs. interest on every payment and exports clean reports your bookkeeper can actually use." }, { role: "Borrower", icon: "💸", title: "“I forgot to make the payment.”", desc: "Manual wires get missed. Late payments damage lender relationships and can trigger default clauses. PML automates payments so nothing slips." } ], solution: { icon: "✅", title: "PML fixes both sides.", desc: "One platform. Borrowers get clarity, speed, and organization. Lenders get payment tracking, interest records, and instant payoffs. Built for private money." } },
  liveActivity: { eyebrow: "Live Activity", title1: "The private money market,", title2: "in real time.", desc: "Every loan request, every active deal, every closed transaction — tracked on PML.", stats: { requested: { label: "Loans Requested", value: "47", desc: "Active loan requests in marketplace", live: "LIVE" }, current: { label: "Loans Current", value: "312", desc: "Loans actively being serviced", metric: "$48.2M total outstanding" }, closed: { label: "Loans Closed", value: "1,204", desc: "Total deals completed on PML", metric: "$187.4M total funded ✓" } }, map: { title: "Deal Activity — United States", legendRequested: "Requested", legendCurrent: "Current", legendClosed: "Closed" } },
  comingSoon: { eyebrow: "Coming Soon", title1: "The Private Money ", title2: "Marketplace.", desc: "Where borrowers with deals connect directly with lenders who have capital ready to deploy. Inside PML, borrowers can generate a pitch deck, create a commitment letter, and get funded — all in one place.", card1: { eyebrow: "For Lenders", title: "Browse Borrowers Looking for Capital", desc: "See a live feed of borrowers actively seeking funds. View each borrower's PML profile — loans history, payment track record, total borrowed — before committing a dollar.", points: [ "Browse active loan requests with full deal details", "View each borrower's PML Rating + full profile before committing", "Send term sheets directly inside the platform", "Build your lender profile — deals funded, capital deployed, response time, rating" ] }, card2: { eyebrow: "PML Profiles", title: "Both Sides Build Credibility.", desc: "Borrowers and lenders each earn a public PML profile based on their real track record on the platform.", borrowerLabel: "Borrower Profile", borrowerStats: [ { label: "Total Loans", value: "14" }, { label: "On-Time Payment Rate", value: "97%" }, { label: "Total Borrowed", value: "$2.4M" }, { label: "PML Borrower Rating", value: "A+" } ], lenderLabel: "Lender Profile", lenderStats: [ { label: "Deals Funded", value: "31" }, { label: "Total Capital Deployed", value: "$4.1M" }, { label: "Avg. Response Time", value: "< 24hrs" }, { label: "PML Lender Rating", value: "A+" } ] } },
  featuresGrid: { eyebrow: "What you get", title: "Everything to run private loans cleanly.", items: [ { label: "01 — BORROWER", title: "All Loans in One Place", desc: "Every private loan, every property, every balance — one dashboard. No more hunting across emails and spreadsheets." }, { label: "02 — BORROWER", title: "Instant Payoff Statements", desc: "Generate a payoff accurate to the day in seconds. Send it straight to title. No waiting on your lender." }, { label: "03 — BORROWER", title: "Pitch Deck Generator", desc: "Fill out your deal inside PML and instantly generate a professional pitch to send to lenders — property details, loan request, terms, and financials all formatted automatically." }, { label: "04 — LENDER", title: "Payment Tracking", desc: "Know exactly who paid, how much, and when. Every borrower. Every loan. Always current." }, { label: "05 — LENDER", title: "Interest Tracking for Bookkeepers", desc: "Principal vs. interest split on every payment — clean, exportable, and ready for your bookkeeper or CPA." }, { label: "06 — BOTH", title: "Same Numbers, Both Sides", desc: "Borrower and lender log in and see the same live data. No disputes. No surprises at closing. Ever." } ] },
  dashboardSplit: { eyebrow: "Dashboard", title: "Both sides see the same truth.", desc1: "Borrowers and lenders each get a private login with live loan data. What you owe, what you're owed — always in sync.", desc2: 'No more calls asking "what\'s my balance?" No more disputes at closing. Everyone looks at the same number.', mockLogo: "PML.ai", mockBadge: "● Live", mockCard1Label: "Total Payoff — Good Through Aug 31", mockCard1Value: "$292,955.54", mockCard1Sub: "↓ $95.34/day after Aug 31", mockCard2Label: "Principal", mockCard2Value: "$290,000", mockCard3Label: "Accrued Interest", mockCard3Value: "$2,955.54", },
  profilesDirectory: { eyebrow: "Profiles & Directory", title1: "Your reputation ", title2: "follows you.", desc: "Every deal, every payment, every loan builds your PML profile. Borrowers find lenders. Lenders vet borrowers. Both sides know exactly who they're dealing with.", borrower: { badge: "Borrower Profile", name: "Liam Brown", location: "Memphis, TN · Real Estate Investor", stat1Label: "Total Loans", stat1Value: "14", stat2Label: "On-Time Payment Rate", stat2Value: "97%", stat3Label: "PML Borrower Rating", stat3Value: "A+" }, lender: { badge: "Lender Directory", title: "Find a Lender", subtitle: "Search lenders actively doing private loans", lender1Name: "NextGen Growth LLC", lender1Desc: "Memphis, TN · Up to $500K · 10–13%", lender1Deals: "31 deals", lender2Name: "Private Capital Group", lender2Desc: "Nashville, TN · Up to $1M · 10–12%", lender2Deals: "18 deals", lender3Name: "Southland Lending LLC", lender3Desc: "Birmingham, AL · Up to $300K · 11–14%", lender3Deals: "9 deals" } },
  pmlCta: { title1: "Your loans,", title2: "organized.", brand: "PML", brandSuffix: " — PayMyLoan.ai", desc: "Join the early access list. Be first when we launch." },
  pmlFooter: { by: "by PayMyLoan.ai", rights: "PML / PayMyLoan.ai — Private Lending, Finally Organized." },
  benefits: { eyebrow: "What it solves", title: "What today lives in spreadsheets and loose emails.", lead: "A private loan is handled today with separate transfers and a spreadsheet only one side maintains. Nobody has a single source of truth on how much is owed, how much of it was principal, and when the loan matures.", items: [ { title: "Terms both parties accepted", body: "Property, amount, rate, structure and maturity are captured once and both parties accept them inside the platform. Accepted terms are never edited in place: a change creates a new version that reopens acceptance for both.", }, { title: "The balance is computed, not negotiated by email", body: "A full schedule with principal, interest and remaining balance, for interest only, fully amortized or balloon structures. Every payment received is applied under an explicit rule: late fees, then interest, then principal.", }, { title: "A returned ACH never shows as collected", body: "ACH settles in business days and can be returned. While that happens the payment shows as in transit, not received, and a return notifies both parties. That is the difference between a real balance and an optimistic one.", }, ], },
  how: { eyebrow: "Getting started", title: "Four steps to the first payment schedule.", steps: [ { title: "Create your account", body: "Either party sets up the loan and captures the property held as collateral: address, type and, if you have it, the parcel number.", }, { title: "Invite the other party", body: "A single-use access link goes out by email. Whoever receives it sets a password and lands directly on the loan.", }, { title: "Both accept the terms", body: "The counterparty reviews amount, rate, term and maturity. They accept, or decline with a comment. Each acceptance is recorded with date, time and IP.", }, { title: "The loan goes active", body: "With both acceptances the payment schedule is generated and both sides see the same balance from their dashboard.", }, ], },
  cost: { eyebrow: "Platform cost", title: "Transparent structure, no hidden fees.", lead: "Costs are clearly defined. ACH processing costs base ACH + $9/month per loan (capped at $99/month).", tableHead: ["Fee Type", "Amount", "When it is charged"], rows: [ ["Borrower Subscription", "$9.00 / mo", "Monthly after 7-day trial"], ["Application / Vetting", "$99.00", "One-time when applying"], ["Marketplace Connection", "1% (Min $999)", "At closing only (Public deals)"], ["Private Deals", "$0.00", "Direct invitation"], ["ACH Processing", "ACH Cost + $9", "Monthly per loan (Max $99)"], ], compareLabel: "Platform Legal Notice", compare: "Dueño a Dueño LLC operates solely as a technology connection platform. We are not a lender or broker. All platform fees are broken down prior to closing.", pendingLabel: "About Lender Fees", pending: "Lenders configure their own fees (Origination, Processing, Underwriting, Doc Prep) and penalties, which are added transparently to your Commitment Letter.", },
  security: { eyebrow: "Security", title: "Third-party money moves here. Access is treated accordingly.", items: [ { title: "Two-factor authentication required", body: "For lenders it is not optional: they control where the money goes.", }, { title: "Permissions per loan, not per global role", body: "Every query is filtered by your participation in that loan. No role opens everything.", }, { title: "We never store bank account numbers", body: "Stripe holds the payment method. We hold its identifier and the last four digits.", }, { title: "An audit log of the events that matter", body: "Term changes, acceptances, payoff approvals, bank account changes and document downloads are all recorded.", }, { title: "Alerts on any banking change", body: "Both parties are notified. It is the classic fraud vector in servicing and it is treated as one.", }, { title: "Documents private per loan", body: "Promissory note, deed of trust and settlement statement are served with short-lived links, never a public URL.", }, ], },
  finalCta: { eyebrow: "Get started", title: "Set up your first loan.", body: "Create the account, capture the terms and invite the other party. The schedule is generated once both accept.", cta: "Create account", },
  footer: { tagline: "Servicing for private real-estate-secured loans.", entity: "A subsidiary of Dueño a Dueño LLC", links: [ { href: "#", label: "Terms of service" }, { href: "/aviso-de-privacidad", label: "Privacy notice" }, ], linksNote: "Terms of service: [COPY PENDING]", rights: "All rights reserved.", },
  privacy: { eyebrow: "Legal", title: "Privacy notice", updated: "Last updated: August 28, 2026", back: "Back to home", intro: [ "This notice explains what personal data PayMyLoan.ai collects, what we use it for, who we share it with, and how you can exercise your rights over it.", "PayMyLoan.ai is in early access: today we only collect the data from the wait-list sign-up form. Before we turn on full loan servicing, we will update this notice to cover loan data —collateral property, terms, payments and documents— that will be added at that point.", ], sections: [ { heading: "1. Who is responsible for your data", paragraphs: [ "PayMyLoan.ai is the brand under which Dueño a Dueño LLC operates this site and, later, the private loan servicing platform.", "Address for the purposes of this notice: [TO BE DEFINED].", "Applicable law and the authority you can turn to if we do not resolve your request: [TO BE DEFINED].", ], }, { heading: "2. What data we collect today", paragraphs: [ "While we are in early access, the only data we collect is what you leave on the wait-list sign-up form:", ], list: [ "Full name", "Email address", "Phone number", "Password, stored encrypted; no one at PayMyLoan.ai can read it in plain text", "Whether you are looking to lend or to borrow (this only sets what you see when you log in; it creates no obligation)", "That you accepted the terms of service and this notice, with date and time", "The language you used to fill out the form", ], }, { heading: "3. What data we will collect once you open a loan", paragraphs: [ "As soon as setting up or accepting a loan is available, servicing-specific data will be added:", ], list: [ "Address, type and, if applicable, parcel number of the collateral property", "Amount, rate, structure and maturity of the loan, and every version of those terms you accepted", "Payment history: date, amount, and how it was applied to late fees, interest and principal", "Your payment method's identifier and its last four digits; the full account number is held by Stripe, not by us", "The loan documents you accepted: promissory note, deed of trust and settlement statement", "Date, time and IP address of every term acceptance, bank account change and document download", ], }, { heading: "4. What we use your data for", paragraphs: [], list: [ "Letting you know when your access to the platform is ready", "Creating your account and, later, administering the loan you gave or are paying", "Computing the balance, applying payments and generating the payment schedule", "Verifying your identity and enabling two-factor authentication, required for lenders", "Detecting and flagging suspicious changes, such as a bank account change", "Meeting legal and tax obligations related to loan servicing", ], note: "We do not use your data for advertising and we do not sell it to third parties.", }, { heading: "5. Who we share your data with", paragraphs: [], list: [ "The other party on the same loan, but only what is needed to administer it: they never see your password or your full bank account number", "Stripe, which processes ACH payments and holds the payment method; we only store its identifier and the last four digits", "Authorities, if required by law or a court order", ], note: "We do not share or sell your data for marketing purposes.", }, { heading: "6. How we protect your data", paragraphs: [], list: [ "Two-factor authentication required for lenders, since they control where the money goes", "Permissions per loan: every query is filtered by your participation in that specific loan, never by a role that opens everything", "We never store full account numbers; that lives with Stripe", "An audit log of the events that matter: term changes, acceptances, payoff approvals, bank account changes and document downloads", "Both parties are notified of any bank account change, the most common fraud vector in servicing", "Documents are private per loan, served with short-lived links, never a public URL", ], }, { heading: "7. How long we keep your data", paragraphs: [ "If you are on the wait list, we keep your data until you open an account or until you ask us to delete it.", "If you have an active loan, we keep the loan data for as long as the relationship lasts, plus any additional time required by law for financial records. Exact period: [TO BE DEFINED].", ], }, { heading: "8. Your rights and how to exercise them", paragraphs: [ "You can ask us to access your data, correct it, delete it, or object to a specific use. You can also withdraw your consent at any time; for the wait list, simply asking us is enough. Withdrawing consent does not affect processing we already carried out before the request.", "Channel to exercise these rights: [TO BE DEFINED — there is no contact email for PayMyLoan.ai yet].", ], }, { heading: "9. Cookies and local storage", paragraphs: [ "The site does not use tracking or advertising cookies. It stores two preferences in your browser's local storage —light or dark theme and language— that never leave your device. You can clear them from your browser settings.", ], }, { heading: "10. Minors", paragraphs: [ "PayMyLoan.ai is not directed at minors and does not knowingly collect data from anyone under 18.", ], }, { heading: "11. Changes to this notice", paragraphs: [ "If we change this notice in a material way —for example, when we turn on full loan servicing— we will publish it here with a new update date before we process the new data.", ], }, { heading: "12. Contact", paragraphs: [ "Contact email for privacy: [TO BE DEFINED].", "Until that channel exists, you can use the same email you signed up with on the wait list; we will reply from there as soon as it is available.", ], }, ], },
  dashboardAdmin: { title: "Admin Dashboard", subtitle: "Global metrics and platform health.", metrics: { activeLoans: "Active Loans", totalVolume: "Processed Volume (ACH)", platformRevenue: "Total Revenue (0.8%)", pendingVerifications: "Pending Verifications" }, recentActivity: "Recent System Activity", addUserBtn: "Add User", viewUsersBtn: "View Users", viewContractsBtn: "View Contracts", loading: "Loading metrics...", errorAuth: "Invalid or expired session.", errorFetch: "Failed to load admin data.", errorNetwork: "Unknown network error" },
  adminUsersList: { title: "System Users", subtitle: "Directory of administrators, lenders, and borrowers.", table: { name: "Name", type: "Type", email: "Email", phone: "Phone", role: "Role", status: "Status" }, back: "Back to dashboard", addUserBtn: "Add User", loading: "Loading users...", empty: "No users registered.", errorAuth: "You don't have admin permissions or your session expired.", errorFetch: "Error fetching users.", errorNetwork: "Unknown network error", active: "Active", inactive: "Inactive", na: "N/A" },
  adminAddUser: { title: "Create User", subtitle: "Manually register an admin, lender, or borrower.", roleLabel: "Platform Role", roles: { admin: "Administrator", lender: "Lender", borrower: "Borrower" }, nameLabel: "Full Name", namePh: "E.g. Jane Doe", emailLabel: "Email Address", emailPh: "email@example.com", phoneLabel: "Phone Number", phonePh: "E.g. 555 123 4567", submit: "Register account", back: "Back to dashboard", submitting: "Registering...", phoneHint: "Must be exactly 10 digits (optional).", errorFetch: "Failed to create user.", errorNetwork: "Unknown network error", successTitle: "User created successfully!", successDesc1: "An account has been registered for", successTempPw: "Temporary password generated:", successCreateAnother: "Create another", successViewList: "View list" },
  twoFactorPage: {
    securityAlert: { title: "Security verification required", desc: "Any change to banking information, passwords, or contact details requires identity confirmation." },
    contexts: {
      login: { title: "Verify your identity", sub: "We sent a 6-digit code to your phone. Enter it below to continue." },
      publish: { title: "Confirm identity to publish deal", sub: "Your deal is ready to go live. Confirm your identity to publish." },
      bank: { title: "Confirm bank account change", sub: "Enter the code sent to your current phone number to authorize this banking change." },
      password: { title: "Confirm password change", sub: "Enter the code sent to your phone to confirm your password change." },
      phone: { title: "Verify your new phone number", sub: "Enter the code sent to your NEW phone number to complete the update." },
      email: { title: "Confirm email address change", sub: "Enter the code sent to your phone to confirm this email address change." }
    },
    codeSent: "Code sent to",
    expiresIn: "Code expires in",
    expired: "Expired",
    verifyBtn: "Verify",
    verifying: "Verifying...",
    noCode: "Didn't get a code?",
    resend: "Resend",
    wrongDevice: "Using a different device?",
    backLogin: "Back to login",
    report: "Report suspicious activity"
  },
  competitive: {
    hero: {
      label: "Competitive Positioning",
      title1: "$80 billion a year.",
      title2: "Still running on spreadsheets.",
      sub: "In 15,000 real estate closings, not one private lender had software built for them. Spreadsheets. Manual payoffs. No vetting. No ACH. PayMyLoan fixes that."
    },
    values: [
      { num: "$80B+", label: "Annual private loan originations", desc: "300,000+ private real estate loans close every year in the U.S. — built by a borrower who has been on both sides." },
      { num: "10,000+", label: "Active private lenders with no software", desc: "Over 10,000 active private money lenders in the U.S. Not one had a system built for them. PML is that system.", highlight: true },
      { num: "100%", label: "Free for lenders — always", desc: "No platform fee, no monthly charge, no percentage of returns. Lenders pay nothing." }
    ],
    pain: {
      title: "The problem PML solves",
      before: "Before PayMyLoan",
      after: "With PayMyLoan",
      rows: [
        { b: "Track loans on a spreadsheet — no alerts, no automation", a: "Live loan dashboard — every deal, every payment, every status in one place" },
        { b: "Calculate payoffs manually every time — error-prone, time-consuming", a: "One-click payoff letters with per diem auto-calculated at original contract rate" },
        { b: "Chase borrowers for payments — no automated reminders", a: "ACH pulls on the 1st — automated, Nacha-compliant, with full paper trail" },
        { b: "No standard deal format — every borrower sends different info", a: "Standardized deal submission — LTV check, RentCast ARV auto-fill, complete underwriting package" },
        { b: "No vetting — lend to anyone, find out later", a: "PML Score, payment history, background + credit check, entity verification" },
        { b: "No messaging trail — deals done by text and email", a: "Deal-tied messaging — full conversation thread, file sharing, contact info blocking" },
        { b: "Closing docs in email threads — impossible to find later", a: "Tokenized title upload — docs filed to deal folder automatically at closing" },
        { b: "Find deals by word of mouth only", a: "Deal marketplace — browse verified borrower deals matching your criteria" }
      ]
    },
    comparison: {
      title: "How PayMyLoan compares",
      cols: { pml: "PayMyLoan", alt1: "LenderKit / Peer Lending", alt2: "Generic CRM", alt3: "Spreadsheet" },
      rows: [
        { label: "Built for private RE lending", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "Free for lenders", pml: "yes", c1: "no", c2: "no", c3: "yes" },
        { label: "ACH automated payments", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "One-click payoff letters", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Borrower marketplace / deal flow", pml: "yes", c1: "partial", c2: "no", c3: "no" },
        { label: "Borrower vetting (score + background)", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "2FA security gates (bank changes, login)", pml: "yes", c1: "no", c2: "partial", c3: "no" },
        { label: "Institutional refi marketplace (3.0)", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Title doc upload automation", pml: "yes", c1: "no", c2: "no", c3: "no" },
        { label: "Mobile-friendly", pml: "yes", c1: "partial", c2: "partial", c3: "no" }
      ]
    },
    mantra: {
      q1: "\"Most investors want a return on their money. The best ones want the return of their money.\"",
      main1: "Stop running your lending business ",
      main2: "on a spreadsheet.",
      q2: "\"Built for Main Street. Finally.\""
    },
    cta: {
      lender: "I'm a lender — get started free",
      borrower: "I'm a borrower"
    }
  },
  founderStory: {
    hero: {
      label: "The Story Behind PayMyLoan.ai",
      title: "Built by a borrower who got tired of watching lenders struggle.",
      sub: "After borrowing close to $100 million from private lenders over a decade in real estate, I noticed something. Every single one of them was running their business the same broken way. So I built the thing they needed — from the borrower's side of the table."
    },
    sections: { s1: "Where this started", s2: "How we built it", s3: "What we built" },
    p1: "I've been borrowing private money for real estate deals for over ten years. Tens of millions of dollars across hundreds of transactions. At some point the number got close to a hundred million dollars borrowed from private lenders across Tennessee and beyond.",
    p2: "And in all that time, across all those deals, I never worked with a single non-institutional lender who had any kind of system for running their lending business.",
    painList: {
      title: "What \"running a private lending business\" actually looked like",
      items: [
        "Excel spreadsheets to track loans, payments, and balances",
        "Checking a bank account to see if a borrower paid this month",
        "Choppy email threads instead of real term sheets",
        "Back-and-forth emails to collect insurance before closing",
        "No standard way to vet a new borrower — just referrals and gut feeling",
        "Borrowers who had no idea how to pitch a deal in a clear format",
        "No automatic payments set up at closing",
        "No automated emails when payments were due, made, or missed",
        "Digging up settlement statements to remember original terms for a payoff",
        "Commitment letters going out late — or not at all"
      ]
    },
    p3Pre: "I started working with institutional lenders — hard money companies, regional funds — and the difference was night and day. They had systems. They had software. They had underwriting checklists, standardized deal formats, automated payment tracking. ",
    p3Bold: "They had built infrastructure around their lending operations.",
    p4: "Main Street hadn't done that. Nobody was helping the everyday private lender run their business the way institutional lenders run theirs.",
    quote1: {
      text: "\"I asked my attorneys — out of 15,000 closings with private lenders, did a single one of them have any system, process, or software to run their lending operation?\"",
      cite: "— Spencer Shadrach, Founder"
    },
    p5: "The answer was no. Not one.",
    p6: "That was the gap. And I was in a unique position to fill it — because I'd seen both sides. I knew what borrowers needed to communicate clearly. I knew what lenders needed to feel confident and stay organized. And I had the relationships, the deal history, and the team to build the solution.",
    p7: "We started with the basics — the things that caused the most daily friction on both sides.",
    milestones: [
      { title: "The commitment letter problem", desc: "Borrower and lender agree on terms. Then what? Usually a choppy email, a PDF someone built in Word, or nothing at all. We automated it. Offer accepted — commitment letter generated and sent to all parties in seconds." },
      { title: "The payment tracking problem", desc: "Nobody should be checking their bank account to see if they got paid. We built ACH payment tracking that confirms payment the moment it posts — with automatic notifications to both sides. No more uncertainty." },
      { title: "The payoff problem", desc: "Borrower calls, says they're ready to sell. Lender digs up the original note, finds the settlement statement, does the math by hand, emails a number. It takes hours. We brought it down to seconds — exact payoff to the penny, dated PDF, routed directly to title." },
      { title: "The deal pitch problem", desc: "Borrowers know a good deal when they see it. Getting that knowledge onto paper — in a format a lender can evaluate in minutes — is a different skill. We built the Deal Analyzer. Enter the address, and the platform pulls in property details, comps, and rental data automatically. Borrowers can analyze and pitch a deal in minutes, in a standardized format every lender can read the same way." },
      { title: "The marketplace problem", desc: "Every borrower wants more lenders. Every lender wants more quality deals. So we built the Funding Marketplace — a place where borrowers can post vetted deals and lenders across the country can find and fund them. Private lending without borders." },
      { title: "The vetting problem", desc: "I've borrowed close to $100 million from private lenders. Most of them had no idea. No background check. No track record. No credit pull. Just a referral and a handshake. We built the PML Borrower Score — a reputation score built from real payment history, deal history, background checks, and lender reviews. A lender in California can now fund a borrower in Tennessee and know exactly who they're dealing with." }
    ],
    quote2: {
      text: "\"What was needed was a borrower who could look at it from both perspectives — hire a team of developers and build the software that private money lenders never built for themselves.\"",
      cite: "— Spencer Shadrach, Founder"
    },
    solutionList: [
      "Stop running your lending business on spreadsheets",
      "Stop chasing borrower checks and hoping they clear",
      "Stop digging through settlement statements to remember terms",
      "Vet every borrower — credit, background, track record — before you fund",
      "Underwrite every deal in a standardized format built for lender decisions",
      "Automatic payments — ACH scheduled at closing, tracked in real time",
      "Commitment letters generated and sent in seconds",
      "Payoffs calculated to the penny with one click",
      "A marketplace where new capital finds you",
      "Free for lenders. Always."
    ],
    closing1: "This is what private lending looks like when it's built by someone who's been on both sides of the table — and refused to accept that \"spreadsheets and gut feelings\" was good enough.",
    closing2: "PayMyLoan.ai. Built for Main Street. Finally.",
    ctaBand: {
      title: "Ready to run your lending business like a real business?",
      sub: "Free for lenders. Always. Create your account and browse live deals in minutes.",
      btnLight: "See the demo first",
      btnPurple: "Create your lender account"
    }
  },
  dashboardLender: { title: "Lender Dashboard", subtitle: "Total control over your capital and yields.", metrics: { availableCapital: "Capital (Available / Deployed)", capitalDeployed: "Capital Deployed", nextPayments: "Next Payments (30 days)", avgInterest: "Avg. Interest Rate", activeBorrowers: "Active Borrowers" }, sections: { commitmentLetters: "Sent Commitment Letters", upcomingClosings: "Upcoming Closings / Payoffs", activeLoans: "Active Loans (Return)", }, tableHeaders: { borrower: "Borrower", amount: "Amount", status: "Status", type: "Type", date: "Date", action: "Action", loan: "Loan", rateBalance: "Rate / Balance" }, labels: { cap: "Prin:", int: "Int:" }, recentPayments: "Latest Received Payments", actions: { marketplace: "Browse Marketplace", viewContracts: "View my contracts" }, toggle: { open: "Open to deals", closed: "Not taking loans" }, table: { date: "Date", borrower: "Borrower", property: "Property", total: "Total Payment", principal: "Principal", interest: "Interest" }, emptyHistory: "The rest of the history will be rendered here.", loading: "Loading dashboard...", errorAuth: "Invalid or expired session.", errorFetch: "Error loading dashboard information", errorNetwork: "Unknown network error", unassigned: "Unassigned", borrowerFallback: "Borrower", emptyCommitments: "No pending commitments", emptyClosings: "No upcoming closings in the system.", emptyLoans: "No active loans", emptyPayments: "No recently processed payments." },
  auditLogs: { searchPlaceholder: "Search by action or description...", allRoles: "All Roles", system: "System / Webhooks", admins: "Administrators", lenders: "Lenders", borrowers: "Borrowers", totalRecords: "Total records:", dateHour: "Date / Time", actor: "Actor", action: "Action", description: "Event Description", noRecords: "No audit records found.", page: "Page", of: "of", prev: "Previous", next: "Next" },
  pitchDeckModal: { step: "Step", of: "of", title: "Create New Pitch Deck", purchasePrice: "Purchase Price ($)", purchasePricePh: "E.g. 150000", rehabAmount: "Rehab Amount ($)", rehabAmountPh: "E.g. 45000", loanAmount: "Requested Amount ($)", loanAmountPh: "E.g. 250000", loanType: "Loan Type", loanTypeSelect: "Select loan type", loanTerm: "Loan Term", loanTermSelect: "Select the term", term12: "12 Months", term24: "24 Months", term36: "36 Months", years: "Years", address: "Property Address", addressPh: "E.g. 123 Main St, Austin, TX", type: "Type", typeRes: "Residential", typeCom: "Commercial", typeLand: "Land", arvLabel: "ARV / ", value: "Estimated Value ($)", valuePh: "E.g. 350000", privacyLabel: "Deal Privacy", public: "Public (Marketplace)", private: "Private (Invite only)", photos: "Property Photos", dragDrop: "Drag and drop your photos here", supportedFiles: "Supports JPG, PNG (Max 5MB)", photoGuidelines: "Front, Kitchen, Baths, Yard, Roof", rentcastTitle: "Generated Comparables (RentCast API)", rentcastParams: "Search: 0.5 miles, same sqft, last 6 months", aiEvaluated: "AI Evaluated", saleComps: "Sale Comps", rentComps: "Rent Comps", rentcastPending: "Pending: The RentCast API will populate this automatically after address input.", back: "Back", processing: "Processing...", publish: "Publish Pitch Deck", next: "Next", successTitle: "Pitch Deck Published!", successDesc: "Your request has been submitted. Lenders can now view your deal and send offers.", backToDash: "Back to Dashboard" },
  dashboardBookkeeper: { title: "Bookkeeper Dashboard", subtitle: "Clean, exportable principal and interest records for accounting.", metrics: { activeLoans: "Active Loans", totalInterest: "Interest Paid (YTD)", totalPrincipal: "Principal Paid (YTD)" }, exportBtn: "Export Year-End Report", tableHeaders: { property: "Property", borrower: "Borrower", lender: "Lender", interest: "Interest", principal: "Principal", action: "Action" }, loading: "Loading accounting records...", empty: "No records available.", errorAuth: "Invalid session or no bookkeeping permissions.", errorFetch: "Error loading accounting data.", errorNetwork: "Unknown network error" },
  dashboardBorrower: { title: "Borrower Dashboard", subtitle: "Your loans, properties, and balances in one place.", metrics: { totalOwed: "Total Outstanding Balance", nextDue: "Next Payment Due", properties: "Collateral Properties", pmlRating: "PML Rating" }, tabs: { needsFunding: "Needs Funding", approved: "Loans Approved", funded: "Funded / Closed", completed: "Completed" }, trackerTitle: "Upcoming Closings", trackerEmpty: "No upcoming closings tracked.", needFunding: "Need Funding", loanApproved: "Loan Approved by Lender", currentLoans: "Current Loans", completedLoans: "Completed Loans", emptyTable: "Live loan table will be rendered here.", emptyDocs: "Generated commitment letters and payoff statements will appear here.", tableHeaders: { property: "Property", amount: "Amount / Balance", rehabDrawn: "Rehab Drawn", lender: "Lender", rate: "Rate", status: "Status", date: "Date / Next Pmt", action: "Action", history: "History" }, actions: { pitchDeck: "Generate Pitch Deck", payoff: "Request Payoff", payments: "Manage Payments", viewContracts: "Contracts" }, loading: "Loading dashboard...", errorAuth: "Invalid or expired session.", errorFetch: "Error loading dashboard information", errorNetwork: "Unknown network error", lenderFallback: "Lending Company", emptyNeedFunding: "No pending requests", emptyApproved: "No loans pending acceptance", emptyActive: "No active loans", emptyCompleted: "No completed loans", reviewCommitment: "REVIEW COMMITMENT", paidOff: "Paid off:" },
  contractsList: { title: "Contracts & Loans", subtitle: "List of agreements. What you see depends on your role.", table: { id: "ID", concept: "Concept", property: "Property", client: "Client", financials: "Financial Terms", status: "Status", actions: "Actions" }, status: { active: "Active", inactive: "Inactive" }, viewDetails: "Details", back: "Back to dashboard", loading: "Loading contracts...", empty: "No contracts found.", errorAuth: "You don't have permission to view these contracts or your session expired.", errorFetch: "Failed to fetch contracts", errorNetwork: "Unknown network error", unassigned: "Unassigned", borrowerFallback: "Borrower", noTerms: "No terms", total: "Total:", perMonth: "/mo", interest: "% Int.", },
  contractDetail: { title: "Contract Detail", subtitle: "Full info, parties involved, and payment breakdown.", parties: "Parties Involved", financials: "Financial Terms", breakdownTitle: "Payment History", exportReport: "Export Report (CPA Ready)", labels: { lender: "Lender", borrower: "Borrower", amount: "Total Amount", term: "Term", interest: "Interest", loanType: "Loan Type", downPayment: "Down Payment / Deposit", rent: "Monthly Payment" }, table: { date: "Date", status: "Status", totalOwed: "Total", principal: "Principal", interest: "Interest", escrow: "Escrow", balance: "Remaining Balance" }, paymentStatus: { paid: "Paid", pending: "Pending", late: "Late", partial: "Partial" }, pagination: { prev: "Previous", next: "Next", page: "Page", of: "of" }, back: "Back to contracts", loading: "Loading contract details...", errorNotFound: "Contract not found.", errorAuth: "You don't have permission to view this contract.", errorFetch: "Failed to load contract", errorNetwork: "Unknown network error", months: "months", noTerms: "No terms", emptyPayments: "No payments recorded for this contract.", generateReportAlert: "Generating CSV/PDF report for CPA...", lenderFallback: "Lending Company", borrowerFallback: "Borrower", },
  errors: { code500: "Internal Error", title500: "Oops! Something went wrong", message500: "It looks like something went wrong on our end. We are working on improving our users' experience. Please try again.", tryAgain: "Try again", code404: "Error 404", title404: "Page not found", message404: "We couldn't find the page you are looking for. The link might be incorrect, or the page may no longer exist.", goHome: "Go to homepage", },
  marketplace: { 
    back: "Back to dashboard", 
    title: "Browse Deals", 
    subtitle: "Browse public loan requests looking for funding in your area.", 
    filters: { all: "All", bridge: "Bridge", slowFlip: "Slow flip", new: "New" },
    mapView: "Map view",
    listView: "List view",
    table: { address: "Property (City, State)", amount: "Requested Amount", term: "Term", borrowerScore: "PML Rating", action: "View Deal", closingDate: "Closing Date (Est.)" }, 
    empty: "No public deals available at the moment.", 
    loading: "Loading deals...", 
    errorAuth: "Invalid or expired session.", 
    errorFetch: "Error fetching deals", 
    errorNetwork: "Unknown network error", 
    dealDetails: { title: "Deal Details", back: "Back to marketplace", overview: "Deal Overview", propertyDetails: "Property Details", borrowerProfile: "Borrower Profile", fundDeal: "Contact / Send Offer", arv: "Estimated Value (ARV)", rehab: "Rehab Budget", aiComps: "Comparables (RentCast API)", verifiedInvestor: "Verified Investor", identityConfirmed: "Identity confirmed", pmlRating: "PML Rating", history: "Track Record", fundingVerification: "Funding Verification", completed: "Completed", dealsCompleted: "deals completed", months: "months" } 
  },
  managePayments: { title: "Payment Management", subtitle: "Manage your bank accounts by entity and review your upcoming automatic (ACH) charges.", autopay: "Autopay (ACH)", autopayDesc: "Payments will be automatically deducted from the account associated with the borrowing entity on its due date.", addAccount: "Link Account to Entity", entityLabel: "Entity:", addAccountModal: { title: "Link Bank Account", subtitle: "Select the borrowing entity and securely link its bank account.", selectEntity: "Select Entity (LLC/Corp)", routingLabel: "Routing Number", accountLabel: "Account Number", submit: "Link via Stripe", cancel: "Cancel" }, upcomingTitle: "Upcoming Scheduled Charges", historyTitle: "Transaction History", back: "Back to dashboard" },
  
  onboarding: {
    topSkip: "Skip for now",
    title: "Set up your account",
    subtitle: "Complete your profile to start posting deals and connecting with lenders. You can update these anytime in settings.",
    roleBar: { signedInAs: "Signed in as", account: "account", switchRole: "Switch role" },
    alert: "We strongly recommend adding a verification method so lenders can confirm your identity before sending term sheets.",
    tabs: { verification: "Verification", contact: "Contact info", banking: "Banking / ACH" },
    verification: { govId: "Government ID", govIdDesc: "Upload a driver's license or passport. Required for lenders to fund deals over $50K.", authApp: "Authenticator app", authAppDesc: "Protect your account with a time-based code from Google Authenticator or similar.", phoneSms: "Phone / SMS", entityDocs: "Entity / LLC docs", entityDocsDesc: "Upload your operating agreement or articles of organization if borrowing under an LLC." },
    contact: { email: "Email address", phone: "Phone number", mailing: "Mailing address", mailingDesc: "Required for mailing payoff letters and term sheet copies." },
    banking: { bankAcc: "Bank account (ACH)", bankAccDesc: "Connect your checking account for automatic monthly payments. Routing + account number required.", wireInst: "Wire instructions (lenders only)", wireInstDesc: "Set your receiving account for loan payoffs. Last 4 digits only appear on documents." },
    badges: { moreSecure: "More secure", lessSecure: "Less secure", verified: "Verified" },
    actions: { upload: "+ Upload", add: "+ Add", update: "Update", connect: "+ Connect", learnMore: "Learn more" },
    cta: "Continue to dashboard"
  },

  lenderVerify: {
    topSkip: "Skip — browse deals first",
    badge: "Lender Verification",
    steps: ["Preferences", "Criteria", "Experience", "Review"],
    stepTitles: [
      "Your lending preferences",
      "Deal criteria",
      "Your experience",
      "Review and submit"
    ],
    stepSubs: [
      "Helps us match you to the right deals. You can update this anytime.",
      "Set your lending criteria so we only show you deals that fit.",
      "A few questions about your lending background.",
      "Everything look right? Submit to get your Verified Lender badge."
    ],
    form: {
      minLoan: "Minimum loan amount",
      maxLoan: "Maximum loan amount",
      fundsAvailable: "Funds available to lend",
      selectRange: "Select range",
      fundsOptions: ["Under $100,000", "$100,000 - $250,000", "$250,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000+"],
      prefTerms: "Preferred loan terms",
      maxLtv: "Maximum LTV you will lend",
      selectLtv: "Select max LTV",
      ltvHint: "Loan-to-value based on ARV.",
      geoPref: "Geographic preference",
      geoPrefPh: "e.g. Tennessee, Mississippi, Arkansas",
      geoHint: "States or cities you prefer to lend in.",
      propTypes: "Property types you will lend on",
      propOptions: ["Single family residential", "Multi-family (2-4 units)", "Multi-family (5+ units)", "Commercial"],
      loansFunded: "How many loans have you funded?",
      selectExp: "Select experience",
      loansOptions: ["This is my first loan", "1 - 3 loans", "4 - 10 loans", "11 - 25 loans", "25+ loans"],
      fundSource: "How are you funding these loans?",
      selectSource: "Select source",
      sourceOptions: ["Personal savings / cash", "Self-directed IRA / 401K", "Entity funds (LLC, trust)", "Fund / pooled capital"],
      entityType: "Entity type (optional)",
      selectEntity: "Skip for now",
      entityOptions: ["Individual / personal name", "LLC", "Trust", "Corporation", "Self-directed IRA / 401K"],
      entityHint: "You can add entity and bank details later in settings."
    },
    review: {
      alert: "Review your lender profile. Once submitted you can make offers on deals that match your criteria.",
      badgeTitle: "Verified Lender",
      badgeDesc: "This badge will appear on your profile so borrowers know you are a serious lender."
    },
    actions: { back: "Back", continue: "Continue", submit: "Submit profile" }
  },

  submitDeal: {
    title: "Submit a deal",
    subtitle: "Post your loan request and let lenders compete for your deal.",
    steps: ["Loan type", "Property details", "Financials", "Documents", "Review & post"],
    stepHint: "Step {current} of {total} — {stepName}",
    loanTypeBadge: "Bridge loan selected • 6 to 18 months, interest only",
    property: {
      title: "Property details",
      sub: "Tell us about the property you're financing.",
      address: "Property address",
      addressPh: "E.g. 123 Main St, Memphis, TN",
      addressHint: "Start typing — we'll auto-fill details from public records.",
      city: "City",
      state: "State",
      zip: "ZIP code",
      propType: "Property type",
      occupancy: "Occupancy",
      beds: "Bedrooms",
      baths: "Bathrooms",
      sqft: "Sq ft",
      condition: "Property condition",
      conditions: ["Needs full rehab", "Needs light work", "Move-in ready"],
      desc: "Brief description (optional)",
      descPh: "E.g. 3/2 SFR in Whitehaven. Roof replaced 2024..."
    },
    financials: {
      title: "Loan financials",
      sub: "Enter your numbers. We'll estimate your monthly cost.",
      purchasePrice: "Purchase price",
      loanAmount: "Loan amount requested",
      arv: "After repair value (ARV)",
      rehab: "Estimated rehab cost",
      desiredTerm: "Desired loan term",
      maxRate: "Max interest rate you'll accept",
      maxRateOptions: ["10%", "12%", "14%", "Any — show me all offers"],
      calcTitle: "Estimated monthly cost",
      calcInterest: "Interest only payment",
      calcMembership: "PML membership",
      calcServicing: "PML servicing fee",
      calcOrigination: "Origination point (1% at closing)",
      calcTotal: "Total monthly (est.)",
      mo: "/ mo",
      oneTime: "one-time"
    },
    actions: { back: "Back", continue: "Continue", submit: "Submit deal", change: "Change" }
  },

  affiliates: {
    title: "Affiliate program",
    subtitle: "Earn 25% of everything PML collects from borrowers you refer — at closing and every month.",
    metrics: {
      totalEarned: "Total earned",
      earnedSub: "+$250 this month",
      activeRef: "Active referrals",
      refSub: "2 funded deals",
      monthlyRes: "Monthly residual",
      resSub: "Recurring every mo",
      nextPayout: "Next payout",
      payoutSub: "$91.16 pending"
    },
    link: {
      title: "Your referral link",
      sub: "Share this link. Anyone who signs up and posts a deal earns you a commission — no limit.",
      copyBtn: "Copy link",
      copied: "Copied!",
      hint: "Promo code: {code} — borrower gets first month free, you earn 25% from month 2 onward."
    },
    how: {
      title: "How it works",
      sub: "Simple three-step process. No application required.",
      steps: [
        { title: "Share your link", desc: "Send to real estate investors, Sub2 communities, Slow Flip groups, or anyone looking for private money." },
        { title: "They post a deal", desc: "When they sign up via your link and fund a loan, you earn $250 at closing on every $100K borrowed." },
        { title: "Collect monthly", desc: "You earn $45.58/mo residual per $100K for the life of the loan. Paid out the 1st of every month." }
      ]
    },
    table: {
      title: "Earnings breakdown",
      sub: "On a $100K bridge loan — your 25% share of PML's fees.",
      col1: "Fee type", col2: "PML collects", col3: "Your 25% share", col4: "When paid",
      rows: [
        ["Origination point (1%)", "$1,000", "$250.00", "At closing"],
        ["Monthly servicing fee", "$83.33 / mo", "$20.83 / mo", "Monthly"],
        ["Membership subscription", "$99.00 / mo", "$24.75 / mo", "Monthly"]
      ],
      totalRow: "Total monthly residual",
      totalYear: "12-month total per $100K"
    }
  },

  catalog: {
    title: "Product catalog",
    createBtn: "Create product",
    tabs: ["All products", "Features", "Coupons", "Promo codes", "Affiliate offers", "Pricing tables"],
    filters: { all: "All", active: "Active", archived: "Archived", search: "Search products...", filterBtn: "1 filter" },
    table: {
      name: "Name", updated: "Updated", category: "Category", pricing: "Pricing", created: "Created", status: "Status"
    },
    categories: { loan: "Loan product", sub: "Subscription", affiliate: "Affiliate", edu: "Education", deposit: "Deposit", saas: "SaaS" },
    pagination: { showing: "1 - 8 of 8 results" }
  },

  commitmentLetter: { title: "Commitment Letter", subtitle: "Binding agreement between borrower and lender.", fees: { title: "Closing Fee Summary", origination: "Origination Points", processing: "Processing Fee", underwriting: "Underwriting Fee", platform: "PML Connection Fee", totalDue: "Total Due at Closing (Borrower)" }, actions: { accept: "Accept & Sign", decline: "Decline" }, achModal: { title: "Set Up Autopay (ACH)", subtitle: "To complete the signature, select the bank account from which your monthly payments will be automatically deducted starting on the commencement date.", selectAccount: "Select a linked account", confirmBtn: "Confirm ACH & Sign", cancel: "Cancel" }, disclaimer: "Upon acceptance, this letter will be automatically sent to the Title Company and Insurance Company. Dueño a Dueño LLC operates as a technology connector, and does not originate, fund, or service the loan itself.", loading: "Loading commitment letter...", errorAuth: "You don't have permission to view this commitment letter or your session expired.", errorFetch: "Failed to fetch commitment letter", errorAccept: "Failed to accept terms", errorReject: "Failed to decline terms", errorNetwork: "Unknown network error", paidTo: "Paid to Dueño a Dueño LLC ", customFeeFallback: "Fee", rejectCommentPh: "Reason for declining (optional)...", rejecting: "Declining...", accepting: "Accepting...", },
  payoff: { title: "Payoff Request", requestBtn: "Request Payoff", expectedDate: "Expected closing date", successAlert: "Request sent to lender.", processing: "Processing...", errorFetch: "Failed to process request", errorNetwork: "Unknown network error" },
  profile: { title: "PML Profile", borrower: "Borrower", lender: "Lender", stats: { totalLoans: "Total Loans", onTime: "On-Time Payment Rate", totalVolume: "Total Volume", rating: "PML Rating" }, history: "Project History", emptyHistory: "No completed projects yet.", mapHistory: "Map history here..." },
  vetting: { title: "Vetting Application", subtitle: "Complete this process once to access private capital.", feeNotice: "Application fee (non-refundable)", form: { bankStatements: "Bank Statements (Last 3 months)", idUpload: "Official ID", submitAndPay: "Pay $99 & Submit", selectFile: "Select file", dealHistory: "Past Deal History", dealHistoryDesc: "Enter up to 5 recent project addresses.", addressLabel: "Address", addressPh: "E.g. 123 Main St, Austin, TX", addAddress: "+ Add another address", consentCredit: "I authorize Dueño a Dueño LLC and its partnered lenders to run a Credit Pull.", consentBackground: "I authorize Dueño a Dueño LLC to run a Background Check.", consentAlert: "You must accept the credit and background checks to continue.", step: "Step", of: "of", next: "Next", back: "Back", saveAndContinueLater: "Save & continue later", savedAlert: "Your progress has been saved. You can come back anytime." } },
  issueCommitment: { title: "Issue Commitment Letter", subtitle: "Configure fees for deal REF:", closingFeesTitle: "Closing Fees", originationPoints: "Origination Points (%)", processingFee: "Processing Fee ($)", underwritingFee: "Underwriting Fee ($)", docPrepFee: "Doc Prep Fee ($)", customFeeName: "Custom Fee Name", customFeeNamePh: "E.g. Appraisal Fee", customFeeAmount: "Custom Fee Amount ($)", penaltiesTitle: "Post-Closing Penalties", latePenalty: "Late Payment Penalty", latePenaltyPh: "E.g. 5% or $50", prePayPenalty: "Pre-Pay Penalty", prePayPenaltyPh: "E.g. 1% of balance", phPoints: "E.g. 2", phFee: "E.g. 500", systemNoteTitle: "System Note:", systemNote: "The Marketplace Connection Fee (1 point, min $999) will be automatically added to the final summary by the platform if applicable to this deal.", submit: "Generate and Issue Letter", submitting: "Issuing...", errorFetch: "Failed to issue commitment letter", errorNetwork: "Unknown network error" },
  inviteModal: { title: "Invite to Portal", subtitle: "Share this link for a direct deal. Private/invited deals have a $0 marketplace connection fee.", copyLink: "Copy link", linkCopied: "Copied!", emailLabel: "Or send an email invitation:", emailPh: "email@example.com", sendBtn: "Send Invitation", sending: "Sending...", successMsg: "Invitation sent successfully.", close: "Close" },
  documentVault: { title: "Document Vault", subtitle: "Upload, review, or download legal documents associated with this deal.", uploadBtn: "Upload Document", uploading: "Uploading...", empty: "No documents in this vault.", table: { name: "Document Name", date: "Upload Date", status: "Status", action: "Action" }, actions: { download: "Download", sign: "Sign" }, status: { signed: "Signed", pending: "Pending Signature", file: "File" } },
  settings: {
    title: "Settings",
    subtitle: "Manage your account, preferences, and product configurations.",
    banner: "Enable any team member to view loans, payments, and deal activity.",
    inviteBtn: "Invite team members →",
    sections: {
      personal: "Personal settings",
      account: "Account settings",
      product: "Product settings"
    },
    cards: {
      personalDetails: { title: "Personal details", desc: "Contact information, password, authentication methods, and your active sessions." },
      communication: { title: "Communication preferences", desc: "Customize the emails, SMS, and push notifications you receive." },
      developers: { title: "Developers", desc: "API keys, webhook endpoints, and integration settings." },
      businessProfile: { title: "Business profile", desc: "Account details, entity type, public info, legal name, and custom domains." },
      banking: { title: "Banking & payouts", desc: "Bank accounts, ACH setup, wire instructions, and settlement rules." },
      team: { title: "Team & security", desc: "Team members, roles, account security, authorized apps, and shared resources." },
      notifications: { title: "Notifications", desc: "Manage who on your team receives payment, payoff, and late-notice emails." },
      billing: { title: "Subscription & fees", desc: "Your current plan, billing cycle, promo codes, and fee breakdown." },
      affiliate: { title: "Affiliate program", desc: "Your referral link, earnings, payout history, and affiliate dashboard." },
      compliance: { title: "Compliance & documents", desc: "Uploaded IDs, LLC docs, signed term sheets, and legacy exports." },
      features: { title: "Account features", desc: "Manage your account features, previews, and beta settings." },
      perks: { title: "Perks", desc: "Discounts and partner tools available to PayMyLoan.ai members." },
      bridgeLoans: { title: "Bridge loans", desc: "Default terms, interest settings, origination fee rules, and payoff preferences." },
      slowFlip: { title: "Slow flip / owner finance", desc: "Amortization settings, PITI statement preferences, escrow, and monthly billing." },
      wireSecurity: { title: "Wire security", desc: "Manage your receiving account, phone number for wire verification, and fraud settings." },
      reporting: { title: "Reporting", desc: "Scheduled reports, data exports, and payment analytics." },
      payments: { title: "Payments & ACH", desc: "Payment methods, ACH processing, currency, and checkout configuration." },
      dealMap: { title: "Deal map & discovery", desc: "Private lender window duration, map vs list default, and deal visibility settings." }
    },
    footer: { feedback: "Share feedback", shortcuts: "Keyboard shortcuts", privacy: "Privacy policy", terms: "Terms of service" }
  },
  billing: { bannerTitle: "Free Trial", bannerText: "You have 3 days left on your 7-day free trial.", bannerCta: "Activate Subscription", title: "Monthly Subscription", subtitle: "To continue using PayMyLoan.ai as a borrower, activate your $9/mo subscription.", planName: "Active Borrower Plan", planPrice: "$9.00 / mo", cardLabel: "Card Information (Stripe)", payBtn: "Subscribe for $9/mo", processing: "Processing...", secureNote: "Payments securely processed by Stripe. Cancel anytime." },
  loanTypes: { interestOnlyShort: "Interest Only (Short Term)", interestOnlyLong: "Interest Only (Long Term)", fullyAmortized: "Fully Amortized", constructionDraw: "Construction Draw Loan (Coming Soon)" },
  notifications: { title: "Notifications", empty: "No new notifications.", markRead: "Mark all as read" },
  rateLender: { title: "Rate Lender", subtitle: "Your loan is completed. How was your experience with", ratingLabel: "Rating", reviewLabel: "Public review (optional)", reviewPh: "Write about your experience working with this lender...", submit: "Submit Rating", success: "Thank you! Your rating has been published on the lender's profile.", close: "Close" },
  dashboardLayout: { overview: "Overview", deals: "Deals", products: "Products", account: "Account", nav: { home: "Home", balances: "Balances", payments: "Payments", lenders: "Lenders", myDeals: "My Deals", submitDeal: "Submit a Deal", bridgeLoans: "Bridge Loans", termSheets: "Term Sheets", affiliates: "Affiliates", settings: "Settings", billing: "Billing", reporting: "Reporting" } },
  bankModal: { title: "Add Bank Account", subtitle: "Required for ACH payments and monthly fee collection. Bank-level 256-bit encryption.", securityNote: "Your banking info is encrypted and never shared with lenders or borrowers.", tabs: { instant: "⚡ Instant Connect", manual: "Manual Entry" }, instant: { desc: "Connect your bank instantly. No routing numbers needed — just log in to your bank.", plaidBtn: "Connect with Plaid", orManual: "— or enter manually —", manualBtn: "Enter Account Details Manually" }, manual: { holder: "Account Holder Name", bankName: "Bank Name", routing: "Routing Number", account: "Account Number", confirmAccount: "Confirm Account Number", type: "Account Type", types: ["Checking", "Savings", "Business Checking"], microNote: "⚡ We'll send two small micro-deposits (under $1) to verify your account within 1–2 business days. You'll confirm the amounts to complete setup.", submitBtn: "Save & Verify Account" }, success: { title: "Bank Account Connected", desc: "Your account is verified and ready for ACH payments. Monthly fees will be auto-collected on the 1st of each month.", doneBtn: "Done" } },
  whyPml: {
      hero: {
        eyebrow: "Why PayMyLoan.ai",
        title: "Who are you?",
        subtitle: "Pick your role and we'll show you exactly what PML does for you."
      },
      roles: {
        lender: "I'm a Lender",
        borrower: "I'm a Borrower"
      },
      lender: {
        hero: {
          badge: "For Private Lenders",
          title1: "Run your entire lending business",
          title2: "from your fingertips.",
          subtitle: "Most private lenders still rely on spreadsheets, email chains, and handshake deals. PML replaces all of it — borrowers do the heavy lifting, you make the decisions."
        },
        cards: [
          {
            title: "Vet the borrower — without lifting a finger",
            desc: "Every borrower completes identity verification and entity documentation before their deal goes live. You see their PML borrower score — a reputation score built from their actual payment history on the platform.",
            points: ["Government ID and entity docs verified on signup", "PML borrower score visible on every deal card", "Missed payments permanently lower their score", "You can require full identity verification before funding"]
          },
          {
            title: "Vet the deal — the numbers are already there",
            desc: "Borrowers submit purchase price, ARV, rehab budget, and scope before their deal posts. PML calculates LTV automatically and flags anything above 75%. Your feed only shows deals that match your criteria.",
            points: ["Live LTV bar with hard 75% default cap", "Filter by state, loan size, LTV, and property type", "Counter-offer or negotiate directly in the platform", "Full financials on every deal card before you click in"]
          },
          {
            title: "Never miss a payment",
            desc: "PML tracks every payment due date and fires automated reminders to borrowers before the 6th. If a payment is late, you get notified — and the platform logs it permanently against their score. You never have to chase anyone.",
            points: ["Automated borrower reminders before each due date", "Late fee assessed by you on the 6th — applied automatically", "You're notified the moment a payment is logged", "Full payment history dashboard — every loan, every month"]
          },
          {
            title: "Generate payoffs in seconds",
            desc: "When a borrower is ready to pay off, they submit the request inside the platform — you never get a phone call asking for a number. PML calculates the exact amount using the original contract rate on a 360-day year and generates a dated PDF automatically.",
            points: ["Borrower picks the payoff date — PML does the math", "360-day year standard — accurate industry per diem", "Official payoff letter PDF generated and stored instantly", "Original contract rate — no default rate escalation, ever"]
          },
          {
            title: "Draw requests — borrowers do all the work",
            desc: "When a borrower needs a rehab draw, they submit photos, a 60-second GPS-verified video walkthrough, and a completed stage checklist — all inside the platform. You review the submission and approve or decline with one click.",
            points: ["Minimum 6 photos and 60-second video per draw request", "GPS and timestamp verified — flags off-site or stale media", "Stage inspection checklist required before submission", "ACH fires automatically on your approval — no manual step"]
          },
          {
            title: "Extensions — protected every time",
            desc: "When a borrower needs more time, the extension rolls forward at the same rate and terms — no renegotiation. The borrower e-signs and authorizes ACH fee collection upfront. Your money stays protected on the same terms you agreed to.",
            points: ["Same rate, same payment, one full additional term", "Borrower e-signs extension and fee authorization before approval", "ACH fee collection fires automatically on your approval", "New payment schedule auto-generates — nothing manual"]
          }
        ],
        mantra: {
          quote: "Most investors want a return on their money. The best ones want the return of their money.",
          author: "PayMyLoan.ai — Built for Main Street, Not Wall Street"
        },
        cta: {
          title: "Lenders are always free on PML.",
          subtitle: "No monthly fees. No hidden costs. Just returns — and a platform that works as hard as you do.",
          btnGhost: "Browse open deals",
          btnPrimary: "Create free account →"
        }
      },
      borrower: {
        hero: {
          badge: "For Real Estate Borrowers",
          title1: "Stop chasing lenders.",
          title2: "Let them come to you.",
          subtitle: "Every other way to find private money puts you in the cold seat — cold calls, broker fees, waiting weeks for a term sheet. PML flips it. Post once and verified lenders in your market find you."
        },
        cards: [
          {
            title: "No banks. No credit checks. No runaround.",
            desc: "Private money is asset-based, not credit-based. Lenders on PML care about the property value, your ARV, and your plan — not your FICO score or debt-to-income ratio. The deal either pencils or it doesn't.",
            points: ["No W-2s, tax returns, or bank applications", "Lenders evaluate the deal, not your credit history", "Close in days, not months", "Works for LLCs, corporations, and individuals"]
          },
          {
            title: "Multiple lenders compete — you pick the best offer",
            desc: "Post once and let the market work for you. Verified private lenders see your deal and send term sheets. You compare them side by side — rate, term, points, fees — and accept, counter, or decline with one click. No broker taking a cut.",
            points: ["See all offers side by side — rate, term, points, fees", "Counter-offer or negotiate directly in the platform", "No broker fees, no middlemen", "First offers typically arrive within 24–72 hours"]
          },
          {
            title: "Never miss a payment",
            desc: "Your PML dashboard shows every payment due date, amount, and status in one place. Automated reminders go out before each due date so you're never caught off guard. Every on-time payment builds your borrower score — and your ability to get funded again.",
            points: ["Automated reminders before each due date", "Full payment history always visible in your dashboard", "On-time payments raise your PML borrower score", "Late payments logged permanently — protect your score"]
          },
          {
            title: "Generate your payoff in seconds",
            desc: "Ready to sell or refinance? Go to your deal page, pick your payoff date, and PML generates the exact payoff amount and an official payoff letter PDF — instantly. No phone calls, no waiting for your lender to run the numbers.",
            points: ["Pick any date — PML calculates the exact amount", "Official payoff letter PDF ready in seconds", "360-day year calculation — accurate per diem every time", "Original contract rate used — no default rate surprises"]
          },
          {
            title: "Request rehab draws — fast and simple",
            desc: "Submit your draw request with photos, a short video walkthrough, and a stage checklist — all from your phone. PML verifies everything and routes it to your lender for approval. Once approved, funds hit your account via ACH. No spreadsheets, no emails.",
            points: ["Submit photos, video, and checklist from your phone", "Lender reviews and approves in the platform", "ACH funds disbursed automatically on lender approval", "Full draw history logged for every project"]
          },
          {
            title: "Need more time? Request an extension.",
            desc: "If your project runs long, request an extension before maturity. You get one full additional term at the same rate and terms — no renegotiation, no awkward calls with your lender. E-sign the request, lender approves, and you're covered.",
            points: ["Same rate and terms — no renegotiation", "E-sign the request directly in your dashboard", "Lender approves in the platform — no phone tag", "New payment schedule auto-generates on approval"]
          }
        ],
        mantra: {
          quote: "Built for Main Street, not Wall Street.",
          author: "PayMyLoan.ai — Private money, made simple."
        },
        cta: {
          title: "Lenders in your market are ready right now.",
          subtitle: "Post free with a referral code, or $99/month. No banks, no brokers, no waiting.",
          btnGhost: "Browse lenders",
          btnPrimary: "Post your deal free →"
        }
      }
    },
    lenderFaq: {
      hero: { 
        label: "Lender Trust & Safety", 
        title: "Is my money safe on PayMyLoan?", 
        sub: "Every question a smart lender asks before putting capital to work — answered directly." 
      },
      trustBadges: [
        { title: "2FA on all changes", sub: "Bank, password, email — all gated" },
        { title: "Borrower verified", sub: "Background + credit + entity" },
        { title: "Docs on file", sub: "Promissory note + deed of trust" },
        { title: "Real property security", sub: "Max 75% LTV hard cap" },
        { title: "ACH automated", sub: "Payments pull on the 1st" }
      ],
      faqGroups: [
        {
          title: "About PayMyLoan",
          items: [
            { q: "What is PayMyLoan and who built it?", a: "PayMyLoan was built by a real estate investor who has borrowed approximately $100 million from private lenders across 15,000 closings. After watching every single one of those lenders manage their loans on spreadsheets — with no software, no automation, no standardized process — we built the infrastructure they should have had all along.<br><br>PayMyLoan is not a fund. We don't hold your money. We are the operating system between borrowers and lenders." },
            { q: "Does PayMyLoan hold or touch my money?", a: "No. PayMyLoan is a platform — not a fund or a custodian. You wire your capital directly to the title company at closing. Monthly payments ACH directly from the borrower's bank account to yours. PML never holds your principal.<br><br><strong>The only money PML collects</strong> is its platform fees from borrowers (subscription + connection fee on settlement statement). Your capital goes direct." },
            { q: "Is PayMyLoan a licensed lender or broker?", a: "PayMyLoan is a technology platform that facilitates connections between private lenders and borrowers. We are not a mortgage broker, licensed lender, or securities dealer. All lending decisions are made directly between the lender and borrower. You should consult a licensed attorney in your state before making private loans if you have questions about licensing requirements." }
          ]
        },
        {
          title: "Your money & security",
          items: [
            { q: "How is my bank account protected from fraud?", a: "Every change to bank account or ACH information goes through a 3-layer security gate:<br><ul><li><strong>SMS 2FA</strong> — code sent to your phone on file. Must be entered to proceed.</li><li><strong>Immediate alert email</strong> — sent to your current email address the moment a change is attempted, even before it's confirmed.</li><li><strong>24-hour security hold</strong> — new banking info doesn't go live for 24 hours, giving you time to catch and stop unauthorized changes.</li></ul><br>If you receive an alert email for a change you didn't request, call us immediately. We can freeze your account on the spot." },
            { q: "What happens if a borrower stops paying?", a: "PayMyLoan automates the notification and documentation trail, but loan enforcement is your right as the lender — your promissory note and deed of trust are your legal instruments.<br><ul><li>Day 1 late: borrower gets email + SMS alert</li><li>Day 15: formal notice to borrower AND lender on record</li><li>NSF/returned payment: both parties notified immediately, logged on borrower's payment history</li></ul><br>PML does not pursue collections on your behalf. Your loan is secured by a deed of trust against the property. Work with your attorney for formal default and foreclosure proceedings if needed.", highlight: "Smart lenders: title and deed of trust are your protection — not the platform. Always work through a licensed title company at closing." },
            { q: "How does the 75% LTV cap protect me?", a: "For unverified borrowers, PayMyLoan enforces a hard 75% LTV cap (loan ÷ ARV). This means even if the borrower defaults and the property sells at a discount, there's a 25% equity cushion before your principal is at risk.<br><br>As a lender, you can set a higher LTV threshold for borrowers you already know and trust — but 75% is the default floor for new relationships." },
            { q: "Can someone access my account from a new device without my knowledge?", a: "No. Every login from an unrecognized device triggers an SMS code to your phone. Without that code, the login is blocked. You'll also see a log of all active sessions in your security settings — and can revoke any session instantly from any device." }
          ]
        },
        {
          title: "Vetting borrowers",
          items: [
            { q: "How does PayMyLoan vet borrowers?", a: "Borrowers go through up to 4 verification gates as their deal advances:<ul><li><strong>Gate 1 — Sign up:</strong> name, email, phone</li><li><strong>Gate 2 — Profile:</strong> entity name, EIN, years of experience</li><li><strong>Gate 3 — Publish:</strong> 2FA phone verification, track record</li><li><strong>Gate 4 — Identity (when lender wants to fund):</strong> SSN, government ID, background check, soft credit pull — $99 one-time borrower fee</li></ul><br>Until identity verification is complete, the borrower shows as \"Unverified\" and lenders can see that status on every deal card." },
            { q: "What does the PML Score tell me?", a: "The PML Score reflects a borrower's verified track record on the platform: number of funded deals, on-time payment rate, extensions requested, and completed payoffs. It updates after every closed deal and every payment.<br><ul><li><strong>Rookie (0–2 deals):</strong> new to the platform</li><li><strong>Pro (3–9 deals):</strong> established history</li><li><strong>All-Star (10+ deals):</strong> proven track record</li><li><strong>Limited Edition:</strong> 10+ deals, zero late payments, zero extensions</li></ul><br>The score doesn't replace your due diligence — but it gives you a standardized signal that no spreadsheet-based lender has ever had before." },
            { q: "Can I see a borrower's credit score?", a: "Yes — for identity-verified borrowers. PML runs a <strong>soft pull</strong> (does not affect the borrower's credit score). You see the actual score number and tier (750+ Excellent · 700–749 Good · 650–699 Fair · under 650 Poor).<br><br>A low score shows a yellow warning on the deal card but does NOT automatically block a deal. Many experienced real estate investors have lower personal credit but strong track records. You decide." }
          ]
        },
        {
          title: "Payments & payoffs",
          items: [
            { q: "How does ACH work — when does money hit my account?", a: "Monthly interest payments pull from the borrower's bank account on the 1st of each month via Stripe ACH Debit + Plaid bank verification. Settlement to your account typically takes 2–3 business days.<br><br>The <strong>stub period</strong> (partial first month from closing date to month end) is collected on the settlement statement at closing as cash — not via ACH. Your first ACH pull is the 1st of the month after the month following closing.<br><br>Example: Close September 15 → first ACH November 1." },
            { q: "How do payoffs work?", a: "When a borrower requests a payoff, PML generates a payoff letter automatically using the original contract interest rate (not a default rate). You receive:<ul><li>Payoff amount good through a specific date</li><li>Per diem for each additional day</li><li>Signed payoff letter PDF</li><li>SMS alert immediately</li></ul><br><strong>Wire fraud protection:</strong> Full wire instructions are never sent via email. The payoff letter shows only the last 4 digits of your account. Borrowers and title companies must call you directly to receive complete wire details.", highlight: "Always verify wire instruction changes by calling — never based on email alone." },
            { q: "What are the fees? Am I charged anything as a lender?", a: "<strong>Lenders pay nothing. Ever.</strong><br><br>PML charges borrowers:<ul><li>$99/month subscription (starts when deal is posted)</li><li>$99 one-time identity verification fee</li><li>10% of monthly interest — only when PML connected the deal</li><li>1% lender connection fee — collected at closing on the settlement statement when PML connected the deal</li></ul><br>Direct invite deals (you invited the borrower or they invited you) — the 10% monthly interest share and 1% connection fee are both waived for the borrower." }
          ]
        }
      ],
      cta: { 
        title: "Ready to put your capital to work?", 
        sub: "Lender accounts are always free. Browse deals in under 2 minutes.", 
        btn: "Create free lender account" 
      }
    },
    lenderOptin: {
      hero: {
        eyebrow: "Free for private lenders",
        title1: "Deploy your capital ",
        title2: "faster.",
        body: "Get the 7-point checklist every private lender should run before wiring funds — plus a 5-email course on building a system that protects your capital and keeps your money working.",
        proofs: ["Free. No credit card.", "Lenders are always free on PML", "Unsubscribe anytime"]
      },
      form: {
        title: "Get the checklist",
        sub: "Delivered instantly to your inbox",
        previewTitle: "What's inside — 7-point checklist",
        items: ["Title is clear", "Insurance is in place", "ARV is defensible", "LTV is at or below 75%", "Borrower has skin in the game", "Draw process agreed in writing", "Payoff calculated correctly"],
        fName: "First name",
        fNamePh: "John",
        email: "Email address",
        emailPh: "john@example.com",
        capitalLabel: "How much capital do you deploy per year?",
        capSelect: "Select range",
        capOptions: ["Under $250K", "$250K – $500K", "$500K – $1M", "$1M – $5M", "$5M+"],
        submit: "Send me the checklist",
        sending: "Sending...",
        disclaimer: "No spam. Just useful content for private lenders. Unsubscribe anytime."
      },
      gets: {
        title: "What you get",
        sub: "The checklist plus 5 emails that show you how to build a real lending system",
        cards: [
          { icon: "✓", title: "The 7-point checklist", body: "Everything to verify before you wire — title, insurance, LTV, draws, payoff. Delivered immediately." },
          { icon: "📈", title: "The ROI breakdown", body: "Exactly how much $100K, $250K, and $500K deployed at 12% earns you per month — and how to maximize it." },
          { icon: "🎯", title: "Access to live deals", body: "Browse deals posted by borrowers on PayMyLoan.ai. See the LTV, market, and loan size before creating an account." }
        ]
      },
      sequence: {
        title: "The 5-email sequence",
        sub: "Sent over 10 days — practical, no fluff",
        dayLabel: "Day",
        steps: [
          { day: "0", subject: "Your private lender checklist (7 things to verify before you wire)", desc: "Instant delivery — the checklist + intro to PML", tag: "Lead magnet", tagColor: "purple" },
          { day: "2", subject: "Most private lenders lose money on one mistake", desc: "The real cost of having no system — and what to do about it", tag: "Pain point", tagColor: "purple" },
          { day: "4", subject: "You have capital. There are deals posted this week.", desc: "Browse live deals — no account required", tag: "Social proof", tagColor: "purple" },
          { day: "7", subject: "How much are you earning per dollar deployed?", desc: "The math behind $100K, $250K, $500K deployed at 12%", tag: "ROI / Math", tagColor: "purple" },
          { day: "10", subject: "One question before I stop emailing you", desc: "Fast track or slow drip — you choose", tag: "Branch point", tagColor: "green" }
        ]
      }
    }
};

export const copy: Record<Lang, Copy> = { es, en };