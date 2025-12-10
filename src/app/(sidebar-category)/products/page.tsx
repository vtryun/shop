import { getProducts } from "@/api";
import ProductList from "@/components/product-list";
import type { Product } from "@/type";

export default async function ProductsPage() {
  const data = await getProducts({});
  const products: Product[] = data.products;

  console.log(products);

  return (
    <div>
      <ProductList initialProducts={products} />
    </div>
  );
}
