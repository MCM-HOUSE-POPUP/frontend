import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import { useSaved } from "../context/SavedContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isSaved, toggleSave } = useSaved();

  const resultId = Number(localStorage.getItem("resultId"));

  const {
    data,
    isPending,
    error,
  } = useQuery({
    queryKey: ["productDetail", resultId, productId],
    queryFn: () => getProductDetail(resultId, productId!),
    enabled: resultId > 0 && Boolean(productId),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-secondary">
          상품 정보를 불러오는 중입니다.
        </p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-desc">
          상품 정보를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mcm-white pb-28">
      <header className="flex h-14 items-center px-3">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex h-10 w-10 items-center justify-center"
          aria-label="뒤로가기"
        >
          <img
            src="/icons/back-arrow.svg"
            alt=""
            className="h-5 w-5"
          />
        </button>
      </header>

      <img
        src={data.product.image}
        alt={data.product.name}
        className="aspect-square w-full bg-mcm-card-bg object-contain"
      />

      <div className="px-5 py-5">
        <p className="mb-2 text-xs font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-secondary">
          YOUR MCM HOUSE · {data.house}
        </p>

        <h1 className="mb-1 text-2xl font-semibold leading-[1.7] tracking-[-0.02em] text-black">
          {data.product.name}
        </h1>

        <p className="mb-6 text-xl font-light leading-[1.7] tracking-[-0.02em] text-black">
          ₩ {data.product.price.toLocaleString()}
        </p>

        <section className="border-t border-mcm-border py-3">
          <p className="mb-1 text-xs font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-secondary">
            왜 추천했나요?
          </p>

          <p className="text-[15px] font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-desc">
            {data.reason}
          </p>
        </section>

        <section className="border-t border-mcm-border py-3">
          <p className="mb-1 text-xs font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-secondary">
            이 제품이 담은 이야기
          </p>

          <p className="text-[15px] font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-desc">
            {data.story}
          </p>
        </section>

        <section className="border-t border-mcm-border py-3">
          <p className="text-xs font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-secondary">
            COMPLETE THE LOOK
          </p>

          <p className="mb-2 text-xs font-semibold leading-[1.7] tracking-[-0.02em] text-mcm-black">
            이 제품과 함께 매치해보세요
          </p>

          <div className="grid grid-cols-2 gap-5">
            {data.completeTheLook.map(({ product }) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={isSaved(product.id)}
                onSave={() => toggleSave(product.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto grid w-full max-w-[430px] grid-cols-2 gap-2 bg-mcm-white px-5 pb-6 pt-3">
        <Link
          to={`/products/${data.product.id}/inquiry`}
          className="flex h-12 items-center justify-center bg-mcm-secondary text-sm font-medium text-mcm-white"
        >
          셀러에게 문의하기
        </Link>

        <a
          href={data.product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center bg-mcm-black text-sm font-medium text-mcm-white"
        >
          제품 보러가기
        </a>
      </div>
    </main>
  );
}