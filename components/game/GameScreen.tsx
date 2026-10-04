'use client';

import { useState } from 'react';
import { GameControls } from './GameControls';
import { HandResultModal } from '../poker/HandResultModal';
import { PokerActions } from '../poker/PokerActions';
import { PokerTable } from '../poker/PokerTable';
import type { PokerGameApi } from '@/hooks/usePokerGame';
import { loadSettings, saveSettings } from '@/lib/storage';

type GameScreenProps = {
  api: PokerGameApi;
  onBackToSetup: () => void;
};

export function GameScreen({ api, onBackToSetup }: GameScreenProps) {
  const [settings, setSettings] = useState(loadSettings);
  const {
    game,
    turnTimeRemaining,
    isPaused,
    isYourTurn,
    canCheck,
    callAmount,
    minRaise,
    maxRaise,
    dispatchAction,
    nextHand,
    resetGame,
    togglePause
  } = api;

  const toggleSound = () => {
    const updated = { ...settings, sound: !settings.sound };
    setSettings(updated);
    saveSettings(updated);
  };

  return (
    <div className="mx-auto flex flex-col w-full max-w-5xl px-3 py-4 gap-4 text-white">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-lg tracking-tight text-cyan-400">
            NEON POKER
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-xs font-bold uppercase text-slate-300 border border-slate-700">
            {game.street}
          </span>
        </div>

        <GameControls
          isPaused={isPaused}
          soundEnabled={settings.sound}
          onTogglePause={togglePause}
          onToggleSound={toggleSound}
          onReset={() => resetGame()}
          onExit={onBackToSetup}
        />
      </div>

      {/* Main Poker Table Area */}
      <div className="relative">
        <PokerTable state={game} turnTimeRemaining={turnTimeRemaining} fourColor={settings.fourColorDeck} />

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center rounded-[100px] bg-slate-950/85 backdrop-blur-md p-6 text-center animate-fade-in">
            <h3 className="font-display text-2xl font-black text-amber-400">GAME PAUSED</h3>
            <p className="mt-1 text-sm text-slate-300">The game clock and bot turns are paused.</p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                className="btn-primary !px-5 !py-2.5 text-sm font-bold shadow-lg"
                onClick={togglePause}
              >
                Resume Game
              </button>
              <button
                type="button"
                className="btn-secondary !px-4 !py-2.5 text-sm font-semibold"
                onClick={onBackToSetup}
              >
                Exit Game
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Controls Bar */}
      <div className="w-full max-w-2xl mx-auto">
        <PokerActions
          isYourTurn={isYourTurn}
          canCheck={canCheck}
          callAmount={callAmount}
          minRaise={minRaise}
          maxRaise={maxRaise}
          pot={game.pot}
          currentBet={game.currentBet}
          onAction={dispatchAction}
        />
      </div>

      {/* Action History Log */}
      {settings.showActionLog && game.actionLog.length > 0 && (
        <div className="w-full max-w-2xl mx-auto mt-1 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 max-h-24 overflow-y-auto">
          <div className="font-display font-bold text-[10px] text-slate-500 uppercase tracking-wide mb-1">
            Action Log
          </div>
          {game.actionLog.slice(0, 5).map((log, idx) => (
            <div key={idx} className="py-0.5 border-b border-slate-800/40 last:border-none">
              • {log}
            </div>
          ))}
        </div>
      )}

      {/* Hand Result Modal */}
      {game.status === 'finished' && (
        <HandResultModal state={game} onNextHand={nextHand} />
      )}
    </div>
  );
}
