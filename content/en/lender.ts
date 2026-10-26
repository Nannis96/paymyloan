import type { lender as Es } from "../es/lender";

export const lender: typeof Es = {
  dashboardLender: { title: "Lender Dashboard", subtitle: "Total control over your capital and yields.", metrics: { availableCapital: "Capital (Available / Deployed)", capitalDeployed: "Capital Deployed", nextPayments: "Next Payments (30 days)", avgInterest: "Avg. Interest Rate", activeBorrowers: "Active Borrowers" }, sections: { commitmentLetters: "Sent Commitment Letters", upcomingClosings: "Upcoming Closings / Payoffs", activeLoans: "Active Loans (Return)", }, tableHeaders: { borrower: "Borrower", amount: "Amount", status: "Status", type: "Type", date: "Date", action: "Action", loan: "Loan", rateBalance: "Rate / Balance" }, labels: { cap: "Prin:", int: "Int:" },
    offersSent: {
      title: "Offers Sent",
      subtitle: "Manage the quotes you have submitted to borrowers.",
      table: {
        property: "Property",
        amount: "Offered Amount",
        rate: "Proposed Rate",
        status: "Status",
        date: "Date Sent",
        action: "View Deal"
      },
      status: {
        SUBMITTED: "Submitted",
        SELECTED: "Accepted",
        DECLINED: "Declined",
        WITHDRAWN: "Withdrawn"
      },
      empty: "You haven't sent any offers yet."
    },
    actions: { marketplace: "Browse Marketplace", viewContracts: "View my contracts", viewContractBtn: "View contract" }, toggle: { open: "Open to deals", closed: "Not taking loans" }, table: { date: "Date", borrower: "Borrower", property: "Property", total: "Total Payment", principal: "Principal", interest: "Interest" }, emptyHistory: "The rest of the history will be rendered here.", loading: "Loading dashboard...", errorAuth: "Invalid or expired session.", errorFetch: "Error loading dashboard information", errorNetwork: "Unknown network error", unassigned: "Unassigned", borrowerFallback: "Borrower", emptyCommitments: "No pending commitments", emptyClosings: "No upcoming closings in the system.", emptyLoans: "No active loans", emptyPayments: "No recently processed payments.", mimic: { greeting: "Good morning, {name}.", portfolioSub: "{company} — lender portfolio overview.", stats: { capitalDeployed: "Capital deployed", acrossActive: "Across {n} active loans", monthlyIncome: "Monthly income", interestPayments: "Interest payments", newDeals: "New deals today", matchCriteria: "Match your criteria", maturingSoon: "Maturing soon", within60: "Within 60 days" }, alerts: { maturityTitle: "Maturity alert", maturityMsg: "{address} matures in {days} days — {date}", maturitySub: "{amount} @ {rate}% · Contact borrower to discuss payoff or extension." }, cards: { activeLoans: "Active loans", viewAll: "View all", upcomingPayments: "Upcoming payments", allPayments: "All payments" }, browseCta: { title: "{n} new deals match your criteria", sub: "Memphis · TN · MS · Up to 75% LTV · 12%+", btn: "Browse deals" }, badges: { active: "Active", closing: "Closing", maturity: "{n}d to maturity", pending: "Pending", received: "Received" }, data: { loan1Addr: "3802 University Cove", loan1Sub: "Funded Sept 22 · 12 months", loan1Amt: "$115,000", loan1Rate: "12% · $1,150/mo", loan2Addr: "1144 Oakwood Dr", loan2Sub: "Funded Aug 3 · 12 months", loan2Amt: "$95,000", loan2Rate: "12% · $950/mo", loan3Addr: "4215 Raleigh Ave", loan3Sub: "Closing in progress", loan3Amt: "$75,000", loan3Rate: "11% · $687.50/mo", pay1Date: "Due Oct 1", pay2Date: "Due Oct 1", pay3Date: "Paid Sept 1", pay4Date: "Paid Sept 1" },
    sidebar: { menu: "Menu", dashboard: "Dashboard", browse: "Browse deals", active: "Active loans", payments: "Payments", offers: "Offers sent", settings: "Settings", preferences: "Preferences", entities: "Entities", verifyMsg: "Complete verification", contacts: "Contacts", affiliates: "Affiliates" },  
      settings: {
        title: "Settings",
        sub: "Manage your account, notifications, and billing.",
        verifyBanner: { text1: "Your profile is unverified.", text2: "Complete verification to unlock lender offers.", btn: "Verify now — $99" },
        profile: { title: "Profile", sub: "Your name, email, and password.", edit: "Edit", name: "Full name", email: "Email", pass: "Password", phone: "Phone", unassigned: "Not provided" },
        verification: { title: "Verification", sub: "Identity and business verification status.", biz: "Business verified", id: "Identity verified", unverified: "Not verified" },
        notifs: { title: "Notifications", sub: "Choose what updates you receive.", offer: "Lender offer received", status: "Deal status updates", approved: "Verification approved", news: "Platform news and updates" },
        billing: { title: "Subscription & billing", sub: "Your current plan and payment method.", manage: "Manage", plan: "Current plan", subPlan: "Monthly subscription", method: "Payment method", free: "Free", notActive: "Not active", none: "None on file" },
        account: { title: "Account", sub: "Close or deactivate your account.", close: "Close account" },
        accountSecurity: { title: "Account security", sub: "2FA, active sessions, and emergency freeze.", buttonLabel: "Manage security", back: "← Back to settings", alertTitle: "Suspicious activity reported", alertSub: "If someone else is attempting to access your account, freeze it immediately below. If you need help, call us at", freezeTitle: "Freeze your account", freezeSub: "Immediately blocks all logins, offers, payments, and account changes. Reversible.", freezeBtn: "Freeze my account now", sessionsTitle: "Active sessions", loggedInDev: "Logged-in devices", thisDevice: "This device", current: "Current", revoke: "Revoke", revokeAll: "Revoke all other sessions", secActionsTitle: "Account security", password: "Password", phone: "Phone number", email: "Email address", bank: "Bank / ACH account", change: "Change", secCallout: "All account changes require 2FA.", secCalloutSub: "You'll receive a text message to verify your identity before any change goes live. Banking changes have an additional 24-hour security hold.", eventsTitle: "Recent security events", flagged: "FLAGGED", confirmed: "CONFIRMED", emergencyTitle: "Need immediate help?", emergencyText1: "Call PayMyLoan directly: ", emergencyText2: "We can verify your identity by phone and freeze or restore your account immediately. Never share your 2FA codes." }
      }
    }
  },

  dashboardBookkeeper: { title: "Bookkeeper Dashboard", subtitle: "Clean, exportable principal and interest records for accounting.", metrics: { activeLoans: "Active Loans", totalInterest: "Interest Paid (YTD)", totalPrincipal: "Principal Paid (YTD)" }, exportBtn: "Export Year-End Report", tableHeaders: { property: "Property", borrower: "Borrower", lender: "Lender", interest: "Interest", principal: "Principal", action: "Action" }, loading: "Loading accounting records...", empty: "No records available.", errorAuth: "Invalid session or no bookkeeping permissions.", errorFetch: "Error loading accounting data.", errorNetwork: "Unknown network error" },
dashboardBorrower: { title: "Borrower Dashboard", subtitle: "Your loans, properties, and balances in one place.", metrics: { totalOwed: "Total Outstanding Balance", nextDue: "Next Payment Due", properties: "Collateral Properties", pmlRating: "PML Rating" }, tabs: { needsFunding: "Needs Funding", approved: "Loans Approved", funded: "Funded / Closed", completed: "Completed" }, trackerTitle: "Upcoming Closings", trackerEmpty: "No upcoming closings tracked.", needFunding: "Need Funding", loanApproved: "Loan Approved by Lender", currentLoans: "Current Loans", completedLoans: "Completed Loans", emptyTable: "Live loan table will be rendered here.", emptyDocs: "Generated commitment letters and payoff statements will appear here.", tableHeaders: { property: "Property", amount: "Amount / Balance", rehabDrawn: "Rehab Drawn", lender: "Lender", rate: "Rate", status: "Status", date: "Date / Next Pmt", action: "Action", history: "History" }, actions: { pitchDeck: "Generate Pitch Deck", payoff: "Request Payoff", payments: "Manage Payments", viewContracts: "Contracts", drawRequest: "Request Draw", extensionRequest: "Request Extension", resolveLate: "Resolve Late Payment", rateLender: "Rate Lender" }, loading: "Loading dashboard...", errorAuth: "Invalid or expired session.", errorFetch: "Error loading dashboard information", errorNetwork: "Unknown network error", lenderFallback: "Lending Company", emptyNeedFunding: "No pending requests", emptyApproved: "No loans pending acceptance", emptyActive: "No active loans", emptyCompleted: "No completed loans", reviewCommitment: "REVIEW COMMITMENT", paidOff: "Paid off:" },  contractsList: { title: "Contracts & Loans", subtitle: "List of agreements. What you see depends on your role.", table: { id: "ID", concept: "Concept", property: "Property", client: "Client", financials: "Financial Terms", status: "Status", actions: "Actions" }, status: { active: "Active", inactive: "Inactive" }, viewDetails: "Details", back: "Back to dashboard", loading: "Loading contracts...", empty: "No contracts found.", errorAuth: "You don't have permission to view these contracts or your session expired.", errorFetch: "Failed to fetch contracts", errorNetwork: "Unknown network error", unassigned: "Unassigned", borrowerFallback: "Borrower", noTerms: "No terms", total: "Total:", perMonth: "/mo", interest: "% Int.", },

  commitmentLetterDoc: {
    label: "Commitment Letter — Auto-generated by PayMyLoan.ai",
    print: "Print",
    download: "Download PDF",
    docType: "Private Lending Commitment Letter",
    title: "Loan Commitment Letter",
    subtitle: "This commitment is subject to the conditions listed below and expires 24 hours from issuance.",
    sections: {
      parties: "Parties",
      property: "Property",
      terms: "Loan terms",
      fees: "Fees payable at closing",
      conditions: "Conditions of commitment",
      agreement: "Agreement"
    },
    labels: {
      lender: "Lender",
      lenderSig: "Lender signatory",
      borrower: "Borrower",
      borrowerSig: "Borrower signatory",
      address: "Property address",
      propType: "Property type",
      exit: "Exit strategy",
      loanAmount: "Loan amount",
      purchaseFunded: "Purchase price funded",
      rehabFunded: "Rehab funded",
      interestRate: "Interest rate",
      monthlyPayment: "Monthly interest payment",
      perDiem: "Per diem",
      term: "Loan term",
      maturity: "Maturity date",
      ltv: "Loan-to-value (LTV)",
      disbursement: "Rehab disbursement",
      origination: "Origination (1 point)",
      appraisal: "Appraisal fee",
      admin: "Admin fee",
      wire: "Wire fee",
      pmlFee: "PML platform fee (facilitation)",
      totalFees: "Total fees at closing",
      lenderSigRole: "Lender signature",
      borrowerSigRole: "Borrower signature",
      signed: "Signed:"
    },
    values: {
      heldBack: "held back in draws",
      perAnnum: "per annum (360-day year)",
      io: "(interest only)",
      drawBased: "Draw-based — lender releases upon inspection",
      esignedBy: "e-Signed by",
      footerGen: "Generated by PayMyLoan.ai",
      footerId: "Document ID:",
      footerLegal: "This document is legally binding upon electronic execution by both parties.",
      footerTag: "Built for Main Street, Not Wall Street"
    },
    pmlFeeNote: "The PML platform fee ($1,150) is payable to PayMyLoan LLC at closing. Wire instructions have been provided directly to the title company. This fee applies because PayMyLoan.ai facilitated the connection between borrower and lender.",
    conditionsList: [
      "Satisfactory appraisal confirming ARV of no less than $165,000",
      "Evidence of property insurance with lender named as additional insured",
      "Clear title and title insurance policy at closing",
      "Borrower entity documents (operating agreement, EIN letter)",
      "Executed purchase and sale agreement",
      "Scope of work and contractor bids for rehab budget",
      "All fees listed above paid at closing via the settlement statement",
      "This commitment expires 24 hours from issuance unless accepted by borrower"
    ],
    agreementTexts: [
      "By signing below, both parties agree to the terms and conditions set forth in this Commitment Letter. This document is executed in accordance with the Electronic Signatures in Global and National Commerce Act (E-SIGN Act) and the Uniform Electronic Transactions Act (UETA). Electronic signatures carry the same legal weight as handwritten signatures.",
      "This commitment does not constitute a guarantee of funding. Funding is contingent on satisfaction of all conditions listed above and completion of a final review at closing."
    ],
    errorState: {
      title: "Document unavailable",
      desc: "We couldn't generate the Commitment Letter for this contract. This usually happens for two reasons:",
      reason1Title: "1. Missing financial terms",
      reason1Desc: "You must go to 'Issue Commitment Letter' first to set the loan amounts, rates, and closing fees.",
      reason2Title: "2. Incorrect link or permissions",
      reason2Desc: "The contract belongs to another account, you don't have access to it, or the link is broken.",
      btnContract: "Back to contract",
      btnAll: "Go to my contracts"
    }
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

  commitmentLetter: { title: "Commitment Letter", subtitle: "Binding agreement between borrower and lender.", fees: { title: "Closing Fee Summary", origination: "Origination Points", processing: "Processing Fee", underwriting: "Underwriting Fee", platform: "PML Connection Fee", totalDue: "Total Due at Closing (Borrower)" }, actions: { accept: "Accept & Sign", decline: "Decline" }, achModal: { title: "Set Up Autopay (ACH)", subtitle: "To complete the signature, select the bank account from which your monthly payments will be automatically deducted starting on the commencement date.", selectAccount: "Select a linked account", confirmBtn: "Confirm ACH & Sign", cancel: "Cancel" }, disclaimer: "Upon acceptance, this letter will be automatically sent to the Title Company and Insurance Company. Dueño a Dueño LLC operates as a technology connector, and does not originate, fund, or service the loan itself.", loading: "Loading commitment letter...", errorAuth: "You don't have permission to view this commitment letter or your session expired.", errorFetch: "Failed to fetch commitment letter", errorAccept: "Failed to accept terms", errorReject: "Failed to decline terms", errorNetwork: "Unknown network error", paidTo: "Paid to Dueño a Dueño LLC ", customFeeFallback: "Fee", rejectCommentPh: "Reason for declining (optional)...", rejecting: "Declining...", accepting: "Accepting...", },

  issueCommitment: { title: "Issue Commitment Letter", subtitle: "Configure fees for deal REF:", closingFeesTitle: "Closing Fees", originationPoints: "Origination Points (%)", processingFee: "Processing Fee ($)", underwritingFee: "Underwriting Fee ($)", docPrepFee: "Doc Prep Fee ($)", customFeeName: "Custom Fee Name", customFeeNamePh: "E.g. Appraisal Fee", customFeeAmount: "Custom Fee Amount ($)", penaltiesTitle: "Post-Closing Penalties", latePenalty: "Late Payment Penalty", latePenaltyPh: "E.g. 5% or $50", prePayPenalty: "Pre-Pay Penalty", prePayPenaltyPh: "E.g. 1% of balance", phPoints: "E.g. 2", phFee: "E.g. 500", systemNoteTitle: "System Note:", systemNote: "The Marketplace Connection Fee (1 point, min $999) will be automatically added to the final summary by the platform if applicable to this deal.", submit: "Generate and Issue Letter", submitting: "Issuing...", errorFetch: "Failed to issue commitment letter", errorNetwork: "Unknown network error" },
};
