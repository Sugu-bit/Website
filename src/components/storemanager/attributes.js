import React, { useState } from "react";

const Attributes = ({ initialData = [], onChange }) => {
  const [dataArray, setDataArray] = useState([...initialData]); // Tạo bản sao của initialData
  const [errors, setErrors] = useState([]); // Quản lý lỗi cho từng hàng

  // Regex để kiểm tra ô `key` (Tên thuộc tính)
  const keyRegex = /^[a-zA-Z0-9]+$/;

  // Regex để kiểm tra ô `value` (Giá trị thuộc tính)
  const valueRegex = /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/;

  // Xử lý khi thay đổi giá trị trong ô nhập
  const handleInputChange = (e, rowIdx, colIdx) => {
    const value = e.target.value;
    const updatedArray = [...dataArray];
    updatedArray[rowIdx][colIdx] = value;

    // Kiểm tra lỗi dựa trên regex
    const updatedErrors = [...errors];
    if (colIdx === 0) {
      // Kiểm tra ô `key`
      updatedErrors[rowIdx] = !keyRegex.test(value) ? "Tên thuộc tính không hợp lệ." : null;
    } else if (colIdx === 1) {
      // Kiểm tra ô `value`
      updatedErrors[rowIdx] = !valueRegex.test(value) ? "Giá trị không hợp lệ. Dùng dấu phẩy để phân cách." : null;
    }

    setDataArray(updatedArray);
    setErrors(updatedErrors);

    // Chỉ gọi `onChange` nếu dữ liệu hợp lệ
    if (onChange && updatedErrors.every((err) => err === null)) {
      onChange(updatedArray);
    }
  };

  // Thêm một hàng mới
  const handleAddRow = () => {
    const updatedArray = [...dataArray, ["", ""]];
    const updatedErrors = [...errors, null]; // Không có lỗi cho hàng mới

    setDataArray(updatedArray);
    setErrors(updatedErrors);
  };

  // Xóa một hàng
  const handleDeleteRow = (rowIdx) => {
    const updatedArray = [...dataArray];
    updatedArray.splice(rowIdx, 1);

    const updatedErrors = [...errors];
    updatedErrors.splice(rowIdx, 1);

    // // Đảm bảo ít nhất có một hàng rỗng
    // if (updatedArray.length === 0) {
    //   updatedArray.push(["", ""]);
    //   updatedErrors.push(null);
    // }

    setDataArray(updatedArray);
    setErrors(updatedErrors);

    if (onChange) {
      onChange(updatedArray);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Thuộc tính</h3>
      <button
        type="button"
        onClick={handleAddRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Thêm thuộc tính
      </button>
      <div className="border border-gray-300 p-4 overflow-auto">
        {dataArray.map((row, rowIdx) => (
          <div key={rowIdx} className="mb-2 flex items-center flex-wrap">
            {row.map((col, colIdx) => (
              <div key={`${rowIdx}-${colIdx}`} className="flex items-center flex-grow">
                <input
                  type="text"
                  placeholder={colIdx === 0 ? "Tên thuộc tính (e.g., size)" : "Giá trị (e.g., value1,value2)"}
                  value={col}
                  onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                  className={`border p-2 mr-2 flex-grow min-w-[150px] ${
                    errors[rowIdx] && colIdx === 0 && errors[rowIdx] === "Tên thuộc tính không hợp lệ."
                      ? "border-red-500"
                      : ""
                  } ${
                    errors[rowIdx] && colIdx === 1 && errors[rowIdx] === "Giá trị không hợp lệ. Dùng dấu phẩy để phân cách."
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleDeleteRow(rowIdx)}
              className="border p-2 text-red-500 bg-red-100 hover:bg-red-200 rounded ml-2 flex-shrink-0"
            >
              Xóa hàng
            </button>
            <br></br>
            {/* Hiển thị lỗi nếu có */}
            {errors[rowIdx] && (
              <p className="text-red-500 text-sm mt-1 ml-2">{errors[rowIdx]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attributes;
