import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockProductDetails } from "../mocks/productDetail";

export default function ProductInquiryPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [isComplete, setIsComplete] = useState(false);

  const data = productId ? mockProductDetails[productId] : undefined;

  const goToProduct = () => {
    navigate(`/products/${productId}`);
  };

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mcm-white">
        <p className="text-sm text-mcm-secondary">
          상품 정보를 찾을 수 없습니다.
        </p>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="flex min-h-screen flex-col bg-mcm-white">
        <div className="flex flex-1 flex-col items-center justify-center pb-20 text-center">
          <img
            src="/icons/check-circle.svg"
            alt=""
            className="mb-6 h-15 w-15"
          />

          <h1 className="mb-3 text-[23px] font-semibold text-mcm-black">
            제품 문의가 접수되었습니다
          </h1>

          <p className="text-[15px] font-semibold text-mcm-secondary">
            잠시 후 셀러가 직접 안내해드릴게요.
          </p>
        </div>

        <div className="px-5 pb-6">
          <button
            type="button"
            onClick={goToProduct}
            className="h-12 w-full bg-mcm-black text-sm font-medium text-mcm-white"
          >
            확인
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-mcm-white">
      <header className="flex h-14 items-center px-3">
        <button
          type="button"
          onClick={goToProduct}
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

      <div className="flex-1 px-5 pt-18">
        <h1 className="text-center text-[23px] font-semibold text-mcm-black">
          이 제품에 대해 문의하시겠어요?
        </h1>

        <p className="mt-5 text-center text-sm font-semibold leading-[1.7] text-mcm-secondary">
          제품에 대해 궁금한 점이 있다면
          <br />
          셀러에게 안내를 요청할 수 있어요
        </p>

        <div className="mx-auto mt-10 w-[158px]">
          <img
            src={data.product.image}
            alt={data.product.name}
            className="aspect-square w-full bg-mcm-card-bg object-contain"
          />

          <p className="mt-3 text-[10px] font-semibold leading-snug text-mcm-black">
            {data.product.name}
          </p>

          <p className="mt-1 text-[10px] text-mcm-black">
            ₩ {data.product.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pb-6">
        <button
          type="button"
          onClick={goToProduct}
          className="h-12 border border-mcm-secondary text-sm font-medium text-mcm-black"
        >
          취소
        </button>

        <button
          type="button"
          onClick={() => setIsComplete(true)}
          className="h-12 bg-mcm-black text-sm font-medium text-mcm-white"
        >
          셀러에게 문의하기
        </button>
      </div>
    </main>
  );
}