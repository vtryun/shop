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
        className={`p-2 rounded  ${active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
      >
        {children}
      </div>
    </Link>
  );
}

export default function SideBar({ categories }: { categories: string[] }) {
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
    <nav className="p-4 flex flex-col gap-3">
      <LinkItem href="/products" active={currentCategory === null}>
        all products
      </LinkItem>
      {categories.map((category) => (
        <LinkItem
          key={category}
          active={currentCategory === category}
          href={`/products/category/${encodeURIComponent(category)}`}
        >
          {category}
        </LinkItem>
      ))}
    </nav>
  );
}
