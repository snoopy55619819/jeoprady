import { Modal as AntModal, Button, Typography, Row, Col } from "antd";
import { useGameStore } from "../store/gameStore";
import type { Player } from "../store/gameStore";

const { Title, Text } = Typography;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  answer: string;
  value: string;
  category: string;
  questionKey: string;
}

export default function Modal({
  isOpen,
  onClose,
  question,
  answer,
  value,
  category,
  questionKey,
}: ModalProps) {
  const {
    players,
    updatePlayerScore,
    markQuestionAnswered,
    isAnswerRevealed,
    setAnswerRevealed,
    resetAnswerReveal,
  } = useGameStore();

  const handlePlayerSelect = (player: Player) => {
    const points = parseInt(value.replace("$", ""));
    updatePlayerScore(player.id, points);
    markQuestionAnswered(questionKey);
    resetAnswerReveal();
    onClose();
  };

  const handleSkip = () => {
    markQuestionAnswered(questionKey);
    resetAnswerReveal();
    onClose();
  };

  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
  };

  const handleClose = () => {
    resetAnswerReveal();
    onClose();
  };

  return (
    <AntModal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width="95%"
      className="jeopardy-modal max-w-6xl"
      styles={{
        content: {
          backgroundColor: "#1e40af",
          border: "4px solid #fbbf24",
          borderRadius: "8px",
          minHeight: "85vh",
        },
        header: {
          backgroundColor: "#1e40af",
          borderBottom: "none",
          paddingBottom: "0",
        },
        body: {
          backgroundColor: "#1e40af",
          padding: "32px",
        },
      }}
      closeIcon={null}
    >
      <div className="text-center h-full flex flex-col">
        {/* Header Section - Category and Value */}
        <div className="flex-shrink-0 mb-8">
          <Title
            level={3}
            className="text-yellow-400 font-bold mb-4 text-2xl md:text-3xl"
          >
            {category}
          </Title>
          <Title
            level={1}
            className="text-yellow-400 font-bold text-4xl md:text-6xl lg:text-7xl mb-0"
          >
            {value}
          </Title>
        </div>

        {/* Question Section - Main Focus */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="max-w-5xl w-full">
            <Text
              className="text-white leading-none font-bold block px-8 py-16 text-center"
              style={{
                fontSize: "clamp(20px, 25vw, 60px)",
                lineHeight: "0.9",
              }}
            >
              {question}
            </Text>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex-shrink-0">
          {!isAnswerRevealed ? (
            <Button
              type="default"
              size="large"
              onClick={handleRevealAnswer}
              className="font-bold text-xl mb-8 px-12 py-6 h-auto"
            >
              Reveal Answer
            </Button>
          ) : (
            <div className="border-t border-yellow-400 pt-6 mb-6">
              <div className="bg-blue-800 rounded-lg border-2 border-yellow-400 p-4 mb-6 max-w-3xl mx-auto">
                <Title
                  level={3}
                  className="text-yellow-400 mb-0 text-xl md:text-2xl"
                >
                  {answer}
                </Title>
              </div>
            </div>
          )}

          <div className="border-t border-yellow-400 pt-4">
            <Title level={5} className="text-yellow-400 mb-4 text-lg">
              Who got it right?
            </Title>

            <Row gutter={[12, 12]} justify="center" className="mb-4">
              {players.map((player) => (
                <Col key={player.id} xs={12} sm={8} md={6} lg={4}>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={() => handlePlayerSelect(player)}
                    className="w-full font-bold text-sm py-3 h-auto"
                  >
                    {player.name}
                    <br />
                    <span className="text-xs opacity-90">
                      ${player.score.toLocaleString()}
                    </span>
                  </Button>
                </Col>
              ))}
            </Row>

            <Row gutter={[12, 12]} justify="center">
              <Col xs={8} sm={6} md={4}>
                <Button
                  size="middle"
                  onClick={handleSkip}
                  className="w-full font-bold text-sm py-2"
                >
                  Skip
                </Button>
              </Col>
              <Col xs={8} sm={6} md={4}>
                <Button
                  size="middle"
                  onClick={handleClose}
                  className="w-full font-bold text-sm py-2"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </AntModal>
  );
}
