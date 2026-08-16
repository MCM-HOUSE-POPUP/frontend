import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { missions, dummyVisitedStatus } from "../../data/missions";

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
  const nextMission = missions[currentIndex + 1]; // 마지막(CURIOSITY)이면 undefined

  // TODO: 백엔드 API 나오면 여기서 visits API 호출로 교체
  // 지금은 mock 상태를 직접 갱신 (임시 방편, Map 붙일 때 Context로 정리 예정)
  useEffect(() => {
    if (house) {
      dummyVisitedStatus[house] = true;
    }
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

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-10 max-w-[430px] mx-auto flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-mcm-black mb-12">
          {currentMission.missionTitle}
        </p>

        <div className="w-44 h-44 rounded-full border border-mcm-border shadow-[0_0_0_6px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center mb-4">
          <span className="text-xl text-mcm-black mb-2">&#10003;</span>
          <p className="text-base font-medium text-mcm-black">패스포트 저장</p>
        </div>

        <p className="text-xs tracking-widest text-mcm-secondary mb-2">
          PASSPORT UPDATED
        </p>

        {nextMission ? (
          <p className="text-sm font-medium text-mcm-black">
            NEXT &#8594; {nextMission.house} HOUSE
          </p>
        ) : (
          <p className="text-sm font-medium text-mcm-black">
            모든 HOUSE 미션 완료!
          </p>
        )}
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-mcm-black text-mcm-white py-4 text-sm font-semibold"
      >
        {nextMission ? "다음 HOUSE 이동" : "미션 목록으로"}
      </button>
    </main>
  );
}
