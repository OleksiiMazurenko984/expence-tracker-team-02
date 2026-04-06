import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";
import Loader from "@/components/UI/Loader/Loader";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ExpenseTracker",
  description:
    "Track your income and expenses easily with our intuitive finance management tool.",
};

import Providers from "@/components/Layout/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Suspense fallback={<Loader />}>
          <Providers>
            {children}
            <ModalProvider />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
