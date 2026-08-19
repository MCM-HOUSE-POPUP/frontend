import type { ProductDetail } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export async function getProductDetail(
  resultId: number,
  productId: string,
): Promise<ProductDetail> {
  const response = await fetch(
    `${API_URL}/api/results/${resultId}/products/${productId}`,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message ?? "상품 정보를 불러오지 못했습니다.",
    );
  }

  return response.json();
}