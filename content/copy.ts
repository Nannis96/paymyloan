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

    borrowerMap: {
      eyebrow: "Directorio de Prestamistas",
      title: "Encuentra Prestamistas en tu Área",
      subtitle: "Ve qué prestamistas buscan activamente tratos cerca de ti y cuáles ya han fondeado en tu mercado. Crea una cuenta gratis para conectar.",
      search: { type: "Cualquier Tipo", locationPh: "📍 Ciudad, Estado o ZIP", amount: "Cualquier Monto", btn: "Buscar Prestamistas →" },
      mapTitle: "Prestamistas en tu Área",
      legendActive: "Buscando Tratos Activ.", legendPast: "Ha Fondeado en esta Área", fundedTitle: "Prestamistas Recientes",
      blurText: "+ 18 prestamistas más en tu área", blurBtn: "Crea tu Cuenta Gratis para Desbloquear →", btnConnect: "Solicitar Introducción →"
    },
    borrowerDemo: {
      eyebrow: "Demo",
      title: "Mira cómo funciona para Prestatarios",
      subtitle: "Ve cómo PML te lleva del trato al fondeo — más rápido, más fácil y con los prestamistas viniendo a ti.",
      videoTitle: "Video Recorrido para Prestatario",
      videoSub: "Publica un trato, empareja con prestamistas, cierra rápido — demo completa",
      videoComing: "Video Próximamente",
      steps: [
        { num: "1", label: "Crea tu Perfil" }, { num: "2", label: "Publica Gratis" },
        { num: "3", label: "Piden tu Perfil" }, { num: "4", label: "Elige Términos" }, { num: "5", label: "Sube Calificación" }
      ],
      benefits: [
        { icon: "🤖", title: "Pitch con IA", desc: "La IA construye tu perfil de trato listo para prestamistas automáticamente. Profesional en minutos." },
        { icon: "📊", title: "Evaluación con IA", desc: "Comps, ARV y calificación del trato auto-generados. Tus números son a prueba de balas." },
        { icon: "🗺️", title: "Acceso al Mercado", desc: "Publica una vez, llega a cada prestamista en la plataforma. Ellos vienen a ti." },
        { icon: "⭐", title: "Construye tu Calificación", desc: "Cada trato cerrado y pago a tiempo construye un score en el que los prestamistas confían a primera vista." },
        { icon: "🏦", title: "Automatiza tus Pagos", desc: "ACH configurado al cierre. Nunca un pago atrasado. Nunca una relación dañada." },
        { icon: "📄", title: "Cartas Automáticas", desc: "Enviadas a la notaría y seguro automáticamente. Sin papeleo, sin retrasos." }
      ],
      ctaTitle1: "¿Listo para Fondear tu ", ctaTitle2: "Siguiente Trato?",
      ctaSub: "Publica gratis por 7 días. Sin cargo hasta que conectes con un prestamista.",
      btn1: "Publicar Trato Gratis →", btn2: "Encontrar Prestamistas"
    },
    borrowerProblems: {
      eyebrow: "Problemas que Resolvemos",
      title: "Deja de vender en frío. Empieza a cerrar rápido.",
      subtitle: "Cada prestatario ha vivido estos problemas. PML fue construido para eliminarlos todos.",
      probs: [
        { num: "01", icon: "🤖", title: "Armar el Pitch Toma una Eternidad", pain: '"Paso 2 horas dando formato a un resumen cada vez..."', solution: "La IA genera tu perfil de trato automáticamente...", tag: "✓ Pitch de Trato IA" },
        { num: "02", icon: "📊", title: "No Confían en tus Números", pain: '"Todos quieren verificar el ARV..."', solution: "La evaluación IA extrae comps, ARV y genera calificación...", tag: "✓ Evaluación de IA" },
        { num: "03", icon: "📤", title: "Contactarlos es Exhaustivo", pain: '"Envío 20 correos, recibo 3 respuestas..."', solution: "Publica una vez. Tu trato se muestra a todos los prestamistas...", tag: "✓ Publica y Llega a Todos" },
        { num: "04", icon: "🔎", title: "No Encuentras Nuevos Prestamistas", pain: '"Vuelvo a los mismos 2 de siempre..."', solution: "Navega el mapa — ve quién está prestando activamente...", tag: "✓ Mapa de Descubrimiento" },
        { num: "05", icon: "🏦", title: "Olvidar Pagar al Prestamista", pain: '"Olvidé un pago por estar ocupado..."', solution: "Configura ACH al cierre. Corre en automático cada mes...", tag: "✓ Pagos ACH" },
        { num: "06", icon: "📚", title: "Contadores Pidiendo Registros", pain: '"Mi contador necesita estados cada trimestre..."', solution: "Invita al contador a tu portal. Cada pago, saldo y tabla...", tag: "✓ Acceso a Contadores" },
        { num: "07", icon: "🚀", title: "No Te Conocen y Te Dicen NO", pain: '"He hecho 15 tratos pero tengo que explicar mi historial..."', solution: "Tu Calificación PML cuenta tu historia...", tag: "✓ Tu Calificación Vende por Ti", gold: true }
      ]
    },
    borrowerWho: {
      eyebrow: "Para Quién Es",
      title: "Para Inversores que se Mueven Rápido",
      subtitle: "Ya sea que estés en tu primer trato o el número 50, PML te da las herramientas para fondear más rápido.",
      cards: [
        { icon: "🏠", title: "Inversores Fix & Flip", bullets: ["Compras, remodelas y vendes — rápido", "Necesitas capital en días, no semanas", "Haces tratos pero te cuesta hallar prestamistas", "Quieres que tu historial hable por ti"], btn: "Este Soy Yo →" },
        { icon: "🏘️", title: "Inversores Buy & Hold", bullets: ["Construyes portafolio de renta a largo plazo", "Necesitas préstamos puente o tipo DSCR", "Quieres gestionar todo tu hard money en un lugar", "Requieres registros limpios para el contador"], btn: "Este Soy Yo →" },
        { icon: "📈", title: "Inversores Escalando", bullets: ["Haces 5–20+ tratos al año y requieres volumen", "Necesitas prestamistas compitiendo por tus tratos", "Tu calificación PML te pone primero en la fila", "Buscas automatizar para enfocarte en los tratos"], btn: "Este Soy Yo →" }
      ]
    },
    borrowerDiff: {
      eyebrow: "Qué Nos Hace Diferentes",
      title: "Ninguna Otra Plataforma Construye Tu Credibilidad",
      subtitle: "Otras plataformas son solo formularios. PML es un perfil completo, motor de evaluación y sistema de gestión de préstamos en uno.",
      table: {
        hPml: "PayMyLoan.ai", hC1: "Hard Money Lender", hC2: "Red de Brokers", hC3: "Búsqueda Directa",
        rows: [
          { label: "Gratis para publicar", pml: "✅ Prueba 7 días", c1: "❌ Puntos por delante", c2: "❌ Tarifa de broker", c3: "❌ Tu tiempo" },
          { label: "Evaluación con IA", pml: "✅ Auto-generado", c1: "❌ Su criterio", c2: "❌ Manual", c3: "❌ Lo haces tú" },
          { label: "Score de prestatario", pml: "✅ Sube con el tiempo", c1: "❌ Inicia desde cero", c2: "❌ Nada", c3: "❌ Nada" },
          { label: "Acceso a múltiples prestamistas", pml: "✅ Todo el mercado", c1: "❌ Un prestamista", c2: "⚠️ Red limitada", c3: "❌ Uno a la vez" },
          { label: "Pagos automáticos (ACH)", pml: "✅ Integrado", c1: "❌ Manual", c2: "❌ Manual", c3: "❌ Manual" },
          { label: "Cartas automáticas", pml: "✅ A notaría y seguro", c1: "❌ Manual", c2: "❌ Manual", c3: "❌ Tú lo manejas" }
        ]
      },
      mantra: { h1: "Los prestamistas quieren un retorno ", h2: "sobre", h3: " su dinero.", h4: "Muéstrales que les darás el retorno ", h5: "de", h6: " su dinero.", p: "Tu Calificación PML es la prueba. Constrúyela con cada trato. Deja que abra puertas antes de que digas una sola palabra." },
      csEyebrow: "Mantra", csTitle: "", csCards: []
    },

    // --- NUEVO OBJETO INFO PRESTATARIO ---
    borrowerInfo: {
      demo: {
        eyebrow: "Cómo funciona",
        title: "Prestamistas listos para fondear tu trato.",
        subtitle: "Los prestamistas privados ya están en PML buscando tratos en tu código postal. Publica tu trato y ellos te encontrarán a ti.",
        steps: [ { num: "1", label: "Crea tu Perfil" }, { num: "2", label: "Publica en 5 minutos" }, { num: "3", label: "Piden tu Perfil" }, { num: "4", label: "Los prestamistas compiten" }, { num: "5", label: "Cierra, rastrea y paga" } ],
        benefits: [ { title: "Auto-completado de detalles con registros públicos" }, { title: "Calculadora en vivo de tu pago mensual" }, { title: "Compara todas las ofertas lado a lado" }, { title: "Los prestamistas compiten sin ver otras ofertas" }, { title: "Firma digitalmente tu carta de compromiso" }, { title: "Estados de cuenta mensuales automáticos" } ],
        ctaTitle1: "Prestamistas ", ctaTitle2: "buscan en tu área.",
        ctaSub: "Los prestamistas privados en PayMyLoan.ai están buscando activamente tratos en tu mercado. Publica tu trato y deja que compitan — sin bancos, sin burocracia.",
        btn1: "Publicar trato gratis →", btn2: "Ver cómo funciona"
      },
      problems: {
        eyebrow: "Problemas que Resolvemos",
        title: "Deja de vender en frío. Empieza a cerrar rápido.",
        subtitle: "Cada prestatario ha vivido estos problemas. PML fue construido para eliminarlos todos.",
        probs: [
          { solution: "Ingresa la dirección, el monto del préstamo, el ARV y el presupuesto de remodelación. Nuestro asistente te guía paso a paso sin jerga técnica." },
          { solution: "La evaluación IA extrae comps, ARV y genera calificación. Números a prueba de balas." },
          { solution: "Tu trato se publica en el mercado de PML. Prestamistas privados verificados lo revisan y te envían hojas de términos en 24-72 horas. Tú eliges la mejor oferta." },
          { solution: "Acepta, haz contraoferta o rechaza con un solo clic. Ellos compiten sin ver a los demás." },
          { solution: "Al aceptar una oferta, PML genera los documentos, administra el calendario de pagos y envía tus estados de cuenta. Tu portal muestra todo tu historial." },
          { solution: "Invita al contador a tu portal. Cada pago, saldo y tabla de amortización siempre accesible." },
          { solution: "Tu Calificación PML cuenta tu historia. Cada trato cerrado y pago puntual construye un perfil de confianza. Mejor score = mejores tasas y aprobaciones rápidas." }
        ]
      },
      diff: {
        title: "PML vs. la forma antigua",
        subtitle: "Brókers, aplicaciones bancarias y llamadas en frío — o una plataforma que lo hace todo.",
        table: {
          hPml: "PayMyLoan.ai", hC1: "La forma antigua",
          rows: [
            { label: "Proceso de fondeo", pml: "Publica una vez y los prestamistas vienen a ti", c1: "Llamar a 10 prestamistas esperando respuesta" },
            { label: "Tiempo de respuesta", pml: "Primeras ofertas en 24-72 horas", c1: "Esperar semanas por una hoja de términos" },
            { label: "Transparencia de tasas", pml: "Compara ofertas compitiendo lado a lado", c1: "Adivinar cuáles son las tasas reales del mercado" },
            { label: "Firma de contratos", pml: "Carta de compromiso digital — firma en minutos", c1: "Caos de contratos en papel y DocuSign" },
            { label: "Liquidación final", pml: "Solicitud de liquidación en un solo clic, 24/7", c1: "Perseguir al prestamista rogando por la carta" },
            { label: "Administración", pml: "Panel completo con estados de cuenta y pagos", c1: "Sin historial de pagos ni panel de control" }
          ]
        },
        mantra: { h1: "Prestamistas locales ", h2: "esperan", h3: " tu siguiente trato.", h4: "Publica gratis ", h5: "hoy", h6: " y haz que compitan.", p: "Publica gratis tu primer trato con un código de referido, o paga $99/mes. Los prestamistas de tu mercado te encontrarán." }
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
  hero: { eyebrow: "Servicing de préstamos privados", title: "Un solo saldo en el que ambos confían.", deck: "PayMyLoan.ai administra préstamos privados con garantía inmobiliaria: el prestatario paga por ACH, el prestamista ve exactamente qué se pagó y de qué propiedad, y ambos trabajan sobre los mismos términos, documentos y saldo.", points: [ "Pago por ACH: 0.8% con tope de $5.00 por transacción", "Términos aceptados por las dos partes, con fecha, hora e IP", "Verificación en dos pasos obligatoria para prestamistas", ], trustLabel: "Operado por", trust: [ "Dueño a Dueño LLC", "Pagos procesados por Stripe", "ACH Direct Debit", ], },
  form: { eyebrow: "Alta de usuario", title: "Sé de los primeros en probarlo", subtitle: "Déjanos tus datos para ser de los primeros en abrir tu cuenta. Te avisaremos en cuanto la plataforma esté lista para ti.", intentLabel: "¿Para qué deseas una cuenta?", intents: [ { value: "lender", label: "Daré un préstamo", hint: "Prestamista" }, { value: "borrower", label: "Quiero un préstamo", hint: "Prestatario" }, ], intentNote: "No te cobraremos nada ahora. Solo guardaremos tu lugar en la fila.", name: "Nombre completo", namePh: "Como aparece en el contrato", email: "Correo electrónico", emailPh: "correo@ejemplo.com", phone: "Teléfono", phonePh: "Ej. 555 123 4567", password: "Contraseña", passwordPh: "Mínimo 12 caracteres", passwordConfirm: "Confirmar contraseña", passwordConfirmPh: "Repite la contraseña", show: "Mostrar", hide: "Ocultar", rules: { length: "12 caracteres o más", case: "Una mayúscula y una minúscula", number: "Al menos un número", }, terms: "Acepto los", termsLink: "Términos de servicio", termsAnd: "y el", privacyLink: "Aviso de privacidad", submit: "Quiero Registrarme", submitting: "Registrando tu solicitud…", twofaNote: "Al terminar el registro te pediremos configurar la verificación en dos pasos. Para prestamistas es obligatoria.", inviteNote: "¿Te invitaron por correo?", inviteLink: "Abre el enlace de tu invitación", inviteNoteEnd: "para unirte directo al préstamo.", haveAccount: "¿Ya tienes cuenta?", login: "Inicia sesión", errors: { summary: "Revisa los campos marcados.", name: "Escribe tu nombre completo.", email: "Escribe un correo válido.", phone: "Escribe un teléfono de al menos 10 dígitos.", password: "La contraseña no cumple los requisitos.", passwordConfirm: "Las contraseñas no coinciden.", terms: "Necesitas aceptar los términos para crear la cuenta.", intent: "Elige qué vas a hacer primero.", submit: "No pudimos crear la cuenta. Intenta de nuevo en unos segundos.", }, success: { title: "Revisa tu correo", body: "Te enviamos un enlace de verificación a", note: "El enlace vence en 24 horas. Si no llega, revisa spam.", again: "Usar otro correo", }, devNote: "Front unicamente: todavia no hay backend conectado, el envio se simula.", },
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
  settings: { title: "Configuración de Perfil", subtitle: "Administra tus preferencias, datos bancarios y contactos de cierre.", saveBtn: "Guardar Cambios", saving: "Guardando...", success: "Configuración actualizada.", tabs: { lender: "Preferencias de Prestamista", borrower: "Preferencias de Prestatario" }, lender: { geography: "Áreas Geográficas Preferidas", geographyPh: "Ej. Texas, Florida, Todo US", availableCapital: "Capital Disponible para Desplegar ($)", availableCapitalPh: "Ej. 500000", loanTypes: "Tipos de Préstamo", entities: "Entidades Prestamistas (LLC/Corp)", entitiesPh: "Ej. NextGen Growth LLC", achTitle: "Cuenta Bancaria Asociada (ACH)", routingNum: "Routing Number", accountNum: "Account Number" }, borrower: { attorneyTitle: "Abogado de Cierre / Título", attorneyName: "Nombre de la Compañía o Abogado", attorneyEmail: "Correo del Abogado", insuranceTitle: "Compañía de Seguros", insuranceName: "Nombre de la Aseguradora", insuranceEmail: "Correo del Agente" } },
  billing: { bannerTitle: "Prueba Gratuita", bannerText: "Te quedan 3 días de tu prueba gratuita de 7 días.", bannerCta: "Activar Suscripción", title: "Suscripción Mensual", subtitle: "Para continuar usando PayMyLoan.ai como prestatario, activa tu suscripción de $9/mes.", planName: "Plan Prestatario Activo", planPrice: "$9.00 / mes", cardLabel: "Información de Tarjeta (Stripe)", payBtn: "Suscribirse por $9/mes", processing: "Procesando...", secureNote: "Pagos procesados de forma segura por Stripe. Puedes cancelar en cualquier momento." },
  loanTypes: { interestOnlyShort: "Interest Only (Corto Plazo)", interestOnlyLong: "Interest Only (Largo Plazo)", fullyAmortized: "Totalmente Amortizado", constructionDraw: "Construction Draw Loan (Próximamente)" },
  notifications: { title: "Notificaciones", empty: "No tienes notificaciones nuevas.", markRead: "Marcar todas como leídas" },
  rateLender: { title: "Calificar al Prestamista", subtitle: "Tu préstamo ha finalizado. ¿Cómo fue tu experiencia con", ratingLabel: "Calificación", reviewLabel: "Reseña pública (opcional)", reviewPh: "Escribe sobre tu experiencia trabajando con este prestamista...", submit: "Enviar Calificación", success: "¡Gracias! Tu calificación ha sido publicada en el perfil del prestamista.", close: "Cerrar" },
  dashboardLayout: { overview: "General", deals: "Tratos", products: "Productos", account: "Cuenta", nav: { home: "Inicio", balances: "Saldos", payments: "Pagos", lenders: "Prestamistas", myDeals: "Mis Tratos", submitDeal: "Publicar un Trato", bridgeLoans: "Préstamos Puente", termSheets: "Term Sheets", affiliates: "Afiliados", settings: "Configuración", billing: "Facturación", reporting: "Reportes" } },
  bankModal: { title: "Agregar Cuenta Bancaria", subtitle: "Requerido para pagos ACH y cobro de tarifas mensuales. Encriptación bancaria de 256 bits.", securityNote: "Tu información bancaria está encriptada y nunca se comparte con prestamistas o prestatarios.", tabs: { instant: "⚡ Conexión Instantánea", manual: "Entrada Manual" }, instant: { desc: "Conecta tu banco al instante. No necesitas números de ruta, solo inicia sesión en tu banco.", plaidBtn: "Conectar con Plaid", orManual: "— o ingresa manualmente —", manualBtn: "Ingresar Detalles de Cuenta Manualmente" }, manual: { holder: "Nombre del Titular", bankName: "Nombre del Banco", routing: "Número de Ruta", account: "Número de Cuenta", confirmAccount: "Confirmar Número de Cuenta", type: "Tipo de Cuenta", types: ["Cheques", "Ahorros", "Cheques Negocio"], microNote: "⚡ Enviaremos dos micro-depósitos (menos de $1) para verificar tu cuenta en 1–2 días hábiles. Confirmarás los montos para completar la configuración.", submitBtn: "Guardar y Verificar Cuenta" }, success: { title: "Cuenta Bancaria Conectada", desc: "Tu cuenta está verificada y lista para pagos ACH. Las tarifas mensuales se cobrarán automáticamente el día 1 de cada mes.", doneBtn: "Aceptar" } }
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

    borrowerMap: {
      eyebrow: "Lender Marketplace",
      title: "Find Lenders in Your Area",
      subtitle: "See which lenders are actively looking for deals near you — and which have already funded in your market. Create a free account to connect.",
      search: { type: "All Loan Types", locationPh: "📍 City, State or ZIP", amount: "Any Loan Amount", btn: "Find Lenders →" },
      mapTitle: "Lenders In Your Area",
      legendActive: "Actively Seeking Deals", legendPast: "Has Funded in This Area", fundedTitle: "Recently Active Lenders",
      blurText: "+ 18 more lenders in your area", blurBtn: "Create Free Account to Unlock →", btnConnect: "Request Introduction →"
    },
    borrowerDemo: {
      eyebrow: "Demo",
      title: "See How It Works for Borrowers",
      subtitle: "Watch how PML takes you from deal to funded — faster, easier, and with lenders coming to you.",
      videoTitle: "Borrower Walkthrough Video",
      videoSub: "Post a deal, get matched with lenders, close fast — full platform demo",
      videoComing: "Video Coming Soon",
      steps: [
        { num: "1", label: "Create Your Profile" }, { num: "2", label: "Post Your Deal Free" },
        { num: "3", label: "Lenders Request Profile" }, { num: "4", label: "Approve & Choose" }, { num: "5", label: "Close & Build Score" }
      ],
      benefits: [
        { icon: "🤖", title: "AI Deal Pitching", desc: "AI builds your lender-ready deal profile automatically. Professional in minutes." },
        { icon: "📊", title: "AI Deal Underwriting", desc: "Comps, ARV, and deal score auto-generated. Your numbers are bulletproof." },
        { icon: "🗺️", title: "Access Marketplace", desc: "Post once, reach every lender on the platform. They come to you." },
        { icon: "⭐", title: "Build Your PML Score", desc: "Every deal closed, every payment made builds a score lenders trust on sight." },
        { icon: "🏦", title: "Automate Payments", desc: "ACH set up at closing. Never a missed payment. Never a damaged relationship." },
        { icon: "📄", title: "Auto Commitment", desc: "Sent to title and insurance automatically. No paperwork, no delays." }
      ],
      ctaTitle1: "Ready to Get Your ", ctaTitle2: "Next Deal Funded?",
      ctaSub: "Post free for 7 days. No charge until a lender matches.",
      btn1: "Post Your Deal Free →", btn2: "Find Lenders in My Area"
    },
    borrowerProblems: {
      eyebrow: "Problems We Solve",
      title: "Stop Pitching Cold. Start Closing Fast.",
      subtitle: "Every borrower has lived these. PML was built to kill them all.",
      probs: [
        { num: "01", icon: "🤖", title: "Building Pitches Takes Forever", pain: '"I spend 2 hours formatting a deal summary every time..."', solution: "AI deal pitching builds your lender-ready profile automatically in minutes.", tag: "✓ AI-Powered Deal Pitch" },
        { num: "02", icon: "📊", title: "They Don't Trust Your Numbers", pain: '"Every lender wants to verify ARV themselves..."', solution: "AI deal underwriting pulls comps and ARV automatically. Bulletproof numbers.", tag: "✓ AI Deal Underwriting" },
        { num: "03", icon: "📤", title: "Pitching Is Exhausting", pain: '"I email 20 lenders, get 3 responses..."', solution: "Post once. Your deal goes live to every lender. One shareable link.", tag: "✓ Post Once, Reach Everyone" },
        { num: "04", icon: "🔎", title: "Can't Find New Lenders", pain: '"I keep going back to the same 2 lenders..."', solution: "Browse the lender map — see who's actively lending near you and connect directly.", tag: "✓ Lender Discovery Map" },
        { num: "05", icon: "🏦", title: "Remembering to Pay", pain: '"I missed a payment because I was deep in a rehab..."', solution: "Set up ACH at closing. Payments run automatically every month.", tag: "✓ ACH Auto-Payment" },
        { num: "06", icon: "📚", title: "Bookkeeper Asking for Records", pain: '"My accountant needs loan statements..."', solution: "Invite your bookkeeper directly. Every payment and schedule is always accessible.", tag: "✓ Bookkeeper Access" },
        { num: "07", icon: "🚀", title: "They Don't Know You", pain: '"I\'ve done 15 deals but have to explain my track record..."', solution: "Your PML Score tells your story automatically. Higher score = better rates, faster yes.", tag: "✓ Your Score Sells You", gold: true }
      ]
    },
    borrowerWho: {
      eyebrow: "Who Is This For",
      title: "For Investors Who Move Fast",
      subtitle: "Whether you're on your first deal or your fiftieth, PML gives you the tools to fund faster.",
      cards: [
        { icon: "🏠", title: "Fix & Flip Investors", bullets: ["You buy, rehab, and sell — fast", "You need capital in days, not weeks", "You struggle to find new lenders", "You want your track record to work for you"], btn: "This Is Me →" },
        { icon: "🏘️", title: "Buy & Hold Investors", bullets: ["You're building a rental portfolio", "You need bridge loans and DSCR financing", "You want one place to manage hard money", "You need clean records for your CPA"], btn: "This Is Me →" },
        { icon: "📈", title: "Scaling Investors", bullets: ["You're doing 5–20+ deals a year", "You need multiple lenders competing", "Your PML score puts you at the front", "You want automated everything"], btn: "This Is Me →" }
      ]
    },
    borrowerDiff: {
      eyebrow: "What Makes Us Different",
      title: "No Other Platform Builds Your Credibility",
      subtitle: "Other platforms are just lead forms. PML is a full borrower profile, underwriting engine, and loan management system in one.",
      table: {
        hPml: "PayMyLoan.ai", hC1: "Hard Money Lender", hC2: "Broker Network", hC3: "Direct Outreach",
        rows: [
          { label: "Free to post a deal", pml: "✅ 7-day free trial", c1: "❌ Points upfront", c2: "❌ Broker fee", c3: "❌ Your time" },
          { label: "AI deal underwriting", pml: "✅ Auto-generated", c1: "❌ Their criteria", c2: "❌ Manual", c3: "❌ You do it" },
          { label: "Borrower score", pml: "✅ Builds over time", c1: "❌ Starts over each deal", c2: "❌ None", c3: "❌ None" },
          { label: "Access multiple lenders", pml: "✅ Whole marketplace", c1: "❌ One lender", c2: "⚠️ Limited network", c3: "❌ One at a time" },
          { label: "Automated ACH payments", pml: "✅ Built-in", c1: "❌ Manual", c2: "❌ Manual", c3: "❌ Manual" },
          { label: "Auto commitment letters", pml: "✅ To title + insurance", c1: "❌ Manual", c2: "❌ Manual", c3: "❌ You handle it" }
        ]
      },
      mantra: { h1: "Lenders want a return ", h2: "on", h3: " their money.", h4: "Show them you'll give them the return ", h5: "of", h6: " their money.", p: "Your PML Borrower Score is proof. Build it with every deal. Let it open doors before you say a word." },
      csEyebrow: "Mantra", csTitle: "", csCards: []
    },

    // --- NEW BORROWER INFO OBJECT ---
    borrowerInfo: {
      demo: {
        eyebrow: "How it works",
        title: "Lenders in your area are ready to fund your deal.",
        subtitle: "Private lenders are already on PML searching for deals in your ZIP code. Post your deal, they find you — not the other way around.",
        steps: [ { num: "1", label: "Create Your Profile" }, { num: "2", label: "Post your deal in 5 minutes" }, { num: "3", label: "Lenders Request Profile" }, { num: "4", label: "Lenders compete for your deal" }, { num: "5", label: "Close, track, and pay — all in one place" } ],
        benefits: [ { title: "Address auto-fills property details from public records" }, { title: "Live cost calculator shows your monthly payment instantly" }, { title: "See all offers side-by-side — rate, term, points" }, { title: "Lenders can't see each other's offers until you decide" }, { title: "Digitally sign your term sheet — no printing, no notary" }, { title: "Monthly statements sent automatically" } ],
        ctaTitle1: "Lenders are ", ctaTitle2: "looking in your area.",
        ctaSub: "Private lenders on PayMyLoan.ai are actively searching for deals in your market right now. Post your deal and let them compete for you — no banks, no credit checks, no runaround.",
        btn1: "Post your deal free →", btn2: "See how it works"
      },
      problems: {
        eyebrow: "Problems We Solve",
        title: "Stop Pitching Cold. Start Closing Fast.",
        subtitle: "Every borrower has lived these. PML was built to kill them all.",
        probs: [
          { solution: "Enter the property address, loan amount, ARV, and rehab budget. Our wizard walks you through every field. No jargon, no confusion." },
          { solution: "AI deal underwriting pulls comps and ARV automatically. Bulletproof numbers." },
          { solution: "Your deal goes live on the PML marketplace. Verified private lenders — not banks — review it and send you term sheets within 24–72 hours. You pick the best offer." },
          { solution: "Accept, counter, or decline with one click. They compete, you win." },
          { solution: "Once you accept an offer, PML generates the term sheet, handles the payment schedule, and sends your monthly PITI statement automatically. Your lender portal shows your full loan history." },
          { solution: "Invite your bookkeeper directly. Every payment and schedule is always accessible." },
          { solution: "Your PML Score tells your story automatically. Higher score = better rates, faster yes." }
        ]
      },
      diff: {
        title: "PML vs. the old way",
        subtitle: "Hard money brokers, bank applications, and cold calls — or one platform that does it all.",
        table: {
          hPml: "PayMyLoan.ai", hC1: "The old way",
          rows: [
            { label: "Sourcing capital", pml: "Post once — lenders come to you", c1: "Call 10 lenders hoping someone picks up" },
            { label: "Turnaround time", pml: "First offers in 24–72 hours", c1: "Wait 2–3 weeks for a term sheet" },
            { label: "Rate transparency", pml: "See competing offers side by side", c1: "No idea what market rates actually are" },
            { label: "Contract signing", pml: "Digital term sheet — sign in minutes", c1: "Paper contracts, faxes, DocuSign chaos" },
            { label: "Payoff letters", pml: "One-click payoff request, any time", c1: "Chase lender for payoff letter every time" },
            { label: "Loan administration", pml: "Full loan dashboard, statements, history", c1: "No payment history or loan dashboard" }
          ]
        },
        mantra: { h1: "Lenders near you ", h2: "are waiting", h3: " for your next deal.", h4: "Post free ", h5: "today", h6: " and let them compete.", p: "Post your deal free with a referral code, or $99/mo. Lenders in your market will find you." }
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
  hero: { eyebrow: "Private loan servicing", title: "One balance both sides trust.", deck: "PayMyLoan.ai services private real-estate-secured loans: the borrower pays by ACH, the lender sees exactly what was paid and on which property, and both work from the same terms, documents and balance.", points: [ "ACH payments: 0.8%, capped at $5.00 per transaction", "Terms accepted by both parties, with date, time and IP", "Two-factor authentication required for lenders", ], trustLabel: "Operated by", trust: [ "Dueño a Dueño LLC", "Payments processed by Stripe", "ACH Direct Debit", ], },
  form: { eyebrow: "Sign up", title: "Be One of the First to Try It", subtitle: "Leave us your information to be among the first to open your account. We’ll let you know as soon as the platform is ready for you.", intentLabel: "What would you like an account for?", intents: [ { value: "lender", label: "I will provide a loan", hint: "Lender" }, { value: "borrower", label: "I want a loan", hint: "Borrower" }, ], intentNote: "You won’t be charged anything now. We’re simply saving your place in line.", name: "Full name", namePh: "As it appears on the contract", email: "Email address", emailPh: "email@example.com", phone: "Phone", phonePh: "E.g. 555 123 4567", password: "Password", passwordPh: "12 characters minimum", passwordConfirm: "Confirm password", passwordConfirmPh: "Repeat the password", show: "Show", hide: "Hide", rules: { length: "12 characters or more", case: "One uppercase and one lowercase letter", number: "At least one number", }, terms: "I accept the", termsLink: "Terms of service", termsAnd: "and the", privacyLink: "Privacy notice", submit: "Create account", submitting: "Submitting your request…", twofaNote: "After sign-up we will ask you to set up two-factor authentication. For lenders it is required.", inviteNote: "Were you invited by email?", inviteLink: "Open your invitation link", inviteNoteEnd: "to join the loan directly.", haveAccount: "Already have an account?", login: "Log in", errors: { summary: "Check the highlighted fields.", name: "Enter your full name.", email: "Enter a valid email address.", phone: "Enter a phone number with at least 10 digits.", password: "The password does not meet the requirements.", passwordConfirm: "The passwords do not match.", terms: "You need to accept the terms to create the account.", intent: "Choose what you will do first.", submit: "We could not create the account. Try again in a moment.", }, success: { title: "Check your email", body: "We sent a verification link to", note: "The link expires in 24 hours. If it does not arrive, check spam.", again: "Use a different email", }, devNote: "Front end only: no backend is wired yet, the submission is simulated.", },
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
  settings: { title: "Profile Settings", subtitle: "Manage your preferences, bank details, and closing contacts.", saveBtn: "Save Changes", saving: "Saving...", success: "Settings updated.", tabs: { lender: "Lender Preferences", borrower: "Borrower Preferences" }, lender: { geography: "Preferred Geographic Areas", geographyPh: "E.g. Texas, Florida, Nationwide", availableCapital: "Available Capital to Deploy ($)", availableCapitalPh: "E.g. 500000", loanTypes: "Preferred Loan Types", entities: "Lending Entities (LLC/Corp)", entitiesPh: "E.g. NextGen Growth LLC", achTitle: "Associated Bank Account (ACH)", routingNum: "Routing Number", accountNum: "Account Number" }, borrower: { attorneyTitle: "Closing Attorney / Title Company", attorneyName: "Company or Attorney Name", attorneyEmail: "Attorney Email", insuranceTitle: "Insurance Company", insuranceName: "Insurance Company Name", insuranceEmail: "Agent Email" } },
  billing: { bannerTitle: "Free Trial", bannerText: "You have 3 days left on your 7-day free trial.", bannerCta: "Activate Subscription", title: "Monthly Subscription", subtitle: "To continue using PayMyLoan.ai as a borrower, activate your $9/mo subscription.", planName: "Active Borrower Plan", planPrice: "$9.00 / mo", cardLabel: "Card Information (Stripe)", payBtn: "Subscribe for $9/mo", processing: "Processing...", secureNote: "Payments securely processed by Stripe. Cancel anytime." },
  loanTypes: { interestOnlyShort: "Interest Only (Short Term)", interestOnlyLong: "Interest Only (Long Term)", fullyAmortized: "Fully Amortized", constructionDraw: "Construction Draw Loan (Coming Soon)" },
  notifications: { title: "Notifications", empty: "No new notifications.", markRead: "Mark all as read" },
  rateLender: { title: "Rate Lender", subtitle: "Your loan is completed. How was your experience with", ratingLabel: "Rating", reviewLabel: "Public review (optional)", reviewPh: "Write about your experience working with this lender...", submit: "Submit Rating", success: "Thank you! Your rating has been published on the lender's profile.", close: "Close" },
  dashboardLayout: { overview: "Overview", deals: "Deals", products: "Products", account: "Account", nav: { home: "Home", balances: "Balances", payments: "Payments", lenders: "Lenders", myDeals: "My Deals", submitDeal: "Submit a Deal", bridgeLoans: "Bridge Loans", termSheets: "Term Sheets", affiliates: "Affiliates", settings: "Settings", billing: "Billing", reporting: "Reporting" } },
  bankModal: { title: "Add Bank Account", subtitle: "Required for ACH payments and monthly fee collection. Bank-level 256-bit encryption.", securityNote: "Your banking info is encrypted and never shared with lenders or borrowers.", tabs: { instant: "⚡ Instant Connect", manual: "Manual Entry" }, instant: { desc: "Connect your bank instantly. No routing numbers needed — just log in to your bank.", plaidBtn: "Connect with Plaid", orManual: "— or enter manually —", manualBtn: "Enter Account Details Manually" }, manual: { holder: "Account Holder Name", bankName: "Bank Name", routing: "Routing Number", account: "Account Number", confirmAccount: "Confirm Account Number", type: "Account Type", types: ["Checking", "Savings", "Business Checking"], microNote: "⚡ We'll send two small micro-deposits (under $1) to verify your account within 1–2 business days. You'll confirm the amounts to complete setup.", submitBtn: "Save & Verify Account" }, success: { title: "Bank Account Connected", desc: "Your account is verified and ready for ACH payments. Monthly fees will be auto-collected on the 1st of each month.", doneBtn: "Done" } }
};

export const copy: Record<Lang, Copy> = { es, en };