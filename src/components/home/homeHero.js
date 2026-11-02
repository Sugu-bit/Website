import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    eyebrow: "KHÁM PHÁ CÔNG NGHỆ",
    title: "Thiết bị mới,\ntrải nghiệm mới.",
    description: "Tìm chiếc điện thoại phù hợp với nhu cầu và phong cách của bạn.",
    action: "Khám phá điện thoại",
    path: "/category/electronics",
    theme: "coral",
  },
  {
    eyebrow: "GÓC CÔNG NGHỆ",
    title: "Kết nối mọi\nkhoảnh khắc.",
    description: "Khám phá máy tính bảng, đồng hồ thông minh và phụ kiện cho điện thoại.",
    action: "Xem sản phẩm bán chạy",
    path: "/bestsell",
    theme: "blue",
  },
  {
    eyebrow: "ƯU ĐÃI NỔI BẬT",
    title: "Chọn món đồ\nbạn đang cần.",
    description: "Tham khảo những sản phẩm đang được giới thiệu tại cửa hàng.",
    action: "Xem giá ưu đãi",
    path: "/special",
    theme: "violet",
  },
];

function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];
  const destination =
    slide.path || `/search/products?keywords=${encodeURIComponent(slide.query)}`;

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section className="home-hero" aria-label="Khám phá sản phẩm">
      <div className={`home-hero__panel home-hero__panel--${slide.theme}`}>
        <div className="home-hero__copy">
          <span className="home-hero__eyebrow">{slide.eyebrow}</span>
          <h1 className="home-hero__title">{slide.title}</h1>
          <p className="home-hero__description">{slide.description}</p>
          <Link className="home-hero__action" to={destination}>
            {slide.action}
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="home-hero__art" aria-hidden="true">
          <span className="home-hero__orbit home-hero__orbit--one" />
          <span className="home-hero__orbit home-hero__orbit--two" />
          <div className="home-device home-device--tablet">
            <div className="home-device__screen home-device__screen--tablet">
              <span className="home-device__glow" />
            </div>
          </div>
          <div className="home-device home-device--phone">
            <div className="home-device__camera" />
            <div className="home-device__screen">
              <span className="home-device__glow" />
              <span className="home-device__screen-mark" />
            </div>
          </div>
        </div>

        <div className="home-hero__controls">
          <button
            type="button"
            className="home-hero__arrow"
            aria-label="Xem nội dung trước"
            onClick={() => showSlide(activeIndex - 1)}
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <div className="home-hero__dots" aria-label="Chọn nội dung">
            {slides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                className={`home-hero__dot ${
                  index === activeIndex ? "is-active" : ""
                }`}
                aria-label={`Nội dung ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="home-hero__arrow"
            aria-label="Xem nội dung tiếp theo"
            onClick={() => showSlide(activeIndex + 1)}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
