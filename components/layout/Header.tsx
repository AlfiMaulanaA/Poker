'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Globe, Settings } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/bot', label: 'vs Bots', icon: Bot },
    { href: '/online', label: 'Online Rooms', icon: Globe },
    { href: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="w-full bg-white/90 border-b border-slate-200/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/app-logo.jpeg"
            alt="Poker App Logo"
            className="w-9 h-9 rounded-2xl object-cover shadow-md border border-slate-200 group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-black text-xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
            POKER CLUB
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-2xl font-display text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
