
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import AuthModal from './AuthModal';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/9fb046ef-6ef5-4786-81c4-578b55f57abd.png" 
                  alt="Harvest Hub Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-white">Harvest Hub</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-white/90 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/products" className="text-white/90 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/chatbot" className="text-white/90 hover:text-white transition-colors">
                Chatbot
              </Link>
              {user && (
                <Link to="/dashboard" className="text-white/90 hover:text-white transition-colors">
                  Dashboard
                </Link>
              )}
              <Link to="/contact" className="text-white/90 hover:text-white transition-colors">
                Contact
              </Link>
              {user && (
                <Link to="/profile" className="text-white/90 hover:text-white transition-colors">
                  UserProfile
                </Link>
              )}
              <Link to="/meal-planner" className="text-white/90 hover:text-white transition-colors">
                Meal Planner
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Auth */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-white/90 hover:text-white hover:bg-white/10">
                      <User className="w-4 h-4 mr-2" />
                      {user.username}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-white/90 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Header;
