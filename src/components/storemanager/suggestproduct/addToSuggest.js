import React from "react";
import { useDispatch } from "react-redux";
import { addSuggestion } from "../../../redux/suggestSlice";

const AddToSuggest = ({ productId }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addSuggestion({ productId}));
    alert("Sản phẩm đã được thêm vào danh sách gợi ý!");
  };

  return (
    <button
      onClick={handleAdd}
      className="text-green-600 hover:underline"
    >
      Add Suggest
    </button>
  );
};

export default AddToSuggest;
