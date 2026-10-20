import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";
import securityApi from "../../../api/securityApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await securityApi.login(username, password);
      setMessage("accessToken: "+data.accessToken+"\nrefreshToken: "+data.refreshToken);
      dispatch(setUser(data)); // Lưu thông tin user và token vào Redux
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Đăng nhập</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
