import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1120px] mx-auto px-12 py-6 h-screen">
      <div className="flex flex-col gap-10 justify-center items-center h-full">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <h4 className="text-xl font-bold">李云亮 - 前端实习</h4>
        </div>
        <div>
          <Link href="/products">
            <div className="capitalize border border-gray-400 rounded p-2">
              go to start
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
