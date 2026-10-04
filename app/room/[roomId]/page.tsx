'use client';

import { use, useEffect, useState } from 'react';
import { Check, Copy, Globe, Play, Users } from 'lucide-react';
import { GameScreen } from '@/components/game/GameScreen';
import { usePokerGame } from '@/hooks/usePokerGame';
import { p2pManager } from '@/lib/socket/p2pRoom';

export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const [inGame, setInGame] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    p2pManager.createRoom({ roomId });

    return () => {
      p2pManager.disconnect();
    };
  }, [roomId]);

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
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 text-slate-800">
      {/* Room Header */}
      <div className="card p-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-black uppercase tracking-wider mb-2">
          <Globe className="h-3.5 w-3.5" /> Private Online Room
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
          Lobby: <span className="text-blue-600">{roomId}</span>
        </h1>

        <p className="mt-1 text-xs text-slate-500 font-medium">
          Share this room code with friends to join your private table.
        </p>

        {/* Copy Room Code Button */}
        <div className="mt-4 flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 font-mono font-black text-lg text-blue-600 tracking-wider">
            {roomId}
          </div>
          <button
            type="button"
            className="btn-secondary !py-2 text-xs font-bold flex items-center gap-1.5"
            onClick={copyRoomCode}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>

      {/* Player Slots Lobby List */}
      <div className="mt-6 card p-6">
        <h3 className="font-display text-xs font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-600" /> Table Seats (4 / 6 Active)
        </h3>

        <div className="space-y-2">
          {api.game.players.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{p.avatar}</span>
                <span className="font-display font-extrabold text-sm text-slate-800">{p.name}</span>
                {p.isYou && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase">
                    YOU
                  </span>
                )}
                {p.isBot && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-black uppercase">
                    BOT
                  </span>
                )}
              </div>

              <span className="text-xs font-black text-emerald-600 uppercase tracking-wide">
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
              isReady ? 'btn-secondary bg-emerald-50 text-emerald-700 border-emerald-300' : 'btn-secondary'
            } !py-3.5 text-sm font-extrabold uppercase`}
            onClick={() => setIsReady((prev) => !prev)}
          >
            {isReady ? '✓ You Are Ready' : 'Set Ready'}
          </button>

          <button
            type="button"
            className="btn-primary flex-1 !py-3.5 text-sm font-extrabold uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            onClick={() => setInGame(true)}
          >
            <Play className="h-4 w-4" /> Start Table Match
          </button>
        </div>
      </div>
    </div>
  );
}
