export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

export type PlayingCard = {
  id: string;
  rank: Rank;
  suit: Suit;
};

export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

export type GameMode = 'local' | 'bot' | 'online';
export type Difficulty = 'beginner' | 'normal' | 'advanced';

export type HandCategory =
  | 'Royal Flush'
  | 'Straight Flush'
  | 'Four of a Kind'
  | 'Full House'
  | 'Flush'
  | 'Straight'
  | 'Three of a Kind'
  | 'Two Pair'
  | 'One Pair'
  | 'High Card';

export type EvaluatedHand = {
  category: HandCategory;
  score: number; // Higher number beats lower
  best5: PlayingCard[];
  description: string;
  kickers: number[];
};

export type PokerPlayer = {
  id: string;
  name: string;
  avatar: string;
  seat: number;
  chips: number;
  currentBet: number;
  totalBetInHand: number;
  folded: boolean;
  allIn: boolean;
  connected: boolean;
  isBot: boolean;
  isYou?: boolean;
  cards?: PlayingCard[]; // Server-side / local player private cards
  lastAction?: string;
  showCards?: boolean; // Revealed at showdown
};

export type SidePot = {
  amount: number;
  eligibleSeats: number[];
};

export type PokerGameState = {
  id: string;
  mode: GameMode;
  status: 'waiting' | 'playing' | 'finished';
  street: Street;
  players: PokerPlayer[];
  communityCards: PlayingCard[];
  deck: PlayingCard[]; // Server or local state
  pot: number;
  sidePots: SidePot[];
  dealerSeat: number;
  smallBlindSeat: number;
  bigBlindSeat: number;
  currentPlayerSeat: number;
  currentBet: number;
  minimumRaise: number;
  smallBlind: number;
  bigBlind: number;
  startingChips: number;
  handNumber: number;
  winnerSeats: number[];
  winningHandDescription?: string;
  actionLog: string[];
  difficulty?: Difficulty;
  isPaused?: boolean;
  version: number;
};

export type PokerAction =
  | { type: 'fold' }
  | { type: 'check' }
  | { type: 'call' }
  | { type: 'bet'; amount: number }
  | { type: 'raise'; amount: number }
  | { type: 'all_in' };

export type RoomInfo = {
  id: string;
  code: string;
  hostId: string;
  name: string;
  maxPlayers: number;
  startingChips: number;
  smallBlind: number;
  bigBlind: number;
  botCount: number;
  difficulty: Difficulty;
  players: PokerPlayer[];
  status: 'waiting' | 'playing' | 'finished';
};
