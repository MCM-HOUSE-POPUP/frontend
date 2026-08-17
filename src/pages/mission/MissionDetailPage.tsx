import { useNavigate, useParams } from "react-router-dom";
import { missions, guideLines } from "../../data/missions";

export default function MissionDetailPage() {
  const navigate = useNavigate();
  const { house } = useParams<{ house: string }>();

  const mission = missions.find(
    (item) => item.house.toLowerCase() === house?.toLowerCase(),
  );

  if (!mission) {
    return (
      <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32 max-w-[430px] mx-auto">
        <p className="text-sm text-mcm-desc">미션 정보를 찾을 수 없어요.</p>
      </main>
    );
  }

  const handleStartMission = () => {
    navigate(`/mission/${mission.house.toLowerCase()}/camera`);
  };

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32 max-w-[430px] mx-auto">
      <button onClick={() => navigate(-1)} className="mb-8">
        <img src="/icons/back-arrow.svg" alt="뒤로가기" className="w-6 h-6" />
      </button>

      <p className="text-xs tracking-widest text-mcm-black font-semibold mb-2">
        {mission.missionTitle}
      </p>
      <h1 className="text-2xl font-semibold mb-4 text-mcm-black">
        {mission.headline}
      </h1>

      <p className="text-sm text-mcm-desc font-semibold leading-relaxed mb-4">
        {mission.descriptionLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < mission.descriptionLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      <p className="text-sm text-mcm-desc font-semibold leading-relaxed mb-6">
        {guideLines.map((line, index) => (
          <span key={index}>
            {line}
            {index < guideLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      <p className="text-xs text-mcm-desc mb-2">예시 사진:</p>
      <img
        src={mission.exampleImage}
        alt={`${mission.house} 미션 예시 사진`}
        className="w-full mb-8"
      />

      <button
        onClick={handleStartMission}
        className="fixed bottom-6 left-5 right-5 max-w-[390px] mx-auto bg-mcm-black text-mcm-white py-4 text-sm font-semibold"
      >
        미션 시작하기
      </button>
    </main>
  );
}
