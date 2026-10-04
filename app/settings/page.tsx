'use client';

import { useSettings } from '@/components/settings/SettingsProvider';
import { Sliders, User } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  const AVATARS = ['🦊', '🐼', '🐯', '🐸', '🤖', '👾', '🦁', '🐧'];

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-8 text-slate-800">
      <h1 className="font-display text-3xl font-black text-slate-900 mb-6">
        Game Settings
      </h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="font-display text-lg font-extrabold text-slate-800">Player Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={settings.displayName}
                onChange={(e) => updateSettings({ displayName: e.target.value })}
                className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-medium text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-600 font-display uppercase tracking-wider mb-2">
                Choose Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                      settings.avatar === av
                        ? 'bg-blue-100 border-2 border-blue-500 scale-110 shadow-md'
                        : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
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
            <Sliders className="h-5 w-5 text-purple-600" />
            <h2 className="font-display text-lg font-extrabold text-slate-800">Visual & Audio Preferences</h2>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-display text-sm font-extrabold text-slate-800">Sound Effects</div>
              <div className="text-xs text-slate-500 font-medium">Play audio cues for card deals, chips, and wins.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.sound ? 'bg-blue-600' : 'bg-slate-300'
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

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <div className="font-display text-sm font-extrabold text-slate-800">4-Color Deck Mode</div>
              <div className="text-xs text-slate-500 font-medium">Spades Black, Hearts Red, Diamonds Blue, Clubs Green.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.fourColorDeck ? 'bg-blue-600' : 'bg-slate-300'
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
              <div className="font-display text-sm font-extrabold text-slate-800">Show Action Log</div>
              <div className="text-xs text-slate-500 font-medium">Display previous player bets and folds history log.</div>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                settings.showActionLog ? 'bg-blue-600' : 'bg-slate-300'
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
