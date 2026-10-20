import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const Logout = () => {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      await securityApi.logout();
      setMessage("Logged out successfully.");
    } catch (error) {
      setMessage("Failed to logout.");
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Logout;
