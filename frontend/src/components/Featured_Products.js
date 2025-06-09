import React, { useContext, useRef } from "react";
import { productContext } from "../context/productContext/productContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Items from "./Items";

const Featured_Products = () => {
  const {
    uniqueCategories,
    setCategoryMatch,
    items,
    categoryMatch,
    searchItem,
    productRef,
  } = useContext(productContext);
  const sliderRef = useRef(null);

  const filteredItems =
    categoryMatch === "all"
      ? items
      : items.filter((item) => item.category === categoryMatch);

  const handleCategoryChange = (category) => {
    setCategoryMatch(category);
  };

  return (
    <div className="block block-products-carousel" data-layout="grid-5">
      <div className="container" ref={productRef}>
        <div className="section-header">
          <div className="section-header__body">
            <h2 className="section-header__title">Featured Products</h2>
            <div className="section-header__spring"></div>
            <ul className="section-header__groups">
              {["all", ...uniqueCategories].map((category) => {
                const isActive = categoryMatch === category;
                return (
                  <li key={category} className="section-header__groups-item">
                    <button
                      type="button"
                      className={`section-header__groups-button ${
                        isActive ? "section-header__groups-button--active" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="section-header__arrows">
              <div className="arrow section-header__arrow section-header__arrow--prev arrow--prev">
                <button
                  className="arrow__button"
                  type="button"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <svg width="7" height="11">
                    <path d="M6.7,0.3L6.7,0.3c-0.4-0.4-0.9-0.4-1.3,0L0,5.5l5.4,5.2c0.4,0.4,0.9,0.3,1.3,0l0,0c0.4-0.4,0.4-1,0-1.3l-4-3.9l4-3.9C7.1,1.2,7.1,0.6,6.7,0.3z" />
                  </svg>
                </button>
              </div>
              <div className="arrow section-header__arrow section-header__arrow--next arrow--next">
                <button
                  className="arrow__button"
                  type="button"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <svg width="7" height="11">
                    <path
                      d="M0.3,10.7L0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3l0,0c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9
                        C-0.1,9.8-0.1,10.4,0.3,10.7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="section-header__divider"></div>
          </div>
        </div>
        {/* products  */}
        <Items
          filteredItems={searchItem?.length > 0 ? searchItem : filteredItems}
          sliderRef={sliderRef}
        />
      </div>
    </div>
  );
};

export default Featured_Products;
