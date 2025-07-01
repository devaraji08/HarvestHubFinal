
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  farmer: string;
  category: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  getProductStock: (productId: string) => number;
  updateProductStock: (productId: string, newStock: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [productStocks, setProductStocks] = useState<Record<string, number>>({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    
    const storedStocks = localStorage.getItem('productStocks');
    if (storedStocks) {
      setProductStocks(JSON.parse(storedStocks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('productStocks', JSON.stringify(productStocks));
  }, [productStocks]);

  const getProductStock = (productId: string): number => {
    return productStocks[productId] ?? 0;
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProductStocks(prev => ({
      ...prev,
      [productId]: newStock
    }));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const currentStock = getProductStock(product.id) || product.stock;
    
    if (currentStock < quantity) {
      return; // Not enough stock
    }

    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (currentStock < newQuantity) {
          return prev; // Not enough stock for the total quantity
        }
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Update product stock
    updateProductStock(product.id, currentStock - quantity);
  };

  const removeFromCart = (productId: string) => {
    const removedItem = items.find(item => item.id === productId);
    if (removedItem) {
      const currentStock = getProductStock(productId);
      updateProductStock(productId, currentStock + removedItem.quantity);
    }
    
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const existingItem = items.find(item => item.id === productId);
    if (existingItem) {
      const quantityDifference = quantity - existingItem.quantity;
      const currentStock = getProductStock(productId);
      
      if (quantityDifference > 0 && currentStock < quantityDifference) {
        return; // Not enough stock to increase quantity
      }
      
      // Update stock based on quantity change
      updateProductStock(productId, currentStock - quantityDifference);
      
      setItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    // Return all items to stock
    items.forEach(item => {
      const currentStock = getProductStock(item.id);
      updateProductStock(item.id, currentStock + item.quantity);
    });
    
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      getProductStock,
      updateProductStock
    }}>
      {children}
    </CartContext.Provider>
  );
};
