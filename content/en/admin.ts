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
      lenders: { title: "Lenders", subtitle: "Directory of investors and entities." },
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

  adminUsersList: { title: "System Users", subtitle: "Directory of administrators, lenders, and borrowers.", table: { name: "Name", type: "Type", email: "Email", phone: "Phone", role: "Role", status: "Status" }, back: "Back to dashboard", addUserBtn: "Add User", loading: "Loading users...", empty: "No users registered.", errorAuth: "You don't have admin permissions or your session expired.", errorFetch: "Error fetching users.", errorNetwork: "Unknown network error", active: "Active", inactive: "Inactive", na: "N/A" },

  adminAddUser: { title: "Create User", subtitle: "Manually register an admin, lender, or borrower.", roleLabel: "Platform Role", roles: { admin: "Administrator", lender: "Lender", borrower: "Borrower" }, nameLabel: "Full Name", namePh: "E.g. Jane Doe", emailLabel: "Email Address", emailPh: "email@example.com", phoneLabel: "Phone Number", phonePh: "E.g. 555 123 4567", submit: "Register account", back: "Back to dashboard", submitting: "Registering...", phoneHint: "Must be exactly 10 digits (optional).", errorFetch: "Failed to create user.", errorNetwork: "Unknown network error", successTitle: "User created successfully!", successDesc1: "An account has been registered for", successTempPw: "Temporary password generated:", successCreateAnother: "Create another", successViewList: "View list" },

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
