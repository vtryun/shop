import Link from "next/link";
import type { Product } from "@/type";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return {
    title: `${decodeURI(name)}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await fetch(
    `https://fakestoreapi.com/products/category/${name}`,
  );
  const products: Product[] = await data.json();
  console.log(products);

  return (
    <div>
      <div>
        {products.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`}>
            <div className="hover:underline">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
