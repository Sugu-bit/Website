import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const RefreshRefreshToken = () => {
  const [refreshRefreshToken, setRefreshRefreshToken] = useState("");
  const [message, setMessage] = useState("");

  const handleRefresh = async () => {
    try {
      const data = await securityApi.referesh_refreshToken(refreshRefreshToken);
      setMessage(`New Refresh Token: ${data.refreshToken}`);
    } catch (error) {
      setMessage("Failed to refresh token.");
    }
  };

  return (
    <div>
      <h2>Refresh Token</h2>
      <input
        type="text"
        placeholder="Refresh RefreshToken"
        value={refreshRefreshToken}
        onChange={(e) => setRefreshRefreshToken(e.target.value)}
      />
      <button onClick={handleRefresh}>Refresh</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RefreshRefreshToken;
