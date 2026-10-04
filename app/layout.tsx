import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SettingsProvider } from '@/components/settings/SettingsProvider';

export const metadata: Metadata = {
  title: 'Poker App — Texas Hold’em Online & Offline',
  description:
    'Play Texas Hold’em with friends or practice against smart AI opponents using virtual chips.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.jpeg'
  },
  openGraph: {
    title: 'Poker App — Texas Hold’em Online & Offline',
    description: 'Play Texas Hold’em against AI or challenge friends with virtual chips.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F8FAFC'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-blue-500 selection:text-white">
        <SettingsProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
