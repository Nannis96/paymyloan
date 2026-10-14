export const legal = {
  privacy: {
    eyebrow: "Legal",
    title: "Aviso de Privacidad",
    meta: "PayMyLoan.ai · PayMyLoan, LLC · Última actualización: 21 de septiembre de 2026 · Vigencia inmediata",
    back: "Volver al inicio",
    tocTitle: "Contenido",
    sections: [
      {
        id: "collect",
        heading: "1. Qué recopilamos",
        paragraphs: ["Recopilamos información que proporcionas directamente cuando creas una cuenta, publicas un trato o usas la plataforma:"],
        table: {
          headers: ["Tipo de dato", "Cuándo se recopila", "¿Requerido?"],
          rows: [
            ["Nombre, correo, teléfono", "Creación de cuenta", "Sí"],
            ["Nombre de entidad, EIN, estado", "Verificación de negocio", "Al publicar"],
            ["Dirección personal, fecha de nac.", "Verificación de identidad", "Cuando el prestamista lo solicita"],
            ["SSN / RFC (Tax ID)", "Verificación de identidad", "Cuando el prestamista lo solicita"],
            ["Identificación oficial", "Verificación de identidad", "Cuando el prestamista lo solicita"],
            ["Datos financieros del trato", "Publicación del trato", "Sí"],
            ["Info. de cuenta bancaria", "Configuración de pagos (afiliados)", "Para pagos"],
            ["Dispositivo, IP, navegador", "Automáticamente, al usar", "Automático"]
          ]
        }
      },
      {
        id: "use",
        heading: "2. Cómo lo usamos",
        paragraphs: ["Usamos la información que recopilamos para:"],
        list: [
          "Operar y mejorar la plataforma PayMyLoan.ai",
          "Verificar la identidad y entidad de prestamistas y prestatarios",
          "Facilitar conexiones entre prestamistas y prestatarios",
          "Procesar pagos de suscripciones y pagos a afiliados",
          "Enviar correos transaccionales (alertas de tratos, notificaciones de cierre, recordatorios de pago)",
          "Detectar fraudes y mantener la seguridad de la plataforma",
          "Cumplir con obligaciones legales"
        ],
        highlight: "No vendemos tu información personal a terceros. Nunca."
      },
      {
        id: "share",
        heading: "3. Qué compartimos",
        paragraphs: ["Compartimos información limitada en las siguientes circunstancias:"],
        list: [
          "Entre prestamistas y prestatarios: Cuando un trato avanza a la etapa de oferta, los detalles relevantes del trato se comparten entre las partes. Direcciones personales, SSNs e identificaciones oficiales nunca se comparten entre usuarios.",
          "Compañías de títulos: Cuando se cierra un trato, compartimos el Acuerdo de Tarifa del Prestatario y la Carta de Compromiso con la compañía de títulos para facilitar el cierre.",
          "Proveedores de servicios: Usamos servicios de terceros para pagos, envío de correos y verificación de identidad. Estos proveedores están obligados por contrato a usar tus datos solo para proporcionarnos servicios.",
          "Requisitos legales: Podemos divulgar información cuando sea requerido por ley, orden judicial, o para proteger los derechos y la seguridad de nuestros usuarios."
        ]
      },
      {
        id: "sensitive",
        heading: "4. Datos sensibles",
        paragraphs: ["Los Números de Seguro Social (SSNs), identificaciones oficiales y EINs son sensibles y se manejan con el más alto nivel de cuidado:"],
        list: [
          "Los SSNs se encriptan en reposo usando encriptación AES-256",
          "El acceso a los SSNs está restringido solo al personal de verificación autorizado",
          "Los SSNs nunca se muestran completos en ninguna pantalla o documento",
          "Los SSNs nunca se comparten con prestamistas, prestatarios o afiliados",
          "Puedes solicitar la eliminación de tu SSN en cualquier momento contactando a privacy@paymyloan.ai"
        ]
      },
      {
        id: "security",
        heading: "5. Seguridad de datos",
        paragraphs: [
          "Implementamos medidas de seguridad estándar de la industria, incluyendo encriptación en tránsito (TLS), encriptación en reposo para campos sensibles, controles de acceso y revisiones de seguridad periódicas. Sin embargo, ningún sistema es completamente seguro. No podemos garantizar una seguridad absoluta.",
          "Si sospechas que tu cuenta ha sido comprometida, contacta a security@paymyloan.ai de inmediato."
        ]
      },
      {
        id: "cookies",
        heading: "6. Cookies",
        paragraphs: ["Usamos cookies y tecnologías de rastreo similares para mantener tu sesión, recordar tus preferencias y analizar el uso de la plataforma. Puedes deshabilitar las cookies en la configuración de tu navegador, pero algunas funciones podrían no operar correctamente."]
      },
      {
        id: "rights",
        heading: "7. Tus derechos",
        paragraphs: ["Dependiendo de tu ubicación, podrías tener los siguientes derechos sobre tus datos personales:"],
        list: [
          "Acceso: Solicitar una copia de los datos que tenemos sobre ti",
          "Corrección: Solicitar la corrección de datos inexactos",
          "Eliminación: Solicitar la eliminación de tu cuenta y datos asociados",
          "Portabilidad: Solicitar tus datos en un formato portátil",
          "Exclusión: Darte de baja de los correos de marketing no transaccionales en cualquier momento"
        ],
        paragraphsAfter: ["Para ejercer cualquiera de estos derechos, contacta a privacy@paymyloan.ai."]
      },
      {
        id: "retention",
        heading: "8. Retención de datos",
        paragraphs: ["Retenemos los datos de tu cuenta mientras esté activa. Después de la eliminación de la cuenta, retenemos ciertos registros según lo requiera la ley (típicamente 7 años para registros financieros). Los documentos de verificación pueden retenerse con fines de cumplimiento."]
      },
      {
        id: "children",
        heading: "9. Menores de edad",
        paragraphs: ["PayMyLoan.ai no está dirigido a menores de 18 años. No recopilamos conscientemente información personal de menores. Si crees que un menor nos ha proporcionado información personal, contacta a privacy@paymyloan.ai."]
      },
      {
        id: "contact",
        heading: "10. Contacto",
        paragraphs: [
          "PayMyLoan, LLC",
          "Memphis, Tennessee",
          "privacy@paymyloan.ai"
        ],
        disclaimer: "Esta política de privacidad se preparó como punto de partida y debe ser revisada por un abogado con licencia antes de su lanzamiento."
      }
    ]
  },

  terms: {
    eyebrow: "Legal",
    title: "Términos de Servicio",
    meta: "PayMyLoan.ai · PayMyLoan, LLC · Última actualización: 21 de septiembre de 2026 · Vigencia inmediata",
    back: "Volver al inicio",
    tocTitle: "Contenido",
    sections: [
      {
        id: "platform",
        heading: "1. Descripción de la plataforma",
        paragraphs: ["PayMyLoan.ai es una plataforma tecnológica operada por PayMyLoan, LLC que facilita las conexiones entre prestamistas de dinero privado y prestatarios inmobiliarios. PayMyLoan, LLC no es un prestamista, bróker, compañía hipotecaria ni institución financiera. No originamos, suscribimos, fondeamos, administramos ni garantizamos ningún préstamo."],
        highlight: "PayMyLoan.ai conecta a las personas. Todos los acuerdos de préstamo se realizan directamente entre prestamistas y prestatarios. PayMyLoan, LLC no es parte de ninguna transacción de préstamo.",
        paragraphsAfter: ["Al usar esta plataforma, aceptas que PayMyLoan, LLC no tiene responsabilidad alguna por el resultado de un préstamo, rendimiento de pagos, incumplimiento, ejecución hipotecaria o pérdida de fondos."]
      },
      {
        id: "eligibility",
        heading: "2. Elegibilidad",
        paragraphs: [
          "Debes tener al menos 18 años de edad y ser residente legal de los Estados Unidos para usar PayMyLoan.ai. Al crear una cuenta, declaras y garantizas que cumples con estos requisitos.",
          "Los prestamistas deben ser inversores acreditados o entidades institucionales según se define en las leyes de valores aplicables. Al registrarte como prestamista, declaras que cumples con los estándares de acreditación aplicables en tu jurisdicción."
        ]
      },
      {
        id: "account",
        heading: "3. Registro de cuenta",
        paragraphs: [
          "Aceptas proporcionar información precisa, actual y completa durante el registro. Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta y de toda la actividad bajo tu cuenta.",
          "PayMyLoan, LLC se reserva el derecho de suspender o terminar cuentas por cualquier violación de estos términos, actividad fraudulenta o conducta que perjudique a la plataforma o a sus usuarios."
        ]
      },
      {
        id: "lender-terms",
        heading: "4. Términos para prestamistas",
        paragraphs: ["Los prestamistas usan PayMyLoan.ai para descubrir y conectar con prestatarios que buscan financiamiento privado. Al hacer una oferta a través de la plataforma, aceptas lo siguiente:"],
        list: [
          "Todas las decisiones de préstamo son tomadas de forma independiente por ti. PayMyLoan, LLC no hace recomendaciones, no garantiza la calidad del trato ni investiga la solvencia del prestatario más allá de lo que se muestra en la plataforma.",
          "Eres el único responsable de llevar a cabo tu propia debida diligencia antes de comprometer fondos.",
          "Aceptas no responsabilizar a PayMyLoan, LLC por el incumplimiento del prestatario, falta de pago, tergiversación o cualquier otra falla del prestatario en cumplir con sus obligaciones.",
          "Aceptas no responsabilizar a PayMyLoan, LLC por errores o mala conducta de cualquier compañía de títulos, abogado de cierre o tercero involucrado en una transacción.",
          "Los prestamistas son responsables de verificar las instrucciones de transferencia bancaria directamente con la compañía de títulos antes de enviar fondos. PayMyLoan, LLC no es responsable por fondos enviados a cuentas incorrectas."
        ],
        warning: "Advertencia de fraude electrónico: Nunca transfieras fondos basándote únicamente en un correo electrónico. Llama siempre a la compañía de títulos directamente a un número verificado para confirmar las instrucciones de transferencia antes de enviar cualquier dinero."
      },
      {
        id: "borrower-terms",
        heading: "5. Términos para prestatarios",
        paragraphs: ["Los prestatarios usan PayMyLoan.ai para publicar tratos y conectar con prestamistas privados. Al publicar un trato, aceptas lo siguiente:"],
        list: [
          "Toda la información enviada sobre tu trato, propiedad, finanzas e identidad debe ser precisa y completa a tu leal saber y entender.",
          "Aceptas no responsabilizar a PayMyLoan, LLC por la falla de cualquier prestamista en fondear, actuar o cumplir con sus obligaciones.",
          "Aceptas no responsabilizar a PayMyLoan, LLC por errores de cualquier compañía de títulos, abogado de cierre o tercero.",
          "Entiendes que PayMyLoan, LLC es una plataforma, no un prestamista, y no tiene autoridad para indicarle a ningún prestamista que fondee tu trato.",
          "Aceptas los términos de tarifas descritos en el Acuerdo de Tarifas del Prestatario firmado al publicar el trato."
        ]
      },
      {
        id: "fees",
        heading: "6. Tarifas y pagos",
        paragraphs: ["PayMyLoan, LLC cobra las siguientes tarifas a los prestatarios. Los prestamistas siempre usan la plataforma gratis."],
        list: [
          "Suscripción mensual: $99/mes, que comienza cuando se publica tu trato. Exenta con un código promocional válido o enlace de referido de afiliado.",
          "Tarifa de verificación de identidad: $99 por única vez, cobrada solo cuando un prestamista solicita la verificación de identidad de tu cuenta.",
          "Tarifa de conexión del prestamista: 1% del monto del préstamo, cobrada al cierre en la hoja de liquidación — solo en tratos donde PayMyLoan, LLC conectó al prestatario y al prestamista.",
          "Tarifa de plataforma mensual (solo tratos conectados por PML): 10% del pago de interés mensual realizado al prestamista, cobrada cada mes durante la vida del préstamo — solo en tratos donde PayMyLoan, LLC hizo la introducción. Ejemplo: si tu pago de interés al prestamista es de $1,150, PayMyLoan, LLC cobra $115 de ese monto cada mes. Esta tarifa se divulga en el Acuerdo de Tarifas al publicar el trato.",
          "Tarifa de procesamiento de retiros (Draws): $175 por solicitud, deducidos de los fondos antes de desembolsarlos al prestatario.",
          "Tarifa de extensión: 1% del saldo pendiente del préstamo, cobrada en la hoja de liquidación al cierre de la extensión."
        ],
        paragraphsAfter: ["Todas las tarifas se divulgan en el Acuerdo de Tarifas del Prestatario antes de publicar el trato. No se deben tarifas al momento de firmar el acuerdo. Las tarifas aplicables únicamente a los tratos conectados por PML están claramente marcadas arriba."]
      },
      {
        id: "liability",
        heading: "7. Limitación de responsabilidad",
        paragraphs: ["En la máxima medida permitida por la ley aplicable, PayMyLoan, LLC, sus oficiales, directores, empleados y afiliados no serán responsables por daños directos, indirectos, incidentales, consecuentes o punitivos que surjan de:"],
        list: [
          "Cualquier transacción de préstamo facilitada a través de la plataforma",
          "Incumplimiento del prestatario, falta de pago o violación de cualquier acuerdo de préstamo",
          "Falta de fondeo o cumplimiento por parte del prestamista",
          "Errores, retrasos o mala conducta de compañías de títulos o abogados de cierre",
          "Fraude electrónico, desvío de fondos o interferencia de terceros",
          "Cualquier resultado fuera del control directo de PayMyLoan, LLC"
        ],
        paragraphsAfter: ["Tu uso de la plataforma constituye tu aceptación de estas limitaciones."]
      },
      {
        id: "advice",
        heading: "8. Sin asesoramiento de inversión",
        paragraphs: ["Nada en PayMyLoan.ai constituye asesoramiento financiero, legal o de inversión. Toda la información se proporciona solo con fines informativos. Debes consultar con profesionales calificados antes de tomar cualquier decisión de préstamo o endeudamiento."]
      },
      {
        id: "wire-fraud",
        heading: "9. Fraude electrónico y seguridad",
        paragraphs: [
          "El fraude electrónico es un riesgo grave en transacciones inmobiliarias. PayMyLoan, LLC nunca enviará cambios de último minuto en las instrucciones de transferencia por correo electrónico. Si recibes cualquier comunicación de este tipo, trátala como fraudulenta y contáctanos inmediatamente a security@paymyloan.ai.",
          "Siempre verifica las instrucciones de transferencia llamando a la compañía de títulos directamente a un número que hayas verificado independientemente antes de enviar cualquier fondo."
        ]
      },
      {
        id: "termination",
        heading: "10. Terminación",
        paragraphs: ["Nos reservamos el derecho de suspender o terminar tu cuenta en cualquier momento por violación de estos términos, actividad fraudulenta o cualquier conducta que determinemos perjudicial para la plataforma o sus usuarios. Las tarifas de suscripción no son reembolsables tras la terminación."]
      },
      {
        id: "law",
        heading: "11. Ley aplicable",
        paragraphs: ["Estos términos se rigen por las leyes del Estado de Tennessee, sin tener en cuenta los principios de conflicto de leyes. Cualquier disputa se resolverá en los tribunales del Condado de Shelby, Tennessee."]
      },
      {
        id: "contact",
        heading: "12. Contacto",
        paragraphs: [
          "PayMyLoan, LLC",
          "Memphis, Tennessee",
          "legal@paymyloan.ai"
        ],
        disclaimer: "Estos términos se prepararon como punto de partida y deben ser revisados por un abogado con licencia antes de su lanzamiento."
      }
    ]
  },
};
