'use client';

import Link from 'next/link';
import { Bot, Globe, Shield, Sparkles, Users, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 lg:px-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 sm:p-12 border border-slate-200/90 shadow-card text-center flex flex-col items-center">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-4 flex items-center justify-center">
          <img
            src="/app-logo.jpeg"
            alt="Poker App Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover shadow-2xl border-2 border-white ring-4 ring-blue-500/20 animate-pop-in"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Virtual Play Money Only
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 leading-none">
          POKER CLUB
        </h1>

        <p className="mt-3 font-display font-extrabold text-xl sm:text-2xl text-blue-600 tracking-wide uppercase">
          PLAY YOUR HAND. READ THE TABLE.
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-medium">
          Play authentic Texas Hold’em against intelligent AI opponents or challenge your friends in private multiplayer tables.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/bot" className="btn-primary !px-6 !py-3 text-base font-extrabold shadow-lg shadow-blue-500/25">
            <Bot className="h-5 w-5" /> Practice vs Bots
          </Link>

          <Link href="/online" className="btn-secondary !px-6 !py-3 text-base font-extrabold border-slate-300">
            <Globe className="h-5 w-5 text-blue-600" /> Play Online
          </Link>
        </div>

        {/* Disclaimer Pill */}
        <div className="mt-8 px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 font-semibold shadow-sm flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>This game uses virtual chips only. No real money wagering, deposits, or withdrawals.</span>
        </div>
      </section>

      {/* Game Mode Cards */}
      <section className="mt-10">
        <h2 className="font-display text-xs font-black uppercase tracking-widest text-slate-400 px-1 mb-4">
          CHOOSE YOUR GAME MODE
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/bot"
            className="group card p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                Practice vs AI
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Sharpen your Texas Hold’em strategy against Beginner, Normal, or Advanced AI bots.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-black text-blue-600 flex items-center gap-1">
              Start Match ➔
            </span>
          </Link>

          <Link
            href="/local"
            className="group card p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-slate-800 group-hover:text-purple-600 transition-colors">
                Local Table
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Play locally at a single table with custom starting chips and blind parameters.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-black text-purple-600 flex items-center gap-1">
              Setup Table ➔
            </span>
          </Link>

          <Link
            href="/online"
            className="group card p-6 hover:border-cyan-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-slate-800 group-hover:text-cyan-600 transition-colors">
                Private Online Room
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                Create a private room with custom room code (`PKR-X7P9`) and invite friends.
              </p>
            </div>
            <span className="mt-6 font-display text-xs font-black text-cyan-600 flex items-center gap-1">
              Create Room ➔
            </span>
          </Link>
        </div>
      </section>

      {/* Why Poker Club Feature Grid */}
      <section className="mt-10 card p-8">
        <h2 className="font-display text-xl font-extrabold text-slate-800 mb-6">
          Why Poker Club?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3">
            <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-extrabold text-slate-800">Real Texas Hold’em Rules</h4>
              <p className="mt-0.5 text-xs text-slate-500">Full preflop, flop, turn, river, side pots & tie-break kickers.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Bot className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-extrabold text-slate-800">Smart AI Opponents</h4>
              <p className="mt-0.5 text-xs text-slate-500">Bots evaluate equity, position & pot odds without cheating.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Users className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-extrabold text-slate-800">Private Multiplayer Tables</h4>
              <p className="mt-0.5 text-xs text-slate-500">Shareable room codes and invite links for instant play.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Shield className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-extrabold text-slate-800">Secure Hidden Cards</h4>
              <p className="mt-0.5 text-xs text-slate-500">Hole cards stay private until showdown for true poker integrity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
