import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import productApi from "../../api/productApi";
import DeleteProduct from "./deleteproduct";
import GetInterfaceProduct from "./getInterfaceProduct";
import AddToSuggest from "./suggestproduct/addToSuggest";
import AddToBestSell from "./bestsellproduct/addToBestSell";
import AddToSpecial from "./specialproduct/addToSpecial";
import Pagination from "../pagination"; // Import component Pagination

function ViewProduct() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState({});
  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(20); // Default to 1 or calculated from the totalItems
  const { search } = useLocation();  // Đọc tham số trong URL
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const pageFromUrl = parseInt(queryParams.get("page") || "1"); // Lấy số trang từ URL
    setCurrentPage(pageFromUrl);
    fetchProducts(pageFromUrl);  // Lấy sản phẩm theo trang
  }, [search]);
  const fetchProducts = async (page = 1) => {
    try {
      const result = await productApi.getPaginatedProducts(page, itemsPerPage);
      if (Array.isArray(result)) {
        setProductList(result);
        setTotalPages(20); // Dynamically calculate total pages
      } else {
        console.error("API response không đúng định dạng:", result);
        setProductList([]);
        setTotalPages(1); // Fallback to a default value
      }
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`/storemanager/view?page=${page}`);  // Thay đổi URL khi chuyển trang
    }
  };

  const handleToggleDescription = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleDelete = (productId) => {
    setProductList((prev) => prev.filter((product) => product.id !== productId));
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm</h2>
      <table className="min-w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border p-2 text-left w-1/12">Tên</th>
            <th className="border p-2 text-left w-1/6">Ảnh mô tả</th>
            <th className="border p-2 text-left w-1/12">Giá tiền</th>
            <th className="border p-2 text-left w-1/12">Số lượng</th>
            <th className="border p-2 text-left w-1/12">Loại sản phẩm</th>
            <th className="border p-2 text-left w-1/12">Đặc tính</th>
            <th className="border p-2 text-left w-1/3">Mô tả</th>
            <th className="border p-2 text-left w-1/12">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product) => {
              const isExpanded = expandedProducts[product.id] || false;
              return (
                <tr key={product.id}>
                  <td className="border p-2 break-words">{product.name}</td>
                  <td className="border p-2">
                    <GetInterfaceProduct productId={product.id} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border p-2">
                    {product.price ? product.price.toLocaleString() + " đ" : "N/A"}
                  </td>
                  <td className="border p-2">{product.stock || "N/A"}</td>
                  <td className="border p-2">
                    {categoryLoading
                      ? 'Đang tải...'
                      : categories.find((cat) => cat.id === product.categoryId)?.description || 'Không xác định'}
                  </td>
                  <td className="border p-2 break-words">
                    {Object.entries(product.attributes || {})
                      .map(([key, values]) => `${key}: ${values.join(", ")}`)
                      .join("; ")}
                  </td>
                  <td className="border p-2 break-words">
                    {isExpanded ? (
                      <>
                        {product.description}
                        <span
                          onClick={() => handleToggleDescription(product.id)}
                          className="text-blue-600 hover:underline cursor-pointer ml-1"
                        >
                          Thu gọn
                        </span>
                      </>
                    ) : (
                      <>
                        {product.description.slice(0, 150)}...
                        <span
                          onClick={() => handleToggleDescription(product.id)}
                          className="text-blue-600 hover:underline cursor-pointer ml-1"
                        >
                          Xem thêm
                        </span>
                      </>
                    )}
                  </td>
                  <td className="border p-2">
                    <Link
                      to={`/storemanager/view/edit/${product.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <DeleteProduct
                      productId={product.id}
                      onDelete={handleDelete}
                    />
                    <AddToSuggest productId={product.id} />
                    <AddToBestSell productId={product.id} />
                    <AddToSpecial productId={product.id} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="border p-2 text-center">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ViewProduct;
