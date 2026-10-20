import React, { useState } from "react";
import productApi from "../../../api/productApi";

const MigrateProduct = () => {
  const [bulkData, setBulkData] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm state để quản lý trạng thái loading

  // Hàm xử lý tải file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          if (!Array.isArray(parsedData)) {
            setMessage("File JSON phải chứa một mảng các đối tượng sản phẩm.");
            return;
          }
          setBulkData(parsedData); // Lưu dữ liệu vào state
          setMessage(`Đã tải thành công file ${file.name}.`);
        } catch (error) {
          setMessage("File JSON không hợp lệ.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Hàm xử lý gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bulkData.length === 0) {
      setMessage("Không có dữ liệu để xử lý.");
      return;
    }

    setIsLoading(true); // Bắt đầu trạng thái loading
    const results = [];
    for (const product of bulkData) {
      try {
        const response = await productApi.createProduct({
          ...product,
          // price: parseFloat(product.price),
          // stock: parseInt(product.stock),
        });
        results.push({ name: product.name, status: "Thành công" });
      } catch (error) {
        results.push({ name: product.name, status: "Thất bại" });
      }
    }
    setStatus(results);
    setMessage("Quá trình thêm sản phẩm hoàn tất.");
    setIsLoading(false); // Kết thúc trạng thái loading
  };

  return (
    <div>
      <h2>Migrate Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block mb-2 font-medium text-gray-700">
            Tải file JSON:
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".json"
            onChange={handleFileChange}
            className="block w-full p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded"
          disabled={isLoading} // Không cho phép gửi form khi đang loading
        >
          {isLoading ? "Processing..." : "Add Products"}
        </button>
      </form>
      {isLoading && (
        <div className="mt-4 text-blue-500">
          <p>Đang xử lý dữ liệu, vui lòng chờ...</p>
        </div>
      )}
      {message && <p className="mt-4">{message}</p>}
      {status.length > 0 && (
        <div className="mt-4">
          <h3>Kết quả:</h3>
          <ul>
            {status.map((result, index) => (
              <li key={index}>
                {result.name}: {result.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MigrateProduct;
