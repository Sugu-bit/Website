import React, { useState } from "react";
import productApi from "../../../api/productApi";

const MigrateProductOption = () => {
  const [bulkData, setBulkData] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file upload
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
          setBulkData(parsedData);
          setMessage(`Đã tải thành công file ${file.name}.`);
        } catch (error) {
          setMessage("File JSON không hợp lệ.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle data submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bulkData.length === 0) {
      setMessage("Không có dữ liệu để xử lý.");
      return;
    }

    setIsLoading(true);
    const results = [];
    for (const product of bulkData) {
      try {
        const response = await productApi.updateProductAttributes(
          product.productId,
          {
            attribute: product.attribute,
            value: product.value,
          }
        );
        results.push({ id: product.id, status: "Thành công" });
      } catch (error) {
        results.push({ id: product.id, status: "Thất bại" });
      }
    }
    setStatus(results);
    setMessage("Quá trình cập nhật sản phẩm hoàn tất.");
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Migrate Product Options</h2>
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
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Update Product Options"}
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
                Sản phẩm ID {result.id}: {result.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MigrateProductOption;
