import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 👈 1. Import the middleware

export const useCartStore = create(
  persist(
    (set) => ({
      isOpen: false,
      cartItems: [],
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      addToCart: (product, selectedColor, selectedStorage) => set((state) => {
        const uniqueInstanceId = `${product.id}-${selectedColor.name}-${selectedStorage}`;
        const existingIndex = state.cartItems.findIndex((item) => item.instanceId === uniqueInstanceId);

        if (existingIndex > -1) {
          const updatedItems = [...state.cartItems];
          updatedItems[existingIndex].quantity += 1;
          return { cartItems: updatedItems };
        }

        const newItem = {
          instanceId: uniqueInstanceId,
          id: product.id,
          name: product.name,
          tagline: product.tagline,
          price: product.basePrice, // Matching DummyJSON simplified pricing base
          color: selectedColor,
          storage: selectedStorage,
          quantity: 1
        };

        return { cartItems: [...state.cartItems, newItem] };
      }),

      removeFromCart: (instanceId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.instanceId !== instanceId)
      })),

      updateQuantity: (instanceId, amount) => set((state) => ({
        cartItems: state.cartItems.map((item) => {
          if (item.instanceId === instanceId) {
            const newQuantity = item.quantity + amount;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
      })),

      clearCart: () => set({ cartItems: [] })
    }),
    {
      name: 'capstone-ecosystem-bag', // 👈 2. A unique key to identify the local storage bucket
    }
  )
);