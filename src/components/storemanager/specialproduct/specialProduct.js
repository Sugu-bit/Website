import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productApi from "../../../api/productApi";
import GetInterfaceProduct from "../getInterfaceProduct";

const pageSize = 10;

function SpecialProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    productApi.getAllProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch(() => {
        if (active) setError("Không thể tải danh sách sản phẩm ưu đãi.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const discountedProducts = products.filter((product) => Number(product.discountPercentage) > 0);
  const totalPages = Math.ceil(discountedProducts.length / pageSize);
  const pageProducts = discountedProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) return <p role="status">Đang tải...</p>;
  if (error) return <p role="alert" className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Sản phẩm đang được giảm giá</h2>
      <p className="mb-4 text-sm text-gray-600">
        Quản lý mức giảm giá trong phần chỉnh sửa sản phẩm.
      </p>
      {discountedProducts.length === 0 ? (
        <p>Chưa có sản phẩm nào được giảm giá.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse table-fixed">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Tên</th>
                  <th className="border p-2 text-left">Ảnh</th>
                  <th className="border p-2 text-left">Giá sau giảm</th>
                  <th className="border p-2 text-left">Mức giảm</th>
                  <th className="border p-2 text-left">Tồn kho</th>
                  <th className="border p-2 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {pageProducts.map((product) => {
                  const discount = Math.min(100, Math.max(0, Number(product.discountPercentage) || 0));
                  const price = Number(product.price);
                  const salePrice = Number.isFinite(price) ? price * (1 - discount / 100) : null;
                  return (
                    <tr key={product.id}>
                      <td className="border p-2">{product.name}</td>
                      <td className="border p-2">
                        <GetInterfaceProduct productId={product.id} className="h-16 w-16 object-contain" />
                      </td>
                      <td className="border p-2">
                        {salePrice === null ? "Liên hệ" : `${new Intl.NumberFormat("vi-VN").format(salePrice)} đ`}
                      </td>
                      <td className="border p-2">{discount}%</td>
                      <td className="border p-2">{product.stock ?? "N/A"}</td>
                      <td className="border p-2">
                        <Link className="text-blue-600 hover:underline" to={`/storemanager/view/edit/${product.id}`}>
                          Chỉnh sửa
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-3 p-4">
            <button type="button" className="rounded border px-3 py-1 disabled:opacity-50" disabled={currentPage <= 1} onClick={() => setCurrentPage((page) => page - 1)}>
              Trước
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button type="button" className="rounded border px-3 py-1 disabled:opacity-50" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
              Sau
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SpecialProduct;
