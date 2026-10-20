import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import securityApi from '../api/securityApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Navbar2 from '../components/navbar2';
import Footer from '../components/footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await securityApi.login(username, password); // Gọi API đăng nhập
      setMessage('AccessToken: ' + data.accessToken + '\nRefreshToken: ' + data.refreshToken);
      dispatch(setUser(data)); // Lưu thông tin user vào Redux
      if (rememberPassword) {
        // Nếu chọn "Remember Password", lưu thông tin vào localStorage
        localStorage.setItem('user', JSON.stringify(data));
      }
      navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };
  return (
    <div>
      <div className="d-flex flex-column align-items-center min-vh-100">
        <Navbar2 />
        <div className="container-login row">
          <div className="col-sm-9 col-md-7 col-xl-12 mx-5">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-3">
                <h5 className="card-title text-center mb-3 fw-dark fs-4">Sign In</h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingUsername"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingUsername">Username</label>
                  </div>
                  <div className="form-floating mb-3 position-relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? (
                        <i className="fa fa-eye"></i> // Mắt không gạch chéo
                      ) : (
                        <i className="fa fa-eye-slash"></i> // Mắt gạch chéo
                      )}
                    </span>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  {message && <p className="text-success">{message}</p>}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={rememberPassword}
                      id="rememberPasswordCheck"
                      onChange={() => setRememberPassword(!rememberPassword)}
                    />
                    <label className="form-check-label" htmlFor="rememberPasswordCheck">
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                      Sign in
                    </button>
                  </div>
                </form>
                <hr className="my-4" />
                <div className="text-center">
                  <p>
                    Don't have an account?{' '}
                    <span
                      style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                      onClick={() => navigate('/register')}
                    >
                      Register here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
