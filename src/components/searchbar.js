import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import productApi from "../api/productApi";
import getProductImageUrl from "../utils/productImages";

const normalize = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[đĐ]/g, "d")
  .toLowerCase();

const SearchBar = () => {
  const [keywords, setKeywords] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const query = keywords.trim();
    setActiveSuggestion(-1);
    if (query.length < 2) {
      setProducts([]);
      setLoadingSuggestions(false);
      setSuggestionsOpen(false);
      return undefined;
    }

    let active = true;
    const timeout = window.setTimeout(() => {
      setLoadingSuggestions(true);
      productApi.getAllProducts()
        .then((items) => {
          if (active) {
            setProducts(items);
            setSuggestionsOpen(true);
          }
        })
        .catch((requestError) => {
          if (active) {
            console.error("Không thể tải gợi ý tìm kiếm:", requestError);
            setError("Không thể tải gợi ý sản phẩm.");
          }
        })
        .finally(() => {
          if (active) setLoadingSuggestions(false);
        });
    }, 180);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [keywords]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    const terms = normalize(keywords.trim()).split(/\s+/).filter(Boolean);
    if (terms.length === 0 || products.length === 0) return [];

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
      .slice(0, 6)
      .map(({ product }) => product);
  }, [keywords, products]);

  const goToSearchResults = (query = keywords) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError("Nhập tên hoặc model sản phẩm cần tìm.");
      inputRef.current?.focus();
      return;
    }

    setError("");
    setSuggestionsOpen(false);
    setSearchOpen(false);
    navigate(`/search/products?keywords=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      navigate(`/details/${suggestions[activeSuggestion].id}`);
      setSuggestionsOpen(false);
      setSearchOpen(false);
      return;
    }
    goToSearchResults();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      setSuggestionsOpen(true);
      setActiveSuggestion((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full lg:w-auto">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200 lg:hidden"
        aria-label={searchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
        aria-expanded={searchOpen}
        onClick={() => {
          setSearchOpen((open) => !open);
          setError("");
          setSuggestionsOpen(false);
        }}
      >
        <MdSearch />
      </button>

      <form
        onSubmit={handleSubmit}
        className={`${
          searchOpen ? "flex" : "hidden"
        } absolute right-0 top-full z-50 mt-3 w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-gray-200 bg-white p-2 shadow-xl lg:static lg:flex lg:mt-0 lg:w-[min(28vw,24rem)] lg:rounded-full lg:p-0 lg:shadow-sm`}
      >
        <label className="sr-only" htmlFor="product-search">Tìm sản phẩm</label>
        <div className="relative w-full">
          <input
            ref={inputRef}
            id="product-search"
            type="search"
            autoComplete="off"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={suggestionsOpen && suggestions.length > 0}
            aria-controls="product-search-suggestions"
            aria-activedescendant={activeSuggestion >= 0 ? `product-suggestion-${activeSuggestion}` : undefined}
            placeholder="Tìm điện thoại, hãng hoặc model..."
            className="h-11 w-full rounded-xl border border-transparent bg-gray-50 px-4 !pr-14 text-sm text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 lg:rounded-full"
            value={keywords}
            onFocus={() => {
              if (keywords.trim().length >= 2 && suggestions.length > 0) setSuggestionsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onChange={(event) => {
              setKeywords(event.target.value);
              setError("");
            }}
          />
          <button
            type="submit"
            aria-label="Tìm kiếm"
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-xl text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
          >
            <MdSearch />
          </button>
          {suggestionsOpen && keywords.trim().length >= 2 && (
            <div
              id="product-search-suggestions"
              role="listbox"
              aria-label="Gợi ý sản phẩm"
              className="absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-lg border bg-white shadow-xl"
            >
            {loadingSuggestions ? (
              <p className="px-4 py-3 text-sm text-gray-600" role="status">Đang tìm sản phẩm...</p>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map((product, index) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeSuggestion === index}
                    id={`product-suggestion-${index}`}
                    key={product.id}
                    className={`flex w-full items-center gap-3 border-b px-3 py-2 text-left last:border-0 hover:bg-gray-100 ${
                      activeSuggestion === index ? "bg-gray-100" : ""
                    }`}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={() => {
                      navigate(`/details/${product.id}`);
                      setSuggestionsOpen(false);
                      setSearchOpen(false);
                    }}
                  >
                    <img
                      src={getProductImageUrl(product.id) || "/product-placeholder.svg"}
                      alt=""
                      className="h-12 w-12 rounded bg-gray-50 object-contain"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/product-placeholder.svg";
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">{product.name}</span>
                      <span className="block text-sm font-semibold text-red-600">
                        {product.price == null ? "Liên hệ" : `${new Intl.NumberFormat("vi-VN").format(product.price)} đ`}
                      </span>
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm font-medium text-blue-700 hover:bg-blue-50"
                  onClick={() => goToSearchResults()}
                >
                  Xem tất cả kết quả cho “{keywords.trim()}”
                </button>
              </>
            ) : (
              <p className="px-4 py-3 text-sm text-gray-600">Không tìm thấy sản phẩm phù hợp.</p>
            )}
            </div>
          )}
          {error && (
            <span className="absolute left-3 top-full mt-1 text-sm text-red-600" role="alert">{error}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
