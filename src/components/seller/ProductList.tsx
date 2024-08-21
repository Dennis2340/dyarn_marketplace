"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, Pencil } from "lucide-react";
import { MyLoader } from "@/components/MyLoader";
import ProductEditDialog from "@/components/seller/ProductEditDialog";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  // Add other product fields as necessary
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fetch products data
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/products`, {
        method: "DELETE",
        body: JSON.stringify({id: productId})
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <ProductEditDialog />
      </div>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-span-1">
              <MyLoader />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link
                href={`/product/${product.id}`}
                className="text-blue-700 hover:underline text-lg font-semibold"
              >
                {product.name}
              </Link>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-800 mt-2">${product.price}</p>
              <div className="flex justify-between mt-4">
                <Button onClick={() => handleDelete(product.id)} size="sm" variant="destructive">
                  {isDeleting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
                <ProductEditDialog product={product} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found. Please add some products.</p>
      )}
    </div>
  );
};

export default ProductList;
