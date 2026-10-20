import React from "react";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
        <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
