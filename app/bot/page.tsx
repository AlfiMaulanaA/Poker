'use client';

import { useState } from 'react';
import { GameScreen } from '@/components/game/GameScreen';
import { GameSetup } from '@/components/game/GameSetup';
import { usePokerGame } from '@/hooks/usePokerGame';
import type { Difficulty } from '@/types/poker';

export default function BotPage() {
  const [phase, setPhase] = useState<'setup' | 'game'>('setup');
  const [setupConfig, setSetupConfig] = useState<{
    botCount: number;
    startingChips: number;
    smallBlind: number;
    bigBlind: number;
    difficulty: Difficulty;
  }>({
    botCount: 3,
    startingChips: 2000,
    smallBlind: 10,
    bigBlind: 20,
    difficulty: 'normal'
  });

  const api = usePokerGame({
    mode: 'bot',
    resume: true,
    botCount: setupConfig.botCount,
    startingChips: setupConfig.startingChips,
    smallBlind: setupConfig.smallBlind,
    bigBlind: setupConfig.bigBlind
  });

  const handleStart = (config: typeof setupConfig) => {
    setSetupConfig(config);
    api.resetGame(config);
    setPhase('game');
  };

  if (phase === 'setup') {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6">
        <GameSetup mode="bot" onStart={handleStart} />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-1 py-2 sm:px-4 sm:py-4 lg:px-6">
      <GameScreen api={api} onBackToSetup={() => setPhase('setup')} />
    </main>
  );
}
