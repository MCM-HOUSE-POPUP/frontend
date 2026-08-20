import { useEffect, useState } from "react";
import { savedFilterTabs } from "../data/products";
import { useSaved } from "../context/SavedContext";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function SavedPage() {
  const { savedIds, toggleSave, isSaved } = useSaved();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resultId = localStorage.getItem("resultId");

    if (!resultId) {
      setError("진단 결과 정보가 없어요.");
      setIsLoading(false);
      return;
    }

    async function fetchSavedProducts() {
      try {
        const response = await fetch(
          `${API_URL}/api/results/${resultId}/saved`,
        );
        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setSavedProducts(data);
      } catch (err) {
        console.error("저장한 상품 조회 실패:", err);
        setError("저장한 상품을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavedProducts();
  }, [savedIds]); // savedIds 바뀔 때마다(찜 토글할 때마다) 목록 다시 받아옴

  const activeTab = savedFilterTabs.find((tab) => tab.code === activeFilter);
  const filteredProducts = activeTab?.house
    ? savedProducts.filter((product) => product.house === activeTab.house)
    : savedProducts;

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32">
      <p className="text-xs tracking-widest font-semibold text-mcm-secondary mb-3">
        MY SAVED
      </p>

      <h1 className="text-[22px] font-semibold mb-4 text-mcm-black">
        내가 저장한 상품
      </h1>

      <div className="flex gap-2 mb-6">
        {savedFilterTabs.map((tab) => {
          const active = activeFilter === tab.code;
          return (
            <button
              key={tab.code}
              onClick={() => setActiveFilter(tab.code)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border ${
                active
                  ? "bg-mcm-black text-mcm-white border-mcm-black"
                  : "bg-mcm-white text-mcm-black border-mcm-border"
              }`}
            >
              {tab.code}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="text-sm text-mcm-desc text-center mt-20">
          불러오는 중이에요...
        </p>
      ) : error ? (
        <p className="text-sm text-mcm-desc text-center mt-20">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-sm text-mcm-desc text-center mt-20">
          아직 저장한 상품이 없어요
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
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
