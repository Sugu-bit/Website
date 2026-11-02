import React, { useEffect, useMemo, useState } from "react";
import ProductCart from "../productcart";
import { useLocation } from "react-router-dom";
import productApi from "../../api/productApi";

const normalize = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[đĐ]/g, "d")
  .toLowerCase();

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const keywords = new URLSearchParams(location.search).get("keywords") || "";
  const itemsPerPage = 18;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    productApi.getAllProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch(() => {
        if (active) setError("Không thể tải kết quả. Vui lòng kiểm tra kết nối máy chủ.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keywords]);

  const searchResults = useMemo(() => {
    const terms = normalize(keywords.trim()).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return products
      .map((product) => {
        const name = normalize(product.name || "");
        const description = normalize(product.description || "");
        const attributes = normalize(Object.entries(product.attributes || {})
          .flatMap(([attribute, values]) => [attribute, ...(Array.isArray(values) ? values : [values])])
          .join(" "));
        const searchableText = `${name} ${description} ${attributes}`;
        if (!terms.every((term) => searchableText.includes(term))) return null;

        const score = terms.reduce((total, term) => (
          total + (name.startsWith(term) ? 4 : name.includes(term) ? 2 : 0)
        ), 0);
        return { product, score };
      })
      .filter(Boolean)
      .sort((first, second) => second.score - first.score || first.product.name.localeCompare(second.product.name, "vi"))
      .map(({ product }) => product);
  }, [products, keywords]);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const pageResults = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <p className="text-center mt-10" role="status">Đang tải kết quả tìm kiếm...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10" role="alert">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl my-5 text-center font-bold">
        Kết quả tìm kiếm cho “{keywords}”
      </h1>
      <p className="text-center text-gray-600 mb-5">
        {searchResults.length} sản phẩm phù hợp
        {searchResults.length > 0 && ` · Trang ${currentPage}/${totalPages}`}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageResults.length > 0 ? (
          pageResults.map((product) => <ProductCart key={product.id} data={product} />)
        ) : (
          <p className="text-center col-span-full">
            {keywords.trim() ? "Không có sản phẩm nào phù hợp với từ khóa." : "Nhập từ khóa để tìm sản phẩm."}
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <nav className="mt-6 flex justify-center gap-2" aria-label="Phân trang kết quả tìm kiếm">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              type="button"
              key={page}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`rounded border px-4 py-2 ${currentPage === page ? "bg-blue-600 text-white" : "bg-white"}`}
            >
              {page}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
};

export default SearchResults;
