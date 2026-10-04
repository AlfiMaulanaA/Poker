'use client';

import Link from 'next/link';
import { Bot, Globe, Shield, Sparkles, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 lg:px-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-[#0C1A2E] to-[#07111F] p-8 sm:p-12 border border-slate-800 shadow-2xl text-center flex flex-col items-center">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="h-3.5 w-3.5" /> Virtual Play Money Only
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-white max-w-3xl leading-none">
          NEON POKER
        </h1>

        <p className="mt-3 font-display font-extrabold text-xl sm:text-2xl text-cyan-400 tracking-wide uppercase">
          PLAY YOUR HAND. READ THE TABLE.
        </p>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl font-medium">
          Play authentic Texas Hold’em against intelligent AI opponents or challenge your friends in private multiplayer tables.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/bot" className="btn-primary !px-6 !py-3 text-base font-extrabold">
            <Bot className="h-5 w-5" /> Practice vs Bots
          </Link>

          <Link href="/online" className="btn-secondary !px-6 !py-3 text-base font-bold">
            <Globe className="h-5 w-5 text-cyan-400" /> Play Online
          </Link>
        </div>

        {/* Disclaimer Pill */}
        <div className="mt-8 px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>This game uses virtual chips only. No real money wagering, deposits, or withdrawals.</span>
        </div>
      </section>

      {/* Game Mode Cards */}
      <section className="mt-12">
        <h2 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400 px-1 mb-4">
          CHOOSE YOUR GAME MODE
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/bot"
            className="group card p-6 hover:border-cyan-500/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                Practice vs AI
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Sharpen your Texas Hold’em strategy against Beginner, Normal, or Advanced AI bots.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-bold text-cyan-400 flex items-center gap-1">
              Start Match ➔
            </span>
          </Link>

          <Link
            href="/local"
            className="group card p-6 hover:border-purple-500/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                Local Table
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Play locally at a single table with custom starting chips and blind parameters.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-bold text-purple-400 flex items-center gap-1">
              Setup Table ➔
            </span>
          </Link>

          <Link
            href="/online"
            className="group card p-6 hover:border-blue-500/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Private Online Room
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Create a private room with custom room code (`PKR-X7P9`) and invite friends.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-bold text-blue-400 flex items-center gap-1">
              Create Room ➔
            </span>
          </Link>
        </div>
      </section>

      {/* Why Neon Poker Feature Grid */}
      <section className="mt-12 card p-8">
        <h2 className="font-display text-xl font-bold text-white mb-6">
          Why Neon Poker?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-bold text-slate-200">Real Texas Hold’em Rules</h4>
              <p className="mt-0.5 text-xs text-slate-400">Full preflop, flop, turn, river, side pots & tie-break kickers.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Bot className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-bold text-slate-200">Smart AI Opponents</h4>
              <p className="mt-0.5 text-xs text-slate-400">Bots evaluate equity, position & pot odds without cheating.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Users className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-bold text-slate-200">Private Multiplayer Tables</h4>
              <p className="mt-0.5 text-xs text-slate-400">Shareable room codes and invite links for instant play.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-bold text-slate-200">Secure Hidden Cards</h4>
              <p className="mt-0.5 text-xs text-slate-400">Hole cards stay private until showdown for true poker integrity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
