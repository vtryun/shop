"use client";

import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useUserStore";
import type { Product } from "@/type";

export default function addToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  return (
    <button
      type="button"
      className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl w-full md:w-auto"
      aria-label={`Add ${product.title} to cart`}
      onClick={() => {
        if (!isAuthenticated()) {
          if (!isAuthenticated()) {
            const confirmed = window.confirm("Please login first");
            if (confirmed) {
              router.push("/sign-in");
            }
            return;
          }
          return;
        }
        addToCart(product);
      }}
    >
      Add to Cart
    </button>
  );
}
