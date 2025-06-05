import { useState } from "react";
import { Card, Typography, Button, Row, Col, InputNumber } from "antd";
import { useGameStore } from "../store/gameStore";
import type { Round } from "../types/game";

const { Title, Text } = Typography;

interface FinalRoundProps {
  finalRound: Round;
}

export default function FinalRound({ finalRound }: FinalRoundProps) {
  const {
    players,
    finalRoundWagers,
    isAnswerRevealed,
    setFinalRoundWager,
    updatePlayerScore,
    setAnswerRevealed,
  } = useGameStore();

  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedResults, setSelectedResults] = useState<Set<string>>(
    new Set()
  );

  const handleWagerChange = (playerId: string, wager: number | null) => {
    if (wager !== null && wager >= 0) {
      setFinalRoundWager(playerId, wager);
    }
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
    setAnswerRevealed(false);
  };

  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
  };

  const handlePlayerResult = (playerId: string, correct: boolean) => {
    const wager =
      finalRoundWagers.find((w) => w.playerId === playerId)?.wager || 0;
    const points = correct ? wager : -wager;
    updatePlayerScore(playerId, points);

    // Track that we've processed this player
    setSelectedResults((prev) => new Set([...prev, playerId]));
  };

  const getPlayerWager = (playerId: string) => {
    return finalRoundWagers.find((w) => w.playerId === playerId)?.wager || 0;
  };

  const allWagersSet =
    players.length > 0 &&
    players.every((player) =>
      finalRoundWagers.some((w) => w.playerId === player.id && w.wager > 0)
    );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card
        className="border-2 border-yellow-400 mb-6"
        styles={{ body: { backgroundColor: "#1e40af", padding: "32px" } }}
      >
        <div className="text-center">
          <Title level={2} className="text-yellow-400 mb-4">
            Final Jeopardy!
          </Title>

          <Title level={3} className="text-yellow-400 mb-6">
            Category: {finalRound.category}
          </Title>

          {!showQuestion && (
            <div>
              <Title level={4} className="text-white mb-6">
                Players, place your wagers!
              </Title>

              <Row gutter={[16, 16]} justify="center" className="mb-6">
                {players.map((player) => (
                  <Col key={player.id} xs={24} sm={8}>
                    <Card
                      className="border border-yellow-400"
                      styles={{
                        body: { backgroundColor: "#2563eb", padding: "16px" },
                      }}
                    >
                      <Title level={5} className="text-yellow-400 mb-2">
                        {player.name}
                      </Title>
                      <Text className="text-white block mb-2">
                        Current Score: ${player.score.toLocaleString()}
                      </Text>
                      <InputNumber
                        placeholder="Enter wager"
                        min={0}
                        max={Math.max(1000, player.score)}
                        value={getPlayerWager(player.id)}
                        onChange={(value) =>
                          handleWagerChange(player.id, value)
                        }
                        style={{ width: "100%" }}
                        size="large"
                      />
                    </Card>
                  </Col>
                ))}
              </Row>

              {allWagersSet && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleShowQuestion}
                  className="font-bold text-lg px-8 py-6 h-auto"
                >
                  Reveal Question
                </Button>
              )}
            </div>
          )}

          {showQuestion && (
            <div>
              <Card
                className="border-2 border-yellow-400 mb-6"
                styles={{
                  body: { backgroundColor: "#2563eb", padding: "32px" },
                }}
              >
                <Text className="text-white text-xl md:text-2xl leading-relaxed block mb-6">
                  {finalRound.question}
                </Text>

                {!isAnswerRevealed ? (
                  <Button
                    type="default"
                    size="large"
                    onClick={handleRevealAnswer}
                    className="font-bold text-lg"
                  >
                    Reveal Answer
                  </Button>
                ) : (
                  <div className="border-t border-yellow-400 pt-6">
                    <Title level={4} className="text-yellow-400 mb-4">
                      Answer: {finalRound.answer}
                    </Title>
                  </div>
                )}
              </Card>

              {isAnswerRevealed && (
                <div>
                  <Title level={4} className="text-yellow-400 mb-4">
                    Mark Correct/Incorrect
                  </Title>

                  <Row gutter={[16, 16]} justify="center">
                    {players.map((player) => (
                      <Col key={player.id} xs={24} sm={8}>
                        <Card
                          className="border border-yellow-400"
                          styles={{
                            body: {
                              backgroundColor: "#2563eb",
                              padding: "16px",
                            },
                          }}
                        >
                          <Title level={5} className="text-yellow-400 mb-2">
                            {player.name}
                          </Title>
                          <Text className="text-white block mb-2">
                            Wagered: $
                            {getPlayerWager(player.id).toLocaleString()}
                          </Text>

                          {!selectedResults.has(player.id) ? (
                            <div className="flex gap-2">
                              <Button
                                type="primary"
                                onClick={() =>
                                  handlePlayerResult(player.id, true)
                                }
                                className="flex-1"
                              >
                                Correct
                              </Button>
                              <Button
                                danger
                                onClick={() =>
                                  handlePlayerResult(player.id, false)
                                }
                                className="flex-1"
                              >
                                Incorrect
                              </Button>
                            </div>
                          ) : (
                            <Text className="text-yellow-400 font-bold">
                              ✓ Scored
                            </Text>
                          )}
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
