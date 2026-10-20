// src/components/test/orderDetail/GetOrderDetailById.js
import React, { useState } from 'react';
import orderDetailApi from '../../../api/orderDetailApi';

const GetOrderDetailById = () => {
  const [id, setId] = useState('');
  const [orderDetail, setOrderDetail] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const data = await orderDetailApi.getOrderDetailById(id);
      setOrderDetail(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrderDetail(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {error && <p>Error: {error}</p>}
      {orderDetail && (
        <p>
          Order ID: {orderDetail.orderId}, Product ID: {orderDetail.productId}, Quantity: {orderDetail.quantity}, Price: {orderDetail.price}
        </p>
      )}
    </div>
  );
};

export default GetOrderDetailById;
