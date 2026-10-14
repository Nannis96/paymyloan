import type { landing as Es } from "../es/landing";

export const landing: typeof Es = {
  prototype: {

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

    modes: { lender: "Have Funds", borrower: " Need Funding" },
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
  },

  welcomeModal: { brand: "PayMyLoan", brandSuffix: ".ai", tagline: "Private money lending — simplified.", question: "How can we help you today?", lender: { icon: " ", title: "Have Funds to Deploy?", sub: "I want to fund real estate deals" }, borrower: { icon: " ", title: "Want a Deal Funded?", sub: "I need capital for my next deal" }, signin: { icon: "🔑", title: "User Sign In", sub: "Access your portal" } },

  nav: { skip: "Skip to the sign-up form", brand: "PayMyLoan", brandSuffix: ".ai", links: [ { href: "#como-funciona", label: "How it works" }, { href: "#costo", label: "Platform cost" }, { href: "#seguridad", label: "Security" }, ], features: "Features", howItWorks: "How it works", login: "Log in", logout: "Log out", notifications: "Notifications",cta: "Log in", themeToggle: "Switch theme", langToggle: "Switch language", backToDashboard: "Back to dashboard", },

  landingNav: { lenders: "For Lenders", borrowers: "For Borrowers", why: "Why PML", demo: "Demo", affiliates: "Affiliates", signIn: "Sign in", getStarted: "Get started free" },

  hero: { eyebrow: "Private loan servicing", title: "One balance both sides trust.", deck: "PayMyLoan.ai services private real-estate-secured loans: the borrower pays by ACH, the lender sees exactly what was paid and on which property, and both work from the same terms, documents and balance.", points: [ "ACH payments: 0.8%, capped at $5.00 per transaction", "Terms accepted by both parties, with date, time and IP", "Two-factor authentication required for lenders", ], trustLabel: "Operated by", trust: [ "Dueño a Dueño LLC", "Payments processed by Stripe", "ACH Direct Debit", ], },

  pmlHero: { badge: "AI-Powered Loan Management", subtitle: "PML — Private Money Lender. PayMyLoan.ai. Both sides of the deal.", title1: "From pitch", title2: "to payoff.", title3: "One platform.", by: "by PayMyLoan.ai", desc: "The pitch. The loan request. The commitment. Payment processing. The payoff. All in one place — for borrowers and lenders alike.", cta1: "Get Early Access", cta2: "See how it works", },

  whoItHelps: { eyebrow: "Who It Helps", title1: "One platform.", title2: "Six problems solved.", lead: "PML takes the chaos out of private lending — giving borrowers clarity and lenders control, so every deal closes clean.", cards: [ { role: "Borrower", icon: " ", title: "From pitch to payoff in one place", points: [ "All loans in one dashboard", "Generate pitches & commitment letters", "Automated payments — never miss again", "Instant payoffs & PML rating" ] }, { role: "Lender", icon: " ", title: "Know who paid, what's owed, what's next", points: [ "Payment tracking across all borrowers", "Vet borrowers before committing capital", "Generate commitment letters & payoffs", "Control visibility in the marketplace" ] }, { role: "Bookkeeper", icon: " ", title: "Clean records, zero chasing", points: [ "Principal vs. interest split on every payment", "Every loan tied to a property", "Exportable records — no manual entry", "No more monthly emails asking for details" ] }, { role: "CPA", icon: " ", title: "Year-end ready — one click", points: [ "Interest income/expense clearly separated", "Every loan documented by property", "Full year report — exportable instantly", "No digging through emails for records" ] }, { role: "Title Company", icon: " ", title: "Payoffs before closing day — not after", points: [ "Instant payoff statements sent directly", "Both parties confirmed on same number", "No last-minute scrambles at the table", "Clean closing every time" ] }, { role: "Insurance Company", icon: " ", title: "Mortgagee clause — accurate every time", points: [ "Lender info pulled from PML profile", "Mortgagee clause always up to date", "No manual requests for lender details", "Every property, every loan, documented" ] } ], stats: [ { value: "< 30s", label: "Payoff generated" }, { value: "2", label: "Sides. One platform." }, { value: "0", label: "Spreadsheets needed" }, { value: "100%", label: "CPA-ready at year end" } ] },

  beforeAfter: { eyebrow: "Before vs After", title: "Two investors. Same business. Different tools.", before: { badge: "Without PML", icon: " ", items: [ "Borrower: no idea who to call to get a quick answer from the lender", "Borrower: loans scattered across 3 banks, 2 private lenders, and a spreadsheet", "Borrower: bookkeeper hounding you every month to explain which loan is which", "Lender: no idea who paid, how much, or when — until something goes wrong", "Lender: closing day scramble to calculate the payoff while title is waiting" ] }, after: { badge: "With PML", icon: " ", items: [ "Borrower: all loans in one place — every balance, every payment, every property", "Borrower: send your pitch + commitment letter to a lender in minutes", "Borrower: payoff generated instantly — no waiting, no back-and-forth", "Lender: know exactly who paid, what amount, and when — in real time", "Lender: interest tracking and payment history handed directly to your bookkeeper" ] } },

  soundFamiliar: { eyebrow: "Sound familiar?", title: "Private money lending runs on chaos. It doesn't have to.", cards: [ { role: "Borrower", icon: "", title: "“Building a pitch takes forever.”", desc: "Formatting a deal summary, loan request, and commitment letter for each lender is hours of manual work. PML generates all of it in minutes." }, { role: "Borrower", icon: "", title: "“The commitment letter is somewhere in my email.”", desc: "Commitment letters get buried in threads, unsigned, or lost. PML keeps every commitment tied to the loan from day one." }, { role: "Borrower", icon: "💳", title: "“Payment processing is a mess.”", desc: "Manual wires, Zelle, checks — no consistent system. PML centralizes payment processing so every transaction is tracked and confirmed." }, { role: "Lender", icon: "", title: "“Where's the borrower application?”", desc: "Lenders need a standardized application from every borrower before committing. PML gives borrowers a built-in application that feeds directly to the lender." }, { role: "Lender", icon: "", title: "“I need to verify who I'm lending to.”", desc: "Entity lookup, background check, credit history — lenders are putting up real capital and need to vet borrowers before signing. PML centralizes that due diligence in one place." }, { role: "Lender", icon: "", title: "“I don't have consistent deal flow.”", desc: "Lenders with capital sitting idle need qualified borrowers to find them. PML's marketplace connects lenders with vetted deal flow automatically." }, { role: "Lender", icon: "", title: "“My bookkeeper needs the interest breakdown — again.”", desc: "PML tracks principal vs. interest on every payment and exports clean reports your bookkeeper can actually use." }, { role: "Borrower", icon: "", title: "“I forgot to make the payment.”", desc: "Manual wires get missed. Late payments damage lender relationships and can trigger default clauses. PML automates payments so nothing slips." } ], solution: { icon: "", title: "PML fixes both sides.", desc: "One platform. Borrowers get clarity, speed, and organization. Lenders get payment tracking, interest records, and instant payoffs. Built for private money." } },

  liveActivity: { eyebrow: "Live Activity", title1: "The private money market,", title2: "in real time.", desc: "Every loan request, every active deal, every closed transaction — tracked on PML.", stats: { requested: { label: "Loans Requested", value: "47", desc: "Active loan requests in marketplace", live: "LIVE" }, current: { label: "Loans Current", value: "312", desc: "Loans actively being serviced", metric: "$48.2M total outstanding" }, closed: { label: "Loans Closed", value: "1,204", desc: "Total deals completed on PML", metric: "$187.4M total funded ✓" } }, map: { title: "Deal Activity — United States", legendRequested: "Requested", legendCurrent: "Current", legendClosed: "Closed" } },

  comingSoon: { eyebrow: "Coming Soon", title1: "The Private Money ", title2: "Marketplace.", desc: "Where borrowers with deals connect directly with lenders who have capital ready to deploy. Inside PML, borrowers can generate a pitch deck, create a commitment letter, and get funded — all in one place.", card1: { eyebrow: "For Lenders", title: "Browse Borrowers Looking for Capital", desc: "See a live feed of borrowers actively seeking funds. View each borrower's PML profile — loans history, payment track record, total borrowed — before committing a dollar.", points: [ "Browse active loan requests with full deal details", "View each borrower's PML Rating + full profile before committing", "Send term sheets directly inside the platform", "Build your lender profile — deals funded, capital deployed, response time, rating" ] }, card2: { eyebrow: "PML Profiles", title: "Both Sides Build Credibility.", desc: "Borrowers and lenders each earn a public PML profile based on their real track record on the platform.", borrowerLabel: "Borrower Profile", borrowerStats: [ { label: "Total Loans", value: "14" }, { label: "On-Time Payment Rate", value: "97%" }, { label: "Total Borrowed", value: "$2.4M" }, { label: "PML Borrower Rating", value: "A+" } ], lenderLabel: "Lender Profile", lenderStats: [ { label: "Deals Funded", value: "31" }, { label: "Total Capital Deployed", value: "$4.1M" }, { label: "Avg. Response Time", value: "< 24hrs" }, { label: "PML Lender Rating", value: "A+" } ] } },

  featuresGrid: { eyebrow: "What you get", title: "Everything to run private loans cleanly.", items: [ { label: "01 — BORROWER", title: "All Loans in One Place", desc: "Every private loan, every property, every balance — one dashboard. No more hunting across emails and spreadsheets." }, { label: "02 — BORROWER", title: "Instant Payoff Statements", desc: "Generate a payoff accurate to the day in seconds. Send it straight to title. No waiting on your lender." }, { label: "03 — BORROWER", title: "Pitch Deck Generator", desc: "Fill out your deal inside PML and instantly generate a professional pitch to send to lenders — property details, loan request, terms, and financials all formatted automatically." }, { label: "04 — LENDER", title: "Payment Tracking", desc: "Know exactly who paid, how much, and when. Every borrower. Every loan. Always current." }, { label: "05 — LENDER", title: "Interest Tracking for Bookkeepers", desc: "Principal vs. interest split on every payment — clean, exportable, and ready for your bookkeeper or CPA." }, { label: "06 — BOTH", title: "Same Numbers, Both Sides", desc: "Borrower and lender log in and see the same live data. No disputes. No surprises at closing. Ever." } ] },

  dashboardSplit: { eyebrow: "Dashboard", title: "Both sides see the same truth.", desc1: "Borrowers and lenders each get a private login with live loan data. What you owe, what you're owed — always in sync.", desc2: 'No more calls asking "what\'s my balance?" No more disputes at closing. Everyone looks at the same number.', mockLogo: "PML.ai", mockBadge: "● Live", mockCard1Label: "Total Payoff — Good Through Aug 31", mockCard1Value: "$292,955.54", mockCard1Sub: "↓ $95.34/day after Aug 31", mockCard2Label: "Principal", mockCard2Value: "$290,000", mockCard3Label: "Accrued Interest", mockCard3Value: "$2,955.54", },

  profilesDirectory: { eyebrow: "Profiles & Directory", title1: "Your reputation ", title2: "follows you.", desc: "Every deal, every payment, every loan builds your PML profile. Borrowers find lenders. Lenders vet borrowers. Both sides know exactly who they're dealing with.", borrower: { badge: "Borrower Profile", name: "Liam Brown", location: "Memphis, TN · Real Estate Investor", stat1Label: "Total Loans", stat1Value: "14", stat2Label: "On-Time Payment Rate", stat2Value: "97%", stat3Label: "PML Borrower Rating", stat3Value: "A+" }, lender: { badge: "Lender Directory", title: "Find a Lender", subtitle: "Search lenders actively doing private loans", lender1Name: "NextGen Growth LLC", lender1Desc: "Memphis, TN · Up to $500K · 10–13%", lender1Deals: "31 deals", lender2Name: "Private Capital Group", lender2Desc: "Nashville, TN · Up to $1M · 10–12%", lender2Deals: "18 deals", lender3Name: "Southland Lending LLC", lender3Desc: "Birmingham, AL · Up to $300K · 11–14%", lender3Deals: "9 deals" } },

  pmlCta: { title1: "Your loans,", title2: "organized.", brand: "PML", brandSuffix: " — PayMyLoan.ai", desc: "Join the early access list. Be first when we launch." },

  pmlFooter: { by: "by PayMyLoan.ai", rights: "PML / PayMyLoan.ai — Private Lending, Finally Organized." },

  how: { eyebrow: "Getting started", title: "Four steps to the first payment schedule.", steps: [ { title: "Create your account", body: "Either party sets up the loan and captures the property held as collateral: address, type and, if you have it, the parcel number.", }, { title: "Invite the other party", body: "A single-use access link goes out by email. Whoever receives it sets a password and lands directly on the loan.", }, { title: "Both accept the terms", body: "The counterparty reviews amount, rate, term and maturity. They accept, or decline with a comment. Each acceptance is recorded with date, time and IP.", }, { title: "The loan goes active", body: "With both acceptances the payment schedule is generated and both sides see the same balance from their dashboard.", }, ], },

  security: { eyebrow: "Security", title: "Third-party money moves here. Access is treated accordingly.", items: [ { title: "Two-factor authentication required", body: "For lenders it is not optional: they control where the money goes.", }, { title: "Permissions per loan, not per global role", body: "Every query is filtered by your participation in that loan. No role opens everything.", }, { title: "We never store bank account numbers", body: "Stripe holds the payment method. We hold its identifier and the last four digits.", }, { title: "An audit log of the events that matter", body: "Term changes, acceptances, payoff approvals, bank account changes and document downloads are all recorded.", }, { title: "Alerts on any banking change", body: "Both parties are notified. It is the classic fraud vector in servicing and it is treated as one.", }, { title: "Documents private per loan", body: "Promissory note, deed of trust and settlement statement are served with short-lived links, never a public URL.", }, ], },

  footer: { tagline: "Servicing for private real-estate-secured loans.", entity: "A subsidiary of Dueño a Dueño LLC", links: [ { href: "#", label: "Terms of service" }, { href: "/aviso-de-privacidad", label: "Privacy notice" }, ], linksNote: "Terms of service: [COPY PENDING]", rights: "All rights reserved.", },

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
            },
            messaging: {
              title: "Messages",
              dealThreads: "Deal threads",
              activeThread: "Active thread",
              status: "Status: Pre-closing",
              inputPlaceholder: "Message...",
              send: "Send",
              warningNote: "Phone numbers and email addresses typed in this chat are blocked. All contact stays inside the platform. | Supported attachments: images, PDFs, documents.",
              blockedMsg: "Message blocked — contains contact information. All communication must stay within the platform.",
              justNow: "Just now",
              view: "View",
              offerAccepted: "Offer accepted",
              achAuth: "ACH authorization completed",
              readyToClose: "Borrower notified lender — ready to close"
            },
            missedPayment: {
              title: "Missed Payment",
              subtitle: "3802 University Cove · Loan #PML-2026-09-22-3802UCOVE",
              scoreBanner: {
                title: "This missed payment is being recorded on your PML borrower score",
                desc: "Every missed or late payment is permanently logged and factored into your overall PML borrower score. Lenders can see your payment history before deciding to fund your deals. Paying immediately minimizes the impact — the longer it goes unpaid, the greater the score reduction.",
                currentScore: "Current score",
                projectedDrop: "-18 pts projected if unpaid"
              },
              viewToggle: {
                borrower: "Borrower view",
                lender: "Lender view"
              },
              alert: {
                title: "Payment overdue — 15 days past due",
                sub: "Your November 1 payment was not received. A late fee has been added. Please pay immediately to avoid default notice being sent to your lender."
              },
              paymentCard: {
                title: "Amount due now",
                monthly: "Monthly payment (November 1)",
                lateFee: "Late fee (15 days @ 5% of payment)",
                perDiem: "Per diem accruing",
                total: "Total due today"
              },
              actionCard: {
                title: "Pay now to stop the clock",
                sub: "Late fees stop accruing the day payment is received. Your lender has not yet been notified of default.",
                payBtn: "Pay $1,207.50 now",
                contactBtn: "Contact lender to discuss"
              },
              timeline: {
                title: "Payment timeline",
                events: [
                  { title: "Payment due", date: "November 1, 2026", desc: "$1,150 was due. No payment received." },
                  { title: "Grace period ended — late fee applied", date: "November 6, 2026 (5 days)", desc: "5-day grace period expired. $57.50 late fee added to balance." },
                  { title: "Currently 15 days past due", date: "November 16, 2026", desc: "Lender has been notified. Pay immediately to prevent default notice." },
                  { title: "Day 30 — formal default notice", date: "December 1, 2026 (if unpaid)", desc: "PML sends formal default notice. Lender may begin collection or foreclosure proceedings." }
                ]
              },
              lenderAction: {
                title: "Lender options — borrower is 15 days past due",
                options: [
                  { title: "Send a payment reminder", desc: "Notify borrower via PML messaging — friendly reminder before escalating." },
                  { title: "Offer a payment extension", desc: "Agree to waive the late fee and extend due date — borrower must accept in platform." },
                  { title: "Issue formal default notice", desc: "Trigger the 30-day default clock. PML generates and sends the notice." }
                ]
              }
            },
            inviteFlow: {
              header: {
                label: "Version 1.0 Feature",
                title: "Direct Invite System",
                sub: "Bring your own lender or borrower — skip the marketplace, keep the infrastructure. Three views: Lender invite widget, borrower deal-posting invite field, and the co-branded landing page invite links resolve to."
              },
              view1: {
                label: "View 1",
                title: "Lender Dashboard — Invite a Borrower",
                widgetTitle: "Invite a borrower",
                widgetSub: "Have a borrower ready to fund? Send them your personal invite link. Their deal goes straight to you — no browsing, no competition.",
                linkTitle: "Your invite link",
                copyBtn: "Copy link",
                orDivider: "or send by email",
                sendBtn: "Send invite",
                inputHint: "They'll get an email from PML with your name and a direct link to post their first deal.",
                stats: { sent: "Invites sent", signedUp: "Signed up", posted: "Deal posted", funded: "Funded" },
                feeTitle: "How fees work for invited deals",
                feeBody1: "When you bring your own borrower, ",
                feeBody1Highlight: "PML didn't make the introduction",
                feeBody1Cont: " — so the connection fee doesn't apply.",
                feeBody2Highlight: "What still applies:",
                feeBody2Cont: " Borrower pays the $99/month subscription. That's it. No 1% lender connection fee. No 10% of monthly interest.",
                feeBody3Highlight: "The deal is tagged",
                borrowerReceivesTitle: "What your borrower receives",
                borrowerReceivesBody: "An email from PayMyLoan.ai:\n\nSubject: John Smith is waiting to fund your next deal\n\n\"Hi — John Smith, a private lender on PayMyLoan, has a deal reserved for you. Post your property in under 10 minutes and John can fund it without competing with anyone else.\"\n\nCTA: Post my deal → lands on co-branded signup page pre-tagged to John's account"
              },
              view2: {
                label: "View 2",
                title: "Deal Posting — Borrower Invites a Lender",
                stepTitle: "Step 4 of 5 — Funding",
                stepSub: "Tell us how you want to find your lender.",
                amountLabel: "Loan amount requested",
                termLabel: "Preferred term",
                haveLenderLabel: "Already have a lender?",
                optionalTag: "Optional",
                haveLenderHint: "Enter their email and we'll send them a direct invite to fund this deal — no marketplace browsing, no competition.",
                inviteBtn: "Invite lender",
                lenderFoundName: "James Rivera — Rivera Capital",
                lenderFoundSub: "Invite sent · Will be notified when you publish",
                removeBtn: "Remove",
                feeTitle: "Bringing your own lender saves money",
                feeBody1: "Since PML isn't making the introduction, ",
                feeBody1Highlight: "no connection fee applies",
                feeBody1Cont: ". You pay the $99/month subscription only. The 10% of monthly interest and 1% lender fee are waived for invited deals.",
                lenderReceivesTitle: "What your lender receives",
                lenderReceivesBody: "An email from PayMyLoan.ai:\n\nSubject: Marcus Johnson has a deal ready for you\n\n\"Hi — Marcus Johnson, a borrower you know, has posted a deal on PayMyLoan and wants you to fund it. You can review the full deal, make an offer, and close — all in one place.\"\n\nCTA: View Marcus's deal → lender lands directly on the deal card, pre-tagged to Marcus's account",
                noFundTitle: "What happens if the lender doesn't fund?",
                noFundBody: "If your invited lender doesn't make an offer within 7 days, you can choose to:\n\nOption A: Open the deal to the marketplace (standard fee structure applies)\n\nOption B: Send another invite to a different lender\n\nOption C: Keep the deal private and follow up yourself"
              },
              view3: {
                label: "View 3",
                title: "Co-Branded Landing Page — What invite links resolve to",
                heroInviter: "is waiting to fund your next deal",
                heroEyebrow: "PayMyLoan.ai — Private Lending Infrastructure",
                heroTitle1: "Post your deal.",
                heroTitle2: "John funds it.",
                heroTitle3: " Fast.",
                heroSub: "John Smith has a deal reserved for you on PayMyLoan. Post your property in under 10 minutes — no competing offers, no waiting.",
                heroBtn: "Post my deal — it's free",
                heroFine: "No credit card. Borrower subscription starts when you publish.",
                signupTag: "Invited by John Smith · Rivera Capital",
                signupTitle: "Create your account",
                signupSub: "60 seconds. No credit card. Start posting your deal.",
                firstName: "First name",
                lastName: "Last name",
                email: "Email address",
                phone: "Cell phone",
                password: "Password",
                signupBtn: "Create account and post my deal",
                signupFine: "By creating an account you agree to our Terms of Service and Privacy Policy. John Smith will be notified when your deal is live."
              },
              feeTable: {
                title: "Fee Logic — Direct Invite vs Platform Match",
                sub: "The deal is tagged at creation. The fee engine reads the tag automatically — no manual override needed.",
                headers: ["Fee", "Platform Match", "PML introduced them", "Direct Invite", "They knew each other", "Notes"],
                rows: [
                  { fee: "$99/month subscription", match: "Yes", invite: "Yes", notes: "Always — borrower pays for infrastructure regardless" },
                  { fee: "$99 identity verification", match: "If lender requires", invite: "If lender requires", notes: "Lender decides whether to require it — their choice on both flows" },
                  { fee: "1% lender connection fee", match: "Yes — at closing", invite: "Waived", notes: "PML only earns this when PML made the introduction" },
                  { fee: "10% of monthly interest", match: "Yes — ongoing", invite: "Waived", notes: "Same logic — no matchmaking, no matchmaking fee" }
                ],
                specTitle: "Developer Spec — Deal Source Tag",
                specs: [
                  { key: "Field", val: "deal.source" },
                  { key: "Values", val: "platform_match · lender_invite · borrower_invite" },
                  { key: "Set at", val: "Deal creation — auto-tagged from invite link or borrower email field. Default = platform_match" },
                  { key: "Reads from", val: "Fee engine reads deal.source before calculating any connection or interest fees" },
                  { key: "Invite link format", val: "paymyloan.ai/invite/[username]-[token] — passes inviter_id as URL param" },
                  { key: "Invite email field", val: "Borrower enters lender email at deal-posting step → PML sends invite email → if lender signs up and funds = tagged borrower_invite" },
                  { key: "Fallback rule", val: "If invited lender doesn't fund within 7 days and borrower opens to marketplace → source re-tags to platform_match and standard fee structure applies" }
                ]
              }
            },
            extensionRequest: {
              title: "Request Loan Extension",
              subtitle: "{address} · Loan matures {date}",
              maturityBanner: {
                title: "Maturity in 60 days — {date}",
                sub: "If you need more time to sell or refinance, request an extension now. Your lender must approve it. Both parties sign an amended maturity date."
              },
              loanCard: {
                title: "Current loan summary",
                property: "Property",
                lender: "Lender",
                balance: "Balance",
                rate: "Rate",
                currentMaturity: "Current maturity",
                monthlyPayment: "Monthly payment"
              },
              requestCard: {
                title: "How long do you need?",
                sub: "Select an extension period. The lender may approve, counter, or decline. Extension fees are negotiated directly with your lender — PML facilitates the agreement.",
                termDisplay: {
                  termLabel: "Extension term",
                  termNote: "Same as original loan term",
                  rate: "Rate",
                  monthly: "Monthly payment",
                  newMaturity: "New maturity"
                },
                reasonLabel: "Reason for extension request",
                reasonPh: "Explain your situation — e.g. refinance is in progress, buyer is under contract but closing delayed, still rehabbing...",
                noteBox: "Once you submit, your lender will receive a notification and can approve, counter, or decline within the platform. If approved, both parties e-sign an amended maturity agreement and fees are collected at extension closing.",
                feeSummary: {
                  newMaturity: "New maturity date",
                  addMonths: "Additional months",
                  monthlyContinues: "Monthly payment (continues)"
                },
                extFeeBox: {
                  sectionTitle: "Extension fees — due at extension closing",
                  title: "Fee breakdown",
                  pmlFee: "PML platform fee (1% of loan balance)",
                  pmlFeeNote: "Collected via settlement statement at extension closing",
                  lenderFee: "Lender extension fee (set by lender)",
                  lenderFeeNote: "1 pt suggested · negotiated with lender · paid at extension closing",
                  achFee: "ACH / wire processing fee",
                  achFeeNote: "Paid by borrower",
                  totalLabel: "Total estimated fees at extension closing"
                },
                feeNoteBox: "All extension fees are paid by the borrower. PML's 1% fee is collected via the settlement statement at extension closing — same process as the original loan. Lender extension fees are set by the lender and may vary. Final amounts confirmed when lender approves the extension.",
                esign: {
                  title: "Authorization + e-signature required",
                  checks: [
                    "I request a 12-month extension of my loan at the same rate (11.5%), same monthly payment ($1,104.17), and same terms as the original agreement.",
                    "I authorize PayMyLoan, LLC to collect the PML platform fee of $1,150.00 via ACH automatically upon lender approval — no further action required from me.",
                    "I understand the lender extension fee of $1,150.00 (1 pt) and ACH fee of $25.00 will also be collected at extension closing via settlement statement or ACH as applicable.",
                    "I understand that once the lender approves this request, a new 12-month payment schedule will be automatically generated starting from the new maturity date of September 22, 2028.",
                    "I agree that failure to pay under the extended term will be recorded on my PML borrower score."
                  ],
                  sigLabel: "Type your full legal name to sign",
                  sigPh: "E.g. Marcus Johnson",
                  dateLabel: "Date",
                  note: "By typing your name above and clicking Submit, you are electronically signing this extension request and fee authorization in accordance with the E-SIGN Act and UETA. This is a legally binding authorization."
                },
                submitBtn: "Sign and send extension request to lender",
                submitting: "Submitting..."
              }
            },
            drawRequest: {
              title: "Draw Request",
              subtitle: "Request a rehab draw from your lender",
              versionBadge: "Version 1.0 — Manual Draw Process",
              notice: {
                title: "How draws work in Version 1.0",
                body: "Contact your lender directly to request a draw — by phone, text, or email. Once your lender approves and wires the funds, log the draw here so your loan balance stays accurate.<br><br>Full automated draw management (photo uploads, stage checklists, one-click approval, ACH disbursement) is coming in a future version."
              },
              summary: {
                subtitle: "Active bridge loan — draw tracking",
                drawsUsed: "Draws used",
                drawsRemaining: "Draws remaining",
                holdbackReleased: "Holdback released",
                holdbackRemaining: "Holdback remaining",
                lender: "Lender",
                lenderContact: "Lender contact",
                loanBalance: "Loan balance",
                totalHoldback: "Total rehab holdback",
                maxDraws: "Max draws allowed"
              },
              form: {
                title: "Log a completed draw",
                sub: "Already spoke with your lender and received funds? Log it here to keep your balance current.",
                drawNum: "Draw number",
                amount: "Amount received ($)",
                date: "Date received",
                approvedVia: "Lender approved via",
                workCompleted: "Work completed (brief description)",
                cancel: "Cancel",
                submit: "Log draw",
                submitting: "Logging...",
                optionsApproved: ["Phone call", "Text message", "Email", "In person"],
                phAmount: "e.g. 5000",
                phWork: "e.g. Completed framing, rough plumbing, and electrical rough-in throughout main floor."
              },
              history: {
                title: "Draw history",
                logged: "Logged",
                pending: "Pending",
                notRequested: "Not yet requested"
              },
              contactCard: {
                title: "Need to request a draw?",
                sub: "Contact your lender directly. PML will notify them that a draw request is incoming.",
                lender: "Lender",
                email: "Email",
                phone: "Phone",
                notifyBtn: "Notify lender I need a draw",
                successAlert: "Lender notified!"
              }
            },
            closingPrep: {
              banner: {
                title: "Offer accepted — commitment letter signed",
                sub: "{lender} has committed to fund your deal at {address}. Complete the steps below so we can get to closing."
              },
              steps: ["Offer accepted", "Title & insurance", "Review & confirm", "Closing"],
              titleCard: {
                title: "Title company",
                sub: "Who is handling the closing? PML wire instructions will be sent here.",
                savedLabel: "Saved title companies",
                useDiff: "+ Use a different company",
                prefilled: "Pre-filled from your saved info. Update if anything has changed.",
                fields: {
                  name: "Title company name",
                  agent: "Closing attorney / agent",
                  phone: "Phone",
                  email: "Email",
                  emailHint: "PML wire instructions will be sent here automatically.",
                  fileNum: "File number",
                  fileHint: "Assigned by title company"
                },
                wireNote: "PML platform fee wire instructions will be sent automatically to the title company email above. The title company will include our fee on the settlement statement."
              },
              insCard: {
                title: "Insurance",
                sub: "Property insurance must be in place before closing.",
                savedLabel: "Saved insurance companies",
                useDiff: "+ Use a different company",
                fields: {
                  company: "Insurance company",
                  agent: "Agent name",
                  phone: "Agent phone",
                  email: "Agent email",
                  policy: "Policy number",
                  policyHint: "if bound",
                  coverage: "Coverage amount",
                  status: "Policy status",
                  statusOpts: ["Bound — policy is active", "Quote obtained — not yet bound", "In progress — working on it"]
                },
                rentCover: {
                  label: "Does this property need rent loss coverage?",
                  sub: "Required if the property is currently rented or will be tenant-occupied at closing.",
                  no: "No",
                  yes: "Yes",
                  note: "Let your insurance agent know rent loss coverage is required. The lender may request proof of this before closing."
                }
              },
              reviewCard: {
                title: "Confirm closing details",
                sub: "Review everything before notifying your lender.",
                blocks: {
                  deal: "Deal",
                  dealFields: { prop: "Property", lender: "Lender", amount: "Loan amount", rate: "Rate / Term" },
                  title: "Title company",
                  titleFields: { comp: "Company", agent: "Agent", phone: "Phone", email: "Email", wire: "PML wire instructions", wireVal: "Will be sent automatically" },
                  ins: "Insurance"
                },
                statuses: {
                  letter: "Commitment letter", letterVal: "✓ Signed",
                  title: "Title company confirmed", titleVal: "✓ On file",
                  ins: "Insurance confirmed",
                  wire: "PML wire instructions", wireVal: "Sending to title",
                  closing: "Closing date", closingVal: "TBD — set by title"
                },
                btn: "Notify lender — ready to close",
                btnNote: "Your lender will be notified immediately. The title company will receive PML wire instructions within minutes. Closing date will be coordinated between you, your lender, and the title company.",
                alert: "Lender notified. Title company will receive PML wire instructions shortly."
              },
              bottomBar: {
                back: "← Back",
                step1: "Step 1 of 2 — Title & insurance",
                step2: "Step 2 of 2 — Review & confirm",
                next: "Continue →",
                review: "Review"
              }
            },
            preQualification: {
              badge: "Borrower Pre-Qualification",
              steps: ["Deal Info", "Financials", "Background", "Review"],
              titles: [
                "Tell us about your deal",
                "Deal financials",
                "Your background",
                "Review and submit"
              ],
              subs: [
                "This helps lenders evaluate your request. Takes about 2 minutes.",
                "Lenders use these numbers to calculate LTV and assess the deal.",
                "A few questions about your experience and financial standing.",
                "Everything look right? Submit to get your pre-qualified badge."
              ],
              step1: {
                address: "Property address",
                addressPh: "123 Main St, Memphis, TN 38111",
                amount: "Loan amount requested",
                term: "Loan term needed",
                termSelect: "Select term",
                exit: "Exit strategy",
                exits: [
                  { title: "Sell the property", sub: "Fix and flip — sell after renovation" },
                  { title: "Refinance", sub: "Refi into long-term financing after stabilization" },
                  { title: "Owner finance / sell on terms", sub: "Sell to an end buyer using seller financing" }
                ]
              },
              step2: {
                purchasePrice: "Purchase price",
                arv: "After repair value (ARV)",
                arvHint: "Your estimated value after renovation.",
                rehab: "Rehab budget",
                downPayment: "Down payment available",
                condition: "Current property condition",
                conditionSelect: "Select condition",
                conditions: [
                  "Move-in ready — cosmetic updates only",
                  "Light rehab — paint, flooring, fixtures",
                  "Medium rehab — kitchen, baths, systems",
                  "Heavy rehab — structural, full gut"
                ]
              },
              step3: {
                experience: "How many deals have you closed?",
                expSelect: "Select experience",
                exps: ["This is my first deal", "1 - 3 deals", "4 - 10 deals", "11 - 25 deals", "25+ deals"],
                credit: "Estimated credit score range",
                creditSelect: "Select range",
                creditHint: "Self-reported. No hard pull. Does not affect your score.",
                credits: ["Below 580", "580 - 619", "620 - 659", "660 - 699", "700 - 739", "740+"],
                entity: "Do you have an active entity for this deal?",
                entitySelect: "Select",
                entities: ["Yes — LLC", "Yes — Corporation", "Yes — Land trust", "No — purchasing in personal name"],
                bankruptcy: "Any active bankruptcies or foreclosures?",
                bankSelect: "Select",
                bankruptcies: ["No", "Yes — bankruptcy (active)", "Yes — foreclosure (active)"]
              },
              step4: {
            desc: "Review your pre-qualification information. Once submitted your deal will be visible to lenders with a verified badge.",
            blocks: ["Deal", "Financials", "Background"],
            badgeTitle: "Pre-Qualified Borrower",
            badgeSub: "This badge will appear on your deal listing so lenders can see you've been verified."
          },
          buttons: {
            back: "Back",
            next: "Continue",
            submit: "Submit pre-qualification",
            submitting: "Submitting..."
          }
        },
        dealPage: {
          back: "← Back to browse",
          badges: { bridge: "Bridge loan", verified: "Verified borrower" },
          posted: "Posted Sept 18, 2026 · 3 days ago",
          cards: { numbers: "Deal numbers", details: "Deal details", borrower: "Borrower" },
          metrics: { requested: "Loan requested", price: "Purchase price", rehab: "Rehab budget", arv: "ARV", profit: "Profit (est)", ltv: "LTV" },
          details: { typeLabel: "Loan type", typeVal: "Bridge — fix & flip", termLabel: "Requested term", termVal: "12 months", rateLabel: "Max rate accepted", rateVal: "14%", propTypeLabel: "Property type", propTypeVal: "Single family residential", bedsLabel: "Beds / Baths", bedsVal: "3 bed / 2 bath", sqftLabel: "Sq ft", sqftVal: "1,450 sq ft", exitLabel: "Exit strategy", exitVal: "Sell after rehab", holdbackLabel: "Rehab holdback", holdbackVal: "Lender's discretion", closeLabel: "Closing timeline", closeVal: "30 days" },
          borrower: { memberSince: "Memphis, TN · Member since 2024", closed: "7 deals closed", bizVerified: "Business verified", idVerified: "Identity verified" },
          offer: { title: "Send an offer", sub: "Set your terms and send directly to the borrower.", maxRateLabel: "Max rate (borrower)", termLabel: "Term", makeOffer: "Make an offer", saveDeal: "Save deal", count: "1 offer already sent on this deal" }
        }
};
