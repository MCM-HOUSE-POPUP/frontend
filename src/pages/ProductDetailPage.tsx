import { Link, useNavigate, useParams } from "react-router-dom";
import { mockProductDetails } from "../mocks/productDetail";
import { useSaved } from "../context/SavedContext";
import HeartToggle from "../components/HeartToggle";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isSaved, toggleSave } = useSaved();

  const data = productId ? mockProductDetails[productId] : undefined;

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-desc">상품 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mcm-white pb-8">
      <header className="flex h-14 items-center px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
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
              <div key={product.id}>
                <div className="relative mb-3">
                  <HeartToggle
                    isSaved={isSaved(product.id)}
                    onClick={() => toggleSave(product.id)}
                  />

                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full bg-mcm-card-bg object-contain"
                  />
                </div>

                <p className="text-[10px] font-semibold leading-snug text-mcm-black">
                  {product.name}
                </p>

                <p className="mt-1 text-[10px] font-light text-mcm-black">
                  ₩ {product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${data.product.id}/inquiry`}
            className="bg-mcm-secondary py-4 text-center text-sm text-mcm-white"
          >
            셀러에게 문의하기
          </Link>

          <button
            type="button"
            className="bg-mcm-black py-4 text-sm text-mcm-white"
          >
            제품 보러가기
          </button>
        </div>
      </div>
    </main>
  );
}