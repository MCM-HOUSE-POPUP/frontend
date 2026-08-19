import type {
  DiscoveryArchiveItem,
  PassportView,
} from "../types/passport";

const API_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? "요청 처리 중 오류가 발생했습니다.",
    );
  }

  return response.json();
}

export function getPassport(resultId: number) {
  return request<PassportView>(
    `/api/results/${resultId}/passport`,
  );
}

export function getDiscoveries(resultId: number) {
  return request<DiscoveryArchiveItem[]>(
    `/api/results/${resultId}/discoveries`,
  );
}