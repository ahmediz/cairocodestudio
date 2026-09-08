import type { Metadata } from 'next';
import { Antonio, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactModalProvider } from '@/context/ContactModalContext';

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-antonio',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cairo Code Studio — Web & Mobile App Development',
  description:
    'We build fast, modern websites tailored to your business needs. Boost your online presence with expert development.',
  openGraph: {
    title: 'Cairo Code Studio — Web & Mobile App Development',
    description:
      'We build fast, modern websites tailored to your business needs. Boost your online presence with expert development.',
    url: 'https://cairocodestudio.com',
    siteName: 'Cairo Code Studio',
    images: [
      {
        url: 'https://cairocodestudio.com/images/og-default.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cairo Code Studio — Web & Mobile App Development',
    description:
      'We build fast, modern websites tailored to your business needs. Boost your online presence with expert development.',
    images: ['https://cairocodestudio.com/images/og-default.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-inter">
        <ContactModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
