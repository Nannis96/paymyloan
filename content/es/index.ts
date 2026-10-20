import { landing } from "./landing";
import { auth } from "./auth";
import { legal } from "./legal";
import { admin } from "./admin";
import { lender } from "./lender";
import { borrower } from "./borrower";
import { shared } from "./shared";

export default { ...landing, ...auth, ...legal, ...admin, ...lender, ...borrower, ...shared };
