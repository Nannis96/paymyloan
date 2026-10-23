// Tipos de lo que devuelve el back. Fuente: Docs/API_REFERENCE.md + prisma/schema.prisma.
// Uso: const c = await api<Contract>(API_ROUTES.contracts.byId(id));
// `api()` ya quita el sobre `{ success, data }`; aqui se tipa solo `data`.

/** Prisma `Decimal` serializa como string en el JSON. */
export type Money = string;
/** ISO 8601, ej. "2026-09-04T23:45:41.967Z". */
export type ISODate = string;

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ── Enums ────────────────────────────────────────────────────────────────
export type UserRole = "ADMIN" | "LENDER" | "BORROWER" | "BOOKKEEPER" | "INSURANCE_COMPANY";
export type ContractStatus = "DRAFT" | "PENDING_ACCEPTANCE" | "ACTIVE" | "DELINQUENT" | "PAID_OFF" | "CANCELLED";
export type ContractTermsStatus = "DRAFT" | "PENDING_ACCEPTANCE" | "ACCEPTED" | "REJECTED" | "SUPERSEDED";
export type LoanStructure = "INTEREST_ONLY" | "AMORTIZED" | "BALLOON";
export type LateFeeType = "FLAT" | "PERCENTAGE";
export type ScheduledPaymentStatus = "PENDING" | "PARTIALLY_PAID" | "PAID" | "VOIDED";
export type LoanRequestVisibility = "PUBLIC" | "PRIVATE";
export type LoanRequestStatus = "DRAFT" | "PUBLISHED" | "MATCHED" | "WITHDRAWN" | "EXPIRED" | "CONVERTED";
export type ProjectType = "RENTAL" | "FIX_AND_FLIP" | "SLOW_FLIP" | "COMMERCIAL" | "NEW_CONSTRUCTION";
export type LoanQuoteStatus = "SUBMITTED" | "WITHDRAWN" | "DECLINED" | "SELECTED" | "EXPIRED";
export type MessageSenderRole = "LENDER" | "BORROWER";
export type ReviewDirection = "LENDER_TO_BORROWER" | "BORROWER_TO_LENDER";
export type PropertyType = "SINGLE_FAMILY" | "MULTI_FAMILY" | "CONDO" | "TOWNHOUSE" | "LAND" | "COMMERCIAL" | "OTHER";

// ── Usuario / sesion (GET /auth/me) ──────────────────────────────────────
export interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  isTwoFactorEnabled: boolean;
  mustChangePassword: boolean;
  createdAt: ISODate;
  updatedAt: ISODate;
  deletedAt: ISODate | null;
}

export interface LenderCompanySummary {
  id: string;
  companyName: string;
  status?: string;
  isOpenToDeals?: boolean;
}

export interface Me {
  user: SafeUser;
  /** Roles activos; un usuario dual trae LENDER y BORROWER. */
  roles: UserRole[];
  lenderProfile?: { id: string; lenderCompanies: LenderCompanySummary[] };
  borrowerProfile?: { id: string; lenderCompanies: LenderCompanySummary[] };
}

// ── Propiedad / Contrato ─────────────────────────────────────────────────
export interface Property {
  id: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  county: string | null;
  parcelNumber: string | null;
  propertyType: PropertyType;
  lenderCompanyId: string | null;
  estimatedMarketValue: Money | null;
  afterRepairValue: Money | null;
}

export interface ContractTerms {
  id: string;
  versionNumber: number;
  status: ContractTermsStatus;
  structure: LoanStructure;
  principalAmount: Money;
  interestRate: Money;
  amortizationTermMonths?: number;
  firstPaymentDate?: ISODate;
  maturityDate?: ISODate;
  lateFeeType?: LateFeeType;
  lateFeeAmount?: Money;
  gracePeriodDays?: number;
  calculatedMonthlyPayment: Money | null;
  feeItems?: unknown[]; // ContractFeeItem[]; se tipa en T5.2
}

export interface Contract {
  id: string;
  contractNumber: string;
  status: ContractStatus;
  lenderCompanyId: string;
  insuranceCompanyId: string | null;
  property: Property;
  currentTerms: ContractTerms | null;
  borrowers: { borrowerProfileId: string; isPrimary: boolean; addedAt: ISODate }[];
  currentPrincipalBalance: Money | null;
  nextPaymentDueDate: ISODate | null;
  activatedAt: ISODate | null;
  paidOffAt: ISODate | null;
  cancelledAt: ISODate | null;
  createdAt: ISODate;
}

/** Fila de GET /contracts/:id/schedule. */
export interface ScheduleItem {
  id: string;
  contractId: string;
  contractTermsId: string;
  sequenceNumber: number;
  dueDate: ISODate;
  principalDue: Money;
  interestDue: Money;
  totalDue: Money;
  projectedRemainingBalance: Money;
  amountPaid: Money;
  status: ScheduledPaymentStatus;
  paidInFullAt: ISODate | null;
  lateFeeAssessed: Money;
  lateFeeAssessedAt: ISODate | null;
  /** Calculado al vuelo: PENDING/PARTIALLY_PAID con vencimiento en <= 7 dias. */
  dueSoon: boolean;
}

// ── Marketplace ──────────────────────────────────────────────────────────
export interface LoanRequest {
  id: string;
  borrowerProfileId: string | null; // enmascarado en PUBLIC para el lender
  propertyId: string;
  property?: Property;
  projectType: ProjectType;
  purchasePrice: Money;
  rehabAmount: Money;
  totalLoanAmountRequested: Money;
  requestedClosingDate: ISODate;
  requestedTimelineNotes: string | null;
  visibility: LoanRequestVisibility;
  status: LoanRequestStatus;
  matchedLenderCompanyId: string | null;
  matchedAt: ISODate | null;
  withdrawnAt: ISODate | null;
  expiresAt: ISODate | null;
  convertedAt: ISODate | null;
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Quote {
  id: string;
  loanRequestId: string;
  lenderCompanyId: string;
  structure: LoanStructure;
  principalAmount: Money;
  interestRate: Money;
  amortizationTermMonths: number;
  estimatedClosingCostsAmount: Money | null;
  message: string | null;
  status: LoanQuoteStatus;
  expiresAt: ISODate | null;
  createdAt: ISODate;
  updatedAt: ISODate;
}

// ── Notificaciones / Mensajes / Reviews ──────────────────────────────────
export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  /** Deep-link: "LoanRequest" | "LoanQuote" | "Contract" | "MessageThread". */
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  isRead: boolean;
  readAt: ISODate | null;
  createdAt: ISODate;
}

export interface Message {
  id: string;
  lenderCompanyId: string;
  borrowerProfileId: string;
  senderUserId: string;
  senderRole: MessageSenderRole;
  body: string;
  readAt: ISODate | null;
  createdAt: ISODate;
}

/** Fila de GET .../messages/threads (la contraparte depende del rol que consulta). */
export interface MessageThread {
  borrowerProfile?: { id: string; user?: { name: string }; [k: string]: unknown };
  lenderCompany?: LenderCompanySummary;
  lastMessage: Message;
  unreadCount: number;
}

export interface Review {
  id: string;
  contractId: string;
  lenderCompanyId: string;
  borrowerProfileId: string;
  direction: ReviewDirection;
  reviewerUserId: string;
  rating: number; // 1-5
  comment: string | null;
  createdAt: ISODate;
}

// ── Admin ────────────────────────────────────────────────────────────────
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface LenderCompany extends LenderCompanySummary {
  ein: string;
  contactPhone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
}

/** Fila de GET /admin/lenders (el detalle suma los dos contadores). */
export interface AdminLender {
  id: string;
  user: SafeUser;
  lenderCompanies: LenderCompany[];
  borrowersCount?: number;
  activeContractsCount?: number;
}

/** Fila de GET /admin/verifications. */
export interface VerificationRequest {
  id: string;
  status: VerificationStatus;
  entityName: string;
  entityType: "LLC" | "CORPORATION" | "LP" | "TRUST" | "INDIVIDUAL" | "OTHER";
  ein: string;
  stateOfFormation: string;
  signatoryName: string | null;
  signatoryTitle: string | null;
  rejectionReason: string | null;
  reviewedAt: ISODate | null;
  createdAt: ISODate;
  lenderCompany?: LenderCompanySummary | null;
  borrowerProfile?: { id: string } | null;
  submittedByUser?: { name: string; email?: string };
  /** El back lo usa en la vista; no figura en el schema de Prisma. */
  subject?: "LENDER" | "BORROWER";
}

export interface AdminOverview {
  kpis: {
    activeDeals: { count: number; addedLast7d: number };
    totalFunded: Money;
    lateContracts: number;
    pendingVerifications: number;
  };
  revenue: {
    /** "YYYY-MM" */
    month: string;
    closingFees: Money;
    /** null = el back aun no tiene fuente (AD-006/AD-007). */
    subscriptions: Money | null;
    interestShare: Money | null;
    affiliatePayouts: Money | null;
    net: Money | null;
    last6Months: { month: string; total: Money }[];
  };
  activeDeals: {
    contractId: string;
    contractNumber: string;
    property: Pick<Property, "addressLine1" | "city" | "state">;
    principalAmount: Money | null;
    status: ContractStatus;
    daysPastDue: number | null;
    nextPaymentDueDate: ISODate | null;
  }[];
  needsAttention: {
    type: string;
    severity: "red" | "yellow" | string;
    title: string;
    detail: string;
    entityType: string;
    entityId: string | null;
    occurredAt: ISODate;
  }[];
  recentSignups: {
    userId: string;
    name: string;
    entityName: string | null;
    role: UserRole;
    isActive: boolean;
    createdAt: ISODate;
    verification: VerificationStatus | null;
    dealsCount: number;
  }[];
}
