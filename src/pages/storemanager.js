import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ViewProduct from "../components/storemanager/viewproduct";
import AddProduct from "../components/storemanager/addproduct";
import EditProduct from "../components/storemanager/editproduct";
import SuggestProduct from "../components/storemanager/suggestproduct/suggestProduct";
import BestSellProduct from "../components/storemanager/bestsellproduct/bestSellProduct";
import SpecialProduct from "../components/storemanager/specialproduct/specialProduct";
import Logo from "../assets/logo1.png";
import { HiChevronRight } from "react-icons/hi";
import { FaStore } from "react-icons/fa";
function StoreManager() {
  return (
    <div>
      {/* Navbar */}
      <nav className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg flex justify-content-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-24 h-auto max-w-full" />
          </Link>
          <h1 className="text-2xl">Kênh Người Bán</h1>
        </div>

        {/* Links */}
        <div className="flex space-x-4 h-full items-center">
          <Link to="/" className="flex hover:text-gray-400 text-xl px-4 transition-colors duration-200 justify-between items-center">
            Về Trang Chủ
            <HiChevronRight/>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex w-full" style={{ minHeight: 'calc(100vh - 96px)' }}>
        {/* Sidebar */}
        <div className="w-1/5 p-3 h-screen bg-gray-800 sticky top-24">
          <h2 className="flex items-center text-2xl font-semibold px-3 mb-4 text-white justify-content-between"><FaStore /> Quản lý gian hàng</h2>
          <div>
            <Link
              to="/storemanager/view"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Danh sách sản phẩm
            </Link>
            <Link
              to="/storemanager/add"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Thêm sản phẩm
            </Link>
            <Link
              to="/storemanager/suggest"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Danh sách sản phẩm đề xuất
            </Link>
            <Link
              to="/storemanager/bestSell"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Danh sách sản phẩm bán chạy
            </Link>
            <Link
              to="/storemanager/special"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Danh sách sản phẩm ưu đãi
            </Link>
          </div>
        </div>

        {/* Routes */}
        <div className="w-4/5 bg-white p-6">
          <Routes>
            <Route path="/view" element={<ViewProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/view/edit/:id" element={<EditProduct />} />
            <Route path="/suggest" element={<SuggestProduct />} />
            <Route path="/bestSell" element={<BestSellProduct />} />
            <Route path="/special" element={<SpecialProduct />} />
            <Route
              path="/"
              element={
                <h2 className="text-2xl font-semibold">Lựa chọn nội dung</h2>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StoreManager;
