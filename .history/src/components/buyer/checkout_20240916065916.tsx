import { useState } from 'react';

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
}

const CheckoutPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]); // Local cart state

  // Simulate the checkout process
  const handleCheckout = () => {
    alert('Checkout simulated. Thank you for your purchase!');
    setCart([]); // Clear the cart after checkout
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p>
        Total: ${cart.reduce((total, item) => total + item.price, 0)}
      </p>
      <button onClick={handleCheckout}>Complete Purchase</button>
    </div>
  );
};

export default CheckoutPage;
