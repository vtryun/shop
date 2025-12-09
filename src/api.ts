import type { Product } from "@/type";

const BASE_URL = 'https://fakestoreapi.com';

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category && category !== 'all'
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`,
  );
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`,);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}