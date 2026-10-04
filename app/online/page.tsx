'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users } from 'lucide-react';

export default function OnlinePage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [roomName, setRoomName] = useState('High Rollers Club');
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
    <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-8 text-slate-800">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
          Online Poker Tables
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-medium">
          Create a private room with a custom room code or join your friends’ table instantly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Create Private Table */}
        <form onSubmit={handleCreateRoom} className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plus className="h-5 w-5 text-blue-600" />
              <h2 className="font-display text-lg font-extrabold text-slate-800">Create Private Room</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-1">
                  Max Seats (2-8 Players)
                </label>
                <select
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:border-blue-500"
                >
                  {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} Players
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-1">
                  Starting Virtual Chips
                </label>
                <select
                  value={startingChips}
                  onChange={(e) => setStartingChips(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={1000}>$1,000</option>
                  <option value={2000}>$2,000</option>
                  <option value={5000}>$5,000</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-6 !py-3.5 text-sm font-extrabold uppercase shadow-lg shadow-blue-500/25">
            Create Table & Generate Code ➔
          </button>
        </form>

        {/* Join Table */}
        <form onSubmit={handleJoinRoom} className="card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-purple-600" />
              <h2 className="font-display text-lg font-extrabold text-slate-800">Join Table by Code</h2>
            </div>

            <p className="text-xs text-slate-500 font-medium mb-4">
              Enter the room code shared by your host (e.g. <span className="font-mono text-blue-600 font-bold">PKR-X7P9</span>).
            </p>

            <div>
              <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-1">
                Room Code
              </label>
              <input
                type="text"
                placeholder="e.g. PKR-X7P9"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-black text-center tracking-widest text-lg uppercase focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-secondary w-full mt-6 !py-3.5 text-sm font-extrabold uppercase bg-purple-600 hover:bg-purple-500 text-white border-purple-400">
            Join Room ➔
          </button>
        </form>
      </div>
    </div>
  );
}
