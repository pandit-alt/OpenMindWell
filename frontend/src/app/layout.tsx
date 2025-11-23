import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenMindWell - Anonymous Mental Health Support',
  description: 'Free, anonymous peer support for mental wellness. Chat rooms, journaling, habit tracking, and curated resources.',
  keywords: ['mental health', 'peer support', 'anonymous', 'anxiety', 'depression', 'wellness'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
