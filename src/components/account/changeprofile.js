import React, { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import Confirm from "../../components/confirm";
import AddressData from "../account/addressdata";

const ChangeProfile = () => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    isActive: false,
  });
  const [newData, setNewData] = useState({});
  const [address, setAddress] = useState({ province: "", district: "", ward: "", detail: "" });
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState(null);

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response);
        setNewData({
          email: response.email,
          phone: response.phone,
          username: response.username,
          address: response.address,
          isActive: response.isActive,
        });
      } catch (error) {
        console.error("Có lỗi xảy ra khi tải dữ liệu người dùng.");
      }
    };

    fetchUserData();
  }, []);

  // Kiểm tra tính hợp lệ
  const validateForm = () => {
    if (newData.email && !newData.email.includes("@")) {
      alert("Email không hợp lệ!");
      return false;
    }
    if (newData.phone && !/^[0][0-9]{8,9}$/.test(newData.phone)) {
      alert("Số điện thoại không hợp lệ! (Ví dụ: 0912345678)");
      return false;
    }
    if (
      (address.province || address.district || address.ward || address.detail) &&
      (!address.province || !address.district || !address.ward || !address.detail)
    ) {
      alert("Vui lòng hoàn thành đầy đủ thông tin địa chỉ!");
      return false;
    }
    return true;
  };

  // Xử lý khi nhấn nút cập nhật
  const handleUpdate = () => {
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  // Xác nhận cập nhật
  const handleConfirm = async () => {
    setShowConfirm(false);
    const fullAddress = address.fullAddress?.replace(/(^[,\s]+|[,\s]+$)/g, "").trim();
    try {
      const updatedUser = await userApi.updateUser(user.id, {
        ...newData,
        address: fullAddress || newData.address,
      });
      setMessage(`Cập nhật thành công người dùng: ${updatedUser.username}`);
    } catch (error) {
      setMessage(`Có lỗi xảy ra khi cập nhật: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Thay đổi thông tin</h2>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <div className="space-y-4">
        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <input
          type="email"
          value={newData.email || ""}
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
          className="w-full p-2 border rounded-lg"
          placeholder="Nhập email mới"
        />

        {/* Điện thoại */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Điện thoại:</span>
          <span className="text-gray-600">{user.phone || "Chưa có thông tin"}</span>
        </div>
        <input
          type="text"
          value={newData.phone || ""}
          onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
          className="w-full p-2 border rounded-lg"
          placeholder="Nhập số điện thoại mới"
        />

        {/* Địa chỉ */}
        <div>
          <label className="font-medium text-gray-700">Địa chỉ:</label>
          <AddressData
            onChange={(newAddress) => setAddress({ ...address, ...newAddress })}
          />
        </div>

        {/* Nút Thay đổi */}
        <div className="flex justify-center">
          <button
            onClick={handleUpdate}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Thay đổi
          </button>
        </div>
      </div>

      {/* Component Confirm */}
      {showConfirm && (
        <Confirm
          message="Bạn có chắc chắn muốn cập nhật thông tin không?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default ChangeProfile;
