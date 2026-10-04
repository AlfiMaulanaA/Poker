'use client';

import { CommunityCards } from './CommunityCards';
import { PlayerSeat } from './PlayerSeat';
import { PotDisplay } from './PotDisplay';
import type { PokerGameState } from '@/types/poker';

type PokerTableProps = {
  state: PokerGameState;
  turnTimeRemaining?: number;
  fourColor?: boolean;
};

// Precise percentages around the oval table so seats never overlap center cards or pot
const SEAT_POSITIONS: Record<number, { top: string; left: string }> = {
  0: { top: '88%', left: '50%' }, // Bottom Center (You)
  1: { top: '74%', left: '16%' }, // Bottom Left
  2: { top: '38%', left: '10%' }, // Middle Left
  3: { top: '12%', left: '32%' }, // Top Left
  4: { top: '12%', left: '68%' }, // Top Right
  5: { top: '38%', left: '90%' }, // Middle Right
  6: { top: '74%', left: '84%' }, // Bottom Right
  7: { top: '12%', left: '50%' }  // Top Center
};

export function PokerTable({ state, turnTimeRemaining = 20, fourColor = false }: PokerTableProps) {
  const totalPlayers = state.players.length;

  const getRole = (seat: number): 'D' | 'SB' | 'BB' | null => {
    if (seat === state.dealerSeat) return 'D';
    if (seat === state.smallBlindSeat) return 'SB';
    if (seat === state.bigBlindSeat) return 'BB';
    return null;
  };

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-4xl mx-auto rounded-[100px] sm:rounded-[140px] border-[12px] sm:border-[16px] border-[#1C2C24] bg-gradient-to-b from-[#0F4C3A] via-[#093528] to-[#041B14] shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_0_60px_rgba(34,211,238,0.15)] p-4 flex flex-col items-center justify-center select-none my-2">
      {/* Glossy Table Felt Outer Glow Ring */}
      <div className="absolute inset-3 rounded-[85px] sm:rounded-[125px] border-2 border-emerald-400/30 shadow-[inset_0_0_30px_rgba(16,185,129,0.2)] pointer-events-none" />
      <div className="absolute inset-8 rounded-[70px] sm:rounded-[110px] border border-cyan-400/20 pointer-events-none" />

      {/* Center Table Content: Pot Display & Community Cards */}
      <div className="z-10 flex flex-col items-center gap-3 transform -translate-y-1">
        <PotDisplay pot={state.pot} sidePots={state.sidePots} />
        <CommunityCards
          cards={state.communityCards}
          winningCards={state.status === 'finished' ? state.communityCards : []}
          fourColor={fourColor}
        />
      </div>

      {/* Player Seats positioned around the table */}
      {state.players.map((player) => {
        const pos = SEAT_POSITIONS[player.seat % totalPlayers] || SEAT_POSITIONS[0]!;
        const isTurn = state.status === 'playing' && state.currentPlayerSeat === player.seat;
        const isWinner = state.winnerSeats.includes(player.seat);
        const role = getRole(player.seat);

        return (
          <div
            key={player.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ top: pos.top, left: pos.left }}
          >
            <PlayerSeat
              player={player}
              isCurrentTurn={isTurn}
              turnTimeRemaining={turnTimeRemaining}
              dealerRole={role}
              isWinner={isWinner}
              fourColor={fourColor}
            />
          </div>
        );
      })}
    </div>
  );
}
