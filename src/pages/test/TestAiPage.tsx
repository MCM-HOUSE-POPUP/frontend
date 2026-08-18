import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockAiQuestions = [
  "최근에 가장 자주 손이 간 옷이나 아이템은 무엇인가요?",
  "요즘 즐겨 입는 스타일이나 좋아하는 브랜드가 있다면 알려주세요.",
];

export default function TestAiPage() {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(["", ""]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = () => {
    if (answers.some((answer) => !answer.trim())) return;

    setIsAnalyzing(true);
  };

  if (isAnalyzing) {
    return (
      <main className="flex min-h-screen flex-col bg-mcm-white px-[30px] pb-5 pt-6">
        <button
          type="button"
          onClick={() => setIsAnalyzing(false)}
          className="-ml-4 flex h-10 w-10 items-center justify-center"
          aria-label="뒤로가기"
        >
          <img
            src="/icons/back-arrow.svg"
            alt=""
            className="h-5 w-5"
          />
        </button>

        <div className="flex flex-1 flex-col items-center pt-12 text-center">
          <h1 className="text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
            당신의 취향을
            <br />
            분석하고 있어요
          </h1>

          <p className="mt-4 text-sm font-semibold leading-[1.7] text-mcm-secondary">
            HOUSE Test 답변을 바탕으로
            <br />
            당신에게 맞는 HOUSE를 찾고 있어요
          </p>

          <div className="mt-9 flex h-[112px] w-[112px] items-center justify-center rounded-full border-[8px] border-mcm-inactive border-b-mcm-desc">
            <span className="text-base font-semibold text-mcm-secondary">
              분석 중
            </span>
          </div>

          <div className="mt-10 w-full rounded-[6px] border border-mcm-border p-5 text-left">
            <p className="text-sm font-semibold text-mcm-black">
              AI가 분석하는 내용
            </p>

            <div className="mt-4 space-y-3 text-xs text-mcm-secondary">
              <p>✓ HOUSE Test에서 나타난 취향</p>
              <p>✓ 답변에서 나타난 선택 기준</p>
              <p>✓ MCM HOUSE 가치와의 연결</p>
              <p>✓ 나에게 맞는 탐험 순서</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/test/result/1")}
          className="h-13 w-full rounded-[10px] bg-mcm-black text-sm font-semibold text-mcm-white"
        >
          결과 확인
        </button>
      </main>
    );
  }

  const isComplete = answers.every(
    (answer) => answer.trim().length > 0,
  );

  return (
    <main className="flex min-h-screen flex-col bg-mcm-white px-[30px] pb-5 pt-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="-ml-4 flex h-10 w-10 items-center justify-center"
        aria-label="뒤로가기"
      >
        <img
          src="/icons/back-arrow.svg"
          alt=""
          className="h-5 w-5"
        />
      </button>

      <p className="mt-8 text-xs font-semibold text-mcm-secondary">
        HOUSE TEST
      </p>

      <h1 className="mt-5 text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
        당신의 취향을
        <br />
        조금 더 알려주세요
      </h1>

      <div className="mt-8 space-y-7">
        {mockAiQuestions.map((question, index) => (
          <label key={question} className="block">
            <span className="text-sm font-semibold leading-[1.7] text-mcm-black">
              {question}
            </span>

            <textarea
              value={answers[index]}
              onChange={(event) =>
                handleChange(index, event.target.value)
              }
              rows={4}
              className="mt-3 w-full resize-none rounded-[10px] border border-mcm-border p-4 text-sm leading-relaxed text-mcm-black outline-none"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        disabled={!isComplete}
        onClick={handleSubmit}
        className={`mt-auto h-13 w-full rounded-[10px] text-sm font-semibold ${
          isComplete
            ? "bg-mcm-black text-mcm-white"
            : "bg-mcm-border text-mcm-white"
        }`}
      >
        RESULT
      </button>
    </main>
  );
}