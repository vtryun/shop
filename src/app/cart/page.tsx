"use client";

import Image from "next/image";
import useCartStore from "@/store/useCartStore";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart ({getTotalItems()})
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                aria-label="Increase quantity"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 border-t">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            type="button"
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
