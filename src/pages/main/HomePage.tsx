import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: 실제로는 Context/localStorage에서 가져오기
const dummyResultId: string | null = null; // null=진단 전, 문자열=진단 후
const dummyHouseType: string | null = null; // 예: "LEGACY" 넣으면 진단 후 테스트 가능

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const housePool: Record<string, Product[]> = {
  LEGACY: [
    {
      id: 101,
      name: "Neo Terrain 비세토스 로우탑 스니커즈",
      price: 770000,
      image: "/images/legacy/01_REC.PNG",
    },
    {
      id: 102,
      name: "비세토스 네오 테라인 스니커즈",
      price: 630000,
      image: "/images/legacy/01_REC2.PNG",
    },
    {
      id: 103,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 990000,
      image: "/images/legacy/01_REC3.PNG",
    },
    {
      id: 104,
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      image: "/images/legacy/01_REC4.PNG",
    },
    {
      id: 105,
      name: "50주년 기념 티셔츠",
      price: 390000,
      image: "/images/legacy/01_REC5.PNG",
    },
    {
      id: 106,
      name: "라우첼 지오메트릭 선글라스",
      price: 290000,
      image: "/images/legacy/01_REC6.PNG",
    },
    {
      id: 107,
      name: "München 폰테 캡",
      price: 430000,
      image: "/images/legacy/01_REC7.PNG",
    },
  ],
  INSTINCT: [
    {
      id: 201,
      name: "Diamant 비세토스 3D 참",
      price: 490000,
      image: "/images/instinct/02_REC.avif",
    },
    {
      id: 202,
      name: "Aren 비세토스 트라이앵글 크로스바디",
      price: 790000,
      image: "/images/instinct/02_REC2.avif",
    },
    {
      id: 203,
      name: "스퀘어 선글라스",
      price: 350000,
      image: "/images/instinct/02_REC3.avif",
    },
    {
      id: 204,
      name: "Pina 비세토스 스터드 장식 토트",
      price: 1690000,
      image: "/images/instinct/02_REC4.avif",
    },
    {
      id: 205,
      name: "모노그램 프린트 후드 윈드브레이커 ECONYL®",
      price: 1250000,
      image: "/images/instinct/02_REC5.avif",
    },
    {
      id: 206,
      name: "42-49mm 비세토스 Apple Watch 스트랩",
      price: 290000,
      image: "/images/instinct/02_REC6.avif",
    },
  ],
  FREEDOM: [
    {
      id: 301,
      name: "Aren 비세토스 슬링백",
      price: 1150000,
      image: "/images/freedom/03_REC.avif",
    },
    {
      id: 302,
      name: "Aren 비세토스 래빗 2D 참",
      price: 270000,
      image: "/images/freedom/03_REC2.avif",
    },
    {
      id: 303,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 990000,
      image: "/images/freedom/03_REC3.avif",
    },
    {
      id: 304,
      name: "Aren 비세토스 브라스 플레이트 지갑",
      price: 490000,
      image: "/images/freedom/03_REC4.avif",
    },
    {
      id: 305,
      name: "에센셜 로고 폰테 트랙 자켓",
      price: 730000,
      image: "/images/freedom/03_REC5.avif",
    },
    {
      id: 306,
      name: "Disco 로고 자수 코튼 트윌 캡",
      price: 370000,
      image: "/images/freedom/03_REC6.PNG",
    },
    {
      id: 307,
      name: "다이아몬드 모노그램 스카프",
      price: 390000,
      image: "/images/freedom/03_REC7.PNG",
    },
  ],
  CURIOSITY: [
    {
      id: 401,
      name: "Aren 듀오 호보 맥시 비세토스와 카프스킨",
      price: 1290000,
      image: "/images/curiosity/04_REC.avif",
    },
    {
      id: 402,
      name: "Aren 비세토스 레더 믹스 베니티 케이스",
      price: 1190000,
      image: "/images/curiosity/04_REC2.avif",
    },
    {
      id: 403,
      name: "Pina 비세토스 탬버린 백",
      price: 1690000,
      image: "/images/curiosity/04_REC3.avif",
    },
    {
      id: 404,
      name: "실크 파자마 셔츠",
      price: 1050000,
      image: "/images/curiosity/04_REC4.avif",
    },
    {
      id: 405,
      name: "Skywander 메탈릭 카프 레더 앵클 부츠",
      price: 950000,
      image: "/images/curiosity/04_REC5.avif",
    },
    {
      id: 406,
      name: "Mars Mask 선글라스",
      price: 710000,
      image: "/images/curiosity/04_REC6.avif",
    },
    {
      id: 407,
      name: "모노그램 플랫폼 양가죽 샌들",
      price: 890000,
      image: "/images/curiosity/04_REC7.avif",
    },
  ],
};

// 진단 전 기본 추천 풀 (4개 House에서 골고루 섞음)
const defaultPool: Product[] = [
  housePool.LEGACY[0],
  housePool.INSTINCT[0],
  housePool.FREEDOM[0],
  housePool.CURIOSITY[0],
  housePool.LEGACY[2],
  housePool.INSTINCT[2],
];

const houseCategories = [
  { code: "01", name: "LEGACY" },
  { code: "02", name: "INSTINCT" },
  { code: "03", name: "FREEDOM" },
  { code: "04", name: "CURIOSITY" },
];

function getRandomProducts(pool: Product[], count: number): Product[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function HomePage() {
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // 컴포넌트 처음 렌더링될 때 한 번만 계산 (useEffect 없이)
  const [displayProducts] = useState<Product[]>(() => {
    const pool =
      dummyResultId && dummyHouseType && housePool[dummyHouseType]
        ? housePool[dummyHouseType]
        : defaultPool;
    return getRandomProducts(pool, 2);
  });

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id],
    );
    // TODO: 실제로는 여기서 Saved 목록에 반영하는 전역 상태나 API 호출 필요
  };

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32">
      {/* 브랜드 라벨 */}
      <p className="text-xs tracking-widest text-mcm-secondary mb-3">
        MCM HOUSE
      </p>

      {/* 타이틀 */}
      <h1 className="text-[26px] font-semibold leading-tight mb-4 text-mcm-black">
        나만의 방식으로
        <br />
        MCM HOUSE를 탐험해보세요
      </h1>

      {/* 설명 */}
      <p className="text-sm text-mcm-desc mb-6 leading-relaxed">
        질문을 통해 당신의 취향을 발견하고,
        <br />
        MCM의 4가지 HOUSE를 탐험해보세요
      </p>

      {/* FIND MY HOUSE 버튼 */}
      <button
        onClick={() => navigate("/test")}
        className="w-full bg-mcm-black text-mcm-white py-4 flex items-center justify-center gap-2 mb-6 text-sm font-semibold"
      >
        FIND MY HOUSE <span>&gt;</span>
      </button>

      <hr className="border-mcm-border mb-6" />

      {/* EXPLORE 섹션 */}
      <p className="text-xs tracking-widest text-mcm-secondary mb-3">EXPLORE</p>
      <div className="grid grid-cols-4 border-t border-l border-mcm-border mb-4">
        {houseCategories.map((house) => (
          <div
            key={house.code}
            className="border-r border-b border-mcm-border py-4 px-2 text-center"
          >
            <p className="text-mcm-secondary text-xs mb-2">{house.code}</p>
            <p className="font-semibold text-xs text-mcm-black">{house.name}</p>
          </div>
        ))}
      </div>

      {/* EXPLORE THE HOUSE 버튼 */}
      <button
        onClick={() => navigate("/map")}
        className="w-full border border-mcm-black text-mcm-black py-4 flex items-center justify-center gap-2 mb-6 text-sm font-semibold"
      >
        EXPLORE THE HOUSE <span>&gt;</span>
      </button>

      <hr className="border-mcm-border mb-4" />

      {/* 상품 추천 섹션 */}
      <p className="text-xs tracking-widest text-mcm-secondary mb-3">
        DISVOXER IN THIS HOUSE
      </p>
      <div className="grid grid-cols-2 gap-3">
        {displayProducts.map((product) => {
          const isSaved = savedIds.includes(product.id);
          return (
            <div key={product.id} className="relative">
              <button
                onClick={() => toggleSave(product.id)}
                className="absolute top-2 right-2 z-10"
              >
                <img
                  src="/icons/saved.svg"
                  alt="찜하기"
                  className="w-5 h-5"
                  style={{ filter: isSaved ? "none" : "opacity(0.5)" }}
                />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover mb-2"
              />
              <p className="text-xs leading-snug mb-1 text-mcm-black">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-mcm-black">
                ₩ {product.price.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
