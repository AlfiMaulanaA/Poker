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
    <div className="mx-auto w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-white">
      <h2 className="font-display text-2xl font-black text-cyan-400 tracking-tight">
        {mode === 'bot' ? 'Practice Table vs AI' : 'Local Table'}
      </h2>
      <p className="mt-1 text-xs text-slate-400 font-medium">
        Configure your Texas Hold’em table parameters.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {/* Bot Count */}
        <div>
          <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-2">
            AI Opponents: <span className="text-cyan-400 font-black">{botCount} Bots</span> (Total {botCount + 1} players)
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`py-2 rounded-xl font-display font-bold text-sm transition-all ${
                  botCount === num
                    ? 'bg-cyan-500 text-slate-950 font-black ring-2 ring-cyan-400 shadow-glow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
          <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-2">
            AI Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['beginner', 'normal', 'advanced'] as Difficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                className={`py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wide transition-all ${
                  difficulty === level
                    ? 'bg-purple-600 text-white font-black ring-2 ring-purple-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
          <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-2">
            Starting Virtual Chips
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1000, 2000, 5000].map((chips) => (
              <button
                key={chips}
                type="button"
                className={`py-2 rounded-xl font-display font-bold text-xs transition-all ${
                  startingChips === chips
                    ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
          <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-2">
            Blinds (Small / Big)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['10/20', '25/50', '50/100'] as const).map((b) => (
              <button
                key={b}
                type="button"
                className={`py-2 rounded-xl font-display font-bold text-xs transition-all ${
                  blindLevel === b
                    ? 'bg-blue-600 text-white font-black ring-2 ring-blue-400 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
          className="btn-primary w-full mt-2 !py-3 text-base font-extrabold uppercase tracking-wide shadow-lg shadow-cyan-500/20"
          onClick={handleStart}
        >
          Deal Cards & Start Match ➔
        </button>
      </div>
    </div>
  );
}
