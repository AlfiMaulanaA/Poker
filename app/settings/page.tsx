'use client';

import { useSettings } from '@/components/settings/SettingsProvider';
import { Sliders, User } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🤖', '👾', '🦁', '🐧'];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-8 text-white">
      <h1 className="font-display text-3xl font-black text-cyan-400 mb-6">
        Game Settings
      </h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-cyan-400" />
            <h2 className="font-display text-lg font-bold text-white">Player Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={settings.displayName}
                onChange={(e) => updateSettings({ displayName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 font-display uppercase tracking-wider mb-2">
                Choose Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      settings.avatar === av
                        ? 'bg-cyan-500/20 border-2 border-cyan-400 scale-110 shadow-glow'
                        : 'bg-slate-950 border border-slate-800 hover:bg-slate-800'
                    }`}
                    onClick={() => updateSettings({ avatar: av })}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual & Audio Options */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="h-5 w-5 text-purple-400" />
            <h2 className="font-display text-lg font-bold text-white">Visual & Audio Preferences</h2>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <div className="font-display text-sm font-bold text-slate-200">Sound Effects</div>
              <div className="text-xs text-slate-400">Play audio cues for card deals, chips, and wins.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.sound ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
              onClick={() => updateSettings({ sound: !settings.sound })}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.sound ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <div className="font-display text-sm font-bold text-slate-200">4-Color Deck Mode</div>
              <div className="text-xs text-slate-400">Spades Black, Hearts Red, Diamonds Blue, Clubs Green.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.fourColorDeck ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
              onClick={() => updateSettings({ fourColorDeck: !settings.fourColorDeck })}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.fourColorDeck ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-display text-sm font-bold text-slate-200">Show Action Log</div>
              <div className="text-xs text-slate-400">Display previous player bets and folds history log.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.showActionLog ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
              onClick={() => updateSettings({ showActionLog: !settings.showActionLog })}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.showActionLog ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
