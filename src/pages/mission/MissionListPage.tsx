import { useNavigate } from "react-router-dom";
import { missions, dummyVisitedStatus } from "../../data/missions";

export default function MissionListPage() {
  const navigate = useNavigate();

  const completedCount = missions.filter(
    (mission) => dummyVisitedStatus[mission.house],
  ).length;

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
          const visited = dummyVisitedStatus[mission.house];
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
