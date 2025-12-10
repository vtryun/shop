const BASE_URL = 'https://dummyjson.com';

export async function getProducts(
  { pageParam = 0, limit = 30, category }: { pageParam?: number; limit?: number; category?: string | null }) {
  const url = category ? `${BASE_URL}/products/category/${category}` : `${BASE_URL}/products`;
  const response = await fetch(`${url}?skip=${pageParam}&limit=${limit}`);
  const data = await response.json();
  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}
export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  const data = await response.json();
  return data;
}
