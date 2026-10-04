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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-card text-center text-slate-800 flex flex-col items-center">
        <div className="mb-4 rounded-3xl bg-amber-100 p-4 text-amber-600 ring-4 ring-amber-300">
          <Trophy className="h-10 w-10 animate-bounce" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
          {humanWon ? '🎉 You Won!' : `${winners.map((w) => w.name).join(', ')} Wins`}
        </h2>

        <p className="mt-2 text-sm text-slate-600 max-w-xs font-semibold">
          {state.winningHandDescription || 'Hand complete!'}
        </p>

        <div className="my-6 px-8 py-4 rounded-2xl bg-amber-50 border border-amber-200">
          <span className="block text-xs font-black text-amber-800 uppercase tracking-wider">
            POT WON
          </span>
          <span className="font-display text-3xl font-black text-amber-600">
            ${state.pot.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          className="btn-primary w-full !py-3.5 text-base font-extrabold tracking-wide uppercase shadow-lg shadow-blue-500/25"
          onClick={onNextHand}
        >
          Next Hand ➔
        </button>
      </div>
    </div>
  );
}
