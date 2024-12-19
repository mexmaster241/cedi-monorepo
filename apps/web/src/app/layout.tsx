import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from 'config';
import ConfigureAmplifyClientSide from "@/components/auth/ConfigureAmplify";
import { Toaster } from "@/components/ui/toaster";
import { SecurityProvider } from '@/components/context/Securitycontex';

Amplify.configure(amplifyConfig, { ssr: true });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Regular.woff",
  variable: "--font-clash-display",
  weight: "200 700",
});

export const metadata: Metadata = {
  title: "cedi",
  description: "Centraliza tu dinero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} antialiased`}>
        <ConfigureAmplifyClientSide />
        <SecurityProvider>
          <ClientLayout>{children}</ClientLayout>
        </SecurityProvider>
        <Toaster />
      </body>
    </html>
  );
}
