import { describe, expect, it } from 'vitest';
import { evaluate7Cards } from '@/lib/poker/evaluator';
import type { PlayingCard } from '@/types/poker';

function card(rank: PlayingCard['rank'], suit: PlayingCard['suit']): PlayingCard {
  return { id: `${rank}-${suit}`, rank, suit };
}

describe('Texas Hold’em Hand Evaluator', () => {
  it('identifies a Royal Flush', () => {
    const cards = [
      card('A', 'spades'),
      card('K', 'spades'),
      card('Q', 'spades'),
      card('J', 'spades'),
      card('10', 'spades'),
      card('2', 'hearts'),
      card('5', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Royal Flush');
  });

  it('identifies a Straight Flush', () => {
    const cards = [
      card('9', 'hearts'),
      card('8', 'hearts'),
      card('7', 'hearts'),
      card('6', 'hearts'),
      card('5', 'hearts'),
      card('K', 'spades'),
      card('2', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Straight Flush');
  });

  it('identifies Four of a Kind', () => {
    const cards = [
      card('K', 'spades'),
      card('K', 'hearts'),
      card('K', 'diamonds'),
      card('K', 'clubs'),
      card('A', 'spades'),
      card('2', 'hearts'),
      card('3', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Four of a Kind');
  });

  it('identifies a Full House', () => {
    const cards = [
      card('J', 'spades'),
      card('J', 'hearts'),
      card('J', 'diamonds'),
      card('8', 'clubs'),
      card('8', 'spades'),
      card('2', 'hearts'),
      card('3', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Full House');
  });

  it('identifies a Flush', () => {
    const cards = [
      card('A', 'diamonds'),
      card('J', 'diamonds'),
      card('9', 'diamonds'),
      card('4', 'diamonds'),
      card('2', 'diamonds'),
      card('K', 'spades'),
      card('Q', 'hearts')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Flush');
  });

  it('identifies Ace-low wheel straight (A-2-3-4-5)', () => {
    const cards = [
      card('A', 'spades'),
      card('2', 'hearts'),
      card('3', 'diamonds'),
      card('4', 'clubs'),
      card('5', 'spades'),
      card('K', 'hearts'),
      card('Q', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('Straight');
    expect(hand.kickers[0]).toBe(5);
  });

  it('correctly ranks High Card', () => {
    const cards = [
      card('A', 'spades'),
      card('J', 'hearts'),
      card('8', 'diamonds'),
      card('6', 'clubs'),
      card('2', 'spades'),
      card('3', 'hearts'),
      card('4', 'clubs')
    ];
    const hand = evaluate7Cards(cards);
    expect(hand.category).toBe('High Card');
  });
});
