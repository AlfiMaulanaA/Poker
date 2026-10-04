'use client';

import { use, useState } from 'react';
import { Check, Copy, Globe, Play, Users } from 'lucide-react';
import { GameScreen } from '@/components/game/GameScreen';
import { usePokerGame } from '@/hooks/usePokerGame';

export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const [inGame, setInGame] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const api = usePokerGame({
    mode: 'online',
    resume: false,
    botCount: 3
  });

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (inGame) {
    return (
      <main className="mx-auto w-full max-w-6xl px-1 py-2 sm:px-4 sm:py-4 lg:px-6">
        <GameScreen api={api} onBackToSetup={() => setInGame(false)} />
      </main>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 text-white">
      {/* Room Header */}
      <div className="card p-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Globe className="h-3.5 w-3.5" /> Private Online Room
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
          Lobby: <span className="text-cyan-400">{roomId}</span>
        </h1>

        <p className="mt-1 text-xs text-slate-400 font-medium">
          Share this room code with friends to join your private table.
        </p>

        {/* Copy Room Code Button */}
        <div className="mt-4 flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 font-mono font-black text-lg text-cyan-400 tracking-wider">
            {roomId}
          </div>
          <button
            type="button"
            className="btn-secondary !py-2 text-xs font-bold flex items-center gap-1.5"
            onClick={copyRoomCode}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      {/* Player Slots Lobby List */}
      <div className="mt-6 card p-6">
        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-400" /> Table Seats (4 / 6 Active)
        </h3>

        <div className="space-y-2">
          {api.game.players.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{p.avatar}</span>
                <span className="font-display font-bold text-sm text-slate-200">{p.name}</span>
                {p.isYou && (
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[10px] font-extrabold uppercase">
                    YOU
                  </span>
                )}
                {p.isBot && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 text-[10px] font-extrabold uppercase">
                    BOT
                  </span>
                )}
              </div>

              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
                READY
              </span>
            </div>
          ))}
        </div>

        {/* Start Game / Ready Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className={`flex-1 ${
              isReady ? 'btn-secondary bg-emerald-950 text-emerald-300 border-emerald-500' : 'btn-secondary'
            } !py-3 text-sm font-extrabold uppercase`}
            onClick={() => setIsReady((prev) => !prev)}
          >
            {isReady ? '✓ You Are Ready' : 'Set Ready'}
          </button>

          <button
            type="button"
            className="btn-primary flex-1 !py-3 text-sm font-extrabold uppercase flex items-center justify-center gap-2"
            onClick={() => setInGame(true)}
          >
            <Play className="h-4 w-4" /> Start Table Match
          </button>
        </div>
      </div>
    </div>
  );
}
