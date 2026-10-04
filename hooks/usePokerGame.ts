'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { chooseBotAction } from '@/lib/poker/bot';
import { applyAction, createInitialState, startHand, type GameConfig } from '@/lib/poker/engine';
import { loadSavedGame, saveGame } from '@/lib/storage';
import { playSound } from '@/lib/sound';
import type { GameMode, PokerAction, PokerGameState, PokerPlayer } from '@/types/poker';

export type PokerGameApi = {
  game: PokerGameState;
  turnTimeRemaining: number;
  botThinking: boolean;
  isPaused: boolean;
  you: PokerPlayer | undefined;
  isYourTurn: boolean;
  canCheck: boolean;
  callAmount: number;
  minRaise: number;
  maxRaise: number;
  dispatchAction: (action: PokerAction) => void;
  nextHand: () => void;
  resetGame: (config?: GameConfig) => void;
  togglePause: () => void;
};

type Options = {
  mode: GameMode;
  resume?: boolean;
  botCount?: number;
  startingChips?: number;
  smallBlind?: number;
  bigBlind?: number;
};

const TURN_DURATION_SECONDS = 20;

export function usePokerGame(options: Options): PokerGameApi {
  const { mode, resume = true, botCount = 3, startingChips = 2000, smallBlind = 10, bigBlind = 20 } = options;

  const [game, setGame] = useState<PokerGameState>(() => {
    if (resume) {
      const saved = loadSavedGame(mode);
      if (saved && saved.mode === mode) return saved;
    }
    const initial = createInitialState({ mode, botCount, startingChips, smallBlind, bigBlind });
    return startHand(initial);
  });

  const [turnTimeRemaining, setTurnTimeRemaining] = useState(TURN_DURATION_SECONDS);
  const [botThinking, setBotThinking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameRef = useRef(game);
  gameRef.current = game;

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Save game state
  useEffect(() => {
    saveGame(game);
  }, [game]);

  const dispatchAction = useCallback((action: PokerAction) => {
    const current = gameRef.current;
    if (current.status !== 'playing') return;

    const currentActor = current.players[current.currentPlayerSeat];
    if (!currentActor) return;

    const result = applyAction(current, currentActor.seat, action);
    if (!result.ok) {
      playSound('illegal');
      return;
    }

    // Play action sound cue
    if (action.type === 'fold') playSound('fold');
    else if (action.type === 'check') playSound('check');
    else if (action.type === 'call' || action.type === 'bet' || action.type === 'raise' || action.type === 'all_in') {
      playSound('chip');
    }

    if (result.state.status === 'finished') {
      const youWon = result.state.winnerSeats.some((seat) => result.state.players[seat]?.isYou);
      if (youWon) playSound('win');
      else playSound('lose');
    }

    gameRef.current = result.state;
    setGame(result.state);
    setTurnTimeRemaining(TURN_DURATION_SECONDS);
  }, []);

  // Turn timer countdown
  useEffect(() => {
    if (isPaused || game.status !== 'playing') return;

    const interval = setInterval(() => {
      setTurnTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timeout: Auto check if available, else fold
          const current = gameRef.current;
          const actor = current.players[current.currentPlayerSeat];
          if (actor && !actor.isBot) {
            const callAmt = current.currentBet - actor.currentBet;
            if (callAmt === 0) {
              dispatchAction({ type: 'check' });
            } else {
              dispatchAction({ type: 'fold' });
            }
          }
          return TURN_DURATION_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, game.status, dispatchAction]);

  // Bot Turn Scheduling
  useEffect(() => {
    if (isPaused || game.status !== 'playing') return;

    const actor = game.players[game.currentPlayerSeat];
    if (!actor || !actor.isBot || actor.folded || actor.allIn) return;

    setBotThinking(true);
    const delay = 600 + Math.random() * 800;

    const timer = setTimeout(() => {
      setBotThinking(false);
      const current = gameRef.current;
      const currentActor = current.players[current.currentPlayerSeat];
      if (current.status === 'playing' && currentActor && currentActor.id === actor.id) {
        const botAction = chooseBotAction(current, currentActor, current.difficulty);
        dispatchAction(botAction);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      setBotThinking(false);
    };
  }, [game.currentPlayerSeat, game.status, game.street, isPaused, dispatchAction]);

  const nextHand = useCallback(() => {
    const nextState = startHand(gameRef.current);
    gameRef.current = nextState;
    setGame(nextState);
    setTurnTimeRemaining(TURN_DURATION_SECONDS);
    playSound('cardDeal');
  }, []);

  const resetGame = useCallback(
    (config: GameConfig = {}) => {
      const initial = createInitialState({
        mode,
        botCount: config.botCount ?? botCount,
        startingChips: config.startingChips ?? startingChips,
        smallBlind: config.smallBlind ?? smallBlind,
        bigBlind: config.bigBlind ?? bigBlind,
        difficulty: config.difficulty ?? gameRef.current.difficulty
      });
      const nextState = startHand(initial);
      gameRef.current = nextState;
      setGame(nextState);
      setTurnTimeRemaining(TURN_DURATION_SECONDS);
      playSound('cardDeal');
    },
    [mode, botCount, startingChips, smallBlind, bigBlind]
  );

  const you = game.players.find((p) => p.isYou);
  const currentActor = game.players[game.currentPlayerSeat];
  const isYourTurn = Boolean(you && currentActor && currentActor.id === you.id && !isPaused && game.status === 'playing');

  const callAmount = you ? Math.max(0, game.currentBet - you.currentBet) : 0;
  const canCheck = callAmount === 0;
  const minRaise = Math.min(you?.chips ?? 0, Math.max(game.minimumRaise, game.currentBet + game.bigBlind));
  const maxRaise = you?.chips ?? 0;

  return {
    game,
    turnTimeRemaining,
    botThinking,
    isPaused,
    you,
    isYourTurn,
    canCheck,
    callAmount,
    minRaise,
    maxRaise,
    dispatchAction,
    nextHand,
    resetGame,
    togglePause
  };
}
