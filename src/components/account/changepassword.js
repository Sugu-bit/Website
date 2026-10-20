import React, { useState } from "react";
import userApi from "../../api/userApi";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Xóa lỗi khi người dùng bắt đầu sửa
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const formErrors = {};

    // Kiểm tra mật khẩu mới và xác nhận
    if (!formData.newPassword) {
      formErrors.newPassword = "Mật khẩu mới không được để trống.";
    } else if (formData.newPassword.length < 6) {
      formErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      formErrors.confirmPassword = "Mật khẩu mới và xác nhận mật khẩu không khớp.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Gửi API để cập nhật mật khẩu
      await userApi.updateUser({
        password: formData.newPassword,
      });

      setMessage("Đổi mật khẩu thành công.");
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.includes("thành công") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mật khẩu mới */}
        <div>
          <label className="block text-sm font-medium">Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div>
          <label className="block text-sm font-medium">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Nút đổi mật khẩu */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
