import { describe, expect, it } from 'vitest';
import { createDeck } from '@/lib/poker/deck';
import { applyAction, createInitialState, startHand } from '@/lib/poker/engine';
import { calculatePots } from '@/lib/poker/pots';
import { shuffleDeck } from '@/lib/poker/shuffle';
import type { PokerPlayer } from '@/types/poker';

describe('Poker Deck & Shuffle Engine', () => {
  it('creates 52 unique playing cards', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(52);
    const ids = new Set(deck.map((c) => c.id));
    expect(ids.size).toBe(52);
  });

  it('secure shuffle preserves all 52 cards', () => {
    const original = createDeck();
    const shuffled = shuffleDeck(original);
    expect(shuffled).toHaveLength(52);
    expect(new Set(shuffled.map((c) => c.id)).size).toBe(52);
  });
});

describe('Texas Hold’em Betting & Game Flow', () => {
  it('starts hand with 2 hole cards per player and posts blinds', () => {
    const state = createInitialState({ botCount: 3, startingChips: 2000, smallBlind: 10, bigBlind: 20 });
    const started = startHand(state);

    expect(started.status).toBe('playing');
    expect(started.street).toBe('preflop');
    expect(started.pot).toBe(30); // 10 SB + 20 BB
    expect(started.players.every((p) => p.cards?.length === 2)).toBe(true);
  });

  it('handles fold action correctly', () => {
    const state = createInitialState({ botCount: 1, startingChips: 1000 });
    const started = startHand(state);
    const actorSeat = started.currentPlayerSeat;

    const result = applyAction(started, actorSeat, { type: 'fold' });
    expect(result.ok).toBe(true);
    expect(result.state.status).toBe('finished');
  });

  it('calculates main pot and side pots accurately for all-in short stack', () => {
    const mockPlayers: PokerPlayer[] = [
      { id: '1', name: 'A', avatar: '🦊', seat: 0, chips: 0, currentBet: 500, totalBetInHand: 500, folded: false, allIn: true, connected: true, isBot: false },
      { id: '2', name: 'B', avatar: '🐼', seat: 1, chips: 0, currentBet: 1000, totalBetInHand: 1000, folded: false, allIn: true, connected: true, isBot: true },
      { id: '3', name: 'C', avatar: '🐯', seat: 2, chips: 1000, currentBet: 2000, totalBetInHand: 2000, folded: false, allIn: false, connected: true, isBot: true }
    ];

    const pots = calculatePots(mockPlayers);
    expect(pots).toHaveLength(3);
    expect(pots[0]?.amount).toBe(1500); // 500 * 3
    expect(pots[1]?.amount).toBe(1000); // 500 * 2
    expect(pots[2]?.amount).toBe(1000); // 1000 * 1
  });
});
