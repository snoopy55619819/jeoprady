import { Card, Typography, Row, Col } from "antd";
import { useGameStore } from "../store/gameStore";

const { Title, Text } = Typography;

export default function Scoreboard() {
  const players = useGameStore((state) => state.players);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-4">
      <Title level={4} className="text-yellow-400 text-center mb-4">
        Players & Scores
      </Title>

      <Row gutter={[16, 16]} justify="center">
        {players.map((player) => (
          <Col key={player.id} xs={24} sm={8} md={8}>
            <Card
              className="text-center border-2 border-yellow-400"
              styles={{
                body: {
                  backgroundColor: "#1e40af", // blue-800
                  padding: "16px",
                },
              }}
            >
              <Title level={5} className="text-yellow-400 mb-2 font-bold">
                {player.name}
              </Title>
              <Text className="text-white text-xl font-bold">
                ${player.score.toLocaleString()}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
