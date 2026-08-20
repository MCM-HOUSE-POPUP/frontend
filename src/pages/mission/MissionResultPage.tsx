import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSaved } from "../../context/SavedContext";
import ProductCard from "../../components/ProductCard";
import type { StyleDiscoveryView } from "../../types/product";

export default function MissionResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { house } = useParams<{ house: string }>();
  const { isSaved, toggleSave } = useSaved();

  const state = location.state as {
    photoDataUrl?: string;
    styleResult?: StyleDiscoveryView;
  } | null;

  const photoDataUrl = state?.photoDataUrl;
  const result = state?.styleResult;

  if (!result) {
    return (
      <main className="min-h-screen bg-mcm-white flex flex-col items-center justify-center max-w-[430px] mx-auto px-5 text-center">
        <p className="text-sm text-mcm-desc mb-4">
          결과 정보를 찾을 수 없어요. 사진을 다시 찍어주세요.
        </p>
        <button
          onClick={() => navigate(`/mission/${house?.toLowerCase()}/camera`)}
          className="bg-mcm-black text-mcm-white px-6 py-3 text-sm font-semibold"
        >
          다시 찍기
        </button>
      </main>
    );
  }

  const handleRetake = () => {
    navigate(`/mission/${house?.toLowerCase()}/camera`);
  };

  const handleSaveToPassport = () => {
    navigate("/mission/passport-saved", { state: { house, photoDataUrl } });
  };

  return (
    <main className="min-h-screen bg-mcm-white max-w-[430px] mx-auto pb-28">
      <div className="px-5 pt-6">
        <p className="text-xs tracking-widest font-semibold text-mcm-secondary mb-3">
          DISCOVERY FOUND
        </p>

        {/* 사진 */}
        {photoDataUrl && (
          <img
            src={photoDataUrl}
            alt="촬영한 사진"
            className="w-full aspect-square object-cover mb-4"
          />
        )}

        {result.fallback && (
          <p className="text-[10px] text-mcm-secondary mb-3">
            &#9432; 분석이 원활하지 않아 기본 추천으로 대체되었어요
          </p>
        )}

        {/* YOUR STYLE DISCOVERY */}
        <p className="text-xs font-semibold text-mcm-black mb-1">
          YOUR STYLE DISCOVERY
        </p>
        <p className="text-xs text-mcm-secondary mb-4">
          &#9432; HOUSE Test와 이번 제품 선택을 함께 분석했어요
        </p>

        <p className="text-xs font-semibold text-mcm-black mb-1">
          분석한 스타일 무드
        </p>
        <h1 className="text-xl font-semibold text-mcm-black mb-3">
          {result.styleTitle}
        </h1>

        <p className="text-sm font-semibold text-mcm-desc leading-relaxed mb-4 whitespace-pre-line">
          {result.styleDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {result.styleKeywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1.5 text-xs border border-mcm-border text-mcm-black"
            >
              {keyword}
            </span>
          ))}
        </div>

        <hr className="border-mcm-border mb-5" />

        {/* 이 스타일이 주는 인상 */}
        <p className="text-xs font-semibold text-mcm-black mb-2">
          이 스타일이 주는 인상
        </p>
        <p className="text-sm font-semibold text-mcm-desc leading-relaxed mb-5 whitespace-pre-line">
          {result.impression}
        </p>

        <hr className="border-mcm-border mb-5" />

        {/* YOUR PICK */}
        {result.yourPick && (
          <>
            <p className="text-xs font-semibold text-mcm-secondary mb-1">
              YOUR PICK
            </p>
            <p className="text-sm font-semibold text-mcm-black mb-3">
              내가 찾은 상품
            </p>
            <div className="w-1/2 mb-5">
              <ProductCard
                product={result.yourPick}
                isSaved={isSaved(result.yourPick.id)}
                onSave={() => toggleSave(result.yourPick.id)}
              />
            </div>

            <hr className="border-mcm-border mb-5" />
          </>
        )}

        {/* COMPLETE THE LOOK */}
        <p className="text-xs font-semibold text-mcm-secondary mb-1">
          COMPLETE THE LOOK
        </p>
        <p className="text-sm font-semibold text-mcm-black mb-3">
          이 제품과 함께 매치해보세요
        </p>
        <div className="grid grid-cols-2 gap-3">
          {result.completeTheLook.map((match) => (
            <div
              key={match.product.id}
              className="border border-mcm-border p-3"
            >
              <p className="text-[10px] text-mcm-secondary mb-1">AI PICK</p>
              <p className="text-[10px] text-mcm-secondary mb-2 leading-snug">
                {match.reason}
              </p>
              <ProductCard
                product={match.product}
                isSaved={isSaved(match.product.id)}
                onSave={() => toggleSave(match.product.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-mcm-white border-t border-mcm-border px-5 py-4 flex gap-3">
        <button
          onClick={handleRetake}
          className="w-[35%] bg-mcm-card-bg text-mcm-black py-3 text-sm font-semibold"
        >
          다시 찍기
        </button>
        <button
          onClick={handleSaveToPassport}
          className="flex-1 bg-mcm-black text-mcm-white py-3 text-sm font-semibold"
        >
          패스포트로 저장
        </button>
      </div>
    </main>
  );
}
