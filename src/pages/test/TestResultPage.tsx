import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTestResult } from "../../api/test";
import ScoreBar from "../../components/ScoreBar";
import type { HouseType } from "../../types/test";

const houses: HouseType[] = [
  "LEGACY",
  "INSTINCT",
  "FREEDOM",
  "CURIOSITY",
];

const houseContent: Record<
  HouseType,
  {
    number: string;
    image: string;
    mission: string;
  }
> = {
  LEGACY: {
    number: "01",
    image: "/images/mcm-house-legacy.png",
    mission: "시간을 담은 디테일",
  },
  INSTINCT: {
    number: "02",
    image: "/images/mcm-house-instinct.png",
    mission: "감각을 깨우는 선택",
  },
  FREEDOM: {
    number: "03",
    image: "/images/mcm-house-freedom.png",
    mission: "나만의 방식으로 탐험하기",
  },
  CURIOSITY: {
    number: "04",
    image: "/images/mcm-house-curiosity.png",
    mission: "새로운 시선으로 발견하기",
  },
};

const MAX_SCORE = 12;

export default function TestResultPage() {
  const navigate = useNavigate();
  const { resultId: resultIdParam } = useParams();

  const storedResultId = localStorage.getItem("resultId");
  const resultId = Number(resultIdParam ?? storedResultId);
  const hasResultId = Number.isInteger(resultId) && resultId > 0;

  const {
    data: result,
    isPending,
    error,
  } = useQuery({
    queryKey: ["testResult", resultId],
    queryFn: () => getTestResult(resultId),
    enabled: hasResultId,
  });

  if (!hasResultId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-6">
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
          테스트 결과를 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white px-6">
        <p className="text-sm text-mcm-desc">
          테스트 결과를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  const house = result.primaryHouse.key;
  const content = houseContent[house];

  return (
    <main className="min-h-screen bg-mcm-white pb-24 pt-2">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="ml-2 flex h-10 w-10 items-center justify-center"
        aria-label="뒤로가기"
      >
        <img
          src="/icons/back-arrow.svg"
          alt=""
          className="h-5 w-5"
        />
      </button>

      <img
        src={content.image}
        alt={`${house} HOUSE`}
        className="mt-2 aspect-[4/3] w-full object-cover"
      />

      <div className="px-6 pt-5">
        <p className="text-xs font-semibold text-mcm-secondary">
          YOUR MCM HOUSE
        </p>

        <h1 className="mt-2 text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
          {content.number} - {house}
        </h1>

        <p className="mt-2 text-[15px] font-semibold leading-[1.8] tracking-[-0.02em] text-mcm-desc">
          {result.primaryHouse.description}
        </p>

        <div className="mt-5 flex gap-3">
          {result.primaryHouse.tags.map((tag) => (
            <span
              key={tag}
              className="border border-mcm-border px-3.5 py-1.5 text-xs text-mcm-black"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 border-t border-mcm-border pt-7">
          <div className="space-y-5">
            {houses.map((houseName) => (
              <ScoreBar
                key={houseName}
                label={houseName}
                score={result.scores[houseName]}
                maxScore={MAX_SCORE}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-mcm-border pt-5">
          <div className="border border-mcm-border px-4 py-3">
            <p className="text-xs font-semibold text-mcm-desc">
              HOUSE MISSION
            </p>

            <p className="mt-0.5 text-[13px] font-semibold text-mcm-black">
              {content.mission}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[430px] bg-mcm-white px-4 pb-5 pt-3">
        <button
          type="button"
          onClick={() => navigate("/map")}
          className="h-13 w-full bg-mcm-black text-sm font-semibold text-mcm-white"
        >
          NEXT
        </button>
      </div>
    </main>
  );
}