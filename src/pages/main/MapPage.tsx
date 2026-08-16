import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  zoneInfoList,
  dummyRecommendedRoute,
  dummyVisitedStatus,
  missions,
} from "../../data/missions";

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

  const completedCount = missions.filter(
    (mission) => dummyVisitedStatus[mission.house],
  ).length;

  const handleZoneClick = (
    house: string,
    isActiveFloor: boolean,
    visited: boolean,
  ) => {
    if (!isActiveFloor || visited) return;
    setSelectedZone((prev) => (prev === house ? null : house));
  };

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-10 max-w-[430px] mx-auto">
      <p className="text-xs tracking-widest text-mcm-secondary mb-2">
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
          const visited = dummyVisitedStatus[zone.house];
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
                <p className="text-xs text-mcm-secondary">{zone.tags}</p>
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
        <p className="text-xs text-mcm-secondary mb-1">YOUR ROUTE</p>
        <p className="text-sm font-semibold text-mcm-black mb-4">
          나를 위한 추천 탐험 순서
        </p>
        <div className="flex flex-col gap-3">
          {[0, 1].map((rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-8">
              {dummyRecommendedRoute
                .slice(rowIndex * 2, rowIndex * 2 + 2)
                .map((house) => {
                  const globalIndex = dummyRecommendedRoute.indexOf(house);
                  const isLast =
                    globalIndex === dummyRecommendedRoute.length - 1;
                  return (
                    <div key={house} className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full border border-mcm-border text-mcm-black flex items-center justify-center text-[10px] font-semibold shrink-0">
                        {globalIndex + 1}
                      </span>
                      <span className="text-xs text-mcm-black">{house}</span>
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
          <p className="text-xs text-mcm-secondary mb-1">MISSIONS</p>
          <p className="text-sm font-semibold text-mcm-black">
            {completedCount} / 4 COMPLETE
          </p>
        </div>
        <Chevron className="w-4 h-4" />
      </button>
    </main>
  );
}
