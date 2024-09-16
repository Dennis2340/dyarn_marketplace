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
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
      
      <ul className="space-y-4 mb-6">
        {cart.length > 0 ? (
          cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <span>{item.name}</span>
              <span className="text-blue-600 font-semibold">${item.price.toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center">Your cart is empty.</li>
        )}
      </ul>

      <p className="text-lg font-semibold text-right mb-6">
        Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </p>

      <div className="text-center">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          disabled={cart.length === 0} // Disable button if cart is empty
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
