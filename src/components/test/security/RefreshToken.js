import React, { useState } from "react";
import securityApi from "../../../api/securityApi";

const RefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState("");
  const [message, setMessage] = useState("");

  const handleRefresh = async () => {
    try {
      const data = await securityApi.refreshToken(refreshToken);
      setMessage(`New Access Token: ${data.accessToken}`);
    } catch (error) {
      setMessage("Failed to refresh token.");
    }
  };

  return (
    <div>
      <h2>Refresh Token</h2>
      <input
        type="text"
        placeholder="Refresh Token"
        value={refreshToken}
        onChange={(e) => setRefreshToken(e.target.value)}
      />
      <button onClick={handleRefresh}>Refresh</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RefreshToken;
