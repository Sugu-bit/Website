// src/components/test/cart/GetAllCartItems.js
import React, { useEffect, useState } from 'react';
import cartApi from '../../../api/cartApi';

const GetAllCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await cartApi.getAllCartItems();
        setCartItems(data);
      } catch (err) {
        setError(`Failed to fetch cart items: ${err.message}`);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id}, <strong>Quantity:</strong> {item.quantity}, 
            <strong>Created At:</strong> {item.createdAt}, <strong>User ID:</strong> {item.userId}, 
            <strong>Product ID:</strong> {item.productId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllCartItems;
