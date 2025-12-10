import type { Product } from "@/type";

const BASE_URL = 'https://fakestoreapi.com';

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category && category !== 'all'
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;

  console.log('[API] Fetching products from:', url);
  const res = await fetch(url);
  console.log('[API] Response status for products:', res.status);
  if (!res.ok) {
    console.error('[API] Failed to fetch products:', res.statusText);
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  console.log('[API] Fetched products:', data);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const url = `${BASE_URL}/products/categories`;
  console.log('[API] Fetching categories from:', url);
  const res = await fetch(url);
  console.log('[API] Response status for categories:', res.status);
  if (!res.ok) {
    console.error('[API] Failed to fetch categories:', res.statusText);
    throw new Error('Failed to fetch categories');
  }
  const data = await res.json();
  console.log('[API] Fetched categories:', data);
  return data;
}

export async function getProductById(id: string): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  console.log('[API] Fetching product by ID from:', url);
  const res = await fetch(url);
  console.log('[API] Response status for product:', res.status);
  if (!res.ok) {
    console.error('[API] Failed to fetch product:', res.statusText);
    throw new Error('Failed to fetch product');
  }
  const data = await res.json();
  console.log('[API] Fetched product:', data);
  return data;
}