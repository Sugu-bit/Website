import React, { useState, useEffect } from "react";
import fileApi from "../../api/fileApi";

const GetInterfaceProduct = ({ productId, className }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopRetry, setStopRetry] = useState(false); // Biến dừng retry khi gặp lỗi

  useEffect(() => {
    const fetchFile = async () => {
      if (!productId) {
        setError("Product ID is required");
        setFile(null);
        return;
      }

      // Ngăn chặn gọi lại nếu `stopRetry` được kích hoạt
      if (stopRetry) {
        console.warn(`Fetching for productId: ${productId} has been stopped due to previous errors.`);
        return;
      }

      try {
        setLoading(true);
        const response = await fileApi.getFilesByProduct(productId, true);
        console.log("Response from API:", response);

        if (Array.isArray(response) && response.length > 0) {
          const fileData = response[0];
          if (!fileData.filePath) {
            console.error("File path is invalid:", fileData);
            setError("Đường dẫn file không hợp lệ");
            setFile(null);
            return;
          }

          fileData.fullPath = `https://scime.click/data/${fileData.filePath.replace(/\\/g, "/")}`;
          setFile(fileData);
          setError(null); // Xóa lỗi sau khi thành công
        } else {
          console.warn("File not found for productId:", productId);
          setFile(null); // Đảm bảo file được đặt lại thành null
          setError("Không tìm thấy file");
        }
      } catch (err) {
        // Dừng retry nếu gặp bất kỳ lỗi nào
        console.error("Error fetching file:", err);

        if (err.response && err.response.status === 502) {
          console.error("Error 502: Bad Gateway");
          setError("Lỗi server 502: Không thể tải ảnh.");
        } else {
          setError("Không thể tải ảnh đại diện sản phẩm");
        }

        setStopRetry(true); // Dừng mọi lần gọi lại trong tương lai
        setFile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [productId, stopRetry]); // Gọi API khi `productId` hoặc `stopRetry` thay đổi

  if (loading) {
    return <p>Đang tải ảnh...</p>;
  }

  // Nếu có lỗi hoặc không có ảnh, hiển thị ảnh mặc định
  if (error || !file) {
    return (
      <img
        src="/default-image.png" // Đường dẫn đến ảnh mặc định
        alt="Ảnh mặc định"
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={file.fullPath}
      alt={file.fileName || "Ảnh sản phẩm"}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        if (e.target.src !== "/default-image.png") {
          e.target.onerror = null; // Ngăn chặn lặp lại lỗi
          e.target.src = "/default-image.png";
        }
      }}
    />
  );
};

export default GetInterfaceProduct;
