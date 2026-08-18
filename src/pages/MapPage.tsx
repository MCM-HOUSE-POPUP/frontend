import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zoneInfoList, missions } from "../data/missions";

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

function Chevron({ className }: { className?: string }) {
  return (
    <img
      src="/icons/chevron-right.svg"
      alt=""
      className={className ?? "w-3 h-3"}
    />
  );
}

export default function MapPage() {
  const navigate = useNavigate();

  const [floor, setFloor] = useState<1 | 2>(1);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
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
          `http://localhost:8080/api/results/${resultId}/passport`,
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

  // house별 visited 여부를 빠르게 찾기 위한 맵
  const visitedMap: Record<string, boolean> = {};
  passport?.zones.forEach((zone) => {
    visitedMap[zone.house] = zone.visited;
  });

  // order 기준으로 정렬된 추천 경로 (order는 1부터 시작)
  const recommendedRoute = passport
    ? [...passport.zones].sort((a, b) => a.order - b.order).map((z) => z.house)
    : [];

  const completedCount = passport?.visitedCount ?? 0;

  const handleZoneClick = (
    house: string,
    isActiveFloor: boolean,
    visited: boolean,
  ) => {
    if (!isActiveFloor || visited) return;
    setSelectedZone((prev) => (prev === house ? null : house));
  };

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
      <p className="text-xs tracking-widest text-mcm-secondary font-semibold mb-2">
        MCM HOUSE
      </p>
      <h1 className="text-2xl font-semibold mb-5 text-mcm-black">
        EXPLORE THE HOUSE
      </h1>

      {/* 층 탭 - 너비를 절반 정도로 축소 */}
      <div className="w-[55%] mx-auto grid grid-cols-2 border border-mcm-black mb-5">
        <button
          onClick={() => setFloor(1)}
          className={`py-1.5 text-sm font-medium ${
            floor === 1
              ? "bg-mcm-black text-mcm-white"
              : "bg-mcm-white text-mcm-black"
          }`}
        >
          1F
        </button>
        <button
          onClick={() => setFloor(2)}
          className={`py-1.5 text-sm font-medium ${
            floor === 2
              ? "bg-mcm-black text-mcm-white"
              : "bg-mcm-white text-mcm-black"
          }`}
        >
          2F
        </button>
      </div>

      {/* Zone 그리드 (4칸 고정) */}
      <div className="grid grid-cols-2 border-t border-l border-[#E5E5E5] mb-6">
        {zoneInfoList.map((zone) => {
          const visited = visitedMap[zone.house] ?? false;
          const isActiveFloor = zone.floor === floor;
          const isSelected = selectedZone === zone.house;
          const missionCode = missions.find(
            (m) => m.house === zone.house,
          )?.code;

          return (
            <button
              key={zone.house}
              onClick={() =>
                handleZoneClick(zone.house, isActiveFloor, visited)
              }
              className={`text-left border-r border-b p-4 min-h-[130px] flex flex-col justify-between ${
                isSelected ? "border-2 border-mcm-black" : "border-[#E5E5E5]"
              } ${isActiveFloor ? "bg-mcm-white" : "bg-mcm-card-bg"}`}
            >
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    isActiveFloor ? "text-mcm-black" : "text-mcm-secondary"
                  }`}
                >
                  {missionCode} - {zone.house}
                </p>
                <p className="text-xs font-semibold text-mcm-secondary">
                  {zone.tags}
                </p>
              </div>

              {isActiveFloor && visited && (
                <p className="text-xs text-mcm-black flex items-center gap-1">
                  VISITED <span>&#10003;</span>
                </p>
              )}

              {isSelected && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/mission/${zone.house.toLowerCase()}`);
                  }}
                  className="text-xs font-semibold text-mcm-black flex items-center justify-between mt-2"
                >
                  이곳으로 가기 <Chevron />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* YOUR ROUTE */}
      <div className="border border-mcm-secondary p-4 mb-4">
        <p className="text-xs font-semibold text-mcm-secondary mb-1">
          YOUR ROUTE
        </p>
        <p className="text-sm font-semibold text-mcm-black mb-4">
          나를 위한 추천 탐험 순서
        </p>
        <div className="flex flex-col gap-3">
          {[0, 1].map((rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-8">
              {recommendedRoute
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map((house) => {
                  const globalIndex = recommendedRoute.indexOf(house);
                  const isLast = globalIndex === recommendedRoute.length - 1;
                  return (
                    <div key={house} className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full border border-mcm-border text-mcm-black flex items-center justify-center text-[10px] font-semibold shrink-0">
                        {globalIndex + 1}
                      </span>
                      <span className="text-xs font-semibold text-mcm-black">
                        {house}
                      </span>
                      {!isLast && <Chevron className="w-3 h-3" />}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* MISSIONS 진행도 */}
      <button
        onClick={() => navigate("/mission")}
        className="w-full border border-mcm-secondary p-4 flex items-center justify-between"
      >
        <div className="text-left">
          <p className="text-xs font-semibold text-mcm-secondary mb-1">
            MISSIONS
          </p>
          <p className="text-sm font-semibold text-mcm-black">
            {completedCount} / 4 COMPLETE
          </p>
        </div>
        <Chevron className="w-4 h-4" />
      </button>
    </main>
  );
}
