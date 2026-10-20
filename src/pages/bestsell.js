import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ React Router
import Navbar from '../components/navbar';
import BestSellProducts from '../components/home/bestSell';
import Banner from '../components/banner';

const BestSell = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="mx-auto w-full">
        {/* Thanh điều hướng */}
        <nav className="text-gray-700 mb-3 border-t border-b py-3 bg-gray-200 w-full">
          <div className="mx-auto px-5">
            <Link to="/" className="hover:underline">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span>Sản phẩm bán chạy</span>
          </div>
        </nav>

        {/* Tiêu đề và sản phẩm nổi bật */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-3 py-3 px-5">Sản phẩm bán chạy</h1>
          <div className="flex justify-center items-center space-x-2 mb-3 py-3 px-5">
            <span className="text-lg font-semibold underline">Sản phẩm nổi bật</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        {/* Danh sách sản phẩm */}
        <BestSellProducts />
      </div>
    </div>
  );
};

export default BestSell;
