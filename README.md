
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Project Name

## Dashboard Overview

**Completed:**
- **Seller's Dashboard**
  - Product Management (Create, Update, Delete)
  - View own products

**To Be Implemented:**
- **Buyer's Interface**
  - View all available products (paginated)
  - Add products to cart
  - Checkout process (simulation)

## Seller's Dashboard

The seller's dashboard allows users to manage their products. Sellers can:
- Create new products
- Update existing products
- Delete their products
- View a list of their own products

## Buyer's Interface (To Be Implemented)

The buyer's interface will allow users to:
1. View all available products from all sellers
2. Add products to their shopping cart
3. Proceed to checkout (simulated process)

### Viewing All Products

To display all available products, use the following API endpoint:

- **Endpoint**: `GET /api/products`
- **Description**: Retrieves all products available in the system
- **Pagination**: To be implemented

#### Usage in React

Here's an example of how to fetch and display all products:

import React, { useState, useEffect } from 'react';
const ProductList = () => {
const [products, setProducts] = useState([]);
useEffect(() => {
const fetchProducts = async () => {
try {
const response = await fetch('/api/products');
if (!response.ok) throw new Error('Failed to fetch products');
const data = await response.json();
setProducts(data);
} catch (error) {
console.error('Error fetching products:', error);
}
};
fetchProducts();
}, []);
return (
<div>
<h2>All Products</h2>
{products.map(product => (
<div key={product.id}>
<h3>{product.title}</h3>
<p>{product.description}</p>
<p>Price: ${product.price}</p>
<button onClick={() => {/ Add to cart logic /}}>Add to Cart</button>
</div>
))}
</div>
);
};

export default ProductList;

## API Documentation

### Products API

This API handles product-related operations such as creating, retrieving, and deleting products.

#### Endpoint: `/api/products`

#### 1. Create a Product (POST)

- **Method**: POST
- **Description**: Creates a new product for the authenticated user.
- **Authentication**: Required (Kinde Auth)
- **Request Body**:
  ```json
  {
    "title": "Product Title",
    "description": "Product Description",
    "price": 99.99,
    "imageUrl": "https://example.com/image.jpg"
  }
  ```
- **Response**: 
  - Success (201): Returns the created product object
  - Error (401): Unauthorized
  - Error (500): Internal Server Error

#### 2. Get All Products (GET)

- **Method**: GET
- **Description**: Retrieves all products with associated user and rating information.
- **Authentication**: Not required
- **Response**: 
  - Success (200): Returns an array of product objects
  - Error (500): Internal Server Error

#### 3. Delete a Product (DELETE)

- **Method**: DELETE
- **Description**: Deletes a specific product owned by the authenticated user.
- **Authentication**: Required (Kinde Auth)
- **Request Body**:
  ```json
  {
    "id": "product_id_here"
  }
  ```
- **Response**: 
  - Success (200): Returns a success message
  - Error (400): Invalid product ID
  - Error (401): Unauthorized
  - Error (403): Forbidden (if the product doesn't belong to the user)
  - Error (500): Internal Server Error

#### Usage in React

To use these endpoints in a React application, you can use the `fetch` API or a library like `axios`. Here's an example using `fetch`:
const createProduct = async (productData) => {
const response = await fetch('/api/products', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(productData),
});
if (!response.ok) throw new Error('Failed to create product');
return response.json();
};


