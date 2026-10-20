export const auth = {
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

  verifyEmail: {
    borrower: {
      title: "Correo confirmado",
      sub: "Tu cuenta esta activa. Publica tu primer trato y comienza a recibir fondeo.",
      nextTitle: "Tus siguientes pasos",
      steps: [
        { title: "Publica tu primer trato", desc: "ingresa los detalles, ARV, monto del prestamo y plazos" },
        { title: "Configura tu perfil", desc: "agrega informacion de tu entidad e historial para generar confianza" },
        { title: "Espera ofertas", desc: "los prestamistas revisaran tu trato y enviaran hojas de terminos" }
      ],
      btnPrimary: "Publicar mi primer trato",
      btnSecondary: "Ir al panel de control"
    },
    lender: {
      title: "Correo confirmado",
      sub: "Tu cuenta de prestamista esta activa. Explora tratos y pon tu capital a trabajar.",
      badge: "Prestar en PayMyLoan es siempre gratis.",
      nextTitle: "Tus siguientes pasos",
      steps: [
        { title: "Configura tus preferencias", desc: "mercados, tipos de trato, rango de tasas, LTV maximo" },
        { title: "Explora tratos", desc: "ve tratos activos que coincidan con tus criterios" },
        { title: "Haz una oferta", desc: "envia tus terminos y conecta con un prestatario" }
      ],
      btnPrimary: "Explorar tratos ahora",
      btnSecondary: "Configurar preferencias primero"
    },
    expired: {
      title: "Enlace expirado",
      sub: "Tu enlace de verificacion expiro despues de 72 horas. Solicita uno nuevo abajo (tu informacion esta a salvo).",
      emailPh: "Ingresa tu correo electronico",
      btnPrimary: "Enviar nuevo enlace",
      btnSecondary: "Volver al inicio de sesion",
      sentAlert: "Nuevo enlace enviado a"
    },
    already: {
      title: "Ya verificado",
      sub: "Este correo electronico ya ha sido confirmado. Inicia sesion para acceder a tu cuenta.",
      btnPrimary: "Iniciar sesion"
    }
  },
};
