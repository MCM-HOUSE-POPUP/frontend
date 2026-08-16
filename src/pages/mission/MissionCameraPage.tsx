import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { missions } from "../../data/missions";

export default function MissionCameraPage() {
  const navigate = useNavigate();
  const { house } = useParams<{ house: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  const mission = missions.find(
    (item) => item.house.toLowerCase() === house?.toLowerCase(),
  );

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("카메라 권한을 허용해주세요.");
      }
    }

    startCamera();

    // 화면 벗어나면 카메라 끄기 (안 끄면 계속 켜져있어서 배터리/권한 문제 생김)
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoDataUrl = canvas.toDataURL("image/jpeg", 0.9);

    // 백엔드한테 전달할 요청 형태
    // POST /api/results/{id}/style-discovery
    const requestBody = {
      photo: photoDataUrl, // base64 인코딩된 이미지 (data:image/jpeg;base64,... 형태)
      house: house?.toUpperCase(),
      // selectedProductId: 아직 상품 선택 UI가 없어서 일단 생략, 나중에 추가
    };

    try {
      // TODO: 백엔드 API 완성되면 아래 fetch 주석 풀고 실제 연결
      // const response = await fetch(`/api/results/${resultId}/style-discovery`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(requestBody),
      // });
      // const data = await response.json();

      console.log("서버로 보낼 요청 형태:", requestBody);
    } catch (error) {
      console.error("사진 전송 실패:", error);
    }

    // 지금은 mock으로 완료 화면에 그대로 넘겨줌
    navigate(`/mission/${house?.toLowerCase()}/result`, {
      state: { photoDataUrl },
    });
  };

  if (!mission) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm">미션 정보를 찾을 수 없어요.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden max-w-[430px] mx-auto">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-5 z-20"
      >
        <img
          src="/icons/back-arrow.svg"
          alt="뒤로가기"
          className="w-6 h-6 invert"
        />
      </button>

      {error ? (
        <div className="min-h-screen flex items-center justify-center px-6">
          <p className="text-white text-sm text-center">{error}</p>
        </div>
      ) : (
        <>
          {/* 실시간 카메라 화면 */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 상단 안내 텍스트 */}
          <div className="absolute top-16 left-5 right-5 z-10">
            <p className="text-white text-xs tracking-widest mb-2">
              {mission.missionTitle}
            </p>
            <p className="text-white text-sm leading-relaxed">
              {mission.descriptionLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < mission.descriptionLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* 뷰파인더 모서리 꺾쇠 프레임 */}
          <div className="absolute inset-x-5 top-40 bottom-32 z-10 pointer-events-none">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white" />
            </div>
          </div>

          {/* 셔터 버튼 */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
            <button
              onClick={handleCapture}
              className="w-16 h-16 rounded-full bg-white border-4 border-mcm-secondary"
              aria-label="사진 촬영"
            />
          </div>
        </>
      )}

      {/* 캡처용 캔버스 (화면에는 안 보임) */}
      <canvas ref={canvasRef} className="hidden" />
    </main>
  );
}
