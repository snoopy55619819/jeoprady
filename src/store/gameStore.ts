import { create } from "zustand";
import type { GameData, FinalRoundWager } from "../types/game";

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  round: 1 | 2 | 3; // Added round 3 for final round
  answeredQuestions: Set<string>; // store question keys like "round1_category_value"
  games: GameData[];
  selectedGame: GameData | null;
  finalRoundWagers: FinalRoundWager[];
  isAnswerRevealed: boolean;

  // Actions
  addPlayer: (name: string) => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  updatePlayerName: (playerId: string, name: string) => void;
  setRound: (round: 1 | 2 | 3) => void;
  markQuestionAnswered: (questionKey: string) => void;
  resetGame: () => void;
  removePlayer: (playerId: string) => void;
  setGames: (games: GameData[]) => void;
  setSelectedGame: (game: GameData | null) => void;
  setFinalRoundWager: (playerId: string, wager: number) => void;
  setAnswerRevealed: (revealed: boolean) => void;
  resetAnswerReveal: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [
    { id: "1", name: "Player 1", score: 0 },
    { id: "2", name: "Player 2", score: 0 },
    { id: "3", name: "Player 3", score: 0 },
  ],
  round: 1,
  answeredQuestions: new Set(),
  games: [],
  selectedGame: null,
  finalRoundWagers: [],
  isAnswerRevealed: false,

  addPlayer: (name: string) => {
    const { players } = get();
    if (players.length < 3) {
      const newPlayer: Player = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        score: 0,
      };
      set({ players: [...players, newPlayer] });
    }
  },

  updatePlayerScore: (playerId: string, points: number) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId
          ? { ...player, score: player.score + points }
          : player
      ),
    }));
  },

  updatePlayerName: (playerId: string, name: string) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, name } : player
      ),
    }));
  },

  setRound: (round: 1 | 2 | 3) => {
    set({ round, finalRoundWagers: [] }); // Reset wagers when changing rounds
  },

  markQuestionAnswered: (questionKey: string) => {
    set((state) => ({
      answeredQuestions: new Set([...state.answeredQuestions, questionKey]),
    }));
  },

  resetGame: () => {
    set({
      players: [
        { id: "1", name: "Player 1", score: 0 },
        { id: "2", name: "Player 2", score: 0 },
        { id: "3", name: "Player 3", score: 0 },
      ],
      round: 1,
      answeredQuestions: new Set(),
      finalRoundWagers: [],
      isAnswerRevealed: false,
    });
  },

  removePlayer: (playerId: string) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    }));
  },

  setGames: (games: GameData[]) => {
    set({ games });
  },

  setSelectedGame: (game: GameData | null) => {
    set({
      selectedGame: game,
      round: 1,
      answeredQuestions: new Set(),
      finalRoundWagers: [],
      isAnswerRevealed: false,
    });
  },

  setFinalRoundWager: (playerId: string, wager: number) => {
    set((state) => ({
      finalRoundWagers: [
        ...state.finalRoundWagers.filter((w) => w.playerId !== playerId),
        { playerId, wager },
      ],
    }));
  },

  setAnswerRevealed: (revealed: boolean) => {
    set({ isAnswerRevealed: revealed });
  },

  resetAnswerReveal: () => {
    set({ isAnswerRevealed: false });
  },
}));
