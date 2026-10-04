import { createClient } from '@supabase/supabase-js';
import type { PokerGameState } from '@/types/poker';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

/**
 * Filter state to sanitize private hole cards of opponents before broadcasting.
 */
export function sanitizePublicGameState(state: PokerGameState, viewerPlayerId?: string): PokerGameState {
  const sanitizedPlayers = state.players.map((p) => {
    // Reveal cards if showdown finished OR if it's the viewer's own cards
    if (state.status === 'finished' || p.showCards || p.id === viewerPlayerId || p.isYou) {
      return p;
    }
    // Mask opponent cards
    return {
      ...p,
      cards: p.cards ? p.cards.map((c) => ({ ...c, rank: '2' as const, suit: 'spades' as const })) : []
    };
  });

  return {
    ...state,
    deck: [], // Secret deck never exposed to client
    players: sanitizedPlayers
  };
}

/**
 * Broadcast channel helper for local tab-to-tab realtime sync.
 */
export function createLocalBroadcastChannel(roomCode: string, onStateUpdate: (state: PokerGameState) => void) {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null;

  const channel = new BroadcastChannel(`poker_room_${roomCode}`);
  channel.onmessage = (event) => {
    if (event.data && event.data.type === 'STATE_UPDATE') {
      onStateUpdate(event.data.state);
    }
  };

  return {
    broadcastState: (state: PokerGameState) => {
      channel.postMessage({ type: 'STATE_UPDATE', state });
    },
    close: () => {
      channel.close();
    }
  };
}
