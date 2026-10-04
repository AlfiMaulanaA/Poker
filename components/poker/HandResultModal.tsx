'use client';

import { Trophy } from 'lucide-react';
import type { PokerGameState } from '@/types/poker';

type HandResultModalProps = {
  state: PokerGameState;
  onNextHand: () => void;
};

export function HandResultModal({ state, onNextHand }: HandResultModalProps) {
  const winners = state.players.filter((p) => state.winnerSeats.includes(p.seat));
  const humanWon = winners.some((w) => w.isYou);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl text-center text-white flex flex-col items-center">
        <div className="mb-4 rounded-full bg-amber-500/20 p-4 text-amber-400 ring-2 ring-amber-400/40">
          <Trophy className="h-10 w-10 animate-bounce" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-black text-amber-300 uppercase tracking-tight">
          {humanWon ? 'You Won!' : `${winners.map((w) => w.name).join(', ')} Wins`}
        </h2>

        <p className="mt-2 text-sm text-slate-300 max-w-xs font-semibold">
          {state.winningHandDescription || 'Hand complete!'}
        </p>

        <div className="my-6 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-400/30">
          <span className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
            POT WON
          </span>
          <span className="font-display text-3xl font-black text-amber-400">
            ${state.pot.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          className="btn-primary w-full !py-3 text-base font-extrabold tracking-wide uppercase shadow-lg shadow-cyan-500/20"
          onClick={onNextHand}
        >
          Next Hand ➔
        </button>
      </div>
    </div>
  );
}
