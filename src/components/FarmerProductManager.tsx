import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import ProductForm from './ProductForm';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category: string;
  stock: number;
  is_active: boolean;
}

const FarmerProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('farmer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: any) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          farmer_id: user.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          stock: productData.stock,
          image_url: productData.image,
          is_active: true
        }])
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: "Error",
          description: "Failed to add product",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setProducts([data, ...products]);
        toast({
          title: "Success",
          description: "Product added successfully!"
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive"
      });
    }
  };

  const handleEditProduct = async (productData: any) => {
    if (!editingProduct || !user) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          stock: productData.stock,
          image_url: productData.image,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProduct.id)
        .eq('farmer_id', user.id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Error",
          description: "Failed to update product",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        setProducts(products.map(p => p.id === editingProduct.id ? data : p));
        setEditingProduct(undefined);
        toast({
          title: "Success",
          description: "Product updated successfully!"
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('farmer_id', user.id);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive"
        });
        return;
      }

      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "Product Deleted",
        description: "Product has been removed from your listings."
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Your Products</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-600">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Your Products</h2>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-sage-600 hover:bg-sage-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white/40 rounded-2xl p-6 border border-white/30">
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.image_url || '/api/placeholder/300/200'} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/300/200';
                }}
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">{product.name}</h3>
                <Badge variant="secondary" className="bg-sage-100 text-sage-700">
                  {product.category}
                </Badge>
              </div>
              
              <p className="text-slate-700 text-sm line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-sage-600">${product.price}</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {product.stock} in stock
                </Badge>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button
                  onClick={() => openEditForm(product)}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-sage-600 text-sage-600 hover:bg-sage-50"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProduct(product.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg mb-4">You haven't added any products yet.</p>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-sage-600 hover:bg-sage-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}

      <ProductForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct ? {
          name: editingProduct.name,
          price: editingProduct.price,
          description: editingProduct.description || '',
          category: editingProduct.category,
          stock: editingProduct.stock,
          image: editingProduct.image_url || ''
        } : undefined}
      />
    </div>
  );
};

export default FarmerProductManager;
