import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allProducts, savedFilterTabs } from "../data/products";
import { useSaved } from "../context/SavedContext";
import HeartToggle from "../components/HeartToggle";

export default function SavedPage() {
  const navigate = useNavigate();
  const { savedIds, toggleSave, isSaved } = useSaved();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const savedProducts = allProducts.filter((product) =>
    savedIds.includes(product.id),
  );

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

      {filteredProducts.length === 0 ? (
        <p className="text-sm text-mcm-desc text-center mt-20">
          아직 저장한 상품이 없어요
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <HeartToggle
                isSaved={isSaved(product.id)}
                onClick={() => toggleSave(product.id)}
              />
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover mb-2"
              />
              <p className="text-xs leading-snug mb-1 text-mcm-black">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-mcm-black">
                ₩ {product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
