import type { admin as Es } from "../es/admin";

export const admin: typeof Es = {
  dashboardAdmin: {
    title: "Admin Overview",
    subtitle: "PayMyLoan.ai · {date}",
    systemStatus: "All systems operational",
    kpi: {
      activeDeals: "Active deals",
      totalFunded: "Total funded",
      mrr: "MRR",
      pendingVerif: "Pending verif.",
      latePayments: "Late payments",
      thisWeek: "+{n} this week",
      allTime: "All time",
      thisMonth: "+${n} this month",
      awaitingReview: "Awaiting review",
      actionNeeded: "Action needed"
    },
    revenue: {
      title: "Revenue this month",
      sub: "Subscriptions + closing fees + interest share",
      subscriptions: "Subscriptions",
      closingFees: "Closing fees",
      interestShare: "Interest share",
      affiliatePayouts: "Affiliate payouts",
      netRevenue: "Net revenue"
    },
    tables: {
      activeDeals: "Active deals",
      recentSignups: "Recent signups",
      viewAll: "View all",
      viewAllUsers: "View all users",
      property: "Property",
      loan: "Loan",
      status: "Status",
      nextPayment: "Next payment",
      name: "Name",
      type: "Type",
      signedUp: "Signed up",
      verified: "Verified",
      deals: "Deals",
      revenue: "Revenue",
      pillActive: "Active",
      pillPending: "Pending close",
      pillLate: "{n} days late",
      pillClosed: "Closed"
    },
    actions: {
      title: "Needs attention",
      clearAll: "Clear all",
      today: "Today",
      items: [
        { text: "— {n} days past due. Send lender alert." },
        { text: "— lender entities awaiting review." },
        { text: "— pending close, PML fee not yet confirmed." },
        { text: "— ${n} queued for {date}. Confirm bank accounts." },
        { text: "— awaiting lender approval across {n} properties." }
      ]
    },
    nav: {
      overview: "Overview",
      allDeals: "All Deals",
      lenders: "Lenders",
      borrowers: "Borrowers",
      revenue: "Revenue",
      affiliates: "Affiliates",
      verifications: "Verifications",
      promoCodes: "Promo Codes",
      catalog: "Catalog",
      auditLogs: "Audit Logs",
      settings: "Settings"
    },
    views: {
      allDeals: { title: "All Deals", subtitle: "Complete list of active, delinquent, and closed contracts." },
      lenders: { title: "Lenders", subtitle: "Directory of investors and entities.", companies: "Companies", detailTitle: "Lender profile", close: "Close", borrowers: "Borrowers", activeContracts: "Active contracts", noCompanies: "This lender has no companies yet.", active: "Active", suspended: "Suspended", openToDeals: "Open to new deals", closedToDeals: "Not open to new deals", notFound: "Lender not found (it may have been deleted)." },
      borrowers: { title: "Borrowers", subtitle: "Client directory and verification status." },
      revenue: { title: "Revenue", subtitle: "Billing metrics and payouts." },
      affiliates: { title: "Affiliates", subtitle: "Referral management and affiliate payouts." },
      verifications: { title: "Verifications", subtitle: "Pending identity and entity requests." },
      promoCodes: { title: "Promo Codes", subtitle: "Discount and coupon management." },
      catalog: { title: "Catalog", subtitle: "Manage products, subscriptions, and coupons." },
      auditLogs: { title: "Audit Logs", subtitle: "Complete history of system actions and events." },
      settings: { title: "Settings", subtitle: "Global platform settings." },
      placeholder: { subtitle: "This view will be available soon." }
    },
    loading: "Loading panel...",
    errorAuth: "Invalid session.",
    errorFetch: "Failed to load admin data.",
    errorNetwork: "Network error"
  },

  adminUsersList: { title: "System Users", subtitle: "Directory of administrators, lenders, and borrowers.", table: { name: "Name", type: "Type", email: "Email", phone: "Phone", role: "Role", status: "Status", actions: "Actions", signedUp: "Signed up" }, back: "Back to dashboard", addUserBtn: "Add User", loading: "Loading users...", empty: "No users registered.", errorAuth: "You don't have admin permissions or your session expired.", errorFetch: "Error fetching users.", errorNetwork: "Unknown network error", active: "Active", inactive: "Inactive", na: "N/A", activate: "Activate", deactivate: "Deactivate", errorTwoFactor: "You must enable two-factor authentication (2FA) on your account to perform this action.", tempPwTitle: "Account activated", tempPwDesc: "Temporary password for", tempPwEmailSent: "It was also sent by email. Copy it now: it won't be shown again.", tempPwEmailFailed: "The email could not be sent. Copy and share it now: it won't be shown again.", close: "Got it", edit: "Edit", editTitle: "Edit user", save: "Save", cancel: "Cancel", phoneHint: "Exactly 10 digits. Leave empty to keep it unchanged.", errorEmailTaken: "This email is already used by another user.", delete: "Delete", deleteConfirm: "Delete {name}? They will no longer appear in listings or be able to sign in. Their history (loans, documents, audit) is kept.", allRoles: "All roles", roles: { ADMIN: "Administrator", LENDER: "Lender", BORROWER: "Borrower", BOOKKEEPER: "Bookkeeper", INSURANCE_COMPANY: "Insurance company" } },

  adminAddUser: { title: "Create User", subtitle: "Register an admin, bookkeeper, or insurance company. Lenders and borrowers sign up on their own.", roleLabel: "Platform Role", roles: { admin: "Administrator", bookkeeper: "Bookkeeper", insurance: "Insurance company" }, nameLabel: "Full Name", namePh: "E.g. Jane Doe", emailLabel: "Email Address", emailPh: "email@example.com", phoneLabel: "Phone Number", phonePh: "E.g. 555 123 4567", submit: "Register account", back: "Back to dashboard", submitting: "Registering...", phoneHint: "Must be exactly 10 digits (optional).", errorFetch: "Failed to create user.", errorNetwork: "Unknown network error", successTitle: "User created successfully!", successDesc1: "An account has been registered for", successTempPw: "Temporary password generated:", successCreateAnother: "Create another", successViewList: "View list" },

  auditLogs: { searchPlaceholder: "Search by action or description...", allRoles: "All Roles", system: "System / Webhooks", admins: "Administrators", lenders: "Lenders", borrowers: "Borrowers", totalRecords: "Total records:", dateHour: "Date / Time", actor: "Actor", action: "Action", description: "Event Description", noRecords: "No audit records found.", page: "Page", of: "of", prev: "Previous", next: "Next" },

  catalog: {
    title: "Product catalog",
    createBtn: "Create product",
    tabs: ["All products", "Features", "Coupons", "Promo codes", "Affiliate offers", "Pricing tables"],
    filters: { all: "All", active: "Active", archived: "Archived", search: "Search products...", filterBtn: "1 filter" },
    table: {
      name: "Name", updated: "Updated", category: "Category", pricing: "Pricing", created: "Created", status: "Status"
    },
    pagination: { showing: "1 - 8 of 8 results" }
  },
};
