import React, { useEffect, useState } from "react";
import userApi from '../../api/userApi';

const Profile = () => {
  const [user, setUser] = useState(null);  // Để lưu thông tin người dùng
  const [loading, setLoading] = useState(true);  // Để xử lý trạng thái tải dữ liệu
  const [error, setError] = useState(null);  // Để xử lý lỗi nếu có

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response); // Lưu thông tin người dùng vào state
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Đang tải thông tin...</div>;  // Hiển thị khi dữ liệu đang được tải
  }

  if (error) {
    return <div>{error}</div>;  // Hiển thị khi có lỗi
  }

  console.log(user);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Hồ sơ của tôi</h2>
      <p className="text-sm text-gray-500 mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

      <div className="space-y-4">
        {/* Tên đăng nhập */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Tên đăng nhập:</span>
          <span className="text-gray-600">{user.username}</span>
        </div>

        {/* Email */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>

        {/* Điện thoại */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Điện thoại:</span>
          <span className="text-gray-600">{user.phone || "Chưa có thông tin"}</span>
        </div>

        {/* Địa chỉ */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Địa chỉ:</span>
          <span className="text-gray-600">{user.address || "Chưa có thông tin"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
