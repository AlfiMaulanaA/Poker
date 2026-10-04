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
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/40 text-amber-300 shadow-md backdrop-blur-sm">
        <Coins className="h-4 w-4 animate-bounce text-amber-400" />
        <span className="font-display text-xs font-bold uppercase tracking-wider text-amber-200">
          TOTAL POT:
        </span>
        <span className="font-display text-lg font-black tracking-tight text-amber-400">
          {pot.toLocaleString()}
        </span>
      </div>

      {activeSidePots.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
          {activeSidePots.map((sp, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold"
            >
              Side {idx + 1}: {sp.amount.toLocaleString()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
