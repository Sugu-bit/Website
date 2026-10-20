import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const CheckPermission = () => {
  const [message, setMessage] = useState("");

  const handleCheck = async () => {
    try {
      const data = await securityApi.checkPermission();
      setMessage(`Permissions: ${JSON.stringify(data)}`);
    } catch (error) {
      setMessage("Failed to check permissions.");
    }
  };

  return (
    <div>
      <h2>Check Permissions</h2>
      <p>đây là tính năng chỉ để test</p>
      <button onClick={handleCheck}>Check</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckPermission;
