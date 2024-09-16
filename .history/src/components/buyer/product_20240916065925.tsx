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
    <div>
      <h1>Available Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
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
