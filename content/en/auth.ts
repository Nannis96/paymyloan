import type { auth as Es } from "../es/auth";

export const auth: typeof Es = {
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

  verifyEmail: {
    borrower: {
      title: "Email confirmed",
      sub: "Your account is active. Post your first deal and start getting funded.",
      nextTitle: "Your next steps",
      steps: [
        { title: "Post your first deal", desc: "fill out your deal details, ARV, loan amount, and timeline" },
        { title: "Set up your profile", desc: "add entity info and track record to build credibility with lenders" },
        { title: "Wait for offers", desc: "lenders will review your deal and submit term sheets" }
      ],
      btnPrimary: "Post my first deal",
      btnSecondary: "Go to dashboard"
    },
    lender: {
      title: "Email confirmed",
      sub: "Your free lender account is active. Browse deals and start putting your capital to work.",
      badge: "Lending on PayMyLoan is always free.",
      nextTitle: "Your next steps",
      steps: [
        { title: "Set your lending preferences", desc: "markets, deal types, rate range, max LTV" },
        { title: "Browse deals", desc: "see active borrower deals that match your criteria" },
        { title: "Make an offer", desc: "submit your terms and connect with a borrower" }
      ],
      btnPrimary: "Browse deals now",
      btnSecondary: "Set my preferences first"
    },
    expired: {
      title: "Link expired",
      sub: "Your verification link expired after 72 hours. Request a new one below — your account info is saved.",
      emailPh: "Enter your email address",
      btnPrimary: "Send new verification link",
      btnSecondary: "Back to login",
      sentAlert: "New verification link sent to"
    },
    already: {
      title: "Already verified",
      sub: "This email address is already confirmed. Log in to access your account.",
      btnPrimary: "Log in"
    }
  },
};
