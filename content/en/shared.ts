import type { shared as Es } from "../es/shared";

export const shared: typeof Es = {
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
      makeOffer: "Make offer",
      counterOffer: "Counter offer"
    },
    map: {
      loading: "Loading map...",
      errorTitle: "Could not load the map.",
      reload: "Reload page"
    }
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

  contractDetail: { title: "Contract Detail", subtitle: "Full info, parties involved, and payment breakdown.", parties: "Parties Involved", financials: "Financial Terms", breakdownTitle: "Payment History", exportReport: "Export Report (CPA Ready)", labels: { lender: "Lender", borrower: "Borrower", amount: "Total Amount", term: "Term", interest: "Interest", loanType: "Loan Type", downPayment: "Down Payment / Deposit", rent: "Monthly Payment" }, table: { date: "Date", status: "Status", totalOwed: "Total", principal: "Principal", interest: "Interest", escrow: "Escrow", balance: "Remaining Balance" }, paymentStatus: { paid: "Paid", pending: "Pending", late: "Late", partial: "Partial" }, pagination: { prev: "Previous", next: "Next", page: "Page", of: "of" }, back: "Back to contracts", loading: "Loading contract details...", errorNotFound: "Contract not found.", errorAuth: "You don't have permission to view this contract.", errorFetch: "Failed to load contract", errorNetwork: "Unknown network error", months: "months", noTerms: "No terms", emptyPayments: "No payments recorded for this contract.", generateReportAlert: "Generating CSV/PDF report for CPA...", lenderFallback: "Lending Company", borrowerFallback: "Borrower", },

  errors: { code500: "Internal Error", title500: "Oops! Something went wrong", message500: "It looks like something went wrong on our end. We are working on improving our users' experience. Please try again.", tryAgain: "Try again", code404: "Error 404", title404: "Page not found", message404: "We couldn't find the page you are looking for. The link might be incorrect, or the page may no longer exist.", goHome: "Go to homepage", goBack: "Go back" },

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
    dealDetails: { title: "Deal Details", back: "Back to browse", overview: "Deal Overview", propertyDetails: "Property Details", borrowerProfile: "Borrower Profile", fundDeal: "Contact / Send Offer", arv: "Estimated Value (ARV)", rehab: "Rehab Budget", aiComps: "Comparables (RentCast API)", verifiedInvestor: "Verified Investor", identityConfirmed: "Identity confirmed", pmlRating: "PML Rating", history: "Track Record", fundingVerification: "Funding Verification", completed: "Completed", dealsCompleted: "deals completed", months: "months", postedAgo: "Posted {days} days ago", loanTypeStr: "Bridge loan", identityShielded: "Identity shielded", shieldNote: "Face, name, and entity are hidden until you submit an offer and the borrower accepts.", score: "Score", goodStanding: "Good Standing", memberSince: "Member since", identityVerified: "Identity verified", stats: { propsOwned: "Properties Owned", activePurchases: "Active Purchases/Yr", currentLoans: "Current Loans on PML", totalBorrowed: "Total Borrowed on PML", onTime: "On-Time Payments", dealsClosed: "Deals Closed on PML" }, dealDocs: "Deal docs:", docPurchase: "Purchase contract", docTitleMiss: "Title info missing", docInsMiss: "Insurance missing", unlockBar: "Submit an offer to unlock full identity.", unlockSub: "Name, face, entity, and contact visible after borrower accepts.", requestDocs: "Request docs", dealNumbers: "Deal Numbers", loanRequested: "Loan Requested", rateTerm: "Rate / Term", ltvLabel: "Loan-to-Value", ltvCap: "within 75% cap", purchasePrice: "Purchase Price", rehabBudget: "Rehab Budget", allInCost: "All-In Cost", profitArv: "Profit at ARV", titleCompany: "Title Company", insuranceCo: "Insurance Co.", mapTitle: "Property Location + Comps", mapSubj: "Subject Property", mapSales: "Sales Comps", mapRental: "Rental Comps", salesComps: "Sales Comps", rentalComps: "Rental Comps", sold: "Sold", activeListing: "Active listing", leased: "Leased", submitOffer: "Submit an Offer", formLoanAmount: "Loan Amount", formRate: "Interest Rate (%)", formTerm: "Term", formPoints: "Points", formDraw: "Draw Structure", formDrawFull: "Full at close", formDraws: "Draws", formMsg: "Message to borrower (optional)", formMsgPh: "Introduce yourself or note any conditions...", calcMoInt: "Monthly interest (IO)", calcTotalInt: "Total interest earned", btnSubmit: "Submit offer", btnDraft: "Save as draft", offerNote: "Submitting an offer unlocks the borrower's full identity and opens the messaging channel for this deal. The borrower will not see your contact info until they accept." } 
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

  affiliateDashboard: {
    title: "Affiliate Dashboard",
    subtitle: "Track your referrals, commissions, and payouts",
    refBadge: {
      label: "Your referral code",
      linkFormat: "paymyloan.ai/?ref="
    },
    stats: {
      earned: { label: "Total earned", trend: "+{amount} this month" },
      pending: { label: "Pending payout", sub: "Pays out {date}" },
      active: { label: "Active referrals", sub: "Earning monthly" },
      closed: { label: "Deals closed", sub: "All time" }
    },
    chart: {
      title: "Monthly earnings",
      sub: "Commissions from subscriptions + interest share + closing fees",
      periods: ["3M", "6M", "1Y"]
    },
    table: {
      title: "My referrals",
      filters: ["All", "Active", "Closed", "Pending"],
      cols: ["Borrower", "Property", "Loan", "Status", "Closing fee", "Monthly"],
      status: { active: "Active", closed: "Paid off", pending: "Pending close" },
      ended: "Ended"
    },
    payouts: {
      nextTitle: "Next payout — {date}",
      monthly: "Monthly commissions",
      closing: "Closing fee ({name})",
      bonus: "Bonus (5+ active referrals)",
      total: "Total payout",
      accountTitle: "Payout account",
      scheduleLabel: "Payout schedule",
      scheduleValue: "1st of each month",
      minLabel: "Minimum payout",
      allTimeLabel: "All-time paid out",
      edit: "Edit"
    },
    shareTools: {
      title: "Share tools",
      sub: "Use these links to refer borrowers to PayMyLoan.ai",
      items: [
        { label: "Referral link", val: "paymyloan.ai/?ref={code}" },
        { label: "For borrowers page", val: "paymyloan.ai/borrowers?ref={code}" },
        { label: "Post a deal direct", val: "paymyloan.ai/post?ref={code}" },
        { label: "Referral code", val: "{code}" }
      ],
      copyBtn: "Copy link",
      copyCodeBtn: "Copy code"
    },
    sidebar: {
      portalName: "Affiliate Portal",
      dashboard: "Dashboard",
      earnings: "Earnings History",
      referrals: "My Referrals",
      shareTools: "Share Tools",
      account: "Account",
      payouts: "Payouts"
    },
    comingSoon: "This section will be available soon."
  },

  profile: { title: "PML Profile", borrower: "Borrower", lender: "Lender", stats: { totalLoans: "Total Loans", onTime: "On-Time Payment Rate", totalVolume: "Total Volume", rating: "PML Rating" }, history: "Project History", emptyHistory: "No completed projects yet.", mapHistory: "Map history here..." },

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

  notifications: { title: "Notifications", empty: "No new notifications.", markRead: "Mark all as read" },
};
