
import React from 'react';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image: string;
}

interface ProductFormFieldsProps {
  control: Control<ProductFormData>;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ control }) => {
  const categories = ['vegetables', 'fruits', 'dairy', 'pantry', 'herbs', 'grains'];

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Organic Tomatoes" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price ($)</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number" 
                step="0.01"
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                placeholder="4.99" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <select {...field} className="w-full p-2 border border-gray-300 rounded-md">
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock Quantity</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                type="number"
                onChange={(e) => field.onChange(parseInt(e.target.value))}
                placeholder="50" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <textarea 
                {...field}
                className="w-full p-2 border border-gray-300 rounded-md h-20 resize-none"
                placeholder="Fresh, juicy organic tomatoes grown without pesticides"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductFormFields;
