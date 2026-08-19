import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockStyleChoice } from "../../mocks/styleChoice";

export default function TestAiPage() {
  const navigate = useNavigate();
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  const choices = [
    { label: "A", ...mockStyleChoice.optionA },
    { label: "B", ...mockStyleChoice.optionB },
  ];

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

      <div className="mt-8">
        <p className="text-xs font-semibold text-mcm-black">
          MCM HOUSE AI ✦
        </p>

        <p className="mt-4 text-xs font-semibold leading-[1.7] text-mcm-secondary">
          당신의 선택을 바탕으로
          <br />
          마지막 질문을 만들었어요.
        </p>

        <h1 className="mt-5 text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
          둘 중 어떤 스타일이
          <br />
          더 마음에 드시나요?
        </h1>

        <div
          role="radiogroup"
          aria-label="스타일 선택"
          className="mt-6 grid grid-cols-2 gap-3"
        >
          {choices.map((choice) => {
            const selected = selectedHouse === choice.house;

            return (
              <button
                key={choice.house}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedHouse(choice.house)}
                className={`rounded-[10px] border p-1 ${
                  selected
                    ? "border-mcm-black"
                    : "border-mcm-border"
                }`}
              >
                <img
                  src={choice.image}
                  alt={`${choice.title} 스타일`}
                  className="aspect-square w-full bg-mcm-card-bg object-contain"
                />

                <p className="py-2 text-sm font-semibold text-mcm-black">
                  {choice.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={!selectedHouse}
        onClick={() => navigate("/test/result/1")}
        className={`mt-auto h-13 w-full rounded-[10px] text-sm font-semibold ${
          selectedHouse
            ? "bg-mcm-black text-mcm-white"
            : "bg-mcm-border text-mcm-white"
        }`}
      >
        NEXT
      </button>
    </main>
  );
}