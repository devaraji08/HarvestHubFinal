
import React from 'react';
import { Button } from './ui/button';
import { FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  imagePreview: string;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imagePreview, 
  onImageUpload, 
  onImageRemove 
}) => {
  return (
    <FormItem>
      <FormLabel>Product Image</FormLabel>
      <div className="space-y-2">
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Product preview" 
              className="w-full h-32 object-cover rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onImageRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Upload product image</p>
          </div>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="cursor-pointer"
        />
      </div>
    </FormItem>
  );
};

export default ImageUpload;
