import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { missions } from "../../data/missions";

const API_URL = import.meta.env.VITE_API_URL ?? "";

interface ZoneStatus {
  house: string;
  zoneName: string;
  zoneMission: string;
  color: string;
  order: number;
  visited: boolean;
}

interface PassportView {
  resultId: number;
  visitedCount: number;
  totalZones: number;
  completed: boolean;
  nextRecommended: string;
  currentZone: string;
  zones: ZoneStatus[];
}

export default function MissionPassportSavedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    house?: string;
    photoDataUrl?: string;
  } | null;
  const house = state?.house?.toUpperCase();

  const currentIndex = missions.findIndex((mission) => mission.house === house);
  const currentMission = missions[currentIndex];

  const [isSaving, setIsSaving] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [passport, setPassport] = useState<PassportView | null>(null);
  const hasSaved = useRef(false); // 같은 요청 중복 전송 방지용

  useEffect(() => {
    if (!house || hasSaved.current) return;
    hasSaved.current = true;

    const resultId = localStorage.getItem("resultId");

    if (!resultId) {
      setSaveError("진단 결과 정보가 없어요.");
      setIsSaving(false);
      return;
    }

    async function saveVisit() {
      try {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/visits`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scanValue: house }),
          },
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data: PassportView = await response.json();
        setPassport(data);
      } catch (err) {
        console.error("방문 인증 실패:", err);
        setSaveError("방문 저장에 실패했어요.");
      } finally {
        setIsSaving(false);
      }
    }

    saveVisit();
  }, [house]);

  if (!currentMission) {
    return (
      <main className="min-h-screen bg-mcm-white flex items-center justify-center max-w-[430px] mx-auto">
        <p className="text-sm text-mcm-desc">미션 정보를 찾을 수 없어요.</p>
      </main>
    );
  }

  const handleNext = () => {
    navigate("/map");
  };

  // 진짜 4개 다 방문했는지는 passport.completed로 판단 (배열 순서 기반 X)
  const isAllCompleted = passport?.completed ?? false;
  const nextHouse = passport?.nextRecommended;

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-10 max-w-[430px] mx-auto flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-mcm-black mb-12">
          {currentMission.missionTitle}
        </p>

        <div className="w-44 h-44 rounded-full border border-mcm-border shadow-[0_0_0_6px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center mb-4">
          <span className="text-4xl text-mcm-black mb-2">&#10003;</span>
          <p className="text-lg font-medium text-mcm-black">패스포트 저장</p>
        </div>

        <p className="text-xs tracking-widest font-semibold text-mcm-secondary mb-2">
          PASSPORT UPDATED
        </p>

        {isSaving && (
          <p className="text-xs text-mcm-secondary mb-2">저장 중이에요...</p>
        )}

        {saveError && (
          <p className="text-xs text-mcm-secondary mb-2">{saveError}</p>
        )}

        {!isSaving && !saveError && (
          <>
            {isAllCompleted ? (
              <p className="text-sm font-medium text-mcm-black">
                모든 HOUSE 미션 완료!
              </p>
            ) : nextHouse ? (
              <p className="text-sm font-medium text-mcm-black">
                NEXT &#8594; {nextHouse} HOUSE
              </p>
            ) : null}
          </>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-mcm-black text-mcm-white py-4 text-sm font-semibold"
      >
        {isAllCompleted ? "미션 목록으로" : "다음 HOUSE 이동"}
      </button>
    </main>
  );
}
