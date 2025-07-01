
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="glass-card p-12 text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">Add some fresh products from local farmers!</p>
            <Link to="/products">
              <Button className="bg-sage-600 hover:bg-sage-700 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white/40 rounded-xl p-6 border border-white/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-sage-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🥬</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.name}</h3>
                      <p className="text-slate-600 text-sm">by {item.farmer}</p>
                      <p className="text-sage-600 font-semibold">${item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white/40 rounded-xl p-6 border border-white/30 h-fit">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Items ({totalItems})</span>
                  <span className="text-slate-800">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-sage-600">Free</span>
                </div>
                <div className="border-t border-white/30 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-slate-800">Total</span>
                    <span className="text-slate-800">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/checkout" className="block">
                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full border-sage-600 text-sage-600 hover:bg-sage-50">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
