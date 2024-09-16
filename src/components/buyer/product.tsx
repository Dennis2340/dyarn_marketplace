// products.tsx
import { GetStaticProps } from 'next';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
            <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.example.com/products');
  const products: Product[] = await res.json();
  
  return {
    props: {
      products,
    },
  };
};

export default ProductsPage;
