// src/components/test/order/GetAllOrders.js
import React, { useEffect, useState } from 'react';
import orderApi from '../../../api/orderApi';

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderApi.getAllOrders();
        setOrders(data);
      } catch (err) {
        setError(`Failed to fetch orders: ${err.message}`);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>ID:</strong> {order.id}, <strong>Total Amount:</strong> {order.totalAmount}, 
            <strong>Payment Method:</strong> {order.paymentMethod}, <strong>Status:</strong> {order.shippingStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllOrders;
