import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import DeleteFromSuggest from "./deleteFromSuggest";
import DeleteAllSuggestProduct from "./deleteAllFromSuggest";
import GetInterfaceProduct from "../getInterfaceProduct";
import Pagination from "./paginationSuggestProduct"; // Import component Pagination

function SuggestProduct() {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái của trang hiện tại
  const productsPerPage = 10; // Số sản phẩm mỗi trang

  // Hàm tính toán phân trang và lấy sản phẩm cho mỗi trang
  const refreshSuggestedProducts = async (page) => {
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    if (suggestions.length === 0) {
      setSuggestedProducts([]);
      return;
    }

    // Giới hạn sản phẩm theo trang
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedSuggestions = suggestions.slice(startIndex, endIndex);

    try {
      const products = await Promise.all(
        paginatedSuggestions.map(async (id) => {
          const product = await productApi.getProductById(id);
          return product;
        })
      );
      setSuggestedProducts(products);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm gợi ý.");
    }
  };

  useEffect(() => {
    refreshSuggestedProducts(currentPage);
    setLoading(false);
  }, [currentPage]); // Khi currentPage thay đổi, sẽ tải lại sản phẩm cho trang đó

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Tính tổng số trang dựa trên số lượng sản phẩm trong localStorage
  const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
  const totalPages = Math.ceil(suggestions.length / productsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm gợi ý</h2>
        <DeleteAllSuggestProduct onRefresh={refreshSuggestedProducts} />
      </div>
      <table className="min-w-full border-collapse table-fixed">
        <thead>
          <tr>
            <th className="border p-2 text-left w-1/6">Tên</th>
            <th className="border p-2 text-left w-1/6">Ảnh mô tả</th>
            <th className="border p-2 text-left w-1/12">Giá tiền</th>
            <th className="border p-2 text-left w-1/12">Số lượng</th>
            <th className="border p-2 text-left w-1/6">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {suggestedProducts.length > 0 ? (
            suggestedProducts.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <GetInterfaceProduct productId={product.id} />
                </td>
                <td className="border p-2">
                  {product.price ? product.price.toLocaleString() + " đ" : "N/A"}
                </td>
                <td className="border p-2">{product.stock || "N/A"}</td>
                <td className="border p-2">
                  <DeleteFromSuggest productId={product.id} onRefresh={refreshSuggestedProducts} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                Không có sản phẩm.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Component Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} // Cập nhật trang khi người dùng chọn trang mới
      />
    </div>
  );
}

export default SuggestProduct;
