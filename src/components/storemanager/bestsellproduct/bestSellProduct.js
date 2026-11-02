import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";
import GetInterfaceProduct from "../getInterfaceProduct";

const pageSize = 10;

function BestSellProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    productApi.getAllProducts()
      .then((items) => {
        if (active) {
          setProducts([...items].sort((first, second) => Number(second.popularity || 0) - Number(first.popularity || 0)));
        }
      })
      .catch(() => {
        if (active) setError("Không thể tải dữ liệu xếp hạng sản phẩm.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const hasRanking = products.some((product) => Number(product.popularity) > 0);
  const totalPages = Math.ceil(products.length / pageSize);
  const pageProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) return <p role="status">Đang tải...</p>;
  if (error) return <p role="alert" className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Xếp hạng sản phẩm bán chạy</h2>
      {!hasRanking && (
        <p className="mb-4 text-sm text-amber-700" role="status">
          Chưa có dữ liệu bán hàng để xếp hạng; danh sách bên dưới chỉ hiển thị sản phẩm hiện có.
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border p-2 text-left">Tên</th>
              <th className="border p-2 text-left">Ảnh</th>
              <th className="border p-2 text-left">Giá</th>
              <th className="border p-2 text-left">Tồn kho</th>
              <th className="border p-2 text-left">Điểm quan tâm</th>
            </tr>
          </thead>
          <tbody>
            {pageProducts.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <GetInterfaceProduct productId={product.id} className="h-16 w-16 object-contain" />
                </td>
                <td className="border p-2">
                  {product.price == null ? "Liên hệ" : `${new Intl.NumberFormat("vi-VN").format(product.price)} đ`}
                </td>
                <td className="border p-2">{product.stock ?? "N/A"}</td>
                <td className="border p-2">{product.popularity ?? "Chưa có dữ liệu"}</td>
              </tr>
            ))}
            {pageProducts.length === 0 && (
              <tr><td colSpan="5" className="border p-2 text-center">Chưa có sản phẩm.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 p-4">
          <button type="button" className="rounded border px-3 py-1 disabled:opacity-50" disabled={currentPage <= 1} onClick={() => setCurrentPage((page) => page - 1)}>
            Trước
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button type="button" className="rounded border px-3 py-1 disabled:opacity-50" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
            Sau
          </button>
        </div>
      )}
    </div>
  );
}

export default BestSellProduct;
