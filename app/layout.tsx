import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; 
import "./globals.css";
import { shared } from "@/content/en/shared";

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
  title: shared.meta.title,
  description: shared.meta.description,
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/?lang=es" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PayMyLoan.ai",
    title: shared.meta.title,
    description: shared.meta.description,
  },
  robots: { index: true, follow: true },
};

/* Se aplica el tema guardado antes del primer paint. 
   Si no hay tema guardado, se fuerza el modo claro por defecto. */
const themeInit = `
  (function () {
    try {
      var t = localStorage.getItem("pml-theme");
      if (t === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Script 
          src="https://www.googletagmanager.com/gtm.js?id=GTM-T7LZCPHM" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </body>
    </html>
  );
}
