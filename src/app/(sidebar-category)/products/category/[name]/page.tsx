import { getProducts } from "@/api";
import ProductList from "@/components/product-list";
import type { Product } from "@/type";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await getProducts({ category: name });
  const products: Product[] = data.products;

  return (
    <div>
      <ProductList initialProducts={products} />
    </div>
  );
}
