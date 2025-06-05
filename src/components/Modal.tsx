import { Modal as AntModal, Button, Typography, Row, Col } from "antd";
import { useGameStore } from "../store/gameStore";
import type { Player } from "../store/gameStore";

const { Title, Text } = Typography;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  value: string;
  category: string;
  questionKey: string;
}

export default function Modal({
  isOpen,
  onClose,
  question,
  value,
  category,
  questionKey,
}: ModalProps) {
  const { players, updatePlayerScore, markQuestionAnswered } = useGameStore();

  const handlePlayerSelect = (player: Player) => {
    const points = parseInt(value.replace("$", ""));
    updatePlayerScore(player.id, points);
    markQuestionAnswered(questionKey);
    onClose();
  };

  const handleSkip = () => {
    markQuestionAnswered(questionKey);
    onClose();
  };

  return (
    <AntModal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width="80%"
      className="jeopardy-modal max-w-4xl"
      styles={{
        content: {
          backgroundColor: "#1e40af",
          border: "4px solid #fbbf24",
          borderRadius: "8px",
        },
        header: {
          backgroundColor: "#1e40af",
          borderBottom: "none",
          paddingBottom: "0",
        },
        body: {
          backgroundColor: "#1e40af",
        },
      }}
      closeIcon={null}
    >
      <div className="text-center p-6">
        <Title
          level={3}
          className="text-yellow-400 font-bold mb-2 text-xl md:text-2xl"
        >
          {category}
        </Title>
        <Title
          level={1}
          className="text-yellow-400 font-bold text-3xl md:text-5xl mb-8"
        >
          {value}
        </Title>

        <Text className="text-white text-lg md:text-2xl leading-relaxed block mb-8 px-4">
          {question}
        </Text>

        <div className="border-t border-yellow-400 pt-6">
          <Title level={4} className="text-yellow-400 mb-4">
            Who got it right?
          </Title>

          <Row gutter={[16, 16]} justify="center" className="mb-6">
            {players.map((player) => (
              <Col key={player.id} xs={24} sm={8}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handlePlayerSelect(player)}
                  className="w-full font-bold text-lg py-6 h-auto"
                >
                  {player.name}
                  <br />
                  <span className="text-sm">
                    Current: ${player.score.toLocaleString()}
                  </span>
                </Button>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} justify="center">
            <Col xs={12} sm={8}>
              <Button
                size="large"
                onClick={handleSkip}
                className="w-full font-bold text-lg py-3"
              >
                No One / Skip
              </Button>
            </Col>
            <Col xs={12} sm={8}>
              <Button
                size="large"
                onClick={onClose}
                className="w-full font-bold text-lg py-3"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </AntModal>
  );
}
