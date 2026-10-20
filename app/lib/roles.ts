// Rol -> dashboard propio. Unica tabla: la usan el login y el guard de SiteShell.
export const HOME_BY_ROLE: Record<string, string> = {
  ADMIN: "/adminDashboard",
  LENDER: "/lenderDashboard",
  BORROWER: "/borrowerDashboard",
  BOOKKEEPER: "/bookkeeperDashboard",
};

// Rol exigido por una ruta (undefined = cualquier usuario autenticado).
export const roleForPath = (pathname: string | null) =>
  Object.keys(HOME_BY_ROLE).find((r) => pathname?.startsWith(HOME_BY_ROLE[r]));
