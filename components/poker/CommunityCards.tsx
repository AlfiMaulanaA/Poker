'use client';

import { PlayingCard } from './PlayingCard';
import type { PlayingCard as PlayingCardType } from '@/types/poker';

type CommunityCardsProps = {
  cards: PlayingCardType[];
  winningCards?: PlayingCardType[];
  fourColor?: boolean;
};

export function CommunityCards({ cards, winningCards = [], fourColor = false }: CommunityCardsProps) {
  const isWinning = (card: PlayingCardType) =>
    winningCards.some((w) => w.rank === card.rank && w.suit === card.suit);

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 shadow-glow">
      {[0, 1, 2, 3, 4].map((index) => {
        const card = cards[index];
        return (
          <div key={index} className="transition-all duration-300 transform">
            {card ? (
              <PlayingCard card={card} highlight={isWinning(card)} size="lg" fourColor={fourColor} />
            ) : (
              <div className="w-12 h-16 sm:w-16 sm:h-24 rounded-lg border-2 border-dashed border-slate-700/60 bg-slate-950/40 flex items-center justify-center text-slate-600 font-display text-xs">
                {index < 3 ? 'FLOP' : index === 3 ? 'TURN' : 'RIVER'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
