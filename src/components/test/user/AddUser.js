import React, { useState } from 'react';
import userApi from '../../../api/userApi';

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await userApi.createUser(formData);
      console.log('New user:', newUser);
      setMessage(`User "${newUser.username}" created successfully!`);
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      setMessage(`Failed to create user: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required={key !== 'phone' && key !== 'address'}
          />
        </div>
      ))}
      <button type="submit">Add User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddUser;
