import type { Product } from "./products";
import { housePool } from "./products";

export interface CompleteTheLookItem extends Product {
  aiPickReason: string;
  aiPickDescription: string;
}

export interface StyleResult {
  house: "LEGACY" | "INSTINCT" | "FREEDOM" | "CURIOSITY";
  styleTitle: string;
  descriptionLines: string[];
  styleKeywords: string[];
  impressionLines: string[];
  yourPick: Product;
  completeTheLook: CompleteTheLookItem[];
}

export const styleResults: StyleResult[] = [
  {
    house: "LEGACY",
    styleTitle: "깔끔하지만 평범하지 않게",
    descriptionLines: [
      "전체 룩은 안정적으로 정리하되,",
      "형태가 뚜렷하거나 브랜드의 존재감이 느껴지는",
      "아이템으로 포인트를 주는 스타일을 선호하는 모습을 보여요.",
    ],
    styleKeywords: ["정돈된", "도시적인", "존재감 있는"],
    impressionLines: [
      "단정하고 세련된 분위기 속에서",
      "자기 취향이 분명한 인상을 줄 수 있어요.",
    ],
    yourPick: housePool.LEGACY[2],
    completeTheLook: [
      {
        ...housePool.LEGACY[5],
        aiPickReason: "정돈된 인상을 이어주는 포인트",
        aiPickDescription:
          "가방의 독특한 형태감과 각진 실루엣을 연결해서 개성 있는 인상을 유지하는 조합이에요",
      },
      {
        ...housePool.LEGACY[0],
        aiPickReason: "시그니처를 캐주얼하게 연결",
        aiPickDescription:
          "가방의 독특한 형태감과 각진 실루엣을 연결해서 개성 있는 인상을 유지하는 조합이에요",
      },
    ],
  },
  {
    house: "INSTINCT",
    styleTitle: "익숙한 룩에도 색다른 포인트",
    descriptionLines: [
      "익숙한 스타일 안에서도 형태가 독특하고",
      "시선을 끄는 아이템으로 변화를 주는 취향이 나타났어요.",
    ],
    styleKeywords: ["개성 있는", "대담한", "색다른"],
    impressionLines: [
      "평범한 조합에서도 자신만의 포인트가",
      "분명한 인상을 줄 수 있어요",
    ],
    yourPick: housePool.INSTINCT[1],
    completeTheLook: [
      {
        ...housePool.INSTINCT[2],
        aiPickReason: "선명한 실루엣으로 개성을 이어주는 포인트",
        aiPickDescription:
          "가방의 독특한 형태감과 각진 선글라스의 실루엣을 연결해서 개성 있는 인상을 유지하는 조합이에요",
      },
      {
        ...housePool.INSTINCT[5],
        aiPickReason: "시그니처를 일상적인 디테일로 연결",
        aiPickDescription:
          "가방의 독특한 형태감과 각진 선글라스의 실루엣을 연결해서 개성 있는 인상을 유지하는 조합이에요",
      },
    ],
  },
  {
    house: "FREEDOM",
    styleTitle: "편안한 룩에도 나만의 포인트",
    descriptionLines: [
      "활동적이고 편안한 스타일을 기반으로 로고나 디테일이",
      "드러나는 아이템으로 개성을 더하는 취향이 나타났어요.",
    ],
    styleKeywords: ["개성 있는", "활동적인", "캐주얼한"],
    impressionLines: [
      "자연스럽고 편안하면서도",
      "자기 취향이 분명한 인상을 줄 수 있어요.",
    ],
    yourPick: housePool.FREEDOM[4],
    completeTheLook: [
      {
        ...housePool.FREEDOM[0],
        aiPickReason: "활동적인 실루엣을 자연스럽게 연결",
        aiPickDescription:
          "몸에 가깝게 착용하는 슬링백으로 트랙 재킷의 활동적인 무드를 이어가면서 룩에 포인트를 더해줘요",
      },
      {
        ...housePool.FREEDOM[3],
        aiPickReason: "시그니처를 작은 디테일까지 연결",
        aiPickDescription:
          "전체 스타일을 과하게 만들지 않으면서 MCM의 시그니처 요소를 액세서리까지 자연스럽게 이어줘요",
      },
    ],
  },
  {
    house: "CURIOSITY",
    styleTitle: "익숙함보다 새로운 포인트",
    descriptionLines: [
      "익숙한 디자인보다 새로운 소재와 눈에 띄는",
      "디테일을 활용해 변화를 주는 취향이 나타났어요.",
    ],
    styleKeywords: ["미래적인", "대담한", "독특한"],
    impressionLines: [
      "예상하지 못한 디테일을 활용해",
      "감각적이고 개성이 분명한 인상을 줄 수 있어요.",
    ],
    yourPick: housePool.CURIOSITY[4],
    completeTheLook: [
      {
        ...housePool.CURIOSITY[1],
        aiPickReason: "대담한 룩에 정돈된 균형",
        aiPickDescription:
          "메탈릭 부츠의 강한 존재감에 구조적인 블랙 백을 매치해 전체 룩의 균형을 잡아줘요",
      },
      {
        ...housePool.CURIOSITY[5],
        aiPickReason: "미래적인 무드를 더 선명하게",
        aiPickDescription:
          "메탈릭 부츠와 유선형 아이웨어를 연결해 미래적이고 대담한 무드를 한층 더 강조해요",
      },
    ],
  },
];

// TODO: 백엔드 POST /api/results/{id}/style-discovery 나오면
// 이 mock 대신 실제 응답값으로 교체
export function getMockStyleResult(house: string): StyleResult | undefined {
  return styleResults.find((result) => result.house === house.toUpperCase());
}
