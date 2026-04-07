<<<<<<< HEAD
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import Header from '@/components/Layout/Header/Header';
import { ModalProvider } from '@/providers/modal-provider';
=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import Providers from "@/components/Layout/Providers";
>>>>>>> 699ac104ec687d77c6ff388348bab6526d22a140

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ExpenseTracker',
  description:
    'Track your income and expenses easily with our intuitive finance management tool.',
};

<<<<<<< HEAD
import Providers from '@/components/Layout/Providers';

=======
>>>>>>> 699ac104ec687d77c6ff388348bab6526d22a140
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Providers>
<<<<<<< HEAD
          <Header />
          {children}
=======
>>>>>>> 699ac104ec687d77c6ff388348bab6526d22a140
          <ModalProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
