import styled from "styled-components";
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
function Footer(){
    return (
        <div className="">
            <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#45526e' }}>
                <div className="container p-4 pb-0">
                    <section>
                        <div className="row">
                            {/* Company Name */}
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <div className="w-24 cursor-pointer">
                                    <Link to="/">
                                        <img src={Logo} alt="Logo" className="w-full h-auto" />
                                    </Link>
                                </div>
                                <p>
                                  SCIME.COM - KÊNH MUA SẮM TRỰC TUYẾN UY TÍN HÀNG ĐẦU TẠI VIỆT NAM.  
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />

                            {/* Products */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">SẢN PHẨM</h6>
                                <p>
                                    <a href="#" className="text-white">Thời trang</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Giày dép - túi sách</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Điện tử - Công nghệ</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Sức khoẻ - Làm đẹp</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Đồ gia dụng</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Đồ trang trí</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Mẹ và bé</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Sách - Văn phòng phẩm</a>
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />

                            {/* Useful Links */}
                            <div className="col-md-3 col-lg-2 col-xl-4 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Thông tin</h6>
                                <p>
                                    <a href="#" className="text-white">Giới thiệu về SCIME</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Thông tin Website thương mại điện tử</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Góp ý đánh giá</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Chính sách và quy định</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Vận chuyển</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Chính sách đổi trả</a>
                                </p>
                                <p>
                                    <a href="#" className="text-white">Chính sách bảo hàng</a>
                                </p>
                            </div>
                            <hr className="w-100 clearfix d-md-none" />

                            {/* Contact */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Liên hệ</h6>
                                <p><i className="fas fa-home mr-3"></i> Nguyễn Trãi, Thanh Xuân, Việt Nam</p>
                                <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> 01234567890</p>
                            </div>
                        </div>
                    </section>

                    <hr className="my-3" />

                    {/* Copyright Section */}
                    <section className="p-3 pt-0">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8 text-center text-md-start">
                                <div className="p-3">
                                    © 2024 Scime. All Rights Reserved
                                    <a href="" className="text-white"></a>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                <a className="btn btn-outline-light btn-floating m-1" role="button">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-floating m-1" role="button">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-outline-light btn-floating m-1" role="button">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a className="btn btn-outline-light btn-floating m-1" role="button">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
const FooterContainer = styled.div`
    background-color: var(--color-background);
    padding: 20px;
    text-align: center;
    height: 300px;
`;