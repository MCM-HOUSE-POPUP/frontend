import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStyleChoice,
  submitStyleChoice,
} from "../../api/test";
import type { HouseType } from "../../types/test";

export default function TestAiPage() {
  const navigate = useNavigate();
  const { resultId: resultIdParam } = useParams();

  const storedResultId = localStorage.getItem("resultId");
  const resultId = Number(resultIdParam ?? storedResultId);
  const hasResultId = Number.isInteger(resultId) && resultId > 0;

  const [selectedHouse, setSelectedHouse] =
    useState<HouseType | null>(null);

  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["styleChoice", resultId],
    queryFn: () => getStyleChoice(resultId),
    enabled: hasResultId,
  });

  const styleChoiceMutation = useMutation({
    mutationFn: (chosenHouse: HouseType) =>
      submitStyleChoice(resultId, {
        chosenHouse,
      }),
    onSuccess: (result) => {
      navigate(`/test/result/${result.resultId}`);
    },
  });

  const handleNext = () => {
    if (!selectedHouse || styleChoiceMutation.isPending) return;

    styleChoiceMutation.mutate(selectedHouse);
  };

  if (!hasResultId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-[30px]">
        <p className="text-sm text-mcm-desc">
          테스트 결과 정보를 찾을 수 없습니다.
        </p>
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-secondary">
          스타일을 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-[30px]">
        <p className="text-sm text-mcm-desc">
          스타일을 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  const choices = [
    { label: "A", ...data.optionA },
    { label: "B", ...data.optionB },
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
          className="mx-auto mt-6 grid w-full max-w-[320px] grid-cols-2 gap-3"
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
                className={`rounded-[10px] border border-mcm-border p-1 ${
                  selected ? "bg-mcm-black" : "bg-mcm-white"
                }`}
              >
                <img
                  src={choice.image}
                  alt={`${choice.title} 스타일`}
                  className="h-[130px] w-full rounded-t-[7px] object-cover"
                />

                <p
                  className={`py-2.5 text-sm font-semibold ${
                    selected ? "text-mcm-white" : "text-mcm-black"
                  }`}
                >
                  {choice.label}
                </p>
              </button>
            );
          })}
        </div>

        {styleChoiceMutation.error && (
          <p className="mt-4 text-center text-xs text-mcm-desc">
            스타일 선택을 처리하지 못했습니다.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!selectedHouse || styleChoiceMutation.isPending}
        onClick={handleNext}
        className={`mt-auto h-13 w-full rounded-[10px] text-sm font-semibold ${
          selectedHouse && !styleChoiceMutation.isPending
            ? "bg-mcm-black text-mcm-white"
            : "bg-mcm-border text-mcm-white"
        }`}
      >
        {styleChoiceMutation.isPending ? "ANALYZING..." : "NEXT"}
      </button>
    </main>
  );
}