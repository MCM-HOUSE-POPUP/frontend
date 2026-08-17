export interface QuestionOption {
  index: number;
  text: string;
}

export interface TestQuestion {
  no: number;
  text: string;
  options: QuestionOption[];
}