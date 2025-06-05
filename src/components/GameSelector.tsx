import { useEffect, useCallback } from "react";
import { Select, Card, Typography, Spin, Alert } from "antd";
import { useGameStore } from "../store/gameStore";
import supabase from "../lib/supabase";

import type { GameData } from "../types/game";

const { Title } = Typography;
const { Option } = Select;

interface GameSelectorProps {
  compact?: boolean;
}

export default function GameSelector({ compact = false }: GameSelectorProps) {
  const { games, selectedGame, setGames, setSelectedGame } = useGameStore();

  const loadGames = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("games")
        .select("id, name, created_at, rounds")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading games:", error);
        return;
      }

      setGames((data as GameData[]) || []);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }, [setGames]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const handleGameSelect = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    setSelectedGame(game || null);
  };

  if (games.length === 0) {
    return (
      <Card
        className="mb-6 border-2 border-yellow-400"
        styles={{ body: { backgroundColor: "#1e40af", padding: "24px" } }}
      >
        <div className="text-center">
          <Spin size="large" />
          <Title level={4} className="text-yellow-400 mt-4">
            Loading games...
          </Title>
        </div>
      </Card>
    );
  }

  // Compact version for top-right when game is selected
  if (compact && selectedGame) {
    return (
      <div className="inline-block">
        <Select
          value={selectedGame?.id}
          onChange={handleGameSelect}
          style={{
            width: "200px",
            color: "#fbbf24",
          }}
          size="middle"
          className="compact-game-selector"
        >
          {games.map((game) => (
            <Option key={game.id} value={game.id}>
              {game.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }

  // Full version for initial game selection
  return (
    <Card
      className="mb-6 border-2 border-yellow-400"
      styles={{ body: { backgroundColor: "#1e40af", padding: "24px" } }}
    >
      <div className="text-center">
        <Title level={4} className="text-yellow-400 mb-4">
          Select a Game
        </Title>

        <Select
          placeholder="Choose a Jeopardy game..."
          size="large"
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
          value={selectedGame?.id}
          onChange={handleGameSelect}
          className="mb-4 game-selector"
        >
          {games.map((game) => (
            <Option key={game.id} value={game.id}>
              {game.name}
            </Option>
          ))}
        </Select>

        {selectedGame && (
          <Alert
            message={`Selected: ${selectedGame.name}`}
            description={`Game has ${selectedGame.rounds.length} rounds`}
            type="info"
            showIcon
            className="mt-4"
            style={{
              backgroundColor: "#2563eb",
              border: "1px solid #fbbf24",
              color: "#fbbf24",
            }}
          />
        )}
      </div>
    </Card>
  );
}
