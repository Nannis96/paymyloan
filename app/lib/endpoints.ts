// app/lib/endpoints.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Exportamos todas las rutas de la API de forma centralizada.
// Para rutas dinamicas usamos funciones que reciben los IDs.
export const API_ROUTES = {
  auth: {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    login2fa: `${BASE_URL}/api/auth/login/2fa`,
    refresh: `${BASE_URL}/api/auth/refresh`,
    logout: `${BASE_URL}/api/auth/logout`,
    logoutAll: `${BASE_URL}/api/auth/logout-all`,
    me: `${BASE_URL}/api/auth/me`,
    passwordForgot: `${BASE_URL}/api/auth/password/forgot`,
    passwordReset: `${BASE_URL}/api/auth/password/reset`,
  },
  users: {
    base: `${BASE_URL}/api/users`,
    byId: (id: string) => `${BASE_URL}/api/users/${id}`,
    activate: (id: string) => `${BASE_URL}/api/admin/users/${id}/activate`,
    deactivate: (id: string) => `${BASE_URL}/api/admin/users/${id}/deactivate`,
  },
  lenders: {
    adminBase: `${BASE_URL}/api/admin/lenders`,
    adminById: (id: string) => `${BASE_URL}/api/admin/lenders/${id}`,
    adminCompanies: (id: string) => `${BASE_URL}/api/admin/lenders/${id}/companies`,
    adminCompanyById: (id: string, companyId: string) => `${BASE_URL}/api/admin/lenders/${id}/companies/${companyId}`,
    me: `${BASE_URL}/api/lenders/me`,
    meCompanies: `${BASE_URL}/api/lenders/me/companies`,
    meCompanyById: (companyId: string) => `${BASE_URL}/api/lenders/me/companies/${companyId}`,
    meBorrowers: `${BASE_URL}/api/lenders/me/borrowers`,
    meBorrowerById: (id: string) => `${BASE_URL}/api/lenders/me/borrowers/${id}`,
  },
  borrowers: {
    me: `${BASE_URL}/api/borrowers/me`,
    mePassword: `${BASE_URL}/api/borrowers/me/password`,
    meLoanRequests: `${BASE_URL}/api/borrowers/me/loan-requests`,
    meLoanRequestById: (id: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}`,
    publishLoanRequest: (id: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}/publish`,
    withdrawLoanRequest: (id: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}/withdraw`,
    loanRequestTargets: (id: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}/targets`,
    loanRequestQuotes: (id: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}/quotes`,
    selectQuote: (id: string, quoteId: string) => `${BASE_URL}/api/borrowers/me/loan-requests/${id}/quotes/${quoteId}/select`,
  },
  contracts: {
    base: `${BASE_URL}/api/contracts`,
    byId: (id: string) => `${BASE_URL}/api/contracts/${id}`,
    cancel: (id: string) => `${BASE_URL}/api/contracts/${id}/cancel`,
    borrowers: (id: string) => `${BASE_URL}/api/contracts/${id}/borrowers`,
    borrowerById: (id: string, borrowerId: string) => `${BASE_URL}/api/contracts/${id}/borrowers/${borrowerId}`,
    terms: (id: string) => `${BASE_URL}/api/contracts/${id}/terms`,
    proposeTerms: (id: string) => `${BASE_URL}/api/contracts/${id}/terms/propose`,
    submitTerms: (id: string, termsId: string) => `${BASE_URL}/api/contracts/${id}/terms/${termsId}/submit`,
    acceptTerms: (id: string, termsId: string) => `${BASE_URL}/api/contracts/${id}/terms/${termsId}/accept`,
    rejectTerms: (id: string, termsId: string) => `${BASE_URL}/api/contracts/${id}/terms/${termsId}/reject`,
    fees: (id: string, termsId: string) => `${BASE_URL}/api/contracts/${id}/terms/${termsId}/fees`,
    schedule: (id: string) => `${BASE_URL}/api/contracts/${id}/schedule`,
    balance: (id: string) => `${BASE_URL}/api/contracts/${id}/balance`,
  },
  marketplace: {
    loanRequests: `${BASE_URL}/api/marketplace/loan-requests`,
    loanRequestById: (id: string) => `${BASE_URL}/api/marketplace/loan-requests/${id}`,
    quotes: (id: string) => `${BASE_URL}/api/marketplace/loan-requests/${id}/quotes`,
  },
};