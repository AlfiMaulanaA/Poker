'use client';

import { useState } from 'react';
import { BetSlider } from './BetSlider';
import type { PokerAction } from '@/types/poker';

type PokerActionsProps = {
  isYourTurn: boolean;
  canCheck: boolean;
  callAmount: number;
  minRaise: number;
  maxRaise: number;
  pot: number;
  currentBet: number;
  onAction: (action: PokerAction) => void;
};

export function PokerActions({
  isYourTurn,
  canCheck,
  callAmount,
  minRaise,
  maxRaise,
  pot,
  currentBet,
  onAction
}: PokerActionsProps) {
  const [showSlider, setShowSlider] = useState(false);

  if (!isYourTurn) {
    return (
      <div className="w-full py-3.5 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center text-slate-300 font-display text-sm font-bold animate-pulse select-none shadow-xl">
        ⏱ Waiting for opponent action...
      </div>
    );
  }

  const handleBetRaiseConfirm = (amount: number) => {
    setShowSlider(false);
    if (amount >= maxRaise) {
      onAction({ type: 'all_in' });
    } else if (currentBet === 0) {
      onAction({ type: 'bet', amount });
    } else {
      onAction({ type: 'raise', amount });
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-2">
      {/* Bet / Raise Slider Popup */}
      {showSlider && (
        <div className="absolute bottom-16 z-40 animate-fade-in w-full max-w-sm">
          <BetSlider
            min={minRaise}
            max={maxRaise}
            pot={pot}
            onSelectAmount={handleBetRaiseConfirm}
          />
        </div>
      )}

      {/* Main Action Bar */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-2.5 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md">
        {/* FOLD */}
        <button
          type="button"
          className="btn-danger !py-3 text-sm font-extrabold uppercase tracking-wide bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white border border-rose-400/80 hover:from-rose-500 hover:to-red-500 shadow-[0_4px_15px_rgba(225,29,72,0.4)] transition-transform active:scale-95"
          onClick={() => onAction({ type: 'fold' })}
        >
          Fold
        </button>

        {/* CHECK or CALL */}
        {canCheck ? (
          <button
            type="button"
            className="btn-primary !py-3 text-sm font-extrabold uppercase tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white border border-blue-400/80 hover:from-blue-500 hover:to-indigo-500 shadow-[0_4px_15px_rgba(37,99,235,0.4)] transition-transform active:scale-95"
            onClick={() => onAction({ type: 'check' })}
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary !py-3 text-sm font-black uppercase tracking-wide bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 text-slate-950 border border-cyan-200 hover:from-cyan-300 hover:to-teal-300 shadow-[0_4px_18px_rgba(34,211,238,0.5)] transition-transform active:scale-95"
            onClick={() => onAction({ type: 'call' })}
          >
            Call ${callAmount.toLocaleString()}
          </button>
        )}

        {/* BET / RAISE */}
        <button
          type="button"
          className="btn-secondary !py-3 text-sm font-extrabold uppercase tracking-wide bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 text-white border border-purple-400/80 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_4px_18px_rgba(168,85,247,0.4)] transition-transform active:scale-95"
          onClick={() => setShowSlider((prev) => !prev)}
        >
          {currentBet === 0 ? 'Bet' : 'Raise'}
        </button>

        {/* ALL-IN */}
        <button
          type="button"
          className="col-span-3 sm:col-span-1 btn-secondary !py-3 text-sm font-black uppercase tracking-wide bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 border border-amber-300 hover:from-amber-400 hover:to-orange-400 shadow-[0_4px_20px_rgba(245,158,11,0.6)] transition-transform active:scale-95"
          onClick={() => onAction({ type: 'all_in' })}
        >
          All-In
        </button>
      </div>
    </div>
  );
}
