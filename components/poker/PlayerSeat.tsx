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

  const actionStyle = (action: string) => {
    if (action.startsWith('FOLD')) return 'bg-rose-600 text-white border-rose-400';
    if (action.startsWith('CHECK')) return 'bg-blue-600 text-white border-blue-400';
    if (action.startsWith('CALL')) return 'bg-cyan-400 text-slate-950 font-black border-cyan-200';
    if (action.startsWith('BET') || action.startsWith('RAISE')) return 'bg-purple-600 text-white border-purple-300';
    if (action.startsWith('ALL-IN')) return 'bg-amber-400 text-slate-950 font-black border-amber-200 shadow-glow';
    return 'bg-slate-800 text-cyan-300 border-cyan-500/50';
  };

  return (
    <div
      className={`relative flex flex-col items-center select-none transition-all duration-300 ${
        player.folded ? 'opacity-40 grayscale-[50%]' : 'opacity-100'
      }`}
    >
      {/* Top Row: Action Speech Bubble & Role Badge (D / SB / BB) */}
      <div className="flex items-center gap-1.5 mb-1 z-30 min-h-[22px]">
        {dealerRole && <DealerButton type={dealerRole} />}

        {player.lastAction && (
          <div
            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-display font-extrabold shadow-lg uppercase tracking-wide whitespace-nowrap animate-fade-in ${actionStyle(
              player.lastAction
            )}`}
          >
            {player.lastAction}
          </div>
        )}
      </div>

      {/* Hole Cards Container */}
      <div className="flex items-center -space-x-3 mb-1 z-20">
        {showHoleCards ? (
          player.cards!.map((card, idx) => (
            <div
              key={card.id || idx}
              className={`transform transition-transform ${
                idx === 1 ? 'rotate-6 translate-y-0.5' : '-rotate-6'
              } hover:rotate-0 hover:z-30 shadow-lg`}
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
          <div className="h-9 w-12 text-[10px] text-slate-400 font-display flex items-center justify-center border border-dashed border-slate-300 rounded-lg bg-white/80">
            [ Hidden ]
          </div>
        )}
      </div>

      {/* Player Main Info Box */}
      <div
        className={`relative w-28 sm:w-32 rounded-2xl p-1.5 border transition-all duration-300 flex flex-col items-center text-center shadow-xl ${
          isWinner
            ? 'bg-gradient-to-b from-amber-100 via-amber-50 to-white border-amber-500 ring-4 ring-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-105'
            : isCurrentTurn
              ? 'bg-gradient-to-b from-blue-50 via-white to-cyan-50 border-blue-500 ring-4 ring-blue-400/70 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
              : player.isYou
                ? 'bg-white border-2 border-blue-400'
                : 'bg-white border-2 border-slate-200'
        }`}
      >
        {/* Turn Timer Glow Line */}
        {isCurrentTurn && (
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 animate-pulse pointer-events-none" />
        )}

        {/* Avatar & Name */}
        <div className="flex items-center gap-1.5 w-full px-1">
          <span className="text-base sm:text-xl select-none">{player.avatar}</span>
          <span className="truncate text-xs font-black text-slate-800 font-display flex-1 text-left tracking-tight">
            {player.name}
          </span>
        </div>

        {/* Chips Balance */}
        <div className="mt-1 w-full rounded-xl bg-amber-50 py-0.5 px-1.5 text-center border border-amber-200 flex items-center justify-center gap-1">
          <span className="text-amber-600 text-xs">🪙</span>
          <span className="text-xs font-black text-amber-900 font-display tracking-tight">
            ${player.chips.toLocaleString()}
          </span>
        </div>

        {/* Turn Timer Badge if active turn */}
        {isCurrentTurn && (
          <div className="mt-1 text-[10px] font-black text-blue-600 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span>⏱ {turnTimeRemaining}s</span>
          </div>
        )}
      </div>

      {/* Current Bet Chip Badge below seat */}
      {player.currentBet > 0 && (
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-400 border border-amber-500 text-slate-950 text-[10px] font-black shadow-md font-display">
          Bet: ${player.currentBet.toLocaleString()}
        </div>
      )}
    </div>
  );
}
