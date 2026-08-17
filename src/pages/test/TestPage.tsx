import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceButton from "../../components/ChoiceButton";
import TestProgressBar from "../../components/TestProgressBar";
import { mockQuestions } from "../../mocks/questions";

export default function TestPage() {
  const navigate = useNavigate();
  const questions = mockQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.no]
    : undefined;

  const handleSelect = (optionIndex: number) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.no]: optionIndex,
    }));
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      navigate("/home");
      return;
    }

    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (selectedAnswer === undefined) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (!currentQuestion) return null;

  return (
    <main className="flex min-h-screen flex-col bg-mcm-white px-[30px] pb-5 pt-6">
      <button
        type="button"
        onClick={handleBack}
        className="-ml-4 flex h-10 w-10 items-center justify-center"
        aria-label="뒤로가기"
      >
        <img
          src="/icons/back-arrow.svg"
          alt=""
          className="h-5 w-5"
        />
      </button>

      <div className="mt-6">
        <TestProgressBar
          current={currentIndex}
          total={questions.length}
        />
      </div>

      <p className="mt-8 text-xs font-semibold text-mcm-secondary">
        HOUSE TEST
      </p>

      <h1
        id="question-title"
        className="mt-5 text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black"
      >
        {currentQuestion.text}
      </h1>

      <div
        role="radiogroup"
        aria-labelledby="question-title"
        className="mt-6 space-y-2.5"
      >
        {currentQuestion.options.map((option) => (
          <ChoiceButton
            key={option.index}
            index={option.index}
            text={option.text}
            selected={selectedAnswer === option.index}
            onClick={() => handleSelect(option.index)}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={selectedAnswer === undefined}
        onClick={handleNext}
        className={`mt-auto h-13 w-full rounded-[10px] text-sm font-semibold ${
          selectedAnswer === undefined
            ? "bg-mcm-border text-mcm-white"
            : "bg-mcm-black text-mcm-white"
        }`}
      >
        NEXT
      </button>
    </main>
  );
}