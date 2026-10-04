import type { PlayingCard } from '@/types/poker';

/**
 * Secure Fisher-Yates shuffle using crypto.getRandomValues
 */
export function shuffleDeck(cards: PlayingCard[]): PlayingCard[] {
  const deck = [...cards];
  const length = deck.length;

  for (let i = length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(randomBuffer);
    } else if (typeof globalThis !== 'undefined' && globalThis.crypto) {
      globalThis.crypto.getRandomValues(randomBuffer);
    } else {
      randomBuffer[0] = Math.floor(Math.random() * 0xffffffff);
    }

    const j = randomBuffer[0]! % (i + 1);
    const temp = deck[i]!;
    deck[i] = deck[j]!;
    deck[j] = temp;
  }

  return deck;
}
