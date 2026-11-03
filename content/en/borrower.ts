import type { borrower as Es } from "../es/borrower";

export const borrower: typeof Es = {
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
    },
    trackerTitle: "Upcoming Closings",
    trackerEmpty: "No upcoming closings tracked.",
    needFunding: "Need Funding",
    loanApproved: "Loan Approved by Lender",
    currentLoans: "Current Loans",
    completedLoans: "Completed Loans",
    emptyTable: "Live loan table will be rendered here.",
    emptyDocs: "Generated commitment letters and payoff statements will appear here.",
    tableHeaders: { property: "Property", amount: "Amount / Balance", rehabDrawn: "Rehab Drawn", lender: "Lender", rate: "Rate", status: "Status", date: "Date / Next Pmt", action: "Action", history: "History" },
    actions: {
      pitchDeck: "Generate Pitch Deck",
      payoff: "Request Payoff",
      payments: "Manage Payments",
      viewContracts: "Contracts",
      drawRequest: "Request Draw",
      extensionRequest: "Request Extension",
      resolveLate: "Resolve Late Payment",
      rateLender: "Rate Lender"
    },
    loading: "Loading dashboard...",
    errorAuth: "Invalid or expired session.",
    errorFetch: "Error loading dashboard information",
    errorNetwork: "Unknown network error",
    lenderFallback: "Lending Company",
    emptyNeedFunding: "No pending requests",
    emptyApproved: "No loans pending acceptance",
    emptyActive: "No active loans",
    emptyCompleted: "No completed loans",
    reviewCommitment: "REVIEW COMMITMENT",
    paidOff: "Paid off:"
  },

  feeAgreement: {
    docType: "Borrower Fee Agreement",
    title: "Borrower Fee Agreement",
    subtitle: "This agreement is entered into at the time of deal posting on PayMyLoan.ai. No fees are due at signing. All fees listed are due only upon the events described below. This document authorizes PayMyLoan.ai to collect applicable fees at closing via the settlement statement.",
    sections: { borrower: "Borrower", platformFees: "Platform fees", auth: "Authorization", ack: "Borrower acknowledgments" },
    borrower: { entity: "Entity name", sig: "Signatory", address: "Property address", date: "Agreement date", dealId: "Deal ID" },
    platformFees: {
      desc1: "The following fees apply to borrowers using PayMyLoan.ai. All fees are due upon the triggering event described — not at the time of signing this agreement.",
      desc2Pre: "These fees are charged by PayMyLoan.ai and are ",
      desc2Bold: "separate from any fees the lender charges.",
      desc2Post: " Lenders on PML are aware of our platform fee and factor it into their offer terms.",
      table: { fee: "Fee", amount: "Amount", when: "When due" },
      items: [
        { name: "Monthly subscription", amt: "$99/mo", when: "Monthly, beginning when deal is posted. Waived if borrower has a valid promo code or affiliate referral link." },
        { name: "Borrower underwriting fee", amt: "$99 (one-time)", when: "When a lender requests full identity verification" },
        { name: "Lender connection fee", amt: "1% of loan amount", when: "At closing — only if PML connected borrower to lender. Paid via settlement statement." }
      ],
      totalDue: "Total due today",
      totalAmt: "$0",
      note: "The 1% lender connection fee applies only if PayMyLoan.ai facilitated the introduction between borrower and lender. If you bring your own lender, this fee does not apply. Exact amount is based on the final funded loan amount."
    },
    auth: {
      desc1: "By signing this agreement, the borrower authorizes PayMyLoan.ai to:",
      items: [
        "1. Include the lender connection fee (1% of funded loan amount) as a line item on the settlement statement at closing, to be paid by the borrower to PayMyLoan LLC.",
        "2. Send this signed agreement to the title company or closing attorney handling the transaction as authorization to collect the platform fee at closing.",
        "3. Charge the applicable monthly subscription fee beginning when the deal is posted (waived with a valid promo code or affiliate referral link)."
      ],
      desc2: "The borrower acknowledges that these fees are disclosed in full, that no fees are due at the time of this signing, and that the 1% connection fee is contingent on PayMyLoan.ai successfully connecting the borrower with a lender who funds the deal."
    },
    ack: {
      items: [
        "I understand that a <strong>1% lender connection fee</strong> ($1,150 estimated) will be collected at closing via the settlement statement if PayMyLoan.ai connected me with my lender.",
        "I understand that a <strong>$99/month subscription fee</strong> begins when I post my deal. This fee is waived if I have a valid promo code or affiliate referral link.",
        "I authorize PayMyLoan.ai to send this signed agreement to my title company as authorization to include the platform fee on the settlement statement.",
        "I have read and agree to the PayMyLoan.ai <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>."
      ]
    },
    sig: {
      label: "Borrower e-signature",
      esignedBy: "e-Signed by",
      signedAt: "Signed:",
      ipAndDoc: "IP: 68.105.xxx.xxx · Document ID:"
    },
    action: {
      note: "This is a legally binding agreement under the E-SIGN Act and UETA. Your electronic signature carries the same legal weight as a handwritten signature. No payment is due now.",
      btn: "Sign & post my deal"
    },
    footer: {
      gen: "Generated by PayMyLoan.ai · Document ID:",
      legal: "PayMyLoan LLC · Built for Main Street, Not Wall Street · paymyloan.ai"
    }
  },

  counterOffer: {
    title: "Counter-Offer",
    subtitle: "3802 University Cove — review terms and respond",
    deal: {
      requested: "requested",
      months: "months",
      arv: "ARV",
      ltv: "LTV",
      rehab: "Rehab"
    },
    thread: {
      original: "Original request",
      yourOffer: "Your offer",
      borrowerCounter: "Borrower counter",
      awaiting: "Awaiting your response",
      noChange: "No change",
      reqLower: "Requested lower",
      reqHigher: "Requested higher",
      metHalfway: "Met halfway"
    },
    terms: {
      amount: "Loan amount",
      rate: "Rate",
      term: "Term",
      points: "Points"
    },
    actions: {
      title: "Respond to",
      sub: "accept, decline, or send another counter.",
      accept: "Accept these terms",
      decline: "Decline",
      counter: "Send a counter",
      formTitle: "Send a counter-offer",
      noteLabel: "Note to borrower",
      notePh: "Explain your counter-offer...",
      sendBtn: "Send counter-offer"
    }
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

  submitDeal: {
    title: "Post a Deal",
    subtitle: "Post your loan request and let lenders compete for your deal.",
    steps: ["Loan type", "Property", "Financials", "Review & post"],
    stepHint: "Step {current} of {total} — {stepName}",
    loanType: {
      title: "Select loan type",
      sub: "What kind of financing are you looking for?",
      bridge: "Bridge Loan",
      bridgeSub: "Short term, interest only. Ideal for fix & flip.",
      slowFlip: "Slow Flip / Owner Finance",
      slowFlipSub: "Long term, fully amortized.",
      rental: "Long-term Rental",
      rentalSub: "For stabilized properties."
    },
    property: {
      title: "Property details",
      sub: "Tell us about the property you're financing.",
      address: "Property address",
      addressPh: "E.g. 123 Main St, Memphis, TN",
      addressHint: "Start typing — we'll auto-fill details and estimate your ARV from public records.",
      addressLookup: "Looking up...",
      addressSuccess: "Auto-filled from public records",
      addressFail: "Could not auto-fill — please enter details manually.",
      city: "City",
      state: "State",
      zip: "ZIP code",
      propType: "Property type",
      propTypes: ["Single family", "Multi-family (2-4 units)", "Multi-family (5+ units)", "Commercial", "Land"],
      occupancy: "Occupancy",
      occupancies: ["Vacant", "Owner occupied", "Tenant occupied"],
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
      loanHint: "Amount you need from the lender.",
      arv: "After repair value (ARV)",
      arvHint: "Estimated value after all work is done.",
      rehab: "Estimated rehab cost",
      desiredTerm: "Desired loan term",
      terms: ["6 months", "9 months", "12 months", "18 months"],
      maxRate: "Max interest rate you'll accept",
      maxRates: ["10%", "12%", "14%", "Any — show me all offers"],
      ltvLabel: "Loan-to-value (LTV)",
      ltvHigh: "High LTV — some lenders may pass. Consider increasing down payment.",
      ltvMod: "Moderate LTV. Most lenders will consider this.",
      ltvGood: "Most private lenders prefer LTV under 70%. You're in good shape.",
      exitLabel: "Exit strategy",
      exits: ["Sell after rehab", "Refinance (BRRRR)", "Rent & hold", "Owner finance"]
    },
    liveCalc: {
      title: "Live deal snapshot",
      purchase: "Purchase price",
      loan: "Loan requested",
      rehab: "Rehab budget",
      arv: "ARV estimate",
      ltv: "LTV (loan ÷ ARV)",
      monthly: "Est. monthly payment @ {rate}",
      warning: "LTV above 75% — most lenders require borrower to reduce loan amount or increase equity."
    },
    review: {
      visTitle: "Your deal will be visible to all lenders on the platform.",
      visSub: "Lenders see your deal details, property address, and financials. Personal identity information is never shown without your approval.",
      title: "Review your deal",
      sub: "Confirm everything looks right before posting.",
      secType: "Loan type",
      secProp: "Property",
      secFin: "Financials",
      secBiz: "Your business",
      edit: "Edit",
      btnPost: "Post my deal",
      postNote: "Your deal goes live immediately. Lenders will be notified.\nYou can edit or remove it at any time from your dashboard."
    },
    actions: { back: "← Back", continue: "Continue →", review: "Review & post" }
  },

  payoff: { title: "Payoff Request", requestBtn: "Request Payoff", expectedDate: "Expected closing date", successAlert: "Request sent to lender.", processing: "Processing...", errorFetch: "Failed to process request", errorNetwork: "Unknown network error" },

  vetting: { title: "Vetting Application", subtitle: "Complete this process once to access private capital.", feeNotice: "Application fee (non-refundable)", form: { bankStatements: "Bank Statements (Last 3 months)", idUpload: "Official ID", submitAndPay: "Pay $99 & Submit", selectFile: "Select file", dealHistory: "Past Deal History", dealHistoryDesc: "Enter up to 5 recent project addresses.", addressLabel: "Address", addressPh: "E.g. 123 Main St, Austin, TX", addAddress: "+ Add another address", consentCredit: "I authorize Dueño a Dueño LLC and its partnered lenders to run a Credit Pull.", consentBackground: "I authorize Dueño a Dueño LLC to run a Background Check.", consentAlert: "You must accept the credit and background checks to continue.", step: "Step", of: "of", next: "Next", back: "Back", saveAndContinueLater: "Save & continue later", savedAlert: "Your progress has been saved. You can come back anytime." } },

  borrowerOnboarding: {
    title: "One step before you post",
    subtitle: "Tell us about your business so lenders know who they're working with.\nTakes about 60 seconds.",
    steps: ["Account", "Business", "Post deal"],
    step1: {
      tag: "Business profile",
      title: "About your entity",
      sub: "Used to show lenders who is behind the deal. No personal info required at this stage.",
      entityName: "Entity name",
      entityNamePh: "Memphis Realty LLC",
      entityType: "Entity type",
      entityTypeSelect: "Select",
      entityTypes: ["LLC", "Corporation", "Land trust", "Personal name", "Other"],
      ein: "EIN",
      einPh: "XX-XXXXXXX",
      states: "States you operate in",
      statesPh: "e.g. TN, MS, AR",
      statesHint: "Helps lenders find deals in their area.",
      experience: "Years in real estate investing",
      expSelect: "Select",
      exps: ["Less than 1 year", "1 - 3 years", "3 - 5 years", "5 - 10 years", "10+ years"],
      lockedNotice: {
        bold: "Identity verification is optional for now.",
        text: " Personal address, date of birth, SSN, and government ID are only required when a lender decides to fund your deal."
      }
    },
    step2: {
      tag: "Ready to post",
      title: "Your profile is set",
      sub: "Here's what lenders will see. You can post your first deal now.",
      reviewTitle: "Business",
      unlockedLater: "Unlocked when a lender wants to fund",
      locked1: "Personal address & date of birth",
      locked2: "Social Security Number",
      locked3: "Government-issued ID",
      lockedBadge: "Locked"
    },
    footer: {
      step: "Step",
      of: "of",
      back: "Back",
      continue: "Continue",
      post: "Post my first deal",
      skip: "Skip for now — I'll complete this later",
      submitting: "Processing..."
    }
  },

  rateLender: { title: "Rate Lender", subtitle: "Your loan is completed. How was your experience with", ratingLabel: "Rating", reviewLabel: "Public review (optional)", reviewPh: "Write about your experience working with this lender...", submit: "Submit Rating", success: "Thank you! Your rating has been published on the lender's profile.", close: "Close" },

  leaveReview: { pageTitle: "Leave a review", pageSub: "Reviews unlock after a deal closes. They're public, tied to your account, and can't be anonymous. PML can flag or remove reviews that violate our terms.", closedBadge: "Closed", rateTitle: "Rate your lender", rateSub: "Your honest review helps other borrowers make informed decisions.", tapToRate: "Tap to rate", labels: ["", "Poor", "Below average", "Good", "Great", "Outstanding"], writeReview: "Write your review", reviewPh: "How was the experience working with this lender? Communication, speed, fairness...", tagsTitle: "What stood out? (optional)", tags: ["Fast funding", "Clear communication", "Fair terms", "Flexible", "Professional", "Would work with again"], importantNote: "Important: Do not include phone numbers, emails, or off-platform contact information in your review. Reviews are public and tied to your real name.", submitBtn: "Submit review", skipBtn: "Skip for now", submittedTitle: "Review submitted", submittedSub: "Thank you. Your review is now live on {name}'s profile. {name} will also have a chance to review you as a borrower.", backBtn: "Back to dashboard" },

  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find quick answers about how the marketplace, contracts, and platform rules work.",
    back: "Back to dashboard",
    sections: [
      {
        title: "1. About the Marketplace and Privacy",
        items: [
          { q: "What types of projects can be funded?", a: "The platform primarily supports real estate projects, including Fix and Flip, Slow Flip, Rentals, Commercial, and New Construction." },
          { q: "Are my personal info and property address public?", a: "Not by default. The platform uses a 'Shielded Identity' system in the Marketplace. Lenders only see financial metrics (ARV, requested amount, LTV) and must formally request document access to see your LLC name and exact address." },
          { q: "What is LTV (Loan-to-Value)?", a: "It is the ratio between the requested loan amount and the After Repair Value (ARV) of the property. The platform calculates this automatically and alerts if the LTV exceeds risk thresholds (e.g., >75%)." }
        ]
      },
      {
        title: "2. Offers (Quotes) and Negotiation",
        items: [
          { q: "How do lender offers work?", a: "Lenders submit formal Quotes that include the principal amount, annual interest rate, amortization term (e.g., 6, 9, 12 months), and closing points." },
          { q: "How are disbursements structured?", a: "Offers can be structured to disburse 100% of capital at closing (Full) or through milestone-based construction draws (Draws)." },
          { q: "Can I negotiate an offer?", a: "Yes, the system allows you to send counter-offers. You can adjust the amount, interest rate, term in months, points, and add notes before sending it back to the lender." }
        ]
      },
      {
        title: "3. Contracts and Payments",
        items: [
          { q: "How are monthly payments calculated?", a: "Most bridge loans are structured as 'Interest Only', where you only pay the accrued monthly interest based on a 360-day commercial year (Per diem). Fully amortized or Balloon structured loans are also supported." },
          { q: "What happens if a payment is late?", a: "The system changes the contract status to 'Delinquent' or 'Late'. Contracts include late payment penalties (Late Fees), which can be configured as a flat fee or a percentage." },
          { q: "What is a Commitment Letter?", a: "It is an official document auto-generated by the platform once an offer is accepted. It breaks down the amount, rates, due dates, platform fees, and contains electronic signatures from both parties." },
          { q: "How does the Payoff work?", a: "The dashboard includes a 'Payoff Calculator' where you can select a future cutoff date to calculate the remaining principal plus interest accrued up to that exact day." }
        ]
      },
      {
        title: "4. Platform Rules and Trust",
        items: [
          { q: "Can I communicate with a lender outside the platform?", a: "Sharing direct contact information is not allowed. The internal messaging system automatically detects and blocks messages attempting to send phone numbers or emails." },
          { q: "How do I know if a lender is trustworthy?", a: "Lenders go through verification tiers: 'Business Verified' (legal entity and EIN verified) and 'Fully Verified' (includes encrypted SSN and signatory's government ID)." },
          { q: "What is the PML Score?", a: "It is a rating system where borrowers and lenders review each other after a deal (from 1 to 5 stars). The average translates into a letter grade (e.g., A+, B, C) visible on their profiles." }
        ]
      }
    ]
  }
};