// src/components/test/cart/GetCartItemById.js
import React, { useState } from 'react';
import cartApi from '../../../api/cartApi';

const GetCartItemById = () => {
  const [id, setId] = useState('');
  const [cartItem, setCartItem] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await cartApi.getCartItemById(id);
      setCartItem(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch cart item: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Cart Item ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <button type="submit">Get Cart Item</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cartItem && (
        <div>
          <h3>Cart Item Details:</h3>
          <ul>
            <li>ID: {cartItem.id}</li>
            <li>Quantity: {cartItem.quantity}</li>
            <li>Created At: {cartItem.createdAt}</li>
            <li>User ID: {cartItem.userId}</li>
            <li>Product ID: {cartItem.productId}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetCartItemById;
