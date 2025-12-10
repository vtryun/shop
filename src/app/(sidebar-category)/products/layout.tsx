"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api";
import SideBar from "@/components/sidebar";

export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(categories);

  return (
    <div className="flex gap-20 max-w-[1120px] mx-auto px-12 py-6">
      <div className="w-75">
        <div className="sticky top-6">
          <SideBar categories={categories} />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
