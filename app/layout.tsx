import type { Metadata } from "next";
import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { copy } from "@/content/copy";

/* La terna tipográfica es la del documento de alcance: Spectral para los
   títulos, IBM Plex Sans para el cuerpo, IBM Plex Mono para los metadatos. */
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
        className={`${spectral.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
