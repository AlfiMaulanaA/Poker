import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SettingsProvider } from '@/components/settings/SettingsProvider';

export const metadata: Metadata = {
  title: 'Neon Poker — Texas Hold’em Online & Offline',
  description:
    'Play Texas Hold’em with friends or practice against smart AI opponents using virtual chips.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.jpeg'
  },
  openGraph: {
    title: 'Neon Poker — Texas Hold’em Online & Offline',
    description: 'Play Texas Hold’em against AI or challenge friends with virtual chips.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#07111F'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#07111F] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <SettingsProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
