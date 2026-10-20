import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import fileApi from "../../api/fileApi";
import Input from "../storemanager/input";
import Select from "./treeSelect";
import Text from "../storemanager/text";
import Attributes from "../storemanager/attributes";
import mapCategories from "../storemanager/treemapCategories";
import GetInterfaceProduct from "./getInterfaceProduct"; // Hiển thị ảnh
import AddInterfaceProduct from "./addInterfaceProduct"; // Tải ảnh mới

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [fileId, setFileId] = useState(null); // ID của ảnh hiện tại
  const [formDataFile, setFormDataFile] = useState(null);
  const [isChangingImage, setIsChangingImage] = useState(false); // Trạng thái thay đổi ảnh
  const [newImage, setNewImage] = useState(null); // Ảnh mới được chọn

  const categories = mapCategories();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productApi.getProductById(id);
        setFormData({
          id: product.id,
          name: product.name || "",
          locationAddress: product.locationAddress || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
          categoryId: product.categoryId || "",
          attribute: product.attributes || {},
        });

        // Lấy ID file ảnh hiện tại
        const files = await fileApi.getFilesByProduct(product.id, true);
        if (files && files.length > 0) {
          const currentFile = files[0];
          console.log(currentFile)
          setFileId(currentFile.id); // Lấy file ID
          setFormDataFile({
            description: currentFile.description,
            sort: currentFile.sort,
            productId: currentFile.targetId,
          });
        }
      } catch (error) {
        setMessage("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (updatedAttributes) => {
    const attributesObject = updatedAttributes.reduce((acc, row) => {
      const [key, ...values] = row;
      if (key.trim() !== "") {
        acc[key] = values.filter((val) => typeof val === "string" && val.trim() !== "");
      }
      return acc;
    }, {});
    setFormData((prev) => ({ ...prev, attribute: attributesObject }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isChangingImage);
    try {
      if (isChangingImage && newImage) {
        // Đánh dấu ảnh cũ là không hoạt động
        if (fileId && formDataFile) {
          console.log(fileId);
          console.log(formDataFile);
          await fileApi.updateFile(fileId, { ...formDataFile, isActive: false });
        }

        // Tải ảnh mới lên và đặt isActive = true
        const formDataFileNew = {
          description: "Ảnh giao diện sản phẩm",
          sort: 1,
          isActive: true,
          productId: formData.id,
        };
        const response = await fileApi.uploadFile(newImage, formDataFileNew);
        setFileId(response.fileId);
      }

      // Cập nhật thông tin sản phẩm
      await productApi.updateProduct(formData.id, formData);
      setMessage("Cập nhật sản phẩm thành công!");
      // navigate("/storemanager/view");
    } catch (error) {
      setMessage("Lỗi khi cập nhật sản phẩm.");
    }
  };

  const handleCancel = () => {
    navigate("/storemanager/view");
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!formData) {
    return <div>{message || "Không tìm thấy sản phẩm."}</div>;
  }

  return (
    <div className="relative">
      <button
        onClick={handleCancel}
        className="absolute top-4 right-4 text-black"
      >
        ✕
      </button>

      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
        <Input
          label="Tên sản phẩm"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Địa chỉ"
          name="locationAddress"
          value={formData.locationAddress}
          onChange={handleChange}
        />
        <Input
          label="Giá"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <Input
          label="Số lượng"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <Select
          label="Danh mục"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          options={categories}
        />
        <Text
          label="Mô tả"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Attributes
          initialData={Object.entries(formData.attribute || {})}
          onChange={handleAttributesChange}
        />

        <div className="mt-4">
          <h3>Ảnh hiện tại:</h3>
          {!isChangingImage ? (
            <>
              <GetInterfaceProduct
                productId={formData.id}
                className="w-16 h-16 object-cover"
                onFileLoaded={(loadedFileId) => setFileId(loadedFileId)}
              />
              <button
                type="button"
                onClick={() => setIsChangingImage(true)}
                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Thay đổi ảnh
              </button>
            </>
          ) : (
            <>
              <AddInterfaceProduct
                onFileSelected={(file) => setNewImage(file)} // Lưu ảnh mới vào state
              />
              <button
                type="button"
                onClick={() => setIsChangingImage(false)}
                className="mt-2 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Hủy thay đổi
              </button>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-300"
          >
            Thoát
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Lưu thay đổi
          </button>
        </div>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default EditProduct;
