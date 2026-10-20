// src/components/test/cart/CreateCartItem.js
import React, { useState } from 'react';
import cartApi from '../../../api/cartApi';

const CreateCartItem = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    productOptionId: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await cartApi.createCartItem(formData);
      setMessage(`Cart item created with ID ${newItem.id}`);
    } catch (err) {
      setMessage(`Failed to create cart item: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Product ID:</label>
        <input type="text" name="productOptionId" value={formData.productOptionId} onChange={handleChange} required />
        <label>Quantity:</label>
        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
        <button type="submit">Create Cart Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateCartItem;
