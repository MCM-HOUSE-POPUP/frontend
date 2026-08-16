export interface MissionInfo {
  code: string; // "01"
  house: "LEGACY" | "INSTINCT" | "FREEDOM" | "CURIOSITY";
  listSubtitle: string; // 리스트 화면 부제목
  missionTitle: string; // "01 - LEGACY MISSION"
  headline: string; // 상세 화면 큰 제목
  descriptionLines: string[]; // 미션별 안내 문단
  exampleImage: string;
}

// 4개 House 공통 안내 문단 (미션 방식 설명)
export const guideLines: string[] = [
  "제품을 직접 착용하거나,",
  "마음에 든 디테일을 가까이 촬영해도 좋아요.",
];

export const missions: MissionInfo[] = [
  {
    code: "01",
    house: "LEGACY",
    listSubtitle: "시간을 담은 나의 선택", // ← 여기만 수정
    missionTitle: "01 - LEGACY MISSION",
    headline: "시간을 담은 나의 선택",
    descriptionLines: [
      "LEGACY 공간을 둘러보고, 오래 간직하고 싶은",
      "MCM 제품이나 디테일을 하나 선택해 촬영해보세요.",
    ],
    exampleImage: "/images/missions/example-grid.png",
  },
  {
    code: "02",
    house: "INSTINCT",
    listSubtitle: "처음 보는 새로움",
    missionTitle: "02 - INSTINCT MISSION",
    headline: "처음 보는 새로움",
    descriptionLines: [
      "이번 시즌 가장 낯설고 새롭다고",
      "느껴지는 제품을 찾아 촬영해보세요.",
    ],
    exampleImage: "/images/missions/example-grid.png",
  },
  {
    code: "03",
    house: "FREEDOM",
    listSubtitle: "나만의 조합",
    missionTitle: "03 - FREEDOM MISSION",
    headline: "나만의 조합",
    descriptionLines: [
      "지금 내 기분에 맞는 제품들을",
      "자유롭게 매치해서 함께 촬영해보세요.",
    ],
    exampleImage: "/images/missions/example-grid.png",
  },
  {
    code: "04",
    house: "CURIOSITY",
    listSubtitle: "첫눈에 고른 하나",
    missionTitle: "04 -CURIOSITY MISSION",
    headline: "첫눈에 고른 하나",
    descriptionLines: [
      "딱 봤을 때 가장 끌리는",
      "제품 하나를 바로 촬영해보세요.",
    ],
    exampleImage: "/images/missions/example-grid.png",
  },
];

// TODO: 백엔드 GET /api/results/{id}/passport 나오면 이 mock 지우고
// PassportView.zones[].visited 값으로 교체하기
export const dummyVisitedStatus: Record<string, boolean> = {
  LEGACY: true,
  INSTINCT: false,
  FREEDOM: false,
  CURIOSITY: false,
};

export interface ZoneInfo {
  house: "LEGACY" | "INSTINCT" | "FREEDOM" | "CURIOSITY";
  tags: string;
  floor: 1 | 2;
}

export const zoneInfoList: ZoneInfo[] = [
  { house: "LEGACY", tags: "헤리티지 / 클래식 / 타임리스", floor: 1 },
  { house: "INSTINCT", tags: "자기표현 / 대담함 / 개성", floor: 1 },
  { house: "FREEDOM", tags: "자유로움 / 모빌리티 / 유연함", floor: 2 },
  { house: "CURIOSITY", tags: "발견 / 새로움 / 실험정신", floor: 2 },
];

// TODO: 백엔드 GET /api/results/{id} 나오면 ResultView.recommendedRoute로 교체
export const dummyRecommendedRoute: string[] = [
  "LEGACY",
  "INSTINCT",
  "FREEDOM",
  "CURIOSITY",
];
