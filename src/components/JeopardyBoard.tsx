import { useState } from "react";
import { Row, Col } from "antd";
import { useGameStore } from "../store/gameStore";
import Modal from "./Modal";

export default function JeopardyBoard() {
  const { round, answeredQuestions } = useGameStore();
  const [selectedCell, setSelectedCell] = useState<{
    category: string;
    value: string;
    question: string;
    questionKey: string;
  } | null>(null);

  const categories = [
    "THE I.T. GUY",
    "PUBLISHED FIRST",
    "STATE OF EMERGENCY",
    "TV",
    "A BILL IN CONGRESS",
    '"UN" ENDING',
  ];

  const values =
    round === 1 ? [200, 400, 600, 800, 1000] : [400, 800, 1200, 1600, 2000];

  const createQuestionKey = (category: string, value: number) => {
    return `round${round}_${category
      .replace(/\s+/g, "_")
      .replace(/"/g, "")}_${value}`;
  };

  const handleCellClick = (category: string, value: number) => {
    const questionKey = createQuestionKey(category, value);

    // Don't allow clicking on answered questions
    if (answeredQuestions.has(questionKey)) {
      return;
    }

    setSelectedCell({
      category,
      value: `$${value}`,
      question: `This is a placeholder question for ${category} worth $${value}. What is the answer to this clue?`,
      questionKey,
    });
  };

  const handleCloseModal = () => {
    setSelectedCell(null);
  };

  const isAnswered = (category: string, value: number) => {
    const questionKey = createQuestionKey(category, value);
    return answeredQuestions.has(questionKey);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header Row */}
      <Row gutter={[4, 4]} className="mb-1">
        {categories.map((category, index) => (
          <Col key={index} span={4}>
            <div className="bg-blue-800 border-2 border-yellow-400 text-yellow-400 font-bold text-center min-h-[60px] flex items-center justify-center p-2 text-sm md:text-lg lg:text-xl md:min-h-[80px] rounded-sm">
              {category}
            </div>
          </Col>
        ))}
      </Row>

      {/* Value Rows */}
      {values.map((value) => (
        <Row key={value} gutter={[4, 4]} className="mb-1">
          {categories.map((category, categoryIndex) => {
            const answered = isAnswered(category, value);

            return (
              <Col key={`${value}-${categoryIndex}`} span={4}>
                <div
                  className={`
                    border-2 border-yellow-400 font-bold text-center min-h-[80px] flex items-center justify-center p-5 text-lg md:text-2xl lg:text-3xl md:min-h-[100px] transition-colors duration-200 rounded-sm
                    ${
                      answered
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-yellow-400 cursor-pointer hover:bg-blue-500"
                    }
                  `}
                  onClick={() => !answered && handleCellClick(category, value)}
                >
                  {answered ? "" : `$${value}`}
                </div>
              </Col>
            );
          })}
        </Row>
      ))}

      <Modal
        isOpen={!!selectedCell}
        onClose={handleCloseModal}
        question={selectedCell?.question || ""}
        value={selectedCell?.value || ""}
        category={selectedCell?.category || ""}
        questionKey={selectedCell?.questionKey || ""}
      />
    </div>
  );
}
