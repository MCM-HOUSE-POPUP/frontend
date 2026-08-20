import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function MissionListPage() {
  const navigate = useNavigate();

  const [passport, setPassport] = useState<PassportView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resultId = localStorage.getItem("resultId");

    if (!resultId) {
      setError("진단 결과 정보가 없어요.");
      setIsLoading(false);
      return;
    }

    async function fetchPassport() {
      try {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/passport`,
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data: PassportView = await response.json();
        setPassport(data);
      } catch (err) {
        console.error("탐험 현황 조회 실패:", err);
        setError("탐험 현황을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPassport();
  }, []);

  const visitedMap: Record<string, boolean> = {};
  passport?.zones.forEach((zone) => {
    visitedMap[zone.house] = zone.visited;
  });

  const completedCount = passport?.visitedCount ?? 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-mcm-white flex items-center justify-center max-w-[430px] mx-auto">
        <p className="text-sm text-mcm-desc">불러오는 중이에요...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-mcm-white flex items-center justify-center max-w-[430px] mx-auto px-5 text-center">
        <p className="text-sm text-mcm-desc">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-10 max-w-[430px] mx-auto">
      <button onClick={() => navigate(-1)} className="mb-8">
        <img src="/icons/back-arrow.svg" alt="뒤로가기" className="w-6 h-6" />
      </button>

      <p className="text-xs tracking-widest text-mcm-secondary font-semibold mb-2">
        HOUSE MISSIONS
      </p>
      <h1 className="text-2xl font-semibold mb-8 text-mcm-black">
        MISSIONS {completedCount}/4
      </h1>

      <div>
        {missions.map((mission) => {
          const visited = visitedMap[mission.house] ?? false;
          return (
            <button
              key={mission.house}
              onClick={() =>
                navigate(`/mission/${mission.house.toLowerCase()}`)
              }
              className="w-full flex items-center justify-between py-5 border-b border-mcm-border text-left"
            >
              <div>
                <p className="text-sm font-semibold text-mcm-black mb-1">
                  {mission.code} - {mission.house}
                </p>
                <p className="text-xs font-semibold text-mcm-desc">
                  {mission.listSubtitle}
                </p>
              </div>
              {visited && (
                <span className="text-mcm-black text-lg">&#10003;</span>
              )}
            </button>
          );
        })}
      </div>
    </main>
  );
}
