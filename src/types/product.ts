export type HouseType = "LEGACY" | "INSTINCT" | "FREEDOM" | "CURIOSITY";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  house: HouseType;
}

export interface ProductDetail {
  house: HouseType;
  product: Product;
  reason: string;
  story: string;
  fallback: boolean;
  completeTheLook: {
    product: Product;
    reason: string;
  }[];
}

export interface InquiryRequest {
  productId: string;
}

export interface InquiryResult {
  inquiryId: number;
  product: Product;
  requestedAt: string;
}

export interface InquiryResponse {
  status: string;
  message: string;
  inquiry: InquiryResult;
}

// 미션 카메라 - 셀카 무드 분석 결과 (POST /api/results/{id}/style-discovery 응답)
export interface MatchItem {
  product: Product;
  reason: string;
}

export interface StyleDiscoveryView {
  discoveryId: number;
  house: HouseType;
  styleTitle: string;
  styleDescription: string;
  styleKeywords: string[];
  impression: string;
  yourPick: Product;
  completeTheLook: MatchItem[];
  fallback: boolean;
}
