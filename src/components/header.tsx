"use client";

import Image from "next/image";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useUserStore";

export default function Header() {
  const { user } = useAuthStore();
  const { cart } = useCartStore();

  return (
    <header>
      <div className="flex px-4 py-2 max-w-[1440px] mx-auto justify-between items-center">
        <Link href="/">
          <div className="capitalize font-bold text-2xl">home</div>
        </Link>
        <div className="flex gap-8">
          <Link href="/cart">
            <div className="relative">
              <Image
                src="/shopping-cart.svg"
                alt="Shopping cart"
                width={24}
                height={24}
                className=""
              />
              <div className="absolute top-0 right-0 translate-x-1/2 rounded-full size-4 bg-red-700 flex items-center justify-center">
                <span className="text-white text-[10px]">{cart.length}</span>
              </div>
            </div>
          </Link>

          {user?.image && (
            <Image src={user.image} width={24} height={24} alt="User profile" />
          )}
        </div>
      </div>
    </header>
  );
}
