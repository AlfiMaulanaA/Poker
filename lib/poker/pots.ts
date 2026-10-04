import type { PokerPlayer, SidePot } from '@/types/poker';

/**
 * Calculates main pot and side pots based on each player's total contribution in the hand.
 */
export function calculatePots(players: PokerPlayer[]): SidePot[] {
  // Get active players who contributed to the pot
  const contributors = players
    .filter((p) => p.totalBetInHand > 0)
    .map((p) => ({
      seat: p.seat,
      totalBet: p.totalBetInHand,
      allIn: p.allIn,
      folded: p.folded
    }))
    .sort((a, b) => a.totalBet - b.totalBet);

  if (contributors.length === 0) {
    return [{ amount: 0, eligibleSeats: players.map((p) => p.seat) }];
  }

  const pots: SidePot[] = [];
  let processedBet = 0;

  // Find unique bet thresholds from all-in and active players
  const levels = Array.from(new Set(contributors.map((c) => c.totalBet))).sort((a, b) => a - b);

  for (const level of levels) {
    if (level <= processedBet) continue;

    const currentTierBet = level - processedBet;
    let potAmount = 0;
    const eligibleSeats: number[] = [];

    for (const player of players) {
      if (player.totalBetInHand > processedBet) {
        const contribution = Math.min(player.totalBetInHand - processedBet, currentTierBet);
        potAmount += contribution;

        // Eligible if player contributed to this tier AND hasn't folded
        if (!player.folded && player.totalBetInHand >= level) {
          eligibleSeats.push(player.seat);
        }
      }
    }

    if (potAmount > 0) {
      pots.push({
        amount: potAmount,
        eligibleSeats
      });
    }

    processedBet = level;
  }

  return pots;
}
