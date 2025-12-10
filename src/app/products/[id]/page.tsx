import type { Metadata } from "next";
import Image from "next/image";
import type { Product } from "@/type"; // 确保你更新了这里的类型定义

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // 建议添加 try-catch 以防 fetch 失败
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) return { title: "Product Not Found" };

    const product: Product = await res.json();
    return {
      title: product.title,
      description: product.description,
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Error fetching product metadata",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    // 如果 API 返回 404，可以使用 Next.js 原生的 notFound 界面，或者保留你原本的 UI
    // return notFound();
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  const product: Product = await res.json();

  // 获取主图，如果 images 数组为空则回退到 thumbnail
  const mainImage = product.images?.[0] || product.thumbnail;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 图片区域 */}
        <div className="md:w-1/2 flex justify-center bg-gray-50 rounded-lg p-4">
          <Image
            src={mainImage}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain max-w-full h-auto max-h-[500px]"
            loading="lazy"
          />
        </div>

        {/* 详情区域 */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            {/* 修复点：直接使用 product.rating 和 product.reviews.length */}
            <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
              ★ {product.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Brand:</span>{" "}
              {product.brand}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">Availability:</span>{" "}
              <span
                className={
                  product.stock < 10 ? "text-red-600" : "text-green-600"
                }
              >
                {product.availabilityStatus} ({product.stock} left)
              </span>
            </p>
          </div>

          <button
            type="button"
            className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl w-full md:w-auto"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>

          <p className="mt-4 text-xs text-gray-400">
            {product.shippingInformation} | {product.returnPolicy}
          </p>
        </div>
      </div>
    </div>
  );
}
