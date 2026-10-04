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
      <div className="w-full py-3 px-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-slate-400 font-display text-sm font-semibold animate-pulse select-none">
        Waiting for opponent...
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
        <div className="absolute bottom-16 z-30 animate-fade-in w-full max-w-sm">
          <BetSlider
            min={minRaise}
            max={maxRaise}
            pot={pot}
            onSelectAmount={handleBetRaiseConfirm}
          />
        </div>
      )}

      {/* Main Action Bar */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        {/* FOLD */}
        <button
          type="button"
          className="btn-danger !py-3 text-sm font-extrabold uppercase tracking-wide shadow-md"
          onClick={() => onAction({ type: 'fold' })}
        >
          Fold
        </button>

        {/* CHECK or CALL */}
        {canCheck ? (
          <button
            type="button"
            className="btn-primary !py-3 text-sm font-extrabold uppercase tracking-wide shadow-md bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => onAction({ type: 'check' })}
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary !py-3 text-sm font-extrabold uppercase tracking-wide shadow-md bg-cyan-500 hover:bg-cyan-400 text-slate-950"
            onClick={() => onAction({ type: 'call' })}
          >
            Call ${callAmount.toLocaleString()}
          </button>
        )}

        {/* BET / RAISE */}
        <button
          type="button"
          className="btn-secondary !py-3 text-sm font-extrabold uppercase tracking-wide shadow-md bg-purple-600 hover:bg-purple-500 text-white border-purple-400"
          onClick={() => setShowSlider((prev) => !prev)}
        >
          {currentBet === 0 ? 'Bet' : 'Raise'}
        </button>

        {/* ALL-IN */}
        <button
          type="button"
          className="col-span-3 sm:col-span-1 btn-secondary !py-3 text-sm font-black uppercase tracking-wide shadow-md bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-orange-400"
          onClick={() => onAction({ type: 'all_in' })}
        >
          All-In
        </button>
      </div>
    </div>
  );
}
