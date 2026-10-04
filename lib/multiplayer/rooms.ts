import type { Difficulty, PokerPlayer, RoomInfo } from '@/types/poker';

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PKR-${code}`;
}

export function createRoomInfo(config: {
  name?: string;
  hostId?: string;
  maxPlayers?: number;
  startingChips?: number;
  smallBlind?: number;
  bigBlind?: number;
  difficulty?: Difficulty;
}): RoomInfo {
  const code = generateRoomCode();
  const hostPlayer: PokerPlayer = {
    id: config.hostId || 'host-1',
    name: 'You (Host)',
    avatar: '🦊',
    seat: 0,
    chips: config.startingChips || 2000,
    currentBet: 0,
    totalBetInHand: 0,
    folded: false,
    allIn: false,
    connected: true,
    isBot: false,
    isYou: true
  };

  return {
    id: `room-${Date.now()}`,
    code,
    hostId: hostPlayer.id,
    name: config.name || 'Neon High Rollers',
    maxPlayers: config.maxPlayers || 6,
    startingChips: config.startingChips || 2000,
    smallBlind: config.smallBlind || 10,
    bigBlind: config.bigBlind || 20,
    botCount: Math.max(1, (config.maxPlayers || 6) - 1),
    difficulty: config.difficulty || 'normal',
    players: [hostPlayer],
    status: 'waiting'
  };
}
