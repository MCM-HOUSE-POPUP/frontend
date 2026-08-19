import type { TestResult } from "../types/test";

export const mockTestResult: TestResult = {
  resultId: 1,

  scores: {
    LEGACY: 5,
    INSTINCT: 2,
    FREEDOM: 3,
    CURIOSITY: 4,
  },

  finalHouses: ["LEGACY"],

  combo: false,

  comboTitle: "LEGACY",

  comboDescription:
    "시간이 쌓아온 가치와 이야기를 중요하게 여기며, 오래도록 이어지는 스타일에 끌리는 타입입니다.",

  primaryHouse: {
    key: "LEGACY",
    title: "LEGACY HOUSE",
    description:
      "시간이 쌓아온 가치와 이야기를 중요하게 여기며, 오래도록 이어지는 스타일에 끌리는 타입입니다.",
    tags: ["헤리티지", "클래식", "타임리스"],
    zoneName: "LEGACY ZONE",
    color: "#8A6D3B",
    recommendedProductIds: [
      "01_REC1",
      "01_REC2",
      "01_REC3",
    ],
  },

  recommendedRoute: [
    "LEGACY",
    "CURIOSITY",
    "FREEDOM",
    "INSTINCT",
  ],

  ai: {
    analyzed: false,
    fallback: false,
    questions: [],
    answers: [],
    house: null,
    summary: null,
    reason: null,
  },
};