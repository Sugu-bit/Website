import React, { useState } from 'react';
import orderApi from '../../../api/orderApi';

const UpdateOrder = () => {
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu với chỉ thuộc tính address
      const updatedOrder = await orderApi.updateOrder(id, { address });
      setMessage(`Order updated successfully with ID ${id}`);
    } catch (err) {
      setMessage(`Failed to update order: ${err.message}`);
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
        <br />
        <label>New Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateOrder;
