import React, { useState } from 'react';
import orderApi from '../../../api/orderApi';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    paymentMethod: '',
    shipCouponId: '',
    productCouponId: '',
    address: '',
    cart: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuyển cart từ chuỗi sang mảng số
    const cartItems = formData.cart
      .split(',')
      .map((item) => parseInt(item.trim(), 10));

    const dataToSend = {
      ...formData,
      cart: cartItems,
      shipCouponId: parseInt(formData.shipCouponId, 10) || null,
      productCouponId: parseInt(formData.productCouponId, 10) || null,
    };

    try {
      const newOrder = await orderApi.createOrder(dataToSend);
      setMessage(`Order created with ID ${newOrder.id}`);
    } catch (err) {
      setMessage(`Failed to create order: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Payment Method:</label>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          placeholder="e.g., COD"
        />
        <br />
        <label>Ship Coupon ID:</label>
        <input
          type="text"
          name="shipCouponId"
          value={formData.shipCouponId}
          onChange={handleChange}
        />
        <br />
        <label>Product Coupon ID:</label>
        <input
          type="text"
          name="productCouponId"
          value={formData.productCouponId}
          onChange={handleChange}
        />
        <br />
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
        <br />
        <label>Cart (comma-separated IDs):</label>
        <input
          type="text"
          name="cart"
          value={formData.cart}
          onChange={handleChange}
          placeholder="e.g., 1, 2, 3"
        />
        <br />
        <button type="submit">Create Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrder;
