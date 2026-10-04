'use client';

import { ArrowLeft, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

type GameControlsProps = {
  isPaused: boolean;
  soundEnabled: boolean;
  onTogglePause: () => void;
  onToggleSound: () => void;
  onReset: () => void;
  onExit: () => void;
};

export function GameControls({
  isPaused,
  soundEnabled,
  onTogglePause,
  onToggleSound,
  onReset,
  onExit
}: GameControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="btn-secondary !px-3 !py-1.5 text-xs font-bold flex items-center gap-1.5"
        onClick={onExit}
        title="Exit to menu"
      >
        <ArrowLeft className="h-4 w-4" /> Exit
      </button>

      <button
        type="button"
        className="btn-secondary !px-3 !py-1.5 text-xs font-bold flex items-center gap-1.5"
        onClick={onTogglePause}
        title={isPaused ? 'Resume game' : 'Pause game'}
      >
        {isPaused ? <Play className="h-4 w-4 text-amber-400" /> : <Pause className="h-4 w-4 text-slate-300" />}
        {isPaused ? 'Resume' : 'Pause'}
      </button>

      <button
        type="button"
        className="btn-secondary !px-3 !py-1.5 text-xs font-bold flex items-center gap-1.5"
        onClick={onReset}
        title="Restart match"
      >
        <RotateCcw className="h-4 w-4" /> Restart
      </button>

      <button
        type="button"
        className="btn-ghost !px-2.5 !py-1.5 text-xs font-bold"
        onClick={onToggleSound}
        title={soundEnabled ? 'Mute audio' : 'Enable audio'}
      >
        {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
      </button>
    </div>
  );
}
