'use client';

import { Coins } from 'lucide-react';
import type { SidePot } from '@/types/poker';

type PotDisplayProps = {
  pot: number;
  sidePots?: SidePot[];
};

export function PotDisplay({ pot, sidePots = [] }: PotDisplayProps) {
  const activeSidePots = sidePots.filter((sp) => sp.amount > 0);

  return (
    <div className="flex flex-col items-center justify-center gap-1 select-none">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 border-2 border-amber-300 text-slate-950 shadow-xl">
        <Coins className="h-4 w-4 animate-bounce text-slate-950" />
        <span className="font-display text-xs font-black uppercase tracking-wider text-slate-900">
          TOTAL POT:
        </span>
        <span className="font-display text-lg font-black tracking-tight text-slate-950">
          ${pot.toLocaleString()}
        </span>
      </div>

      {activeSidePots.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
          {activeSidePots.map((sp, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-purple-100 border border-purple-300 text-purple-900 font-extrabold"
            >
              Side {idx + 1}: ${sp.amount.toLocaleString()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
