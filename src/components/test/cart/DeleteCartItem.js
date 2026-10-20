// src/components/test/cart/DeleteCartItem.js
import React, { useState } from 'react';
import cartApi from '../../../api/cartApi';

const DeleteCartItem = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cartApi.deleteCartItem(id);
      setMessage(`Cart item with ID ${id} deleted successfully!`);
    } catch (err) {
      setMessage(`Failed to delete cart item: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Cart Item ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <button type="submit">Delete Cart Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteCartItem;
