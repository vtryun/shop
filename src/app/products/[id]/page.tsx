import type { Metadata } from "next";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await data.json();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await data.json();

  if (!product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  const cleanImageUrl = product.image.trim();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={cleanImageUrl}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain max-w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-600 mt-2">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-4">
            <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Category: {product.category}
          </p>

          <button
            type="button"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
