import SideBar from "@/components/sidebar";

export const dynamic = "force-dynamic";

export default async function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetch("https://dummyjson.com/products/category-list");
  const categories = await data.json();
  console.log(categories);

  return (
    <div className="flex gap-20 max-w-[1120px] mx-auto px-12 py-6">
      <div className="w-75">
        <SideBar categories={categories} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
