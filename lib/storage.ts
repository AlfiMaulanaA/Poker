import type { GameMode, PokerGameState } from '@/types/poker';

export type UserSettings = {
  displayName: string;
  avatar: string;
  sound: boolean;
  tableTheme: 'emerald' | 'blue' | 'purple';
  fourColorDeck: boolean;
  showActionLog: boolean;
  autoCheckFold: boolean;
};

const DEFAULT_SETTINGS: UserSettings = {
  displayName: 'Player',
  avatar: '🦊',
  sound: true,
  tableTheme: 'emerald',
  fourColorDeck: false,
  showActionLog: true,
  autoCheckFold: true
};

const SETTINGS_KEY = 'neonpoker_settings_v1';
const SAVED_GAME_KEY = 'neonpoker_game_';

export function loadSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* storage full */
  }
}

export function loadSavedGame(mode: GameMode): PokerGameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${SAVED_GAME_KEY}${mode}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveGame(state: PokerGameState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${SAVED_GAME_KEY}${state.mode}`, JSON.stringify(state));
  } catch {
    /* storage full */
  }
}

export function clearSavedGame(mode: GameMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${SAVED_GAME_KEY}${mode}`);
  } catch {
    /* ignore */
  }
}
