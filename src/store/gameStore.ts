import { create } from "zustand";

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface GameState {
  players: Player[];
  round: 1 | 2;
  answeredQuestions: Set<string>; // store question keys like "round1_category_value"

  // Actions
  addPlayer: (name: string) => void;
  updatePlayerScore: (playerId: string, points: number) => void;
  setRound: (round: 1 | 2) => void;
  markQuestionAnswered: (questionKey: string) => void;
  resetGame: () => void;
  removePlayer: (playerId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [
    { id: "1", name: "Player 1", score: 0 },
    { id: "2", name: "Player 2", score: 0 },
    { id: "3", name: "Player 3", score: 0 },
  ],
  round: 1,
  answeredQuestions: new Set(),

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

  setRound: (round: 1 | 2) => {
    set({ round });
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
    });
  },

  removePlayer: (playerId: string) => {
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    }));
  },
}));
