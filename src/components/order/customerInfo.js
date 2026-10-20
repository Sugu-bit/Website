import React from "react";

const CustomerInfoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Thông tin người nhận</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-gray-800"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Địa chỉ giao hàng
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-gray-800"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phương thức thanh toán
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
                className="mr-2"
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="TRANSFER"
                checked={formData.paymentMethod === "TRANSFER"}
                onChange={handleChange}
                className="mr-2"
              />
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;
