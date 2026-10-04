import { RANK_VALUES } from './deck';
import { evaluate7Cards } from './evaluator';
import type { Difficulty, PlayingCard, PokerAction, PokerGameState, PokerPlayer } from '@/types/poker';

/**
 * Estimate hole card strength preflop (0 to 1 scale).
 */
function preflopStrength(cards: PlayingCard[]): number {
  if (cards.length !== 2) return 0.3;
  const c1 = cards[0]!;
  const c2 = cards[1]!;
  const v1 = RANK_VALUES[c1.rank];
  const v2 = RANK_VALUES[c2.rank];
  const high = Math.max(v1, v2);
  const low = Math.min(v1, v2);
  const isPair = v1 === v2;
  const isSuited = c1.suit === c2.suit;

  if (isPair) {
    return 0.5 + (high / 14) * 0.5; // Pair of Aces = 1.0, 2s = 0.57
  }

  let strength = (high * 1.5 + low) / 35;
  if (isSuited) strength += 0.1;
  if (high - low === 1) strength += 0.05; // connectors

  return Math.min(0.95, Math.max(0.1, strength));
}

/**
 * Calculate post-flop strength based on evaluated hand.
 */
function postflopStrength(cards: PlayingCard[], community: PlayingCard[]): number {
  if (community.length === 0) return preflopStrength(cards);
  const evaluated = evaluate7Cards([...cards, ...community]);
  // Category score range roughly 10,000,000 (High Card) to 100,000,000 (Royal Flush)
  return Math.min(1.0, evaluated.score / 100000000);
}

/**
 * Select best action for bot based on game state and difficulty.
 */
export function chooseBotAction(
  state: PokerGameState,
  botPlayer: PokerPlayer,
  difficulty: Difficulty = 'normal'
): PokerAction {
  const cards = botPlayer.cards ?? [];
  const community = state.communityCards;
  const callAmount = state.currentBet - botPlayer.currentBet;
  const canCheck = callAmount === 0;

  const strength =
    state.street === 'preflop'
      ? preflopStrength(cards)
      : postflopStrength(cards, community);

  // Random factor for variability
  const rand = Math.random();

  if (difficulty === 'beginner') {
    // Beginner: Fold weak hands if betted, otherwise Check/Call
    if (canCheck) {
      if (strength > 0.7 && rand > 0.6) {
        const betAmt = Math.min(botPlayer.chips, state.bigBlind * 2);
        return { type: 'bet', amount: betAmt };
      }
      return { type: 'check' };
    }
    if (callAmount > botPlayer.chips) {
      return strength > 0.75 ? { type: 'all_in' } : { type: 'fold' };
    }
    if (callAmount > state.bigBlind * 3 && strength < 0.45) {
      return { type: 'fold' };
    }
    return { type: 'call' };
  }

  if (difficulty === 'normal') {
    if (canCheck) {
      if (strength > 0.65 && rand > 0.4) {
        const betAmt = Math.min(botPlayer.chips, Math.max(state.bigBlind * 2, Math.floor(state.pot * 0.5)));
        return { type: 'bet', amount: betAmt };
      }
      return { type: 'check' };
    }

    if (callAmount >= botPlayer.chips) {
      return strength > 0.7 ? { type: 'all_in' } : { type: 'fold' };
    }

    if (strength > 0.8 && rand > 0.3) {
      const raiseAmt = Math.min(
        botPlayer.chips,
        Math.max(state.minimumRaise, state.currentBet + Math.floor(state.pot * 0.75))
      );
      return { type: 'raise', amount: raiseAmt };
    }

    if (callAmount > state.pot * 0.6 && strength < 0.4) {
      return { type: 'fold' };
    }

    return { type: 'call' };
  }

  // Advanced Bot
  const potOdds = callAmount / (state.pot + callAmount || 1);

  if (canCheck) {
    if (strength > 0.55 && rand > 0.3) {
      const betAmt = Math.min(botPlayer.chips, Math.max(state.bigBlind * 2, Math.floor(state.pot * 0.66)));
      return { type: 'bet', amount: betAmt };
    }
    return { type: 'check' };
  }

  if (callAmount >= botPlayer.chips) {
    return strength > potOdds * 1.8 ? { type: 'all_in' } : { type: 'fold' };
  }

  if (strength > 0.75 && rand > 0.2) {
    const raiseAmt = Math.min(
      botPlayer.chips,
      Math.max(state.minimumRaise, state.currentBet + Math.floor(state.pot * 0.75))
    );
    return { type: 'raise', amount: raiseAmt };
  }

  if (strength < potOdds * 0.9 && callAmount > state.bigBlind * 2) {
    return { type: 'fold' };
  }

  return { type: 'call' };
}
