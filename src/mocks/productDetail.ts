import type { ProductDetail } from "../types/product";

export const mockProductDetails: Record<string, ProductDetail> = {
  "01_REC1": {
    house: "LEGACY",
    product: {
      id: "01_REC1",
      house: "LEGACY",
      name: "Neo Terrain 비세토스 로우탑 스니커즈",
      price: 770000,
      category: "SHOES",
      image: "/images/legacy/01_REC.PNG",
    },
    reason:
      "익숙한 실루엣을 낯설게 비트는 디테일에 끌리는 당신에게 어울리는 제품이에요.",
    story:
      "비세토스 모노그램 캔버스에 MCM의 헤리티지와 현대적인 감각을 담아낸 제품입니다.",
    fallback: false,
    completeTheLook: [
      {
        product: {
          id: "01_REC6",
          house: "LEGACY",
          name: "라우볼 지오메트릭 선글라스",
          price: 290000,
          category: "ACCESSORY",
          image: "/images/legacy/01_REC6.PNG",
        },
        reason: "함께 매치하기 좋은 아이템입니다.",
      },
      {
        product: {
          id: "01_REC7",
          house: "LEGACY",
          name: "München 트러커 캡",
          price: 430000,
          category: "ACCESSORY",
          image: "/images/legacy/01_REC7.PNG",
        },
        reason: "전체 룩의 균형을 잡아주는 아이템입니다.",
      },
    ],
  },
};