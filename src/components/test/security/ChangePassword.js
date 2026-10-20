import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = async () => {
    try {
      await securityApi.changePassword(currentPassword, newPassword);
      setMessage("Password changed successfully.");
    } catch (error) {
      setMessage("Failed to change password.");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChange}>Change</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
