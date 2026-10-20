import React from "react";
import { useDispatch } from "react-redux";
import { removeSuggestion } from "../../../redux/suggestSlice";

const DeleteFromSuggest = ({ productId, onRefresh }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeSuggestion({ productId })); // Dispatch action để xóa sản phẩm
    onRefresh(); // Làm mới danh sách
    alert("Sản phẩm đã được xóa khỏi danh sách gợi ý!"); // Hiển thị thông báo
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

export default DeleteFromSuggest;
