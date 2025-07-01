
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { ProductSuggestion } from '@/utils/mealPlannerUtils';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductSuggestionsProps {
  suggestions: ProductSuggestion[];
  loading: boolean;
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({ suggestions, loading }) => {
  const { addToCart, getProductStock } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (suggestion: ProductSuggestion) => {
    const currentStock = getProductStock(suggestion.product.id);
    
    if (currentStock <= 0) {
      toast({
        title: "Out of Stock",
        description: `${suggestion.product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    addToCart(suggestion.product);
    toast({
      title: "Added to Cart",
      description: `${suggestion.product.name} has been added to your cart.`
    });
  };

  if (loading) {
    return (
      <div className="bg-white/30 rounded-lg p-4">
        <h3 className="font-semibold text-slate-800 mb-4">Suggested Products</h3>
        <div className="text-center py-8">
          <p className="text-slate-600">Analyzing your meal plan...</p>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="bg-white/30 rounded-lg p-4">
        <h3 className="font-semibold text-slate-800 mb-4">Suggested Products</h3>
        <div className="text-center py-8">
          <p className="text-slate-600">Add some meals to your plan to see product suggestions!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/30 rounded-lg p-4">
      <h3 className="font-semibold text-slate-800 mb-4">Suggested Products</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {suggestions.map((suggestion) => {
          const currentStock = getProductStock(suggestion.product.id);
          const isOutOfStock = currentStock <= 0;
          
          return (
            <div key={suggestion.product.id} className="bg-white/40 rounded-lg p-3 border border-white/30">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-sage-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={suggestion.product.image} 
                    alt={suggestion.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/64/64';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-800 text-sm truncate">
                    {suggestion.product.name}
                  </h4>
                  <p className="text-xs text-slate-600 mb-1">
                    by {suggestion.product.farmer}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-sage-600">
                      ${suggestion.product.price}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${isOutOfStock ? 'bg-red-100 text-red-700' : 'bg-sage-100 text-sage-700'}`}
                    >
                      {currentStock} left
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(suggestion)}
                    size="sm"
                    className="w-full bg-sage-600 hover:bg-sage-700 text-white text-xs"
                    disabled={isOutOfStock}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
              
              {suggestion.matchedMeals.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <p className="text-xs text-slate-600">
                    Matches: {suggestion.matchedMeals.join(', ')}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSuggestions;
