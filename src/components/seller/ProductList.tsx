"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash } from "lucide-react";
import { MyLoader } from "@/components/MyLoader";
import ProductEditDialog from "@/components/seller/ProductEditDialog";
import ProductCreationCard from "./ProductCreationDialog";

export type Product = {
  id: string;
  title: string;
  description: string;
  titleEmbedding: number[];
  descriptionEmbedding: number[];
  price: number;
  imageUrl: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  ratings: {
    id: string;
    value: number;
    userId: string;
    productId: string;
    user: {
      id: string;
      name: string;
    };
  }[];
  isPreorder: boolean;
  preorderPrice?: number;
  preorderReleaseDate?: string;
  createdAt: string;
  updatedAt: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/products");
  //       const productsData = await response.json();
  //       setProducts(productsData);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    try {
        setIsDeleting((prevState) => ({ ...prevState, [productId]: true }));
      const response = await fetch(`/api/products`, {
        method: "DELETE",
        body: JSON.stringify({ id: productId }),
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
        setIsDeleting((prevState) => ({ ...prevState, [productId]: false }));
    }
  };

  console.log(products)
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <ProductCreationCard onProductCreated={fetchProducts}/>
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
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <Link
                href={`/product/${product.id}`}
                className="text-blue-700 hover:underline text-lg font-semibold"
              >
                {product.title}
              </Link>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-800 mt-2">${product.price}</p>

              {product.isPreorder && (
                <div className="mt-2">
                  <p className="text-yellow-600">Preorder Available</p>
                  <p className="text-gray-600">Preorder Price: ${product.preorderPrice}</p>
                  <p className="text-gray-600">
                    Release Date:{" "}
                    {new Date(product.preorderReleaseDate!).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <strong>Seller:</strong> {product.user.name}
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Ratings:</p>
                  {product.ratings.length > 0 ? (
                    product.ratings.map((rating) => (
                      <div
                        key={rating.id}
                        className={`flex items-center ${
                          rating.value > 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {rating.value > 0 ? "👍" : "👎"} {rating.user.name}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No ratings yet</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-4">
              <Button
                  onClick={() => handleDelete(product.id)}
                  size="sm"
                  variant="destructive"
                  disabled={isDeleting[product.id] || false}
                >
                  {isDeleting[product.id] ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => setEditingProductId(editingProductId === product.id ? null : product.id)}
                  size="sm"
                  variant="outline"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
              </div>
              {editingProductId === product.id && (
                <div className="mt-4">
                  <ProductEditDialog 
                  product={product} 
                  isEditing={Boolean(editingProductId)} 
                  onProductEdited={fetchProducts}
                  />
                </div>
              )}
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
