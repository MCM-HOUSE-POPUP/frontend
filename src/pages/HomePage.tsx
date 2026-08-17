import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  housePool,
  defaultPool,
  houseCategories,
  getRandomProducts,
} from "../data/products";
import type { HouseType } from "../types/product";
import { useSaved } from "../context/SavedContext";
import HeartToggle from "../components/HeartToggle";

// TODO: 실제로는 Context/localStorage에서 가져오기
const dummyResultId: string | null = null;
const dummyHouseType: HouseType | null = null;

export default function HomePage() {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSaved();

  const [displayProducts] = useState(() => {
    const pool =
      dummyResultId && dummyHouseType ? housePool[dummyHouseType] : defaultPool;

    return getRandomProducts(pool, 2);
  });

  return (
    <main className="min-h-screen bg-mcm-white px-5 pt-6 pb-32">
      <p className="text-xs tracking-widest text-mcm-secondary mb-3">
        MCM HOUSE
      </p>

      <h1 className="text-[26px] font-semibold leading-tight mb-4 text-mcm-black">
        나만의 방식으로
        <br />
        MCM HOUSE를 탐험해보세요
      </h1>

      <p className="text-sm text-mcm-desc mb-6 leading-relaxed">
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

      <p className="text-xs tracking-widest text-mcm-secondary mb-3">EXPLORE</p>

      <div className="grid grid-cols-4 border-t border-l border-mcm-border mb-4">
        {houseCategories.map((house) => (
          <div
            key={house.code}
            className="border-r border-b border-mcm-border py-4 px-2 text-center"
          >
            <p className="text-mcm-secondary text-xs mb-2">{house.code}</p>
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

      <p className="text-xs tracking-widest text-mcm-secondary mb-3">
        DISVOXER IN THIS HOUSE
      </p>

      <div className="grid grid-cols-2 gap-3">
        {displayProducts.map((product) => (
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
    </main>
  );
}
