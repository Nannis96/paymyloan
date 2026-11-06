import { redirect } from "next/navigation";

// El portal de afiliados es unico para lender y borrower.
export default function Page() {
  redirect("/affiliate-dashboard");
}
