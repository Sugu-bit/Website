import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import GetInterfaceProduct from "../getInterfaceProduct";
import DeleteFromSpecial from './deleteFromSpecial';
import DeleteAllSpecialProduct from './deleteAllFromSpecial';
import Pagination from "./paginationSpecialProduct"; // Import component Pagination

function SpecialProduct() {
  const [specialProducts, setSpecialProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái của trang hiện tại
  const productsPerPage = 10; // Số sản phẩm mỗi trang

  // Hàm tính toán phân trang và lấy sản phẩm cho mỗi trang
  const refreshSpecialProducts = async (page) => {
    const specialProduct = JSON.parse(localStorage.getItem("specialProducts")) || [];
    if (specialProduct.length === 0) {
      setSpecialProducts([]);
      return;
    }

    // Giới hạn sản phẩm theo trang
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedSpecialProducts = specialProduct.slice(startIndex, endIndex);

    try {
      const products = await Promise.all(
        paginatedSpecialProducts.map(async (id) => {
          const product = await productApi.getProductById(id);
          return product;
        })
      );
      setSpecialProducts(products);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm ưu đãi.");
    }
  };

  useEffect(() => {
    refreshSpecialProducts(currentPage);
    setLoading(false);
  }, [currentPage]); // Khi currentPage thay đổi, sẽ tải lại sản phẩm cho trang đó

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Tính tổng số trang dựa trên số lượng sản phẩm trong localStorage
  const specialProduct = JSON.parse(localStorage.getItem("specialProducts")) || [];
  const totalPages = Math.ceil(specialProduct.length / productsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm ưu đãi</h2>
        <DeleteAllSpecialProduct onRefresh={refreshSpecialProducts} />
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
          {specialProducts.length > 0 ? (
            specialProducts.map((product) => (
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
                  <DeleteFromSpecial productId={product.id} onRefresh={refreshSpecialProducts} />
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

export default SpecialProduct;
