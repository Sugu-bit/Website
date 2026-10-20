import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const VerifyPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      await securityApi.verifyPassword(password);
      setMessage("Password verified successfully.");
    } catch (error) {
      setMessage("Password verification failed.");
    }
  };

  return (
    <div>
      <h2>Verify Password</h2>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyPassword;
