'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users } from 'lucide-react';

export default function OnlinePage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('Neon High Rollers');
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [startingChips, setStartingChips] = useState(2000);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `PKR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    router.push(`/room/${generatedCode}`);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    const formatted = roomCode.trim().toUpperCase().startsWith('PKR-')
      ? roomCode.trim().toUpperCase()
      : `PKR-${roomCode.trim().toUpperCase()}`;
    router.push(`/room/${formatted}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 text-white">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-cyan-400">
          Online Poker Tables
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          Create a private room with a custom room code or join your friends’ table instantly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Create Private Table */}
        <form onSubmit={handleCreateRoom} className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plus className="h-5 w-5 text-cyan-400" />
              <h2 className="font-display text-lg font-bold text-white">Create Private Room</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1">
                  Max Seats (2-8 Players)
                </label>
                <select
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-cyan-400"
                >
                  {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} Players
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1">
                  Starting Virtual Chips
                </label>
                <select
                  value={startingChips}
                  onChange={(e) => setStartingChips(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value={1000}>$1,000</option>
                  <option value={2000}>$2,000</option>
                  <option value={5000}>$5,000</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-6 !py-3 text-sm font-extrabold uppercase">
            Create Table & Generate Code ➔
          </button>
        </form>

        {/* Join Table */}
        <form onSubmit={handleJoinRoom} className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-purple-400" />
              <h2 className="font-display text-lg font-bold text-white">Join Table by Code</h2>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Enter the 4 to 8 character room code shared by your host (e.g. <span className="font-mono text-cyan-400 font-bold">PKR-X7P9</span>).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1">
                Room Code
              </label>
              <input
                type="text"
                placeholder="e.g. PKR-X7P9"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-center tracking-widest text-lg uppercase focus:outline-none focus:border-purple-400"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-secondary w-full mt-6 !py-3 text-sm font-extrabold uppercase bg-purple-600 hover:bg-purple-500 text-white border-purple-400">
            Join Room ➔
          </button>
        </form>
      </div>
    </div>
  );
}
