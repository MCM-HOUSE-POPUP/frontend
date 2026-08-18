import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getQuestions, submitTest } from "../../api/test";
import ChoiceButton from "../../components/ChoiceButton";
import TestProgressBar from "../../components/TestProgressBar";

export default function TestPage() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const {
    data: questions = [],
    isLoading,
    error: questionsError,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
    staleTime: Infinity,
  });

  const submitMutation = useMutation({
    mutationFn: submitTest,
  });

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

  const handleNext = async () => {
    if (selectedAnswer === undefined || submitMutation.isPending) {
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const submittedAnswers = questions.flatMap((question) => {
      const answer = answers[question.no];
      return answer === undefined ? [] : [answer];
    });

    if (submittedAnswers.length !== questions.length) return;

    try {
      const result = await submitMutation.mutateAsync({
        answers: submittedAnswers,
      });

      localStorage.setItem("resultId", String(result.resultId));

      navigate(`/test/ai/${result.resultId}`);
    } catch {
      // mutation error는 아래에서 표시
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-secondary">
          질문을 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (questionsError || !currentQuestion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-[30px]">
        <p className="text-sm text-mcm-desc">
          질문을 불러오지 못했습니다.
        </p>
      </main>
    );
  }

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

      {submitMutation.error && (
        <p className="mt-4 text-center text-xs text-mcm-secondary">
          {submitMutation.error instanceof Error
            ? submitMutation.error.message
            : "테스트 제출에 실패했습니다."}
        </p>
      )}

      <button
        type="button"
        disabled={
          selectedAnswer === undefined ||
          submitMutation.isPending
        }
        onClick={handleNext}
        className={`mt-auto h-13 w-full rounded-[10px] text-sm font-semibold ${
          selectedAnswer === undefined ||
          submitMutation.isPending
            ? "bg-mcm-border text-mcm-white"
            : "bg-mcm-black text-mcm-white"
        }`}
      >
        {submitMutation.isPending ? "SUBMITTING..." : "NEXT"}
      </button>
    </main>
  );
}