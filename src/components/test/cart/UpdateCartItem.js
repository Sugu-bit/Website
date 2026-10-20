// src/components/test/cart/UpdateCartItem.js
import React, { useState } from 'react';
import cartApi from '../../../api/cartApi';

const UpdateCartItem = () => {
  const [id, setId] = useState('');
  const [formData, setFormData] = useState({ quantity: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = await cartApi.updateCartItem(id, formData);
      setMessage(`Cart item with ID ${updatedItem.id} updated successfully!`);
    } catch (err) {
      setMessage(`Failed to update cart item: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Cart Item ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <label>Quantity:</label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
        <button type="submit">Update Cart Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateCartItem;
