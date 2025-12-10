"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LinkItem({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        className={`rounded p-1 ${active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
      >
        {children}
      </div>
    </Link>
  );
}

interface categoryItemProps {
  slug: string;
  name: string;
  url: string;
}

export default function SideBar({
  categories,
}: {
  categories: categoryItemProps[];
}) {
  const pathname = usePathname();

  let currentCategory: string | null = null;
  if (pathname.startsWith("/products/category/")) {
    const segment = pathname.split("/").pop() || "";
    try {
      currentCategory = decodeURIComponent(segment);
    } catch {
      currentCategory = segment;
    }
  }

  return (
    <nav className="p-4 flex flex-col">
      <LinkItem href="/products" active={currentCategory === null}>
        all products
      </LinkItem>
      {categories.map((category) => (
        <LinkItem
          key={category.slug}
          active={currentCategory === category.slug}
          href={`/products/category/${category.slug}`}
        >
          {category.name}
        </LinkItem>
      ))}
    </nav>
  );
}
