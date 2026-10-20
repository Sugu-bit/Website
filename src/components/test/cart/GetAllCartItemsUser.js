import React, { useEffect, useState } from 'react';
import cartApi from '../../../api/cartApi';

const GetAllCartItemUser = () => {
  const [cartItemUser, setCartItemUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItemUser = async () => {
      try {
        const data = await cartApi.getAllCartItemUser();
        setCartItemUser(data);
      } catch (err) {
        setError(`Failed to fetch cart items: ${err.message}`);
      }
    };
    fetchCartItemUser();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cartItemUser.map((item) => (
          <li key={item.id}>
            <strong>ID:</strong> {item.id}, <strong>Quantity:</strong> {item.quantity}, 
            <strong>Created At:</strong> {item.createdAt}, <strong>User ID:</strong> {item.userId}, 
            <strong>Product ID:</strong> {item.productId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllCartItemUser;
