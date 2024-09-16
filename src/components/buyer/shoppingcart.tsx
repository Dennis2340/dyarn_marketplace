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
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-blue-600 text-xl font-bold">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
