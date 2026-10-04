'use client';

import { useState } from 'react';
import type { Difficulty } from '@/types/poker';

type GameSetupProps = {
  mode: 'bot' | 'local';
  onStart: (config: {
    botCount: number;
    startingChips: number;
    smallBlind: number;
    bigBlind: number;
    difficulty: Difficulty;
  }) => void;
};

export function GameSetup({ mode, onStart }: GameSetupProps) {
  const [botCount, setBotCount] = useState(3);
  const [startingChips, setStartingChips] = useState(2000);
  const [blindLevel, setBlindLevel] = useState<'10/20' | '25/50' | '50/100'>('10/20');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const handleStart = () => {
    const [sb, bb] = blindLevel.split('/').map(Number);
    onStart({
      botCount,
      startingChips,
      smallBlind: sb || 10,
      bigBlind: bb || 20,
      difficulty
    });
  };

  return (
    <div className="mx-auto w-full max-w-lg card p-8 text-slate-800">
      <div className="flex items-center gap-3 mb-2">
        <img src="/app-logo.jpeg" alt="Logo" className="w-10 h-10 rounded-2xl object-cover border border-slate-200 shadow-sm" />
        <div>
          <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'bot' ? 'Practice Table vs AI' : 'Local Table'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Configure your Texas Hold’em table parameters.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {/* Bot Count */}
        <div>
          <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-2">
            AI Opponents: <span className="text-blue-600 font-black">{botCount} Bots</span> (Total {botCount + 1} players)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`py-2.5 rounded-2xl font-display font-black text-sm transition-all ${
                  botCount === num
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setBotCount(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* AI Difficulty */}
        <div>
          <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-2">
            AI Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'normal', 'advanced'] as Difficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                className={`py-2.5 rounded-2xl font-display font-black text-xs uppercase tracking-wide transition-all ${
                  difficulty === level
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Starting Chips */}
        <div>
          <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-2">
            Starting Virtual Chips
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1000, 2000, 5000].map((chips) => (
              <button
                key={chips}
                type="button"
                className={`py-2.5 rounded-2xl font-display font-black text-xs transition-all ${
                  startingChips === chips
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setStartingChips(chips)}
              >
                ${chips.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Blinds */}
        <div>
          <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-2">
            Blinds (Small / Big)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['10/20', '25/50', '50/100'] as const).map((b) => (
              <button
                key={b}
                type="button"
                className={`py-2.5 rounded-2xl font-display font-black text-xs transition-all ${
                  blindLevel === b
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setBlindLevel(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn-primary w-full mt-2 !py-3.5 text-base font-extrabold uppercase tracking-wide shadow-lg shadow-blue-500/25"
          onClick={handleStart}
        >
          Deal Cards & Start Match ➔
        </button>
      </div>
    </div>
  );
}
