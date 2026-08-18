export type HouseType =
  | "LEGACY"
  | "INSTINCT"
  | "FREEDOM"
  | "CURIOSITY";

export interface QuestionOption {
  index: number;
  text: string;
}

export interface TestQuestion {
  no: number;
  text: string;
  options: QuestionOption[];
}

export interface SubmitRequest {
  answers: number[];
}

export interface HouseView {
  key: HouseType;
  title: string;
  description: string;
  tags: string[];
  zoneName: string;
  color: string;
  recommendedProductIds: string[];
}

export interface TestResult {
  resultId: number;
  scores: Record<HouseType, number>;
  finalHouses: HouseType[];
  combo: boolean;
  comboTitle: string;
  comboDescription: string;
  primaryHouse: HouseView;
}