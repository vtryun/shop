import Link from "next/link";
import { getProducts } from "@/api";

export default async function ProductsPage() {
  const product = await getProducts();
  console.log(product);

  return (
    <div>
      {product.map((item) => (
        <Link key={item.id} href={`/products/${item.id}`}>
          <div className="hover:underline">{item.title}</div>
        </Link>
      ))}
    </div>
  );
}
