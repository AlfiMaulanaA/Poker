import type { PlayingCard, Rank, Suit } from '@/types/poker';

export const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

export const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣'
};

export const SUIT_COLORS: Record<Suit, string> = {
  spades: 'text-slate-900 dark:text-slate-100',
  hearts: 'text-rose-500',
  diamonds: 'text-rose-500',
  clubs: 'text-emerald-500'
};

export const SUIT_4COLOR: Record<Suit, string> = {
  spades: 'text-slate-900 dark:text-slate-100',
  hearts: 'text-rose-500',
  diamonds: 'text-blue-500',
  clubs: 'text-emerald-500'
};

export function createDeck(): PlayingCard[] {
  const deck: PlayingCard[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank}-${suit}`,
        rank,
        suit
      });
    }
  }
  return deck;
}
