import Link from "next/link";
import type { Product } from "@/type";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const data = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await data.json();
  console.log(products);

  return (
    <div>
      {products.map((item) => (
        <Link key={item.id} href={`/products/${item.id}`}>
          <div className="hover:underline">{item.title}</div>
        </Link>
      ))}
    </div>
  );
}
