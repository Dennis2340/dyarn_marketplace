"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Modal from "@/components/Modal"; 
import { Loader2 } from "lucide-react";
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUploadThing } from '@/lib/uploadthing';

interface ProductCreationCardProps {
  onProductCreated: () => void;
}
const ProductCreationCard: React.FC<ProductCreationCardProps> = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    isPreorder: false,
    preorderPrice: 0,
    preorderReleaseDate: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing('freePlanUploader');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, isPreorder: e.target.checked });
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
      if (responseFile && responseFile.url) {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: responseFile.url,
        }));
      }
      console.log(formData)
    }
  };

  const handleSave = async () => {
    if (image) {
      await handleImageUpload();
   }

   console.log(formData)
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Product created successfully");
        setIsModalOpen(false);
        onProductCreated();
        // set state to null
        setFormData({
          title: "",
          description: "",
          price: 0,
          imageUrl: "",
          isPreorder: false,
          preorderPrice: 0,
          preorderReleaseDate: ""
        })
      }
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Create New Product</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card>
          <CardHeader>
            <CardTitle>Create New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPreorder"
                  name="isPreorder"
                  checked={formData.isPreorder}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="isPreorder" className="text-sm font-medium text-gray-700">
                  Is Preorder
                </label>
              </div>
              {formData.isPreorder && (
                <>
                  <div>
                    <label htmlFor="preorderPrice" className="block text-sm font-medium text-gray-700">
                      Preorder Price
                    </label>
                    <input
                      type="number"
                      id="preorderPrice"
                      name="preorderPrice"
                      value={formData.preorderPrice}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="preorderReleaseDate" className="block text-sm font-medium text-gray-700">
                      Preorder Release Date
                    </label>
                    <input
                      type="date"
                      id="preorderReleaseDate"
                      name="preorderReleaseDate"
                      value={formData.preorderReleaseDate}
                      onChange={handleInputChange}
                      className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="ml-2" disabled={isLoading || isUploading}>
              {isLoading || isUploading ? <Loader2 className="h-4 w-4 animate-spin"/> : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </>
  );
};

export default ProductCreationCard;
