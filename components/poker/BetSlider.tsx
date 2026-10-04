'use client';

import { useState } from 'react';

type BetSliderProps = {
  min: number;
  max: number;
  pot: number;
  onSelectAmount: (amount: number) => void;
};

export function BetSlider({ min, max, pot, onSelectAmount }: BetSliderProps) {
  const safeMin = Math.min(min, max);
  const [value, setValue] = useState(safeMin);

  const handleQuick = (fraction: number) => {
    let amt = Math.floor(pot * fraction);
    if (amt < safeMin) amt = safeMin;
    if (amt > max) amt = max;
    setValue(amt);
  };

  const handleAllIn = () => {
    setValue(max);
  };

  return (
    <div className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl text-white max-w-md w-full">
      <div className="flex items-center justify-between text-xs font-bold font-display">
        <span className="text-slate-400">BET / RAISE AMOUNT:</span>
        <span className="text-lg font-black text-amber-400">${value.toLocaleString()}</span>
      </div>

      <input
        type="range"
        min={safeMin}
        max={max}
        step={10}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
      />

      {/* Quick pot percentage buttons */}
      <div className="grid grid-cols-5 gap-1.5 pt-1">
        <button
          type="button"
          className="btn-secondary !py-1 !px-1 text-[11px] font-bold"
          onClick={() => handleQuick(0.33)}
        >
          33%
        </button>
        <button
          type="button"
          className="btn-secondary !py-1 !px-1 text-[11px] font-bold"
          onClick={() => handleQuick(0.5)}
        >
          50%
        </button>
        <button
          type="button"
          className="btn-secondary !py-1 !px-1 text-[11px] font-bold"
          onClick={() => handleQuick(0.75)}
        >
          75%
        </button>
        <button
          type="button"
          className="btn-secondary !py-1 !px-1 text-[11px] font-bold"
          onClick={() => handleQuick(1.0)}
        >
          POT
        </button>
        <button
          type="button"
          className="btn-danger !py-1 !px-1 text-[11px] font-black"
          onClick={handleAllIn}
        >
          ALL-IN
        </button>
      </div>

      <button
        type="button"
        className="btn-primary w-full mt-1 !py-2 text-sm font-extrabold shadow-lg"
        onClick={() => onSelectAmount(value)}
      >
        Confirm ${value.toLocaleString()}
      </button>
    </div>
  );
}
