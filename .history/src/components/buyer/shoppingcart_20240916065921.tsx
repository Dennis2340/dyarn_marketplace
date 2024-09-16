import { useState } from 'react';

// Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
