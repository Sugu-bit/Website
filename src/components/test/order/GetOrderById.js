import React, { useState } from 'react';
import orderApi from '../../../api/orderApi';

const GetOrderById = () => {
  const [id, setId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await orderApi.getOrderById(id);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch order: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Order ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        <button type="submit">Get Order</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {order && (
        <div>
          <h3>Order Details:</h3>
          <ul>
            <li>ID: {order.id}</li>
            <li>Total Amount: {order.totalAmount}</li>
            <li>Payment Method: {order.paymentMethod}</li>
            <li>Shipping Status: {order.shippingStatus}</li>
            <li>Payment Status: {order.paymentStatus}</li>
            <li>Created At: {order.createdAt?.date}</li>
            <li>Updated At: {order.updatedAt?.date}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetOrderById;
