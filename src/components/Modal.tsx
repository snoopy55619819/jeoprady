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
  attachment?: string;
  attachment_type?: string;
}

export default function Modal({
  isOpen,
  onClose,
  question,
  answer,
  value,
  category,
  questionKey,
  attachment,
  attachment_type,
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

  // Check if attachment exists
  const hasAttachment = !!(attachment && attachment_type);

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
          borderRadius: "12px",
          height: "90vh",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
        header: {
          backgroundColor: "#1e40af",
          borderBottom: "none",
          paddingBottom: "0",
        },
        body: {
          backgroundColor: "#1e40af",
          padding: "24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
      closeIcon={null}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Static Header - Category and Value - Fixed Height */}
        <div className="flex-shrink-0 text-center" style={{ height: "120px" }}>
          <Title
            level={3}
            className="text-yellow-400 font-bold mb-2 text-xl md:text-2xl"
          >
            {category}
          </Title>
          <Title
            level={1}
            className="text-yellow-400 font-bold text-3xl md:text-5xl lg:text-6xl mb-0"
          >
            {value}
          </Title>
        </div>

        {/* Question and Attachment Section - Flexible Height */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-4">
          <div className="max-w-5xl w-full text-center">
            <Text
              className="text-white leading-tight font-bold block px-4"
              style={{
                fontSize: hasAttachment
                  ? "clamp(14px, 2.5vw, 32px)"
                  : "clamp(16px, 3.5vw, 48px)",
                lineHeight: "1.1",
              }}
            >
              {question}
            </Text>
          </div>

          {/* Attachment Section */}
          {hasAttachment && (
            <div className="mt-4 max-w-5xl w-full flex justify-center">
              {attachment_type === "image" && (
                <img
                  src={attachment}
                  alt="Question attachment"
                  className="max-w-full max-h-96 object-contain rounded-lg border-2 border-yellow-400"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              )}
              {attachment_type === "video" && (
                <video
                  src={attachment}
                  controls
                  className="max-w-full max-h-96 rounded-lg border-2 border-yellow-400"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = "none";
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </div>

        {/* Answer/Reveal Section - Fixed Height to Prevent Layout Shift */}
        <div className="flex-shrink-0 text-center" style={{ height: "80px" }}>
          <div className="h-full flex items-center justify-center">
            {!isAnswerRevealed ? (
              <Button
                type="default"
                size="large"
                onClick={handleRevealAnswer}
                className="font-bold text-lg px-8 py-4 h-auto"
              >
                Reveal Answer
              </Button>
            ) : (
              <Title
                level={3}
                className="text-yellow-400 mb-0 text-lg md:text-xl font-bold"
              >
                {answer}
              </Title>
            )}
          </div>
        </div>

        {/* Static Footer - Who got it right section - Fixed Height */}
        <div
          className="flex-shrink-0 text-center border-t border-yellow-400 pt-4"
          style={{ height: "140px" }}
        >
          <Title level={5} className="text-yellow-400 mb-3 text-base">
            Who got it right?
          </Title>

          <Row gutter={[8, 8]} justify="center" className="mb-3">
            {players.map((player) => (
              <Col key={player.id} xs={8} sm={6} md={4} lg={3}>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handlePlayerSelect(player)}
                  className="w-full font-bold text-xs py-2 h-auto"
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

          <Row gutter={[8, 8]} justify="center">
            <Col xs={6} sm={4} md={3}>
              <Button
                size="small"
                onClick={handleSkip}
                className="w-full font-bold text-xs py-1"
              >
                Skip
              </Button>
            </Col>
            <Col xs={6} sm={4} md={3}>
              <Button
                size="small"
                onClick={handleClose}
                className="w-full font-bold text-xs py-1"
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
