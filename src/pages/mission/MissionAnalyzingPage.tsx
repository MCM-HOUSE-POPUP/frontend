import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { StyleDiscoveryView } from "../../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "";

interface LocationState {
  photoDataUrl: string;
}

const ANALYSIS_STEPS = [
  "제품의 디자인 특징을 살펴보는 중",
  "HOUSE TEST 취향과 연결하는 중",
  "당신의 스타일 무드를 찾는 중",
];

const STEP_INTERVAL_MS = 600;
const REQUEST_TIMEOUT_MS = 30000;

async function analyzeStyle(
  resultId: string,
  house: string,
  photoDataUrl: string,
): Promise<StyleDiscoveryView> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(
      `${API_URL}/api/results/${resultId}/style-discovery`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo: photoDataUrl,
          house,
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(`서버 응답 에러: ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export default function MissionAnalyzingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { house } = useParams<{ house: string }>();
  const { photoDataUrl } = (location.state as LocationState) || {};

  const [checkedSteps, setCheckedSteps] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const hasCalledApi = useRef(false);

  const analysisMutation = useMutation({
    mutationFn: ({
      resultId,
      house,
      photoDataUrl,
    }: {
      resultId: string;
      house: string;
      photoDataUrl: string;
    }) => analyzeStyle(resultId, house, photoDataUrl),

    onError: () => {
      setError("사진 분석에 실패했어요. 다시 시도해주세요.");
    },
  });

  useEffect(() => {
    const timers = ANALYSIS_STEPS.map((_, index) =>
      setTimeout(
        () => setCheckedSteps((prev) => Math.max(prev, index + 1)),
        (index + 1) * STEP_INTERVAL_MS,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (hasCalledApi.current) return;
    hasCalledApi.current = true;

    if (!photoDataUrl) {
      setError("촬영한 사진 정보가 없어요. 다시 촬영해주세요.");
      return;
    }

    const resultId = localStorage.getItem("resultId");
    if (!resultId) {
      setError("진단 결과 정보가 없어요. House 테스트를 먼저 진행해주세요.");
      return;
    }

    if (!house) {
      setError("House 정보를 찾을 수 없어요.");
      return;
    }

    analysisMutation.mutate({
      resultId,
      house: house.toUpperCase(),
      photoDataUrl,
    });
  }, [house, photoDataUrl]);

  useEffect(() => {
    if (
      !analysisMutation.data ||
      checkedSteps !== ANALYSIS_STEPS.length
    ) {
      return;
    }

    navigate(`/mission/${house?.toLowerCase()}/result`, {
      state: {
        photoDataUrl,
        styleResult: analysisMutation.data,
      },
      replace: true,
    });
  }, [
    analysisMutation.data,
    checkedSteps,
    house,
    navigate,
    photoDataUrl,
  ]);

  return (
    <main className="min-h-screen w-full max-w-[430px] mx-auto bg-black flex flex-col">
      <div className="px-5 pt-4">
        <button onClick={() => navigate(-1)} aria-label="뒤로가기">
          <img
            src="/icons/back-arrow.svg"
            alt="뒤로가기"
            className="w-6 h-6 invert"
          />
        </button>
      </div>

      {error ? (
        <div className="flex-1 flex items-center justify-center px-6">
          <p className="text-white text-sm text-center">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mt-6">
            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          </div>

          <div className="text-center mt-6 px-5">
            <p className="text-white text-lg font-semibold leading-relaxed">
              당신이 찍은 사진을
              <br />
              살펴보고 있어요
            </p>
          </div>

          <div className="px-5 mt-6">
            <div className="w-full aspect-square overflow-hidden bg-mcm-inactive">
              {photoDataUrl && (
                <img
                  src={photoDataUrl}
                  alt="촬영한 사진"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="px-5 mt-6 mb-8">
            <div className="border border-white/20 rounded-md p-4">
              <p className="text-white text-sm font-semibold mb-3">
                AI가 분석하는 내용
              </p>

              <ul className="flex flex-col gap-2">
                {ANALYSIS_STEPS.map((step, index) => {
                  const isChecked = index < checkedSteps;

                  return (
                    <li
                      key={step}
                      className="flex items-center gap-2 text-sm transition-colors duration-300"
                    >
                      <span
                        className={
                          isChecked ? "text-white" : "text-white/30"
                        }
                      >
                        ✓
                      </span>

                      <span
                        className={
                          isChecked ? "text-white" : "text-white/40"
                        }
                      >
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </main>
  );
}