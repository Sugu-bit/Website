import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";
import Navbar from "../components/navbar";
import ProductCart from "../components/productcart";
import productApi from "../api/productApi";
import Banner from "../components/banner";
import Footer from "../components/footer";

const categoryMap = {
  electronics: { name: "Điện thoại và thiết bị", categoryIds: [44, 45, 46] },
  smartphone: { name: "Điện thoại", categoryIds: [44] },
  iphone: { name: "iPhone", categoryIds: [44], brand: "Apple" },
  android: { name: "Điện thoại Android", categoryIds: [44], platform: "android" },
  tablet: { name: "Máy tính bảng", categoryIds: [45], brands: ["Apple", "Samsung", "Xiaomi", "Huawei", "Lenovo"] },
  accessories: { name: "Phụ kiện điện thoại", categoryIds: [46], brands: ["Apple", "Samsung", "Xiaomi", "Anker", "Baseus", "Ugreen", "Hoco", "JBL", "BuyP"] },
  audio: { name: "Thiết bị âm thanh", categoryIds: [24] },
};

const phoneBrandNames = ["Apple", "Samsung", "Xiaomi", "Redmi", "OPPO", "vivo", "Google", "OnePlus", "realme", "Huawei", "Nokia", "Motorola"];
const brandNames = [...phoneBrandNames, "Lenovo", "Anker", "Baseus", "Ugreen", "Hoco", "JBL", "BuyP"];
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function getBrand(productName) {
  const name = normalize(productName);
  if (name.includes("iphone") || name.includes("ipad") || name.includes("apple")) return "Apple";
  return brandNames.slice(1).find((brand) => name.includes(normalize(brand))) || "";
}

const Category = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState(searchParams.get("brand") || categoryMap[category]?.brand || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const categoryInfo = categoryMap[category];
  const availableBrands = categoryInfo?.brands || phoneBrandNames;

  useEffect(() => {
    let active = true;
    setBrand(searchParams.get("brand") || categoryInfo?.brand || "");
    setCurrentPage(1);

    if (!categoryInfo) {
      setProducts([]);
      setError("Danh mục không tồn tại.");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    setLoading(true);
    setError("");
    productApi.getAllProducts()
      .then((allProducts) => {
        if (active) {
          setProducts(allProducts.filter((product) => categoryInfo.categoryIds.includes(Number(product.categoryId))));
        }
      })
      .catch(() => {
        if (active) setError("Không thể tải sản phẩm. Vui lòng kiểm tra kết nối máy chủ.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [category, categoryInfo, searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productBrand = getBrand(product.name || "");
      if (brand && productBrand !== brand) return false;
      if (categoryInfo?.platform === "android" && productBrand === "Apple") return false;
      const price = Number(product.price);
      if (minPrice !== "" && (!Number.isFinite(price) || price < Number(minPrice))) return false;
      if (maxPrice !== "" && (!Number.isFinite(price) || price > Number(maxPrice))) return false;
      if (inStockOnly && Number(product.stock) <= 0) return false;
      return true;
    });

    if (sortBy === "price-asc") result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === "price-desc") result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    if (sortBy === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "vi"));
    return result;
  }, [products, brand, categoryInfo, minPrice, maxPrice, inStockOnly, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [brand, minPrice, maxPrice, inStockOnly, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <Navbar />
      <Banner />
      <main className="mx-auto w-full max-w-7xl px-4 pb-10">
        <nav aria-label="Đường dẫn" className="mb-6 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 transition hover:text-red-600">
            <FiHome aria-hidden="true" />
            <span>Trang chủ</span>
          </Link>
          <FiChevronRight aria-hidden="true" className="shrink-0 text-gray-400" />
          <span aria-current="page" className="font-semibold text-gray-900">{categoryInfo?.name || "Danh mục"}</span>
        </nav>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{categoryInfo?.name || "Danh mục"}</h1>
          {!loading && !error && (
            <p className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">{filteredProducts.length} sản phẩm phù hợp</p>
          )}
        </div>

        <section className="grid gap-5 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-lg border bg-white p-4" aria-label="Bộ lọc sản phẩm">
            <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>
            <label className="block text-sm font-medium mb-1" htmlFor="brand-filter">Hãng</label>
            <select id="brand-filter" value={brand} onChange={(event) => setBrand(event.target.value)} className="mb-4 w-full rounded border p-2">
              <option value="">Tất cả hãng</option>
              {availableBrands.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>

            <fieldset className="mb-4">
              <legend className="text-sm font-medium mb-1">Khoảng giá (đ)</legend>
              <div className="flex gap-2">
                <input aria-label="Giá thấp nhất" type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Từ" className="min-w-0 w-1/2 rounded border p-2" />
                <input aria-label="Giá cao nhất" type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Đến" className="min-w-0 w-1/2 rounded border p-2" />
              </div>
              {minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice) && (
                <p className="mt-1 text-sm text-red-600" role="alert">Giá thấp nhất phải nhỏ hơn giá cao nhất.</p>
              )}
            </fieldset>

            <label className="mb-4 flex items-center gap-2 text-sm">
              <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />
              Chỉ xem sản phẩm còn hàng
            </label>

            <label className="block text-sm font-medium mb-1" htmlFor="sort-products">Sắp xếp</label>
            <select id="sort-products" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full rounded border p-2">
              <option value="featured">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name">Tên sản phẩm</option>
            </select>
          </aside>

          <div>
            {loading ? (
              <p className="py-8 text-center" role="status">Đang tải sản phẩm...</p>
            ) : error ? (
              <p className="py-8 text-center text-red-600" role="alert">{error}</p>
            ) : currentProducts.length ? (
              <>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                  {currentProducts.map((product) => <ProductCart key={product.id} data={product} />)}
                </div>
                <nav className="mt-6 flex justify-center gap-2" aria-label="Phân trang sản phẩm">
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
              </>
            ) : (
              <p className="py-8 text-center text-gray-600">Không tìm thấy sản phẩm phù hợp với bộ lọc.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
