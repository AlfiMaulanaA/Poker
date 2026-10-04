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
  const sizeClasses =
    size === 'sm'
      ? 'w-9 h-12 text-xs p-0.5'
      : size === 'lg'
        ? 'w-16 h-24 text-base p-1.5'
        : 'w-12 h-16 text-sm p-1';

  if (faceDown || !card) {
    return (
      <div
        className={`${sizeClasses} relative rounded-xl border-2 border-white bg-white shadow-md flex items-center justify-center transition-transform hover:scale-105 select-none p-1`}
      >
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 border border-blue-400/40 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px] opacity-30" />
          <span className="font-display font-black text-white text-xs sm:text-sm tracking-widest drop-shadow">
            POKER
          </span>
        </div>
      </div>
    );
  }

  const colorMap = fourColor ? SUIT_4COLOR : SUIT_COLORS;
  const suitColorClass = colorMap[card.suit];

  return (
    <div
      className={`${sizeClasses} relative rounded-xl border-2 bg-white ${
        highlight
          ? 'border-amber-400 ring-4 ring-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-105 z-10'
          : 'border-slate-200 shadow-md'
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
