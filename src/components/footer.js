import React from "react";
import Logo from "../assets/buyp-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-800 text-white">
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Link to="/" aria-label="BuyP - Trang chủ">
          <img src={Logo} alt="BuyP" className="mb-4 w-24" />
        </Link>
        <p className="text-sm leading-6 text-slate-200">
          BuyP - cửa hàng điện thoại và phụ kiện công nghệ. Thông tin giá và tồn kho được hiển thị theo dữ liệu cửa hàng.
        </p>
      </div>

      <nav aria-label="Danh mục sản phẩm">
        <h2 className="mb-4 font-bold uppercase">Sản phẩm</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li><Link className="hover:text-white" to="/category/smartphone">Điện thoại</Link></li>
          <li><Link className="hover:text-white" to="/category/iphone">iPhone</Link></li>
          <li><Link className="hover:text-white" to="/category/android">Android</Link></li>
          <li><Link className="hover:text-white" to="/category/tablet">Máy tính bảng</Link></li>
          <li><Link className="hover:text-white" to="/category/accessories">Phụ kiện điện thoại</Link></li>
          <li><Link className="hover:text-white" to="/special">Ưu đãi đang áp dụng</Link></li>
        </ul>
      </nav>

      <nav aria-label="Hỗ trợ mua hàng">
        <h2 className="mb-4 font-bold uppercase">Hỗ trợ mua hàng</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          <li><Link className="hover:text-white" to="/cart">Giỏ hàng</Link></li>
          <li><Link className="hover:text-white" to="/account">Tài khoản</Link></li>
          <li><Link className="hover:text-white" to="/payments">Thanh toán</Link></li>
          <li><span>Thông tin bảo hành và giao hàng sẽ được xác nhận theo từng sản phẩm/đơn hàng.</span></li>
        </ul>
      </nav>

      <div>
        <h2 className="mb-4 font-bold uppercase">Tư vấn</h2>
        <p className="mb-3 text-sm text-slate-200">Liên hệ qua kênh tư vấn trực tuyến nếu bạn cần hỗ trợ chọn sản phẩm.</p>
        <div className="flex flex-col items-start gap-2 text-sm">
          <a className="underline hover:text-white" href="https://zalo.me/" target="_blank" rel="noopener noreferrer">
            Chat qua Zalo
          </a>
          <a className="underline hover:text-white" href="https://messenger.com/" target="_blank" rel="noopener noreferrer">
            Chat qua Messenger
          </a>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-600 px-5 py-4 text-center text-sm text-slate-200">
      © {new Date().getFullYear()} BuyP. All rights reserved.
    </div>
  </footer>
);

export default Footer;
