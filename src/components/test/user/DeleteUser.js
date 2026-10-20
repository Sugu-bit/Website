import React, { useState } from 'react';
import userApi from '../../../api/userApi';

const DeleteUser = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApi.deleteUser(id);
      setMessage(`User with ID ${id} deleted successfully!`);
      setId('');
    } catch (error) {
      setMessage(`Failed to delete user: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>User ID:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button type="submit">Delete User</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default DeleteUser;
