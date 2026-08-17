import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import HeartToggle from "./HeartToggle";

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onSave: () => void;
}

export default function ProductCard({
  product,
  isSaved,
  onSave,
}: ProductCardProps) {
  return (
    <article className="relative">
      <HeartToggle isSaved={isSaved} onClick={onSave} />

      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="mb-3 aspect-square w-full bg-mcm-card-bg object-contain"
        />

        <p className="line-clamp-2 text-[10px] font-semibold leading-snug text-mcm-black">
          {product.name}
        </p>

        <p className="mt-1 text-[10px] font-light text-mcm-black">
          ₩ {product.price.toLocaleString()}
        </p>
      </Link>
    </article>
  );
}