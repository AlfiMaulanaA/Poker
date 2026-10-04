'use client';

import { DealerButton } from './DealerButton';
import { PlayingCard } from './PlayingCard';
import type { PokerPlayer } from '@/types/poker';

type PlayerSeatProps = {
  player: PokerPlayer;
  isCurrentTurn: boolean;
  turnTimeRemaining?: number;
  dealerRole?: 'D' | 'SB' | 'BB' | null;
  isWinner?: boolean;
  fourColor?: boolean;
};

export function PlayerSeat({
  player,
  isCurrentTurn,
  turnTimeRemaining = 20,
  dealerRole,
  isWinner = false,
  fourColor = false
}: PlayerSeatProps) {
  const showHoleCards = Boolean(player.cards && player.cards.length > 0);
  const revealCards = player.isYou || player.showCards;

  return (
    <div
      className={`relative flex flex-col items-center select-none transition-all duration-300 ${
        player.folded ? 'opacity-40 grayscale-[40%]' : 'opacity-100'
      }`}
    >
      {/* Action Speech Bubble */}
      {player.lastAction && (
        <div className="absolute -top-7 z-20 animate-fade-in px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 font-display text-[11px] font-extrabold shadow-lg uppercase tracking-wide whitespace-nowrap">
          {player.lastAction}
        </div>
      )}

      {/* Role Badge (D / SB / BB) */}
      {dealerRole && (
        <div className="absolute -top-2 -left-2 z-20">
          <DealerButton type={dealerRole} />
        </div>
      )}

      {/* Hole Cards Container */}
      <div className="flex items-center -space-x-4 mb-1 z-10">
        {showHoleCards ? (
          player.cards!.map((card, idx) => (
            <div
              key={card.id || idx}
              className={`transform transition-all ${
                idx === 1 ? 'rotate-6 translate-y-0.5' : '-rotate-6'
              } hover:rotate-0 hover:z-20`}
            >
              <PlayingCard
                card={card}
                faceDown={!revealCards}
                size="sm"
                fourColor={fourColor}
                highlight={isWinner}
              />
            </div>
          ))
        ) : (
          <div className="h-10 text-xs text-slate-500 font-display flex items-center justify-center">
            [ No Cards ]
          </div>
        )}
      </div>

      {/* Player Main Info Box */}
      <div
        className={`relative w-28 sm:w-32 rounded-xl p-1.5 border transition-all duration-300 flex flex-col items-center text-center ${
          isWinner
            ? 'bg-gradient-to-b from-amber-950 to-slate-900 border-amber-400 ring-2 ring-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.7)] scale-105'
            : isCurrentTurn
              ? 'bg-slate-900/90 border-cyan-400 ring-2 ring-cyan-400 shadow-glow'
              : 'bg-slate-900/80 border-slate-700/80 shadow-md'
        }`}
      >
        {/* Turn Progress Glow Ring */}
        {isCurrentTurn && (
          <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-pulse pointer-events-none" />
        )}

        {/* Avatar & Name */}
        <div className="flex items-center gap-1.5 w-full px-1">
          <span className="text-base sm:text-lg select-none">{player.avatar}</span>
          <span className="truncate text-xs font-bold text-slate-200 font-display flex-1 text-left">
            {player.name}
          </span>
        </div>

        {/* Chips Balance */}
        <div className="mt-0.5 w-full rounded bg-slate-950/80 py-0.5 text-center border border-slate-800">
          <span className="text-xs font-black text-amber-400 font-display">
            ${player.chips.toLocaleString()}
          </span>
        </div>

        {/* Turn Timer Badge if active turn */}
        {isCurrentTurn && (
          <div className="mt-1 text-[10px] font-extrabold text-cyan-300 animate-pulse">
            ⏱ {turnTimeRemaining}s
          </div>
        )}
      </div>

      {/* Current Bet Chip Badge below seat */}
      {player.currentBet > 0 && (
        <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold shadow-sm">
          Bet: ${player.currentBet.toLocaleString()}
        </div>
      )}
    </div>
  );
}
