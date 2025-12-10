import { create } from "zustand";

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: CartItem["id"]) => void;
  updateQuantity: (productId: CartItem["id"], quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const { id, price, title, thumbnail, quantity: inputQuantity = 1 } = product;

    if (inputQuantity <= 0) return;

    set((state) => {
      const existing = state.cart.find((item) => item.id === id);
      if (existing) {
        const newQuantity = existing.quantity + inputQuantity;
        if (newQuantity <= 0) {
          return {
            cart: state.cart.filter((item) => item.id !== id),
          };
        }
        return {
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ),
        };
      } else {
        const newItem: CartItem = { id, title, price, quantity: inputQuantity, thumbnail };
        return { cart: [...state.cart, newItem] };
      }
    });
  },

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.id !== productId),
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ cart: [] }),

  getTotalItems: () =>
    get().cart.reduce((sum, item) => sum + item.quantity, 0),

  getTotalPrice: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));

export default useCartStore;