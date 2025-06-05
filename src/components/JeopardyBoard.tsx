import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import Modal from "./Modal";
import type { Question } from "../types/game";

export default function JeopardyBoard() {
  const { round, answeredQuestions, selectedGame, resetAnswerReveal } =
    useGameStore();
  const [selectedCell, setSelectedCell] = useState<{
    category: string;
    value: string;
    question: string;
    answer: string;
    questionKey: string;
  } | null>(null);

  // Get current round data
  const currentRound = selectedGame?.rounds[round - 1];

  if (!selectedGame || !currentRound) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-yellow-400 text-xl">
          Please select a game to start playing
        </div>
      </div>
    );
  }

  // For rounds 1 and 2, use categories and questions
  if (round <= 2 && currentRound.categories) {
    const categories = currentRound.categories;
    const values = categories[0]?.questions.map((q) => q.value) || [];

    const createQuestionKey = (
      categoryIndex: number,
      questionIndex: number
    ) => {
      return `round${round}_${categoryIndex}_${questionIndex}`;
    };

    const handleCellClick = (
      categoryIndex: number,
      questionIndex: number,
      question: Question
    ) => {
      const questionKey = createQuestionKey(categoryIndex, questionIndex);

      if (answeredQuestions.has(questionKey)) {
        return;
      }

      resetAnswerReveal();
      setSelectedCell({
        category: categories[categoryIndex].name,
        value: `$${question.value}`,
        question: question.question,
        answer: question.answer,
        questionKey,
      });
    };

    const handleCloseModal = () => {
      setSelectedCell(null);
    };

    const isAnswered = (categoryIndex: number, questionIndex: number) => {
      const questionKey = createQuestionKey(categoryIndex, questionIndex);
      return answeredQuestions.has(questionKey);
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col gap-1 p-2">
          {/* Header Row */}
          <div className="flex gap-1 flex-shrink-0">
            {categories.map((category, index) => (
              <div key={index} className="flex-1">
                <div className="bg-blue-800 border-2 border-yellow-400 text-yellow-400 font-bold text-center h-12 sm:h-14 md:h-16 flex items-center justify-center p-1 text-xs sm:text-sm md:text-base lg:text-lg rounded-sm">
                  <span className="text-center leading-tight">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Value Rows */}
          <div className="flex-1 flex flex-col gap-1">
            {values.map((_, questionIndex) => (
              <div key={questionIndex} className="flex gap-1 flex-1">
                {categories.map((category, categoryIndex) => {
                  const question = category.questions[questionIndex];
                  const answered = isAnswered(categoryIndex, questionIndex);

                  if (!question) return null;

                  return (
                    <div
                      key={`${questionIndex}-${categoryIndex}`}
                      className="flex-1"
                    >
                      <div
                        className={`
                          border-2 border-yellow-400 font-bold text-center h-full flex items-center justify-center p-2 text-lg sm:text-xl md:text-2xl lg:text-3xl transition-colors duration-200 rounded-sm cursor-pointer
                          ${
                            answered
                              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                              : "bg-blue-600 text-yellow-400 hover:bg-blue-500"
                          }
                        `}
                        onClick={() =>
                          !answered &&
                          handleCellClick(
                            categoryIndex,
                            questionIndex,
                            question
                          )
                        }
                      >
                        {answered ? "" : `$${question.value}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={!!selectedCell}
          onClose={handleCloseModal}
          question={selectedCell?.question || ""}
          answer={selectedCell?.answer || ""}
          value={selectedCell?.value || ""}
          category={selectedCell?.category || ""}
          questionKey={selectedCell?.questionKey || ""}
        />
      </div>
    );
  }

  // This should not render for round 3 (handled by FinalRound component)
  return null;
}
