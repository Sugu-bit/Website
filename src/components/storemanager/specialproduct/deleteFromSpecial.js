import React from "react";
import { useDispatch } from "react-redux";
import { removeSpecialProduct } from "../../../redux/specialSlice";

const DeleteFromSpecial = ({ productId, onRefresh }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeSpecialProduct({ productId })); // Dispatch action để xóa sản phẩm
        onRefresh(); // Làm mới danh sách
        alert("Sản phẩm đã được xóa khỏi danh sách ưu đãi!"); // Hiển thị thông báo
    };

    return (
        <button
            onClick={handleRemove}
            className="text-red-600 hover:underline"
        >
            Xóa
        </button>
    );
};

export default DeleteFromSpecial;
