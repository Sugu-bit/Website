import React, { useState } from "react";
import Input from "../storemanager/input";
import Select from "./treeSelect";
import Text from "../storemanager/text";
import Attributes from "../storemanager/attributes";
import productApi from "../../api/productApi";
import fileApi from "../../api/fileApi"; // Import API upload file
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    locationAddress: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    attribute: {},
  });

  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // File được chọn
  const [preview, setPreview] = useState(null); // URL xem trước ảnh
  const [uploadStatus, setUploadStatus] = useState(null); // Trạng thái tải file

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thuộc tính sản phẩm
  const handleAttributesChange = (updatedAttributes) => {
    const attributesObject = updatedAttributes.reduce((acc, [key, value]) => {
      if (key.trim() !== "" && value.trim() !== "") {
        acc[key] = value.split(",").map((v) => v.trim());
      }
      return acc;
    }, {});

    setFormData((prev) => ({ ...prev, attribute: attributesObject }));
  };

  // Xử lý chọn file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      setPreview(null); // Reset xem trước
      return;
    }

    // Kiểm tra xem file có phải là ảnh không
    if (!selectedFile.type.startsWith("image/")) {
      setFile(null);
      setPreview(null); // Reset xem trước
      alert("Vui lòng chọn file ảnh! Định dạng được hỗ trợ: .jpg, .jpeg, .png");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // Tạo URL xem trước
  };

  // Tạo sản phẩm và tải ảnh
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadStatus(null);

    try {
      const product = await productApi.createProduct(formData);
      setMessage(`Sản phẩm "${product.name}" đã được thêm thành công!`);

      if (file) {
        const formDataFile = {
          description: "Ảnh giao diện sản phẩm",
          sort: 1,
          isActive: true,
          productId: product.id,
        };

        try {
          const response = await fileApi.uploadFile(file, formDataFile);
          setUploadStatus("Tải ảnh thành công!");
        } catch (err) {
          setUploadStatus("Lỗi khi tải ảnh: " + err.message);
        }
      }
      
      // Reset form
      setFormData({
        name: "",
        locationAddress: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        attribute: {},
      });
      setFile(null); // Reset file
      setPreview(null); // Reset ảnh xem trước
    } catch (error) {
      setMessage("Lỗi khi tạo sản phẩm: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input label="Tên sản phẩm" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
        <Input label="Địa chỉ" name="locationAddress" value={formData.locationAddress} onChange={handleChange} error={errors.locationAddress} />
        <Input label="Giá" name="price" value={formData.price} onChange={handleChange} error={errors.price} />
        <Input label="Số lượng" name="stock" value={formData.stock} onChange={handleChange} error={errors.stock} />
        <Select label="Danh mục" name="categoryId" value={formData.categoryId} onChange={handleChange} options={categories} error={errors.categoryId} />
        <Text label="Mô tả" name="description" value={formData.description} onChange={handleChange} error={errors.description} />
        <Attributes initialData={[]} onChange={handleAttributesChange} />

        {/* Chọn file */}
        <div style={{ marginTop: "20px" }}>
          <label>
            <strong>Chọn ảnh giao diện sản phẩm:</strong>
          </label>
          <input type="file" onChange={handleFileChange} />
          {preview && (
            <div style={{ marginTop: "10px" }}>
              <p>Ảnh xem trước:</p>
              <img
                src={preview}
                alt="Ảnh xem trước"
                style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain", border: "1px solid #ddd", padding: "5px" }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* Hiển thị trạng thái upload */}
      {uploadStatus && (
        <div style={{ marginTop: "20px" }}>
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
