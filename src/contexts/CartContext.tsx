
// CartContext (local, unauthenticated, no Supabase dependency, no payment/checkout)
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: string; // product ID
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev =>
      quantity <= 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
