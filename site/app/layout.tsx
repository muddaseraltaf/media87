import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { InteractionEngine } from "./components/InteractionEngine";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { siteUrl } from "./lib/site-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI-Powered Digital Marketing & Automation Agency | Media87",
    template: "%s | Media87",
  },
  description:
    "Media87 connects digital marketing, local SEO, content creation and practical AI automation for businesses in Dubai and international markets.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    siteName: "Media87",
    title: "AI-Powered Digital Marketing & Automation Agency | Media87",
    description:
      "Search, paid media, content and practical AI automation—connected into one growth system.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Digital Marketing & Automation Agency | Media87",
    description:
      "Search, paid media, content and practical AI automation—connected into one growth system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Media87",
    url: siteUrl,
    logo: `${siteUrl}/logo-media87.png`,
    email: "hello@media87.com",
    telephone: "+971 50 332 1743",
    sameAs: [
      "https://facebook.com/media87hq",
      "https://www.instagram.com/media87hq/",
      "https://www.tiktok.com/@media87hq",
      "https://www.youtube.com/@media87hq",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <InteractionEngine />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
