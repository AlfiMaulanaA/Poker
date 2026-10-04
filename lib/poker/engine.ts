import { createDeck } from './deck';
import { evaluate7Cards } from './evaluator';
import { calculatePots } from './pots';
import { shuffleDeck } from './shuffle';
import type { Difficulty, GameMode, PokerAction, PokerGameState, PokerPlayer } from '@/types/poker';

export type GameConfig = {
  mode?: GameMode;
  startingChips?: number;
  smallBlind?: number;
  bigBlind?: number;
  botCount?: number;
  difficulty?: Difficulty;
  players?: Partial<PokerPlayer>[];
};

const DEFAULT_AVATARS = ['🦊', '🐼', '🐯', '🐸', '🤖', '👾', '🦁', '🐧'];

export function createInitialState(config: GameConfig = {}): PokerGameState {
  const {
    mode = 'local',
    startingChips = 2000,
    smallBlind = 10,
    bigBlind = 20,
    botCount = 3,
    difficulty = 'normal',
    players: customPlayers
  } = config;

  let initialPlayers: PokerPlayer[] = [];

  if (customPlayers && customPlayers.length >= 2) {
    initialPlayers = customPlayers.map((p, idx) => ({
      id: p.id ?? `player-${idx + 1}`,
      name: p.name ?? `Player ${idx + 1}`,
      avatar: p.avatar ?? DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length]!,
      seat: idx,
      chips: p.chips ?? startingChips,
      currentBet: 0,
      totalBetInHand: 0,
      folded: false,
      allIn: false,
      connected: true,
      isBot: p.isBot ?? false,
      isYou: p.isYou ?? idx === 0
    }));
  } else {
    // Human + Bots
    initialPlayers.push({
      id: 'human-1',
      name: 'You',
      avatar: '🦊',
      seat: 0,
      chips: startingChips,
      currentBet: 0,
      totalBetInHand: 0,
      folded: false,
      allIn: false,
      connected: true,
      isBot: false,
      isYou: true
    });

    for (let i = 1; i <= botCount; i++) {
      initialPlayers.push({
        id: `bot-${i}`,
        name: `Bot ${i}`,
        avatar: DEFAULT_AVATARS[i % DEFAULT_AVATARS.length]!,
        seat: i,
        chips: startingChips,
        currentBet: 0,
        totalBetInHand: 0,
        folded: false,
        allIn: false,
        connected: true,
        isBot: true
      });
    }
  }

  return {
    id: `game-${Date.now()}`,
    mode,
    status: 'waiting',
    street: 'preflop',
    players: initialPlayers,
    communityCards: [],
    deck: [],
    pot: 0,
    sidePots: [],
    dealerSeat: 0,
    smallBlindSeat: 1 % initialPlayers.length,
    bigBlindSeat: 2 % initialPlayers.length,
    currentPlayerSeat: 0,
    currentBet: 0,
    minimumRaise: bigBlind,
    smallBlind,
    bigBlind,
    startingChips,
    handNumber: 0,
    winnerSeats: [],
    actionLog: [],
    difficulty,
    version: 1
  };
}

export function startHand(state: PokerGameState): PokerGameState {
  const numPlayers = state.players.length;
  if (numPlayers < 2) return state;

  // Filter out eliminated players with 0 chips
  const activePlayers = state.players.map((p) => {
    if (p.chips <= 0) {
      return { ...p, chips: state.startingChips }; // Auto refill for practice if eliminated
    }
    return p;
  });

  const handNum = state.handNumber + 1;
  const dealerSeat = (state.dealerSeat + 1) % numPlayers;
  const smallBlindSeat = (dealerSeat + 1) % numPlayers;
  const bigBlindSeat = (dealerSeat + 2) % numPlayers;
  const firstActor = numPlayers === 2 ? dealerSeat : (bigBlindSeat + 1) % numPlayers;

  const freshDeck = shuffleDeck(createDeck());
  const updatedPlayers: PokerPlayer[] = activePlayers.map((p) => ({
    ...p,
    currentBet: 0,
    totalBetInHand: 0,
    folded: false,
    allIn: false,
    showCards: false,
    lastAction: undefined,
    cards: []
  }));

  // Deal 2 cards to each player
  let cardIndex = 0;
  for (let i = 0; i < 2; i++) {
    for (const player of updatedPlayers) {
      player.cards!.push(freshDeck[cardIndex]!);
      cardIndex++;
    }
  }

  const remainingDeck = freshDeck.slice(cardIndex);

  // Post blinds
  const sbPlayer = updatedPlayers[smallBlindSeat]!;
  const sbAmount = Math.min(sbPlayer.chips, state.smallBlind);
  sbPlayer.chips -= sbAmount;
  sbPlayer.currentBet = sbAmount;
  sbPlayer.totalBetInHand = sbAmount;
  if (sbPlayer.chips === 0) sbPlayer.allIn = true;
  sbPlayer.lastAction = `SB ${sbAmount}`;

  const bbPlayer = updatedPlayers[bigBlindSeat]!;
  const bbAmount = Math.min(bbPlayer.chips, state.bigBlind);
  bbPlayer.chips -= bbAmount;
  bbPlayer.currentBet = bbAmount;
  bbPlayer.totalBetInHand = bbAmount;
  if (bbPlayer.chips === 0) bbPlayer.allIn = true;
  bbPlayer.lastAction = `BB ${bbAmount}`;

  const pot = sbAmount + bbAmount;

  return {
    ...state,
    status: 'playing',
    street: 'preflop',
    players: updatedPlayers,
    communityCards: [],
    deck: remainingDeck,
    pot,
    sidePots: [],
    dealerSeat,
    smallBlindSeat,
    bigBlindSeat,
    currentPlayerSeat: firstActor,
    currentBet: state.bigBlind,
    minimumRaise: state.bigBlind * 2,
    handNumber: handNum,
    winnerSeats: [],
    winningHandDescription: undefined,
    actionLog: [`Hand #${handNum} started. Blinds ${state.smallBlind}/${state.bigBlind}`],
    version: state.version + 1
  };
}

function nextActiveSeat(players: PokerPlayer[], currentSeat: number): number {
  const count = players.length;
  let seat = (currentSeat + 1) % count;
  for (let i = 0; i < count; i++) {
    const p = players[seat]!;
    if (!p.folded && !p.allIn) {
      return seat;
    }
    seat = (seat + 1) % count;
  }
  return currentSeat;
}

function isBettingRoundComplete(players: PokerPlayer[], currentBet: number): boolean {
  const activeUnfolded = players.filter((p) => !p.folded);
  if (activeUnfolded.length <= 1) return true;

  // Round is complete if all active non-all-in players have matched currentBet
  const nonAllIn = activeUnfolded.filter((p) => !p.allIn);
  if (nonAllIn.length === 0) return true;

  return nonAllIn.every((p) => p.currentBet === currentBet && p.lastAction !== undefined);
}

export function applyAction(
  state: PokerGameState,
  playerSeat: number,
  action: PokerAction
): { ok: boolean; state: PokerGameState; error?: string } {
  if (state.status !== 'playing') {
    return { ok: false, state, error: 'Game is not in playing state' };
  }
  if (state.currentPlayerSeat !== playerSeat) {
    return { ok: false, state, error: 'Not your turn' };
  }

  const players = state.players.map((p) => ({ ...p }));
  const player = players[playerSeat]!;

  if (player.folded || player.allIn) {
    return { ok: false, state, error: 'Player cannot make an action' };
  }

  const callAmount = state.currentBet - player.currentBet;
  let logText = '';
  let updatedCurrentBet = state.currentBet;
  let updatedMinRaise = state.minimumRaise;

  switch (action.type) {
    case 'fold': {
      player.folded = true;
      player.lastAction = 'FOLD';
      logText = `${player.name} folds`;
      break;
    }
    case 'check': {
      if (callAmount > 0) {
        return { ok: false, state, error: 'Cannot check when there is an outstanding bet' };
      }
      player.lastAction = 'CHECK';
      logText = `${player.name} checks`;
      break;
    }
    case 'call': {
      const amountToPay = Math.min(player.chips, callAmount);
      player.chips -= amountToPay;
      player.currentBet += amountToPay;
      player.totalBetInHand += amountToPay;
      if (player.chips === 0) player.allIn = true;
      player.lastAction = `CALL ${amountToPay}`;
      logText = `${player.name} calls ${amountToPay}`;
      break;
    }
    case 'bet':
    case 'raise': {
      const targetBet = action.amount;
      const additionalChips = targetBet - player.currentBet;

      if (additionalChips > player.chips) {
        return { ok: false, state, error: 'Not enough chips' };
      }

      player.chips -= additionalChips;
      player.currentBet = targetBet;
      player.totalBetInHand += additionalChips;
      if (player.chips === 0) player.allIn = true;

      const raiseDiff = targetBet - state.currentBet;
      updatedMinRaise = targetBet + Math.max(raiseDiff, state.bigBlind);
      updatedCurrentBet = targetBet;

      const actionLabel = action.type.toUpperCase();
      player.lastAction = `${actionLabel} ${targetBet}`;
      logText = `${player.name} ${action.type}s to ${targetBet}`;
      break;
    }
    case 'all_in': {
      const allInAmount = player.chips;
      player.currentBet += allInAmount;
      player.totalBetInHand += allInAmount;
      player.chips = 0;
      player.allIn = true;

      if (player.currentBet > state.currentBet) {
        const raiseDiff = player.currentBet - state.currentBet;
        updatedMinRaise = player.currentBet + Math.max(raiseDiff, state.bigBlind);
        updatedCurrentBet = player.currentBet;
      }

      player.lastAction = `ALL-IN ${player.currentBet}`;
      logText = `${player.name} is ALL-IN for ${player.currentBet}`;
      break;
    }
  }

  // Calculate total pot
  const totalPot = players.reduce((sum, p) => sum + p.totalBetInHand, 0);

  let newState: PokerGameState = {
    ...state,
    players,
    pot: totalPot,
    currentBet: updatedCurrentBet,
    minimumRaise: updatedMinRaise,
    actionLog: [logText, ...state.actionLog],
    version: state.version + 1
  };

  // Check if only 1 player remains (everyone else folded)
  const unfoldedPlayers = players.filter((p) => !p.folded);
  if (unfoldedPlayers.length === 1) {
    const winner = unfoldedPlayers[0]!;
    winner.chips += totalPot;
    return {
      ok: true,
      state: {
        ...newState,
        status: 'finished',
        winnerSeats: [winner.seat],
        winningHandDescription: `${winner.name} wins ${totalPot} chips (all opponents folded)`,
        actionLog: [`${winner.name} wins ${totalPot} chips`, ...newState.actionLog]
      }
    };
  }

  // Check if betting round complete
  if (isBettingRoundComplete(players, updatedCurrentBet)) {
    newState = advanceStreet(newState);
  } else {
    newState.currentPlayerSeat = nextActiveSeat(players, playerSeat);
  }

  return { ok: true, state: newState };
}

export function advanceStreet(state: PokerGameState): PokerGameState {
  const players = state.players.map((p) => ({ ...p, currentBet: 0, lastAction: undefined }));
  const deck = [...state.deck];
  let community = [...state.communityCards];
  let street = state.street;

  // Update side pots
  const sidePots = calculatePots(players);

  const activeUnfolded = players.filter((p) => !p.folded);
  const nonAllIn = activeUnfolded.filter((p) => !p.allIn);

  // If 0 or 1 player can act (others all-in), auto run out remaining cards to showdown
  const autoRunout = nonAllIn.length <= 1;

  if (street === 'preflop') {
    street = 'flop';
    community.push(deck.pop()!, deck.pop()!, deck.pop()!);
  } else if (street === 'flop') {
    street = 'turn';
    community.push(deck.pop()!);
  } else if (street === 'turn') {
    street = 'river';
    community.push(deck.pop()!);
  } else if (street === 'river' || autoRunout) {
    // If auto runout, deal remaining community cards up to 5
    while (community.length < 5 && deck.length > 0) {
      community.push(deck.pop()!);
    }
    return resolveShowdown({ ...state, players, communityCards: community, sidePots });
  }

  if (autoRunout && street !== 'showdown') {
    return advanceStreet({ ...state, players, communityCards: community, street, deck, sidePots });
  }

  // Next actor post-flop: first active player after dealer
  const firstActor = nextActiveSeat(players, state.dealerSeat);

  return {
    ...state,
    street,
    players,
    communityCards: community,
    deck,
    sidePots,
    currentBet: 0,
    minimumRaise: state.bigBlind,
    currentPlayerSeat: firstActor,
    actionLog: [`Dealt ${street.toUpperCase()}`, ...state.actionLog],
    version: state.version + 1
  };
}

export function resolveShowdown(state: PokerGameState): PokerGameState {
  const players = state.players.map((p) => ({ ...p, showCards: !p.folded }));
  const community = state.communityCards;
  const sidePots = state.sidePots.length > 0 ? state.sidePots : calculatePots(players);

  const winnerSet = new Set<number>();
  let winningDesc = '';

  // Resolve each pot tier separately
  for (const pot of sidePots) {
    if (pot.amount <= 0) continue;

    const eligiblePlayers = players.filter((p) => pot.eligibleSeats.includes(p.seat) && !p.folded);

    if (eligiblePlayers.length === 0) continue;

    let bestScore = -1;
    let potWinners: PokerPlayer[] = [];
    let bestDesc = '';

    for (const player of eligiblePlayers) {
      const evalHand = evaluate7Cards([...player.cards!, ...community]);
      if (evalHand.score > bestScore) {
        bestScore = evalHand.score;
        potWinners = [player];
        bestDesc = `${evalHand.category} (${evalHand.description})`;
      } else if (evalHand.score === bestScore) {
        potWinners.push(player);
      }
    }

    // Split pot among winners
    const splitShare = Math.floor(pot.amount / potWinners.length);
    for (const w of potWinners) {
      w.chips += splitShare;
      winnerSet.add(w.seat);
    }

    if (!winningDesc) {
      winningDesc = `${potWinners.map((w) => w.name).join(', ')} wins ${pot.amount} chips with ${bestDesc}`;
    }
  }

  const winnerSeats = Array.from(winnerSet);

  return {
    ...state,
    status: 'finished',
    street: 'showdown',
    players,
    winnerSeats,
    winningHandDescription: winningDesc,
    actionLog: [winningDesc, ...state.actionLog],
    version: state.version + 1
  };
}
