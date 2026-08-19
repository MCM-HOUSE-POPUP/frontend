import type {
  SubmitRequest,
  TestQuestion,
  StyleChoiceOptionsView,
  StyleChoiceRequest,
  TestResult,
} from "../types/test";

const API_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    throw new Error(
      error?.message ?? "요청 처리 중 오류가 발생했습니다.",
    );
  }

  return response.json();
}

export function getQuestions() {
  return request<TestQuestion[]>("/api/questions");
}

export function submitTest(data: SubmitRequest) {
  return request<TestResult>("/api/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function getStyleChoice(resultId: number) {
  return request<StyleChoiceOptionsView>(
    `/api/results/${resultId}/ai/style-choice`,
  );
}

export function submitStyleChoice(
  resultId: number,
  data: StyleChoiceRequest,
) {
  return request<TestResult>(
    `/api/results/${resultId}/ai/style-choice`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
}

export function getTestResult(resultId: number) {
  return request<TestResult>(`/api/results/${resultId}`);
}