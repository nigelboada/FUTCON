import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppHeader } from '@/components/layout/app-header'

import { getLocale } from '@/lib/i18n/server'
import { getTheme } from '@/lib/theme/server'

import { ServiceWorkerRegister } from '@/components/pwa/service-worker-register'

import "./globals.css";

import { AppFooter } from '@/components/layout/app-footer'

import { GlobalLoadingOverlay } from '@/components/layout/global-loading-overlay'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://futcon.vercel.app'),
  title: {
    default: 'FUTCON',
    template: '%s | FUTCON',
  },
  description:
    'Marketplace per connectar clubs, jugadors, entrenadors i professionals del futbol amateur.',
  applicationName: 'FUTCON',
  appleWebApp: {
    capable: true,
    title: 'FUTCON',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme()
  const locale = await getLocale()

  return (
    <html lang={locale} className={theme === 'dark' ? 'dark' : undefined}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppHeader />
        {children}
        <AppFooter />
        <ServiceWorkerRegister />
        <GlobalLoadingOverlay />
        
      </body>
    </html>
  );
}
