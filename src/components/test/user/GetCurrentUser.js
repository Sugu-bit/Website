import React, { useState, useEffect } from 'react';
import userApi from '../../../api/userApi';

const GetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await userApi.getCurrentUser();
        setUser(data);
      } catch (err) {
        setError(`Failed to fetch current user: ${err.message}`);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <div>
      <h2>Current User</h2>
      {error && <p>{error}</p>}
      {user ? <p>{user.username} ({user.email})</p> : <p>No user found.</p>}
    </div>
  );
};

export default GetCurrentUser;
