// src/components/test/order/DeleteOrder.js
import React, { useState } from 'react';
import orderApi from '../../../api/orderApi';

const DeleteOrder = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await orderApi.deleteOrder(id);
      setMessage(response.message || 'Order deleted successfully');
    } catch (err) {
      setMessage(`Failed to delete order: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Order ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Delete Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteOrder;
