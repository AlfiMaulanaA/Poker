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
    <header className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-display font-black text-slate-950 text-base shadow-glow group-hover:scale-105 transition-transform">
            ♠
          </div>
          <span className="font-display font-black text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            NEON POKER
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
                className={`px-3 py-1.5 rounded-xl font-display text-xs font-bold flex items-center gap-1.5 transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
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
