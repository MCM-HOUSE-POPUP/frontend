export type HouseType =
  | "LEGACY"
  | "INSTINCT"
  | "FREEDOM"
  | "CURIOSITY";

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