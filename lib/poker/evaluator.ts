import { RANK_VALUES } from './deck';
import type { EvaluatedHand, HandCategory, PlayingCard } from '@/types/poker';

/**
 * Generate all combinations of k elements from an array.
 */
function combinations<T>(array: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (array.length === 0) return [];
  const head = array[0]!;
  const tail = array.slice(1);
  const withHead = combinations(tail, k - 1).map((c) => [head, ...c]);
  const withoutHead = combinations(tail, k);
  return [...withHead, ...withoutHead];
}

/**
 * Evaluate a 5-card poker hand.
 */
function evaluate5Cards(cards: PlayingCard[]): EvaluatedHand {
  if (cards.length !== 5) {
    throw new Error('evaluate5Cards requires exactly 5 cards');
  }

  // Sort descending by rank value
  const sorted = [...cards].sort((a, b) => RANK_VALUES[b.rank] - RANK_VALUES[a.rank]);
  const values = sorted.map((c) => RANK_VALUES[c.rank]);
  const suits = sorted.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Check straight
  let isStraight = false;
  let straightHigh = 0;

  // Standard straight check (e.g. A-K-Q-J-10 or 8-7-6-5-4)
  if (
    values[0]! - values[1]! === 1 &&
    values[1]! - values[2]! === 1 &&
    values[2]! - values[3]! === 1 &&
    values[3]! - values[4]! === 1
  ) {
    isStraight = true;
    straightHigh = values[0]!;
  } else if (values[0] === 14 && values[1] === 5 && values[2] === 4 && values[3] === 3 && values[4] === 2) {
    // Ace-low wheel straight A-2-3-4-5
    isStraight = true;
    straightHigh = 5;
  }

  // Count rank frequencies
  const counts: Record<number, number> = {};
  for (const v of values) {
    counts[v] = (counts[v] || 0) + 1;
  }

  // Group by frequency descending, then rank descending
  const freqGroups = Object.entries(counts)
    .map(([rankStr, count]) => ({ rank: Number(rankStr), count }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);

  const countsList = freqGroups.map((g) => g.count);

  // Score formula:
  // Base category score * 1,000,000 + weighted kickers
  // Kicker weights: v1*16^4 + v2*16^3 + v3*16^2 + v4*16 + v5

  let category: HandCategory = 'High Card';
  let categoryBase = 1;
  let description = '';

  if (isFlush && isStraight) {
    if (straightHigh === 14) {
      category = 'Royal Flush';
      categoryBase = 10;
      description = `Royal Flush in ${cards[0]?.suit}`;
    } else {
      category = 'Straight Flush';
      categoryBase = 9;
      description = `Straight Flush, ${straightHigh} High`;
    }
    const score = categoryBase * 10000000 + straightHigh;
    return { category, score, best5: sorted, description, kickers: [straightHigh] };
  }

  if (countsList[0] === 4) {
    category = 'Four of a Kind';
    categoryBase = 8;
    const quadRank = freqGroups[0]!.rank;
    const kicker = freqGroups[1]!.rank;
    description = `Four of a Kind, ${sorted.find((c) => RANK_VALUES[c.rank] === quadRank)?.rank}s`;
    const score = categoryBase * 10000000 + quadRank * 100 + kicker;
    return { category, score, best5: sorted, description, kickers: [quadRank, kicker] };
  }

  if (countsList[0] === 3 && countsList[1] === 2) {
    category = 'Full House';
    categoryBase = 7;
    const tripRank = freqGroups[0]!.rank;
    const pairRank = freqGroups[1]!.rank;
    const tripName = sorted.find((c) => RANK_VALUES[c.rank] === tripRank)?.rank;
    const pairName = sorted.find((c) => RANK_VALUES[c.rank] === pairRank)?.rank;
    description = `Full House, ${tripName}s full of ${pairName}s`;
    const score = categoryBase * 10000000 + tripRank * 100 + pairRank;
    return { category, score, best5: sorted, description, kickers: [tripRank, pairRank] };
  }

  if (isFlush) {
    category = 'Flush';
    categoryBase = 6;
    const topRank = sorted[0]?.rank;
    description = `Flush, ${topRank} High`;
    const kickerScore = values.reduce((acc, v, i) => acc + v * Math.pow(16, 4 - i), 0);
    const score = categoryBase * 10000000 + kickerScore;
    return { category, score, best5: sorted, description, kickers: values };
  }

  if (isStraight) {
    category = 'Straight';
    categoryBase = 5;
    description = `Straight, ${straightHigh === 5 ? '5' : sorted[0]?.rank} High`;
    const score = categoryBase * 10000000 + straightHigh;
    return { category, score, best5: sorted, description, kickers: [straightHigh] };
  }

  if (countsList[0] === 3) {
    category = 'Three of a Kind';
    categoryBase = 4;
    const tripRank = freqGroups[0]!.rank;
    const kickers = [freqGroups[1]!.rank, freqGroups[2]!.rank];
    const tripName = sorted.find((c) => RANK_VALUES[c.rank] === tripRank)?.rank;
    description = `Three of a Kind, ${tripName}s`;
    const score = categoryBase * 10000000 + tripRank * 10000 + kickers[0]! * 100 + kickers[1]!;
    return { category, score, best5: sorted, description, kickers: [tripRank, ...kickers] };
  }

  if (countsList[0] === 2 && countsList[1] === 2) {
    category = 'Two Pair';
    categoryBase = 3;
    const highPair = freqGroups[0]!.rank;
    const lowPair = freqGroups[1]!.rank;
    const kicker = freqGroups[2]!.rank;
    const hpName = sorted.find((c) => RANK_VALUES[c.rank] === highPair)?.rank;
    const lpName = sorted.find((c) => RANK_VALUES[c.rank] === lowPair)?.rank;
    description = `Two Pair, ${hpName}s and ${lpName}s`;
    const score = categoryBase * 10000000 + highPair * 10000 + lowPair * 100 + kicker;
    return { category, score, best5: sorted, description, kickers: [highPair, lowPair, kicker] };
  }

  if (countsList[0] === 2) {
    category = 'One Pair';
    categoryBase = 2;
    const pairRank = freqGroups[0]!.rank;
    const kickers = [freqGroups[1]!.rank, freqGroups[2]!.rank, freqGroups[3]!.rank];
    const pairName = sorted.find((c) => RANK_VALUES[c.rank] === pairRank)?.rank;
    description = `Pair of ${pairName}s`;
    const score =
      categoryBase * 10000000 +
      pairRank * 100000 +
      kickers[0]! * 16 * 16 +
      kickers[1]! * 16 +
      kickers[2]!;
    return { category, score, best5: sorted, description, kickers: [pairRank, ...kickers] };
  }

  // High card
  category = 'High Card';
  categoryBase = 1;
  description = `High Card, ${sorted[0]?.rank}`;
  const kickerScore = values.reduce((acc, v, i) => acc + v * Math.pow(16, 4 - i), 0);
  const score = categoryBase * 10000000 + kickerScore;
  return { category, score, best5: sorted, description, kickers: values };
}

/**
 * Evaluate 7 cards (2 hole + 5 community) and return the absolute best 5-card hand.
 */
export function evaluate7Cards(cards: PlayingCard[]): EvaluatedHand {
  if (cards.length < 5) {
    throw new Error('At least 5 cards required for evaluation');
  }

  // If 5 cards, evaluate directly
  if (cards.length === 5) {
    return evaluate5Cards(cards);
  }

  // Generate all 5-card combinations from available cards (21 combinations for 7 cards)
  const allCombos = combinations(cards, 5);
  let bestHand: EvaluatedHand | null = null;

  for (const combo of allCombos) {
    const evaluated = evaluate5Cards(combo);
    if (!bestHand || evaluated.score > bestHand.score) {
      bestHand = evaluated;
    }
  }

  return bestHand!;
}
