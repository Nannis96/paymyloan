import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { copy } from "@/content/copy";

/* La nueva fuente base es Inter para todo el diseño de PML */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://paymyloan.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: copy.es.meta.title,
  description: copy.es.meta.description,
  alternates: {
    canonical: "/",
    languages: { es: "/", en: "/?lang=en" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PayMyLoan.ai",
    title: copy.es.meta.title,
    description: copy.es.meta.description,
  },
  robots: { index: true, follow: true },
};

/* Se aplica el tema guardado antes del primer paint para que no haya
   parpadeo de claro a oscuro al cargar. */
const themeInit = `
(function () {
  try {
    var t = localStorage.getItem("pml-theme");
    if (t === "dark" || t === "light") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
