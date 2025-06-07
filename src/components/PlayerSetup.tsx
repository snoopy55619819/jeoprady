import { useState } from "react";
import { Card, Typography, Input, Button, Row, Col } from "antd";
import { useGameStore } from "../store/gameStore";

const { Title } = Typography;

interface PlayerSetupProps {
  onComplete: () => void;
}

export default function PlayerSetup({ onComplete }: PlayerSetupProps) {
  const { players, updatePlayerName } = useGameStore();
  const [localNames, setLocalNames] = useState(
    players.map((player) => player.name)
  );

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...localNames];
    newNames[index] = name;
    setLocalNames(newNames);
  };

  const handleSave = () => {
    // Update player names in the store
    players.forEach((player, index) => {
      if (localNames[index] && localNames[index] !== player.name) {
        updatePlayerName(player.id, localNames[index]);
      }
    });
    onComplete();
  };

  const allNamesSet = localNames.every((name) => name.trim().length > 0);

  return (
    <Card
      className="mb-6 border-2 border-yellow-400"
      styles={{ body: { backgroundColor: "#1e40af", padding: "32px" } }}
    >
      <div className="text-center">
        <Title level={3} className="text-yellow-400 mb-6">
          Set Player Names
        </Title>

        <Row gutter={[16, 16]} justify="center" className="mb-6">
          {players.map((player, index) => (
            <Col key={player.id} xs={24} sm={8}>
              <div className="text-center">
                <Input
                  size="large"
                  placeholder={`Player ${index + 1}`}
                  value={localNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="player-name-input"
                  style={{
                    backgroundColor: "#2563eb",
                    border: "2px solid #fbbf24",
                    color: "#fbbf24",
                    textAlign: "center",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>

        <Button
          type="primary"
          size="large"
          onClick={handleSave}
          disabled={!allNamesSet}
          className="font-bold text-lg px-8 py-3"
        >
          Start Game
        </Button>
      </div>
    </Card>
  );
}
