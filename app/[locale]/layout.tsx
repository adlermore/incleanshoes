import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Footer from "@/components/layout/Footer";
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { JsonContextProvider } from "@/context/JsonContext";
import Header from "@/components/layout/Header";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CleanShoes - Premium Shoe Cleaning Service",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Professional shoe cleaning, restoration, and care service. Keep your sneakers and leather shoes looking fresh and spotless.",
  keywords: [
    "shoe cleaning",
    "sneaker cleaning",
    "leather shoe care",
    "professional shoe service",
    "CleanShoes",
  ],
  authors: [{ name: "CleanShoes Team" }],
  openGraph: {
    title: "CleanShoes - Premium Shoe Cleaning Service",
    description:
      "We make your shoes look brand new again. Trusted sneaker and leather shoe cleaning experts.",
    url: "https://yourdomain.com",
    siteName: "CleanShoes",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CleanShoes Service",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <JsonContextProvider>
      <html lang={locale}>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body className={montserrat.className}>
          <NextIntlClientProvider>
            <Toaster containerStyle={{ zIndex: 9999 }} position="bottom-right" />
            <Header />
            <div className="flex-1 main-wrapper pt-[170px]">{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </JsonContextProvider>
  )
}