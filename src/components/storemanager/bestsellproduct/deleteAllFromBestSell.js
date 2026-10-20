import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearBestSells } from "../../../redux/bestSellSlice";
import Confirm from "../../confirm";

const DeleteAllBestSellProduct = ({ onRefresh }) => {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteAll = () => {
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        dispatch(clearBestSells());
        setShowConfirm(false);
        onRefresh(); // Làm mới danh sách
        alert("Tất cả sản phẩm đã được xóa khỏi danh sách bán chạy!");
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div>
            <button
                onClick={handleDeleteAll}
                className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 mb-2"
            >
                Xóa toàn bộ danh sách
            </button>

            {showConfirm && (
                <Confirm
                    message="Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách bán chạy không?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default DeleteAllBestSellProduct;
