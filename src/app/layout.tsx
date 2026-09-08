import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";
import { seo, siteConfig } from "@/content";
import { ConsultationModal } from "@/components/ui/ConsultationModal";
import { ServiceModal } from "@/components/ui/ServiceModal";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seo.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: [siteConfig.vkHref, siteConfig.telegramHref].filter(Boolean),
    },
    {
      "@type": "Service",
      serviceType: "Разработка сайтов",
      provider: {
        "@type": "Organization",
        name: siteConfig.legalName,
      },
      areaServed: "RU",
      description: seo.description,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ConsultationModal />
        <ServiceModal />
      </body>
    </html>
  );
}
