import React, { useState } from "react";
import fileApi from "../../../api/fileApi"; 
import axios from "axios";

const MigrateFile = () => {
  const [fileData, setFileData] = useState([]); // Lưu dữ liệu từ url.json
  const [status, setStatus] = useState([]); // Trạng thái từng file
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0); // Thêm state để quản lý tiến độ

  // Hàm xử lý file JSON url.json
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        if (!Array.isArray(parsedData)) {
          setMessage("File JSON phải chứa một mảng các đối tượng.");
          return;
        }
        setFileData(parsedData);
        setMessage(`Đã tải thành công file ${file.name}`);
      } catch (error) {
        setMessage("File JSON không hợp lệ.");
      }
    };
    reader.readAsText(file);
  };

  // Hàm upload ảnh từ URL
  const uploadImageFromUrl = async (url, additionalData) => {
    try {
      // Tải ảnh từ URL
      const response = await axios.get(url, { responseType: "blob" });
      const file = new File([response.data], `${url}`, { type: response.data.type });

      // Chuẩn bị dữ liệu upload
      const formData = {
        ...additionalData, // Bao gồm các thông tin thêm
      };

      // Gửi ảnh và dữ liệu lên API
      const uploadResponse = await fileApi.uploadFile(file, formData);
      return { success: true, data: uploadResponse };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Hàm xử lý gửi file
  const handleUpload = async () => {
    if (fileData.length === 0) {
      setMessage("Không có dữ liệu để xử lý.");
      return;
    }

    setLoading(true);
    const results = [];
    let completed = 0;

    for (const item of fileData) {
      const { imageUrl, productUrl, productId } = item;
      if (!imageUrl) {
        results.push({ url: productUrl, status: "Không có ảnh" });
        completed++;
        setProgress(Math.round((completed / fileData.length) * 100));
        continue;
      }

      // Thêm thông tin bổ sung nếu cần
      const additionalData = {
        description: `Hình ảnh từ ${productUrl}`,
        sort: 1,
        isActive: true,
        productId: `${productId}`, // Thêm Product ID nếu có
      };

      // Upload ảnh
      const result = await uploadImageFromUrl(imageUrl, additionalData);
      if (result.success) {
        results.push({ url: productUrl, status: "Thành công", filePath: result.data.file });
      } else {
        results.push({ url: productUrl, status: "Thất bại", error: result.error });
      }

      completed++;
      setProgress(Math.round((completed / fileData.length) * 100)); // Cập nhật tiến độ
    }

    setStatus(results);
    setMessage("Quá trình tải lên hoàn tất.");
    setLoading(false);
    setProgress(0); // Reset tiến độ
  };

  return (
    <div>
      <h2>Migrate File</h2>
      <div className="mb-4">
        <label htmlFor="fileInput" className="block mb-2 font-medium text-gray-700">
          Tải file JSON url.json:
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
        onClick={handleUpload}
        disabled={loading || fileData.length === 0}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        {loading ? "Uploading..." : "Upload All"}
      </button>
      {loading && (
        <div className="mt-4">
          <p className="text-blue-500">Đang xử lý... ({progress}%)</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {message && <p className="mt-4">{message}</p>}
      {status.length > 0 && (
        <div className="mt-4">
          <h3>Kết quả:</h3>
          <ul>
            {status.map((result, index) => (
              <li key={index}>
                URL: {result.url} - {result.status}
                {result.filePath && (
                  <div>
                    <p>Đường dẫn file:</p>
                    <a
                      href={`https://localhost:8000/data/${result.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`https://localhost:8000/data/${result.filePath}`}
                    </a>
                  </div>
                )}
                {result.error && <p style={{ color: "red" }}>{result.error}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MigrateFile;