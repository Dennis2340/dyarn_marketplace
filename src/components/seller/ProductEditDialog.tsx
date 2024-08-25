"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "./ProductList";
import { Loader2, Pencil } from "lucide-react";
import { format } from "date-fns";
import Modal from "../Modal";
import { useUploadThing } from '@/lib/uploadthing';
import { Label } from "../ui/label";

type ProductEditProps = {
  product: Product;
  isEditing: boolean
  onProductEdited: () => void;
};

const ProductEdit: React.FC<ProductEditProps> = ({ product, isEditing,onProductEdited }) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    price: product.price || 0,
    imageUrl: product.imageUrl || "",
    isPreorder: product.isPreorder || false,
    preorderPrice: product.preorderPrice || 0,
    preorderReleaseDate: product.preorderReleaseDate ? format(new Date(product.preorderReleaseDate), 'yyyy-MM-dd') : "",
  });

  const [isModalOpen, setIsModalOpen] = useState(isEditing);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing('freePlanUploader');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      const res = await startUpload([image]);
      const [responseFile] = res || [];
      console.log(responseFile.url)
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: responseFile.url,
      }));
      console.log(formData)
    }
  };

  const handleSave = async () => {
    if (image) {
        await handleImageUpload();
     }
    try {
      setIsLoading(true)
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsLoading(false)
        setIsModalOpen(false);
        onProductEdited()
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setIsLoading(true)
    }
  };

  const handleCancel = () => {
    setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        isPreorder: product.isPreorder,
        preorderPrice: product.preorderPrice!,
        preorderReleaseDate: product.preorderReleaseDate!
     })
     setIsModalOpen(false)
  }
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <Card className="p-6 mb-6 shadow-lg">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
            <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
            </Label>
            <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="block w-full p-2 border border-gray-300 rounded-lg"
            />
            {formData.imageUrl && (
                <div className="mt-2">
                {/*  eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={formData.imageUrl} 
                    alt="Product Image" 
                    className="w-16 h-16 object-cover" 
                    width={64}
                    height={64}
                />
                </div>
            )}
              </div>
             
        <div className="flex items-center gap-2">
          <Checkbox
            id="isPreorder"
            name="isPreorder"
            checked={formData.isPreorder}
            onCheckedChange={() => handleInputChange}
          />
          <label htmlFor="isPreorder" className="text-sm font-medium text-gray-700">
            Preorder
          </label>
        </div>
        {formData.isPreorder && (
          <>
            <div>
              <label htmlFor="preorderPrice" className="block text-sm font-medium text-gray-700">
                Preorder Price
              </label>
              <Input
                type="number"
                id="preorderPrice"
                name="preorderPrice"
                value={formData.preorderPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="preorderReleaseDate" className="block text-sm font-medium text-gray-700">
                Preorder Release Date
              </label>
              <Input
                type="date"
                id="preorderReleaseDate"
                name="preorderReleaseDate"
                value={formData.preorderReleaseDate}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancel}>
           Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading || isUploading}>
          {isLoading || isUploading ? <Loader2 className="h-4 w-4 animate-spin"/> : "Save"}
        </Button>
      </CardFooter>
    </Card>
    </Modal>
  );
};

export default ProductEdit;
