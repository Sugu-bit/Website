import React, { useState, useEffect } from 'react';
import userApi from '../../../api/userApi';
import './GetAllUsers.css'; // Import CSS

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userApi.getAllUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch users: ${err.message}`);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li className="user-item" key={user.id}>
            <h3>User ID: {user.id}</h3>
            <ul>
              {Object.entries(user).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value ?? 'N/A'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
