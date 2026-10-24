export const admin = {
  dashboardAdmin: {
    title: "Resumen de Administrador",
    subtitle: "PayMyLoan.ai · {date}",
    systemStatus: "Todos los sistemas operacionales",
    kpi: {
      activeDeals: "Tratos activos",
      totalFunded: "Total fondeado",
      mrr: "MRR",
      pendingVerif: "Verif. pendientes",
      latePayments: "Pagos atrasados",
      thisWeek: "+{n} esta semana",
      allTime: "Historico",
      thisMonth: "+${n} este mes",
      awaitingReview: "Esperando revision",
      actionNeeded: "Accion requerida"
    },
    revenue: {
      title: "Ingresos este mes",
      sub: "Suscripciones + tarifas de cierre + comision de interes",
      subscriptions: "Suscripciones",
      closingFees: "Tarifas de cierre",
      interestShare: "Comision de interes",
      affiliatePayouts: "Pagos a afiliados",
      netRevenue: "Ingreso neto"
    },
    tables: {
      activeDeals: "Tratos activos",
      recentSignups: "Registros recientes",
      viewAll: "Ver todos",
      viewAllUsers: "Ver todos los usuarios",
      property: "Propiedad",
      loan: "Prestamo",
      status: "Estado",
      nextPayment: "Proximo pago",
      name: "Nombre",
      type: "Tipo",
      signedUp: "Registro",
      verified: "Verificado",
      deals: "Tratos",
      revenue: "Ingresos",
      pillActive: "Activo",
      pillPending: "Pendiente",
      pillLate: "{n} dias atrasado",
      pillClosed: "Cerrado"
    },
    actions: {
      title: "Requiere atencion",
      clearAll: "Limpiar todo",
      today: "Hoy",
      items: [
        { text: "— {n} dias de atraso. Enviar alerta al prestamista." },
        { text: "— entidades de prestamistas esperando revision." },
        { text: "— cierre pendiente, tarifa PML aun no confirmada." },
        { text: "— ${n} en cola para el {date}. Confirmar cuentas bancarias." },
        { text: "— esperando aprobacion del prestamista en {n} propiedades." }
      ]
    },
    nav: {
      overview: "Resumen",
      allDeals: "Todos los Tratos",
      lenders: "Prestamistas",
      borrowers: "Prestatarios",
      revenue: "Ingresos",
      affiliates: "Afiliados",
      verifications: "Verificaciones",
      promoCodes: "Codigos Promo",
      catalog: "Catálogo",
      auditLogs: "Auditoría",
      settings: "Configuracion"
    },
    views: {
      allDeals: { title: "Todos los Tratos", subtitle: "Listado completo de contratos activos, en mora y cerrados." },
      lenders: { title: "Prestamistas", subtitle: "Directorio de inversores y sus entidades.", searchPlaceholder: "Buscar por nombre, correo o empresa...", companies: "Empresas", detailTitle: "Ficha del prestamista", close: "Cerrar", borrowers: "Deudores", activeContracts: "Contratos activos", noCompanies: "Este prestamista aún no tiene empresas.", active: "Activa", suspended: "Suspendida", openToDeals: "Acepta nuevos tratos", closedToDeals: "No acepta nuevos tratos", notFound: "No se encontró el prestamista (puede haber sido eliminado).", addCompany: "Agregar empresa", editCompany: "Editar empresa", deleteCompanyConfirm: "¿Eliminar la empresa {name}? Sus datos se conservan, pero deja de operar. No se puede si tiene contratos activos.", errorEinTaken: "Este EIN ya lo usa otra empresa.", errorActiveContracts: "No se puede eliminar: la empresa tiene contratos activos o en mora.", errorCompanyNotFound: "La empresa ya no existe; recarga la ficha.", form: { companyName: "Nombre de la empresa", contactPhone: "Teléfono de contacto", addressLine1: "Dirección", addressLine2: "Dirección (línea 2)", city: "Ciudad", state: "Estado", postalCode: "C.P.", einHint: "Formato XX-XXXXXXX", stateHint: "2 letras, ej. TX", optionalHint: "Teléfono y dirección (línea 2) no se pueden dejar vacíos si ya tienen valor: vacío = sin cambio." } },
      borrowers: { title: "Prestatarios", subtitle: "Directorio de clientes y su estado de verificacion." },
      revenue: { title: "Ingresos", subtitle: "Metricas de facturacion y pagos." },
      affiliates: { title: "Afiliados", subtitle: "Gestion de referidos y pagos a afiliados." },
      verifications: { title: "Verificaciones", subtitle: "Solicitudes de identidad y entidades pendientes." },
      promoCodes: { title: "Codigos Promo", subtitle: "Administracion de descuentos y cupones." },
      catalog: { title: "Catálogo", subtitle: "Gestión de productos, suscripciones y cupones." },
      auditLogs: { title: "Auditoría", subtitle: "Historial completo de acciones y eventos del sistema." },
      settings: { title: "Configuracion", subtitle: "Ajustes globales de la plataforma." },
      placeholder: { subtitle: "Esta vista estara disponible proximamente." }
    },
    loading: "Cargando panel...",
    errorAuth: "Sesion invalida.",
    errorFetch: "Error al cargar datos del administrador.",
    errorNetwork: "Error de red"
  },

  adminUsersList: { title: "Usuarios del sistema", subtitle: "Directorio de administradores, prestamistas y prestatarios.", table: { name: "Nombre", type: "Tipo", email: "Correo electrónico", phone: "Teléfono", role: "Rol", status: "Estado", actions: "Acciones", signedUp: "Registro" }, back: "Volver al panel", addUserBtn: "Agregar Usuario", loading: "Cargando usuarios...", empty: "No hay usuarios registrados.", errorAuth: "No tienes permisos de administrador o tu sesión expiró.", errorFetch: "Error al obtener usuarios.", errorNetwork: "Error de red desconocido", active: "Activo", inactive: "Inactivo", na: "N/D", activate: "Activar", deactivate: "Desactivar", errorTwoFactor: "Debes activar la verificación en dos pasos (2FA) en tu cuenta para realizar esta acción. Al activarlo, vuelve a intentarlo.", enable2fa: "Activar 2FA", tempPwTitle: "Cuenta activada", tempPwDesc: "Contraseña temporal para", tempPwEmailSent: "También se envió por correo. Cópiala ahora: no se volverá a mostrar.", tempPwEmailFailed: "No se pudo enviar el correo. Cópiala y compártela ahora: no se volverá a mostrar.", close: "Entendido", edit: "Editar", editTitle: "Editar usuario", save: "Guardar", cancel: "Cancelar", phoneHint: "Exactamente 10 dígitos. Si lo dejas vacío, no se modifica.", errorEmailTaken: "Este correo ya lo usa otro usuario.", delete: "Eliminar", deleteConfirm: "¿Eliminar a {name}? Dejará de aparecer en los listados y no podrá iniciar sesión. Su historial (préstamos, documentos, auditoría) se conserva.", allRoles: "Todos los roles", roles: { ADMIN: "Administrador", LENDER: "Prestamista", BORROWER: "Prestatario", BOOKKEEPER: "Contador", INSURANCE_COMPANY: "Aseguradora" } },

  adminAddUser: { title: "Crear Usuario", subtitle: "Da de alta a un administrador, contador o aseguradora. Prestamistas y prestatarios se registran por su cuenta.", roleLabel: "Rol en la plataforma", roles: { admin: "Administrador", bookkeeper: "Contador", insurance: "Aseguradora" }, nameLabel: "Nombre completo", namePh: "Ej. Jane Doe", emailLabel: "Correo electrónico", emailPh: "correo@ejemplo.com", phoneLabel: "Teléfono", phonePh: "Ej. 555 123 4567", submit: "Registrar cuenta", back: "Volver al panel", submitting: "Registrando...", phoneHint: "Debe tener exactamente 10 dígitos (opcional).", errorFetch: "Error al crear el usuario.", errorNetwork: "Error de red desconocido", successTitle: "¡Usuario creado exitosamente!", successDesc1: "Se ha registrado la cuenta para", successTempPw: "Contraseña temporal generada:", successCreateAnother: "Crear otro", successViewList: "Ver listado" },

  auditLogs: { searchPlaceholder: "Acción exacta, ej. CONTRACT_CREATED", allEntities: "Todas las entidades", system: "Sistema", totalRecords: "Total de registros:", dateHour: "Fecha / Hora", actor: "Actor", action: "Acción", entity: "Entidad", metadata: "Detalle", filtersNote: "Filtra por acción y entidad exactas. El rango de fechas y el rol del actor todavía no los filtra el back.", noRecords: "No se encontraron registros de auditoria.", page: "Página", of: "de", prev: "Anterior", next: "Siguiente" },

  catalog: {
    title: "Catálogo de productos",
    createBtn: "Crear producto",
    tabs: ["Todos los productos", "Funcionalidades", "Cupones", "Códigos promo", "Ofertas afiliados", "Tablas de precios"],
    filters: { all: "Todos", active: "Activos", archived: "Archivados", search: "Buscar productos...", filterBtn: "1 filtro" },
    table: {
      name: "Nombre", updated: "Actualizado", category: "Categoría", pricing: "Precio", created: "Creado", status: "Estado"
    },
    pagination: { showing: "1 - 8 de 8 resultados" }
  },
};
