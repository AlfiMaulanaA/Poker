'use client';

import { SUIT_4COLOR, SUIT_COLORS, SUIT_SYMBOLS } from '@/lib/poker/deck';
import type { PlayingCard as PlayingCardType } from '@/types/poker';

type PlayingCardProps = {
  card?: PlayingCardType | null;
  faceDown?: boolean;
  highlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fourColor?: boolean;
};

export function PlayingCard({ card, faceDown = false, highlight = false, size = 'md', fourColor = false }: PlayingCardProps) {
  if (faceDown || !card) {
    const sizeClasses =
      size === 'sm'
        ? 'w-9 h-12 text-xs'
        : size === 'lg'
          ? 'w-16 h-24 text-base'
          : 'w-12 h-16 text-sm';

    return (
      <div
        className={`${sizeClasses} relative rounded-lg border-2 border-slate-700 bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-900 shadow-md flex items-center justify-center transition-transform hover:scale-105 select-none`}
      >
        <div className="absolute inset-1 rounded border border-cyan-500/20 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
        <span className="font-display font-black text-cyan-400/70 opacity-75">N</span>
      </div>
    );
  }

  const colorMap = fourColor ? SUIT_4COLOR : SUIT_COLORS;
  const suitColorClass = colorMap[card.suit];

  const sizeClasses =
    size === 'sm'
      ? 'w-9 h-12 text-xs p-0.5'
      : size === 'lg'
        ? 'w-16 h-24 text-base p-1.5'
        : 'w-12 h-16 text-sm p-1';

  return (
    <div
      className={`${sizeClasses} relative rounded-lg border bg-white dark:bg-slate-900 ${
        highlight
          ? 'border-amber-400 ring-2 ring-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105 z-10'
          : 'border-slate-300 dark:border-slate-700 shadow-md'
      } flex flex-col justify-between select-none font-bold transition-all duration-200`}
    >
      {/* Top Left Rank & Suit */}
      <div className={`flex items-center gap-0.5 leading-none ${suitColorClass}`}>
        <span className="font-display font-extrabold tracking-tighter">{card.rank}</span>
        <span className="text-[0.7em]">{SUIT_SYMBOLS[card.suit]}</span>
      </div>

      {/* Center Large Suit Symbol */}
      <div className={`self-center text-center leading-none text-xl sm:text-2xl ${suitColorClass}`}>
        {SUIT_SYMBOLS[card.suit]}
      </div>

      {/* Bottom Right Inverted Rank */}
      <div className={`self-end flex items-center gap-0.5 leading-none rotate-180 ${suitColorClass}`}>
        <span className="font-display font-extrabold tracking-tighter">{card.rank}</span>
        <span className="text-[0.7em]">{SUIT_SYMBOLS[card.suit]}</span>
      </div>
    </div>
  );
}
