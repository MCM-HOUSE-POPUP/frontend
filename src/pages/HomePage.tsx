import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { houseCategories } from "../data/products";
import { useSaved } from "../context/SavedContext";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

export default function HomePage() {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSaved();

  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resultId = localStorage.getItem("resultId");

    async function fetchProducts() {
      try {
        if (resultId) {
          const response = await fetch(
            `http://localhost:8080/api/results/${resultId}/recommendations`,
          );
          if (!response.ok)
            throw new Error(`서버 응답 에러: ${response.status}`);
          const data = await response.json();
          setDisplayProducts(data.products.slice(0, 2));
        } else {
          const response = await fetch("http://localhost:8080/api/products");
          if (!response.ok)
            throw new Error(`서버 응답 에러: ${response.status}`);
          const data: Product[] = await response.json();
          setDisplayProducts(data.slice(0, 2));
        }
      } catch (err) {
        console.error("상품 목록 조회 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32">
      <p className="text-xs tracking-widest text-mcm-secondary font-semibold mb-3">
        MCM HOUSE
      </p>

      <h1 className="text-[26px] font-semibold leading-tight mb-4 text-mcm-black">
        나만의 방식으로
        <br />
        MCM HOUSE를 탐험해보세요
      </h1>

      <p className="text-sm text-mcm-desc font-semibold mb-6 leading-relaxed">
        질문을 통해 당신의 취향을 발견하고,
        <br />
        MCM의 4가지 HOUSE를 탐험해보세요
      </p>

      <button
        onClick={() => navigate("/test")}
        className="w-full bg-mcm-black text-mcm-white py-4 flex items-center justify-center gap-2 mb-6 text-sm font-semibold"
      >
        FIND MY HOUSE <span>&gt;</span>
      </button>

      <hr className="border-mcm-border mb-6" />

      <p className="text-xs tracking-widest text-mcm-secondary font-semibold mb-3">
        EXPLORE
      </p>

      <div className="grid grid-cols-4 border-t border-l border-mcm-border mb-4">
        {houseCategories.map((house) => (
          <div
            key={house.code}
            className="border-r border-b border-mcm-border py-4 px-2 text-center"
          >
            <p className="text-mcm-secondary font-semibold text-xs mb-2">
              {house.code}
            </p>
            <p className="font-semibold text-xs text-mcm-black">{house.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/map")}
        className="w-full border border-mcm-black text-mcm-black py-4 flex items-center justify-center gap-2 mb-6 text-sm font-semibold"
      >
        EXPLORE THE HOUSE <span>&gt;</span>
      </button>

      <hr className="border-mcm-border mb-4" />

      <p className="text-xs tracking-widest text-mcm-secondary font-semibold mb-3">
        DISVOXER IN THIS HOUSE
      </p>

      {isLoading ? (
        <p className="text-xs text-mcm-desc">불러오는 중이에요...</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={isSaved(product.id)}
              onSave={() => toggleSave(product.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
