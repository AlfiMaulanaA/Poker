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

// Seat placement offsets around the oval table (percentage top & left)
const SEAT_POSITIONS: Record<number, { top: string; left: string }> = {
  0: { top: '82%', left: '50%' }, // Bottom Center (You)
  1: { top: '70%', left: '15%' }, // Bottom Left
  2: { top: '35%', left: '10%' }, // Top Left
  3: { top: '12%', left: '30%' }, // Top Left-Center
  4: { top: '12%', left: '70%' }, // Top Right-Center
  5: { top: '35%', left: '90%' }, // Top Right
  6: { top: '70%', left: '85%' }, // Bottom Right
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
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-w-4xl mx-auto rounded-[100px] sm:rounded-[140px] border-[12px] sm:border-[16px] border-[#1C2C24] bg-gradient-to-b from-poker-felt via-[#0A3024] to-[#062018] shadow-table overflow-hidden p-4 flex flex-col items-center justify-center select-none">
      {/* Soft Table Felt Glow */}
      <div className="absolute inset-4 rounded-[80px] sm:rounded-[120px] border border-poker-emerald/20 pointer-events-none" />

      {/* Center Table Content: Pot Display & Community Cards */}
      <div className="z-10 flex flex-col items-center gap-3 transform -translate-y-2">
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
