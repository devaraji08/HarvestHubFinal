
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/use-toast';
import ImageUpload from './ImageUpload';
import ProductFormFields from './ProductFormFields';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: ProductFormData;
}

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');
  const { toast } = useToast();
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      description: product?.description || '',
      category: product?.category || 'vegetables',
      stock: product?.stock || 0,
      image: product?.image || ''
    }
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);
        form.setValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview('');
    form.setValue('image', '');
  };

  const handleSubmit = (data: ProductFormData) => {
    if (!data.image) {
      toast({
        title: "Image Required",
        description: "Please upload an image for your product.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(data);
    onClose();
    form.reset();
    setImagePreview('');
    
    toast({
      title: "Success",
      description: product ? "Product updated successfully!" : "Product added successfully!"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <ImageUpload
              imagePreview={imagePreview}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
            />

            <ProductFormFields control={form.control} />

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-sage-600 hover:bg-sage-700">
                {product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
