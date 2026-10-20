import type { legal as Es } from "../es/legal";

export const legal: typeof Es = {
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    meta: "PayMyLoan.ai · PayMyLoan, LLC · Last updated: September 21, 2026 · Effective immediately",
    back: "Back to home",
    tocTitle: "Contents",
    sections: [
      {
        id: "collect",
        heading: "1. What we collect",
        paragraphs: ["We collect information you provide directly when you create an account, post a deal, or use the platform:"],
        table: {
          headers: ["Data type", "When collected", "Required?"],
          rows: [
            ["Name, email, phone", "Account creation", "Yes"],
            ["Entity name, EIN, state", "Business verification", "At publish"],
            ["Personal address, DOB", "Identity verification", "When lender requests"],
            ["SSN / Tax ID", "Identity verification", "When lender requests"],
            ["Government-issued ID", "Identity verification", "When lender requests"],
            ["Deal financials", "Deal posting", "Yes"],
            ["Bank account info", "Payout setup (affiliates)", "For payouts"],
            ["Device, IP, browser", "Automatically, on use", "Automatic"]
          ]
        }
      },
      {
        id: "use",
        heading: "2. How we use it",
        paragraphs: ["We use the information we collect to:"],
        list: [
          "Operate and improve the PayMyLoan.ai platform",
          "Verify the identity and entity of lenders and borrowers",
          "Facilitate introductions between lenders and borrowers",
          "Process subscription payments and affiliate payouts",
          "Send transactional emails (deal alerts, closing notifications, payment reminders)",
          "Detect fraud and maintain platform security",
          "Comply with legal obligations"
        ],
        highlight: "We do not sell your personal information to third parties. Ever."
      },
      {
        id: "share",
        heading: "3. What we share",
        paragraphs: ["We share limited information in the following circumstances:"],
        list: [
          "Between lenders and borrowers: When a deal progresses to the offer stage, relevant deal details are shared between the parties. Personal addresses, SSNs, and government IDs are never shared between users.",
          "Title companies: When a deal closes, we share the Borrower Fee Agreement and Commitment Letter with the title company to facilitate closing.",
          "Service providers: We use third-party services for payments, email delivery, and identity verification. These providers are contractually bound to use your data only to provide services to us.",
          "Legal requirements: We may disclose information when required by law, court order, or to protect the rights and safety of our users."
        ]
      },
      {
        id: "sensitive",
        heading: "4. Sensitive data",
        paragraphs: ["Social Security Numbers (SSNs), government-issued IDs, and EINs are sensitive and handled with the highest level of care:"],
        list: [
          "SSNs are encrypted at rest using AES-256 encryption",
          "Access to SSNs is restricted to authorized verification personnel only",
          "SSNs are never displayed in full on any screen or document",
          "SSNs are never shared with lenders, borrowers, or affiliates",
          "You may request deletion of your SSN at any time by contacting privacy@paymyloan.ai"
        ]
      },
      {
        id: "security",
        heading: "5. Data security",
        paragraphs: [
          "We implement industry-standard security measures including encryption in transit (TLS), encryption at rest for sensitive fields, access controls, and regular security reviews. However, no system is completely secure. We cannot guarantee absolute security.",
          "If you suspect your account has been compromised, contact security@paymyloan.ai immediately."
        ]
      },
      {
        id: "cookies",
        heading: "6. Cookies",
        paragraphs: ["We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze platform usage. You may disable cookies in your browser settings, but some features may not function properly."]
      },
      {
        id: "rights",
        heading: "7. Your rights",
        paragraphs: ["Depending on your location, you may have the following rights regarding your personal data:"],
        list: [
          "Access: Request a copy of the data we hold about you",
          "Correction: Request correction of inaccurate data",
          "Deletion: Request deletion of your account and associated data",
          "Portability: Request your data in a portable format",
          "Opt-out: Opt out of non-transactional marketing emails at any time"
        ],
        paragraphsAfter: ["To exercise any of these rights, contact privacy@paymyloan.ai."]
      },
      {
        id: "retention",
        heading: "8. Data retention",
        paragraphs: ["We retain your account data for as long as your account is active. After account deletion, we retain certain records as required by law (typically 7 years for financial records). Verification documents may be retained for compliance purposes."]
      },
      {
        id: "children",
        heading: "9. Children",
        paragraphs: ["PayMyLoan.ai is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal information, contact privacy@paymyloan.ai."]
      },
      {
        id: "contact",
        heading: "10. Contact",
        paragraphs: [
          "PayMyLoan, LLC",
          "Memphis, Tennessee",
          "privacy@paymyloan.ai"
        ],
        disclaimer: "This privacy policy was prepared as a starting point and should be reviewed by a licensed attorney before going live."
      }
    ]
  },

  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    meta: "PayMyLoan.ai · PayMyLoan, LLC · Last updated: September 21, 2026 · Effective immediately",
    back: "Back to home",
    tocTitle: "Contents",
    sections: [
      {
        id: "platform",
        heading: "1. Platform description",
        paragraphs: ["PayMyLoan.ai is a technology platform operated by PayMyLoan, LLC that facilitates introductions between private money lenders and real estate borrowers. PayMyLoan, LLC is not a lender, broker, mortgage company, or financial institution. We do not originate, underwrite, fund, service, or guarantee any loans."],
        highlight: "PayMyLoan.ai connects people. All loan agreements are made directly between lenders and borrowers. PayMyLoan, LLC is not a party to any loan transaction.",
        paragraphsAfter: ["By using this platform, you agree that PayMyLoan, LLC bears no responsibility for any loan outcome, payment performance, default, foreclosure, or loss of funds."]
      },
      {
        id: "eligibility",
        heading: "2. Eligibility",
        paragraphs: [
          "You must be at least 18 years of age and a legal resident of the United States to use PayMyLoan.ai. By creating an account, you represent and warrant that you meet these requirements.",
          "Lenders must be accredited investors or institutional entities as defined under applicable securities laws. By listing yourself as a lender, you represent that you meet the applicable accreditation standards in your jurisdiction."
        ]
      },
      {
        id: "account",
        heading: "3. Account registration",
        paragraphs: [
          "You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
          "PayMyLoan, LLC reserves the right to suspend or terminate accounts for any violation of these terms, fraudulent activity, or conduct that harms the platform or its users."
        ]
      },
      {
        id: "lender-terms",
        heading: "4. Lender terms",
        paragraphs: ["Lenders use PayMyLoan.ai to discover and connect with borrowers seeking private financing. By making an offer through the platform, you agree to the following:"],
        list: [
          "All lending decisions are made independently by you. PayMyLoan, LLC does not make recommendations, guarantee deal quality, or vet borrower creditworthiness beyond what is displayed on the platform.",
          "You are solely responsible for conducting your own due diligence before committing funds.",
          "You agree not to hold PayMyLoan, LLC liable for borrower default, non-payment, misrepresentation, or any other failure by a borrower to fulfill their obligations.",
          "You agree not to hold PayMyLoan, LLC liable for errors or misconduct by any title company, closing attorney, or third party involved in a transaction.",
          "Lenders are responsible for verifying wire instructions directly with the title company before wiring any funds. PayMyLoan, LLC is not responsible for funds sent to incorrect accounts."
        ],
        warning: "Wire fraud warning: Never wire funds based solely on an email. Always call the title company directly at a verified number to confirm wire instructions before sending any money."
      },
      {
        id: "borrower-terms",
        heading: "5. Borrower terms",
        paragraphs: ["Borrowers use PayMyLoan.ai to post deals and connect with private lenders. By posting a deal, you agree to the following:"],
        list: [
          "All information submitted about your deal, property, financials, and identity must be accurate and complete to the best of your knowledge.",
          "You agree not to hold PayMyLoan, LLC liable for any lender's failure to fund, perform, or fulfill their obligations.",
          "You agree not to hold PayMyLoan, LLC liable for errors by any title company, closing attorney, or third party.",
          "You understand that PayMyLoan, LLC is a platform, not a lender, and has no authority to direct any lender to fund your deal.",
          "You agree to the fee terms outlined in the Borrower Fee Agreement signed at deal posting."
        ]
      },
      {
        id: "fees",
        heading: "6. Fees and payments",
        paragraphs: ["PayMyLoan, LLC charges the following fees to borrowers. Lenders are always free."],
        list: [
          "Monthly subscription: $99/month, beginning when your deal is posted. Waived with a valid promo code or affiliate referral link.",
          "Identity verification fee: $99 one-time, charged only when a lender requests identity verification of your account.",
          "Lender connection fee: 1% of the loan amount, collected at closing via the settlement statement — only on deals where PayMyLoan, LLC connected the borrower and lender.",
          "Monthly platform fee (PML-connected deals only): 10% of the monthly interest payment made to the lender, collected each month for the life of the loan — only on deals where PayMyLoan, LLC introduced the borrower and lender. Example: if your monthly interest payment to the lender is $1,150, PayMyLoan, LLC collects $115 of that amount each month. This fee is disclosed in the Borrower Fee Agreement at deal posting.",
          "Draw processing fee: $175 per draw request, deducted from draw proceeds before disbursement to the borrower.",
          "Extension fee: 1% of the outstanding loan balance, collected via settlement statement at extension closing."
        ],
        paragraphsAfter: ["All fees are disclosed in the Borrower Fee Agreement prior to deal posting. No fees are due at the time of signing the fee agreement. Fees applicable only to PML-connected deals are clearly marked above."]
      },
      {
        id: "liability",
        heading: "7. Limitation of liability",
        paragraphs: ["To the fullest extent permitted by applicable law, PayMyLoan, LLC, its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:"],
        list: [
          "Any loan transaction facilitated through the platform",
          "Borrower default, non-payment, or breach of any loan agreement",
          "Lender failure to fund or perform",
          "Errors, delays, or misconduct by title companies or closing attorneys",
          "Wire fraud, misdirected funds, or third-party interference",
          "Any outcome outside of PayMyLoan, LLC's direct control"
        ],
        paragraphsAfter: ["Your use of the platform constitutes your acceptance of these limitations."]
      },
      {
        id: "advice",
        heading: "8. No investment advice",
        paragraphs: ["Nothing on PayMyLoan.ai constitutes financial, legal, or investment advice. All information is provided for informational purposes only. You should consult with qualified professionals before making any lending or borrowing decision."]
      },
      {
        id: "wire-fraud",
        heading: "9. Wire fraud and security",
        paragraphs: [
          "Wire fraud is a serious risk in real estate transactions. PayMyLoan, LLC will never send last-minute changes to wire instructions via email. If you receive any such communication, treat it as fraudulent and contact us immediately at security@paymyloan.ai.",
          "Always verify wire instructions by calling the title company directly at a number you have independently verified before wiring any funds."
        ]
      },
      {
        id: "termination",
        heading: "10. Termination",
        paragraphs: ["We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or any conduct we determine to be harmful to the platform or its users. Subscription fees are non-refundable upon termination."]
      },
      {
        id: "law",
        heading: "11. Governing law",
        paragraphs: ["These terms are governed by the laws of the State of Tennessee, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Shelby County, Tennessee."]
      },
      {
        id: "contact",
        heading: "12. Contact",
        paragraphs: [
          "PayMyLoan, LLC",
          "Memphis, Tennessee",
          "legal@paymyloan.ai"
        ],
        disclaimer: "These terms were prepared as a starting point and should be reviewed by a licensed attorney before going live."
      }
    ]
  },
};
