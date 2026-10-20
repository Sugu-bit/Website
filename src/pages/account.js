import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Profile from '../components/account/profile';
import ChangePassword from '../components/account/changepassword';
import PurchaseHistory from '../components/account/purchasehistory';
import { LuUserCircle } from "react-icons/lu";
import Navbar from '../components/navbar';
import ChangeProfile from '../components/account/changeprofile';
import { HiChevronRight } from "react-icons/hi";
const Account = () => {
  return (
    <div className='bg-gray-100'>
        <Navbar />
        <div className="flex w-full" style={{ minHeight: 'calc(100vh - 96px)' }}>
        {/* Left Section */}
            <div className="w-1/5 p-6 bg-gray-800">
                <div className="flex items-center mb-8">
                    <div className="text-4xl mr-2 text-gray-100">
                        <LuUserCircle/>
                    </div>
                    <span className="font-bold text-lg text-gray-100">Quản Lý Người Dùng</span>
                </div>
                <hr className='text-white'></hr>
                <div className="flex flex-col space-y-4 pt-6">
                    <Link to="/account/profile" className="flex text-gray-100 text-base font-semibold hover:bg-gray-200 p-2 justify-between items-center">
                        Hồ sơ
                        <HiChevronRight/>
                    </Link>
                    <Link to="/account/change-profile" className="flex text-gray-100 text-base font-semibold hover:bg-gray-200 p-2 justify-between items-center">
                        Thay đổi thông tin cá nhân 
                        <HiChevronRight/>
                    </Link>
                    <Link to="/account/change-password" className="flex text-gray-100 text-base font-semibold hover:bg-gray-200 p-2 justify-between items-center">Đổi mật khẩu <HiChevronRight/></Link>
                    <Link to="/account/purchase-history" className="flex text-gray-100 text-base font-semibold hover:bg-gray-200 p-2 justify-between items-center">Lịch sử mua hàng <HiChevronRight/></Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-4/5 bg-white p-6">
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/purchase-history" element={<PurchaseHistory />} />
                    <Route path="/change-profile" element={<ChangeProfile />} />
                </Routes>
            </div>
        </div>
    </div>
  );
};

export default Account;
