"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getProducts } from "@/api";
import type { Product } from "@/type";

const PAGE_SIZE = 10;

export default function ProductList({
  initialProducts,
}: {
  initialProducts?: Product[];
}) {
  const pathname = usePathname();

  let currentCategory: string | null = null;
  if (pathname.startsWith("/products/category/")) {
    const segment = pathname.split("/").pop() || "";
    try {
      currentCategory = decodeURIComponent(segment);
    } catch {
      currentCategory = segment;
    }
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["products", { category: currentCategory }],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        pageParam,
        limit: PAGE_SIZE,
        category: currentCategory ?? undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < PAGE_SIZE) return undefined;
      return allPages.flatMap((p) => p.products).length;
    },
    placeholderData: initialProducts ? keepPreviousData : undefined,
    initialData: initialProducts
      ? {
          pages: [{ products: initialProducts, total: initialProducts.length }],
          pageParams: [0],
        }
      : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const allProducts = data?.pages.flatMap((page) => page.products) ?? [];

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error: {(error as Error).message}</div>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {allProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            style={{
              display: "block",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {product.thumbnail && (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={80}
                  height={80}
                  style={{ borderRadius: "4px", objectFit: "cover" }}
                />
              )}
              <div>
                <strong>
                  {product.id}. {product.title}
                </strong>
                <p style={{ margin: "0.5rem 0 0", color: "#2563eb" }}>
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        ref={sentinelRef}
        style={{
          height: hasNextPage ? "20px" : "0",
          margin: "10px 0",
        }}
      >
        {isFetchingNextPage ? "loading..." : null}
      </div>
    </div>
  );
}
