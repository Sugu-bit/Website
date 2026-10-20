import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'
import Footer from '../components/footer';
import Navbar2 from '../components/navbar2';
import { registerUser, setUser } from "../redux/userSlice";
import securityApi from "../api/securityApi";
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await dispatch(
                registerUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    address: formData.address,
                })
            ).unwrap();
            // Sau khi đăng ký thành công, tự động đăng nhập
            const loginResponse = await securityApi.login(formData.username, formData.password);
            
            // Kiểm tra nếu API trả về token
            if (loginResponse.accessToken && loginResponse.refreshToken) {
                // Lưu token vào Redux hoặc localStorage
                dispatch(setUser(loginResponse)); // Lưu thông tin người dùng vào Redux
                console.log(loginResponse);
                setMessage('Registration and login successful!');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage('Registration successful, but login failed.');
            }
        }
        catch (error) {
            setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
        }
    };
    

    return (
        <div>
            <div className="d-flex flex-column align-items-center min-vh-100">
                <Navbar2 />
                <div className="container-register row">
                    <div className="col-sm-9 col-md-10 col-lg-12 mx-5">
                        <div className="card border-2 solid rounded-3 my-1">
                            <div className="card-body p-4 p-sm-3">
                                <h5 className="card-title text-center mb-3 fw-dark fs-4">Register</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingUsername"
                                            name="username"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="floatingUsername">Username <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingEmail"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="floatingEmail">Email address <span className="text-danger">*</span></label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingPhone"
                                            name="phone"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="floatingPhone">Phone</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingAddress"
                                            name="address"
                                            placeholder="Address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="floatingAddress">Address</label>
                                    </div>
                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="password">
                                            Password <span className="text-danger">*</span>
                                        </label>
                                        <span
                                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? (
                                                <i className="fa fa-eye"></i>
                                            ) : (
                                                <i className="fa fa-eye-slash"></i>
                                            )}
                                        </span>
                                    </div>
                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="confirmPassword">
                                            Confirm Password <span className="text-danger">*</span>
                                        </label>
                                        <span
                                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                                            onClick={toggleConfirmPasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showConfirmPassword ? (
                                                <i className="fa fa-eye"></i>
                                            ) : (
                                                <i className="fa fa-eye-slash"></i>
                                            )}
                                        </span>
                                    </div>
                                    <button className="btn btn-primary w-100" type="submit">
                                        Register
                                    </button>
                                    {message && <p className="mt-3 text-center">{message}</p>}
                                </form>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <p>
                                        Already have an account?{' '}
                                        <span
                                            style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                                            onClick={() => navigate('/login')}
                                        >
                                            Sign in here
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

export default Register;
