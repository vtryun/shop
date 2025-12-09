import Link from "next/link";
import { getProducts } from "@/api";

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
  const product = await getProducts(name);
  console.log(product);

  return (
    <div>
      <div>
        {product.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`}>
            <div className="hover:underline">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
