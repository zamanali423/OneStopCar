import React, { useContext, useEffect, useRef, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { productContext } from "../context/productContext/productContext";
import Placeholder from "../components/Placeholder";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import dummyImg from "../assets/images/Led.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux-toolkit/slices/cartSlice";
import toast from "react-hot-toast";

const Shop = () => {
  const [layout, setLayout] = useState("grid");
  const [withFeatures, setWithFeatures] = useState(false);
  const [offcanvasChange, setOffcanvasChange] = useState("");
  const { items, searchItem } = useContext(productContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleLayoutChange = (layoutValue, withFeaturesValue) => {
    setLayout(layoutValue);
    setWithFeatures(withFeaturesValue === "true");
  };
  const layoutOptions = [
    {
      layout: "grid",
      withFeatures: "false",
      icon: "M15.2,16H9.8C9.4,16,9,15.6,9,15.2V9.8C9,9.4,9.4,9,9.8,9h5.4C15.6,9,16,9.4,16,9.8v5.4C16,15.6,15.6,16,15.2,16z M15.2,7 H9.8C9.4,7,9,6.6,9,6.2V0.8C9,0.4,9.4,0,9.8,0h5.4C15.6,0,16,0.4,16,0.8v5.4C16,6.6,15.6,7,15.2,7z M6.2,16H0.8 C0.4,16,0,15.6,0,15.2V9.8C0,9.4,0.4,9,0.8,9h5.4C6.6,9,7,9.4,7,9.8v5.4C7,15.6,6.6,16,6.2,16z M6.2,7H0.8C0.4,7,0,6.6,0,6.2V0.8 C0,0.4,0.4,0,0.8,0h5.4C6.6,0,7,0.4,7,0.8v5.4C7,6.6,6.6,7,6.2,7z",
    },
    {
      layout: "grid",
      withFeatures: "true",
      icon: "M16,0.8v14.4c0,0.4-0.4,0.8-0.8,0.8H9.8C9.4,16,9,15.6,9,15.2V0.8C9,0.4,9.4,0,9.8,0l5.4,0C15.6,0,16,0.4,16,0.8z M7,0.8 v14.4C7,15.6,6.6,16,6.2,16H0.8C0.4,16,0,15.6,0,15.2L0,0.8C0,0.4,0.4,0,0.8,0l5.4,0C6.6,0,7,0.4,7,0.8z",
    },
    {
      layout: "list",
      withFeatures: "false",
      icon: "M15.2,16H0.8C0.4,16,0,15.6,0,15.2V9.8C0,9.4,0.4,9,0.8,9h14.4C15.6,9,16,9.4,16,9.8v5.4C16,15.6,15.6,16,15.2,16z M15.2,7 H0.8C0.4,7,0,6.6,0,6.2V0.8C0,0.4,0.4,0,0.8,0h14.4C15.6,0,16,0.4,16,0.8v5.4C16,6.6,15.6,7,15.2,7z",
    },
    {
      layout: "table",
      withFeatures: "false",
      icon: "M15.2,16H0.8C0.4,16,0,15.6,0,15.2v-2.4C0,12.4,0.4,12,0.8,12h14.4c0.4,0,0.8,0.4,0.8,0.8v2.4C16,15.6,15.6,16,15.2,16z M15.2,10H0.8C0.4,10,0,9.6,0,9.2V6.8C0,6.4,0.4,6,0.8,6h14.4C15.6,6,16,6.4,16,6.8v2.4C16,9.6,15.6,10,15.2,10z M15.2,4H0.8 C0.4,4,0,3.6,0,3.2V0.8C0,0.4,0.4,0,0.8,0h14.4C15.6,0,16,0.4,16,0.8v2.4C16,3.6,15.6,4,15.2,4z",
    },
  ];

  // filter for price
  const filter = {
    min: 6000,
    max: 17000,
    from: 6000,
    to: 15000,
  };

  const { min, max, from, to } = filter;
  const sliderRef = useRef(null);
  const [range, setRange] = useState([from, to]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    noUiSlider.create(slider, {
      start: [from, to],
      connect: true,
      direction: document.dir === "rtl" ? "rtl" : "ltr",
      range: { min, max },
    });

    const onUpdate = (values) => {
      const parsedValues = values.map((v) => Math.round(v));
      setRange(parsedValues);
    };

    slider.noUiSlider.on("update", onUpdate);

    return () => {
      if (slider.noUiSlider) {
        slider.noUiSlider.off("update", onUpdate);
        slider.noUiSlider.destroy();
      }
    };
  }, [min, max, from, to]);

  // for paragraph
  const ShortDescription = (html) => {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract text from each <p>, filtering out empty or <br> paragraphs
    const paragraphs = Array.from(doc.querySelectorAll("p"))
      .map((p) => p.textContent.trim())
      .filter((text) => text && text !== "");
    return (
      <ul>
        {paragraphs.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    );
  };

  // for pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalProducts = items?.length || 0;
  const [visibleItems, setVisibleItems] = useState([]);

  // Update filtered products whenever price range or items change
  const handleFilterClick = () => {
    if (items?.length) {
      const [minSelected, maxSelected] = range;
      const filtered = items.filter(
        (product) =>
          product.salePrice >= minSelected && product.salePrice <= maxSelected
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // reset to first page on filter
      setOffcanvasChange("");
    }
  };
  useEffect(() => {
    if (items?.length) {
      handleFilterClick();
    }
  }, [items]);

  // Update visible items based on pagination
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setVisibleItems(filteredProducts.slice(indexOfFirstItem, indexOfLastItem));
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // sort
  const [sortBy, setSortBy] = useState("default");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    if (sortBy === "default") {
      setFilteredProducts(items);
    } else if (sortBy === "Low") {
      const sorted = [...filteredProducts].sort(
        (a, b) => a.salePrice - b.salePrice
      );
      setFilteredProducts(sorted);
    } else if (sortBy === "High") {
      const sorted = [...filteredProducts].sort(
        (a, b) => b.salePrice - a.salePrice
      );
      setFilteredProducts(sorted);
    }
  }, [sortBy]);

  // add to cart
  const dispatch = useDispatch();

  const handleCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  // search products
  const filteredItems = searchItem?.length > 0 ? searchItem : visibleItems;

  return (
    <>
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <Breadcrumb current="Shop" />
            <h1 className="block-header__title">Transmission</h1>
          </div>
        </div>
      </div>

      <div className="block-split">
        <div
          className={`sidebar sidebar--offcanvas--always ${
            offcanvasChange ?? ""
          }`}
        >
          <div className="sidebar__backdrop"></div>
          <div className="sidebar__body">
            <div className="sidebar__header">
              <div className="sidebar__title">Filters</div>
              <button
                className="sidebar__close"
                type="button"
                onClick={() => setOffcanvasChange("")}
              >
                <svg width="12" height="12">
                  <path
                    d="M10.8,10.8L10.8,10.8c-0.4,0.4-1,0.4-1.4,0L6,7.4l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L4.6,6L1.2,2.6
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L6,4.6l3.4-3.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L7.4,6l3.4,3.4
	C11.2,9.8,11.2,10.4,10.8,10.8z"
                  />
                </svg>
              </button>
            </div>
            <div className="sidebar__content">
              <div
                className="widget widget-filters widget-filters--offcanvas--always"
                data-collapse
                data-collapse-opened-className="filter--opened"
              >
                <div className="widget__header widget-filters__header">
                  <h4>Filters</h4>
                </div>
                <div className="widget-filters__list">
                  <div className="widget-filters__item">
                    <div className="filter filter--opened" data-collapse-item>
                      <button
                        type="button"
                        className="filter__title"
                        data-collapse-trigger
                      >
                        Price
                        <span className="filter__arrow">
                          <svg width="12px" height="7px">
                            <path d="M0.286,0.273 L0.286,0.273 C-0.070,0.629 -0.075,1.204 0.276,1.565 L5.516,6.993 L10.757,1.565 C11.108,1.204 11.103,0.629 10.747,0.273 L10.747,0.273 C10.385,-0.089 9.796,-0.086 9.437,0.279 L5.516,4.296 L1.596,0.279 C1.237,-0.086 0.648,-0.089 0.286,0.273 Z" />
                          </svg>
                        </span>
                      </button>

                      <div className="filter__body" data-collapse-content>
                        <div className="filter__container">
                          <div className="filter-price">
                            <div
                              className="filter-price__slider"
                              ref={sliderRef}
                            ></div>
                            <div className="filter-price__title-button">
                              <div className="filter-price__title">
                                Rs.{range[0]} – Rs.{range[1]}
                              </div>
                              <button
                                type="button"
                                className="btn btn-xs btn-secondary filter-price__button"
                                onClick={handleFilterClick}
                              >
                                Filter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="widget-filters__item">
                    <div className="filter filter--opened" data-collapse-item>
                      <button
                        type="button"
                        className="filter__title"
                        data-collapse-trigger
                      >
                        Rating
                        <span className="filter__arrow">
                          <svg width="12px" height="7px">
                            <path d="M0.286,0.273 L0.286,0.273 C-0.070,0.629 -0.075,1.204 0.276,1.565 L5.516,6.993 L10.757,1.565 C11.108,1.204 11.103,0.629 10.747,0.273 L10.747,0.273 C10.385,-0.089 9.796,-0.086 9.437,0.279 L5.516,4.296 L1.596,0.279 C1.237,-0.086 0.648,-0.089 0.286,0.273 Z" />
                          </svg>
                        </span>
                      </button>
                      <div className="filter__body" data-collapse-content>
                        <div className="filter__container">
                          <div className="filter-rating">
                            <ul className="filter-rating__list">
                              <li className="filter-rating__item">
                                <label className="filter-rating__item-label">
                                  <span className="input-check filter-rating__item-input">
                                    <span className="input-check__body">
                                      <input
                                        className="input-check__input"
                                        type="checkbox"
                                      />
                                      <span className="input-check__box"></span>
                                      <span className="input-check__icon">
                                        <svg width="9px" height="7px">
                                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="filter-rating__item-stars">
                                    <div className="rating">
                                      <div className="rating__body">
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                      </div>
                                    </div>
                                  </span>
                                  <span className="filter-rating__item-title sr-only">
                                    5 stars
                                  </span>
                                  <span className="filter-rating__item-counter">
                                    42
                                  </span>
                                </label>
                              </li>
                              <li className="filter-rating__item">
                                <label className="filter-rating__item-label">
                                  <span className="input-check filter-rating__item-input">
                                    <span className="input-check__body">
                                      <input
                                        className="input-check__input"
                                        type="checkbox"
                                      />
                                      <span className="input-check__box"></span>
                                      <span className="input-check__icon">
                                        <svg width="9px" height="7px">
                                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="filter-rating__item-stars">
                                    <div className="rating">
                                      <div className="rating__body">
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star"></div>
                                      </div>
                                    </div>
                                  </span>
                                  <span className="filter-rating__item-title sr-only">
                                    4 stars
                                  </span>
                                  <span className="filter-rating__item-counter">
                                    24
                                  </span>
                                </label>
                              </li>
                              <li className="filter-rating__item">
                                <label className="filter-rating__item-label">
                                  <span className="input-check filter-rating__item-input">
                                    <span className="input-check__body">
                                      <input
                                        className="input-check__input"
                                        type="checkbox"
                                      />
                                      <span className="input-check__box"></span>
                                      <span className="input-check__icon">
                                        <svg width="9px" height="7px">
                                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="filter-rating__item-stars">
                                    <div className="rating">
                                      <div className="rating__body">
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                      </div>
                                    </div>
                                  </span>
                                  <span className="filter-rating__item-title sr-only">
                                    3 stars
                                  </span>
                                  <span className="filter-rating__item-counter">
                                    19
                                  </span>
                                </label>
                              </li>
                              <li className="filter-rating__item">
                                <label className="filter-rating__item-label">
                                  <span className="input-check filter-rating__item-input">
                                    <span className="input-check__body">
                                      <input
                                        className="input-check__input"
                                        type="checkbox"
                                      />
                                      <span className="input-check__box"></span>
                                      <span className="input-check__icon">
                                        <svg width="9px" height="7px">
                                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="filter-rating__item-stars">
                                    <div className="rating">
                                      <div className="rating__body">
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                      </div>
                                    </div>
                                  </span>
                                  <span className="filter-rating__item-title sr-only">
                                    2 stars
                                  </span>
                                  <span className="filter-rating__item-counter">
                                    3
                                  </span>
                                </label>
                              </li>
                              <li className="filter-rating__item">
                                <label className="filter-rating__item-label">
                                  <span className="input-check filter-rating__item-input">
                                    <span className="input-check__body">
                                      <input
                                        className="input-check__input"
                                        type="checkbox"
                                      />
                                      <span className="input-check__box"></span>
                                      <span className="input-check__icon">
                                        <svg width="9px" height="7px">
                                          <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </span>
                                  <span className="filter-rating__item-stars">
                                    <div className="rating">
                                      <div className="rating__body">
                                        <div className="rating__star rating__star--active"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                        <div className="rating__star"></div>
                                      </div>
                                    </div>
                                  </span>
                                  <span className="filter-rating__item-title sr-only">
                                    1 star
                                  </span>
                                  <span className="filter-rating__item-counter">
                                    12
                                  </span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-filters__actions d-flex">
                  <button className="btn btn-primary btn-sm">Filter</button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setRange([6000, 15000])}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="block-split__row row no-gutters">
            <div className="block-split__item block-split__item-content col-auto">
              <div className="block">
                <div className="products-view">
                  <div className="products-view__options view-options view-options--offcanvas--always">
                    <div className="view-options__body">
                      <button
                        type="button"
                        className="view-options__filters-button filters-button"
                        onClick={() => setOffcanvasChange("sidebar--open")}
                      >
                        <span className="filters-button__icon">
                          <svg width="16" height="16">
                            <path
                              d="M7,14v-2h9v2H7z M14,7h2v2h-2V7z M12.5,6C12.8,6,13,6.2,13,6.5v3c0,0.3-0.2,0.5-0.5,0.5h-2
	C10.2,10,10,9.8,10,9.5v-3C10,6.2,10.2,6,10.5,6H12.5z M7,2h9v2H7V2z M5.5,5h-2C3.2,5,3,4.8,3,4.5v-3C3,1.2,3.2,1,3.5,1h2
	C5.8,1,6,1.2,6,1.5v3C6,4.8,5.8,5,5.5,5z M0,2h2v2H0V2z M9,9H0V7h9V9z M2,14H0v-2h2V14z M3.5,11h2C5.8,11,6,11.2,6,11.5v3
	C6,14.8,5.8,15,5.5,15h-2C3.2,15,3,14.8,3,14.5v-3C3,11.2,3.2,11,3.5,11z"
                            />
                          </svg>
                        </span>
                        <span className="filters-button__title">Filters</span>
                        <span className="filters-button__counter">2</span>
                      </button>
                      <div className="view-options__layout layout-switcher">
                        <div className="layout-switcher__list">
                          {layoutOptions.map((option, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`layout-switcher__button ${
                                layout === option.layout &&
                                withFeatures ===
                                  (option.withFeatures === "true")
                                  ? "layout-switcher__button--active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleLayoutChange(
                                  option.layout,
                                  option.withFeatures
                                )
                              }
                            >
                              <svg width="16" height="16">
                                <path d={`${option.icon}`} />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="view-options__legend">
                        Showing {visibleItems.length} of{" "}
                        {filteredProducts.length} products
                      </div>
                      <div className="view-options__spring"></div>
                      <div className="view-options__select">
                        <label for="view-option-sort">Sort:</label>
                        <select
                          id="view-option-sort"
                          className="form-control form-control-sm"
                          name=""
                          onChange={handleSortChange}
                        >
                          <option value="default">Default</option>
                          <option value="Low">Price: Low to High</option>
                          <option value="High">Price: High to Low</option>
                        </select>
                      </div>
                      <div className="view-options__select">
                        <label for="view-option-limit">Show:</label>
                        <select
                          id="view-option-limit"
                          className="form-control form-control-sm"
                          name=""
                        >
                          <option value="">8</option>
                        </select>
                      </div>
                    </div>
                    <div className="view-options__body view-options__body--filters">
                      <div className="view-options__label">Active Filters</div>
                    </div>
                  </div>

                  <div
                    className={`products-view__list products-list products-list--${layout}--6`}
                    data-layout={layout}
                    data-with-features={withFeatures}
                  >
                    <div className="products-list__head">
                      <div className="products-list__column products-list__column--image">
                        Image
                      </div>
                      <div className="products-list__column products-list__column--meta">
                        SKU
                      </div>
                      <div className="products-list__column products-list__column--product">
                        Product
                      </div>
                      <div className="products-list__column products-list__column--rating">
                        Rating
                      </div>
                      <div className="products-list__column products-list__column--price">
                        Price
                      </div>
                    </div>

                    {/* products list  */}
                    <div className="products-list__content">
                      {filteredItems?.length > 0 ? (
                        filteredItems.map((item) => {
                          const encodedTitle = encodeURIComponent(item?.title);
                          return (
                            <div className="products-list__item" key={item._id}>
                              <div className="product-card">
                                <div className="product-card__actions-list">
                                  <button
                                    className="product-card__action product-card__action--quickview"
                                    type="button"
                                    aria-label="Quick view"
                                  >
                                    <svg width="16" height="16">
                                      <path
                                        d="M14,15h-4v-2h3v-3h2v4C15,14.6,14.6,15,14,15z M13,3h-3V1h4c0.6,0,1,0.4,1,1v4h-2V3z M6,3H3v3H1V2c0-0.6,0.4-1,1-1h4V3z
	 M3,13h3v2H2c-0.6,0-1-0.4-1-1v-4h2V13z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className="product-card__action product-card__action--wishlist"
                                    type="button"
                                    aria-label="Add to wish list"
                                  >
                                    <svg width="16" height="16">
                                      <path
                                        d="M13.9,8.4l-5.4,5.4c-0.3,0.3-0.7,0.3-1,0L2.1,8.4c-1.5-1.5-1.5-3.8,0-5.3C2.8,2.4,3.8,2,4.8,2s1.9,0.4,2.6,1.1L8,3.7
	l0.6-0.6C9.3,2.4,10.3,2,11.3,2c1,0,1.9,0.4,2.6,1.1C15.4,4.6,15.4,6.9,13.9,8.4z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className="product-card__action product-card__action--compare"
                                    type="button"
                                    aria-label="Add to compare"
                                  >
                                    <svg width="16" height="16">
                                      <path d="M9,15H7c-0.6,0-1-0.4-1-1V2c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v12C10,14.6,9.6,15,9,15z" />
                                      <path d="M1,9h2c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1v-4C0,9.4,0.4,9,1,9z" />
                                      <path d="M15,5h-2c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V6C16,5.4,15.6,5,15,5z" />
                                    </svg>
                                  </button>
                                </div>

                                <div className="product-card__image">
                                  <div className="image image--type--product">
                                    <a
                                      href={`/${encodedTitle}`}
                                      className="image__body"
                                    >
                                      <img
                                        className="image__tag"
                                        src={item?.images[0] ?? dummyImg}
                                        alt={item?.title}
                                      />
                                    </a>
                                  </div>

                                  <div className="status-badge status-badge--style--success product-card__fit status-badge--has-icon status-badge--has-text">
                                    <div className="status-badge__body">
                                      <div className="status-badge__icon">
                                        <svg width="13" height="13">
                                          <path d="M12,4.4L5.5,11L1,6.5l1.4-1.4l3.1,3.1L10.6,3L12,4.4z" />
                                        </svg>
                                      </div>
                                      <div className="status-badge__text">
                                        {item?.title}
                                      </div>
                                      <div
                                        className="status-badge__tooltip"
                                        tabindex="0"
                                        data-toggle="tooltip"
                                        title={item?.title}
                                      ></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="product-card__info">
                                  <div className="product-card__meta">
                                    <span className="product-card__meta-title">
                                      SKU:
                                    </span>{" "}
                                    {item?.sku}
                                  </div>
                                  <div className="product-card__name">
                                    <div>
                                      <div className="product-card__badges">
                                        <div className="tag-badge tag-badge--sale">
                                          sale
                                        </div>
                                        <div className="tag-badge tag-badge--new">
                                          new
                                        </div>
                                        <div className="tag-badge tag-badge--hot">
                                          hot
                                        </div>
                                      </div>
                                      <a href={`/${encodedTitle}`}>
                                        {item?.title}
                                      </a>
                                    </div>
                                  </div>
                                  <div className="product-card__rating">
                                    <div className="rating product-card__rating-stars">
                                      <div className="rating__body">
                                        {Array.from(
                                          { length: 5 },
                                          (_, index) => (
                                            <div
                                              key={index}
                                              className={`rating__star ${
                                                index < item.rating
                                                  ? "rating__star--active"
                                                  : ""
                                              }`}
                                            ></div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                    <div className="product-card__rating-label">
                                      {item.rating} on 5 stars
                                    </div>
                                  </div>
                                  <div className="product-card__features">
                                    {ShortDescription(item?.shortDescription)}
                                  </div>
                                </div>

                                <div className="product-card__footer">
                                  <div className="product-card__prices">
                                    <div className="product-card__price product-card__price--current">
                                      Rs.{item.salePrice}
                                    </div>
                                    <div className="product-card__price product-card__price--old">
                                      <del>Rs.{item.regularPrice}</del>
                                    </div>
                                  </div>
                                  <button
                                    className="product-card__addtocart-icon"
                                    type="button"
                                    aria-label="Add to cart"
                                    onClick={() => handleCart(item)}
                                  >
                                    <svg width="20" height="20">
                                      <circle cx="7" cy="17" r="2" />
                                      <circle cx="15" cy="17" r="2" />
                                      <path
                                        d="M20,4.4V5l-1.8,6.3c-0.1,0.4-0.5,0.7-1,0.7H6.7c-0.4,0-0.8-0.3-1-0.7L3.3,3.9C3.1,3.3,2.6,3,2.1,3H0.4C0.2,3,0,2.8,0,2.6
	V1.4C0,1.2,0.2,1,0.4,1h2.5c1,0,1.8,0.6,2.1,1.6L5.1,3l2.3,6.8c0,0.1,0.2,0.2,0.3,0.2h8.6c0.1,0,0.3-0.1,0.3-0.2l1.3-4.4
	C17.9,5.2,17.7,5,17.5,5H9.4C9.2,5,9,4.8,9,4.6V3.4C9,3.2,9.2,3,9.4,3h9.2C19.4,3,20,3.6,20,4.4z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className="product-card__addtocart-full"
                                    type="button"
                                    onClick={() => handleCart(item)}
                                  >
                                    Add to cart
                                  </button>
                                  <button
                                    className="product-card__wishlist"
                                    type="button"
                                  >
                                    <svg width="16" height="16">
                                      <path
                                        d="M13.9,8.4l-5.4,5.4c-0.3,0.3-0.7,0.3-1,0L2.1,8.4c-1.5-1.5-1.5-3.8,0-5.3C2.8,2.4,3.8,2,4.8,2s1.9,0.4,2.6,1.1L8,3.7
	l0.6-0.6C9.3,2.4,10.3,2,11.3,2c1,0,1.9,0.4,2.6,1.1C15.4,4.6,15.4,6.9,13.9,8.4z"
                                      />
                                    </svg>
                                    <span>Add to wishlist</span>
                                  </button>
                                  <button
                                    className="product-card__compare"
                                    type="button"
                                  >
                                    <svg width="16" height="16">
                                      <path d="M9,15H7c-0.6,0-1-0.4-1-1V2c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v12C10,14.6,9.6,15,9,15z" />
                                      <path d="M1,9h2c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1v-4C0,9.4,0.4,9,1,9z" />
                                      <path d="M15,5h-2c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V6C16,5.4,15.6,5,15,5z" />
                                    </svg>
                                    <span>Add to compare</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : items?.length === 0 ? (
                        <Placeholder />
                      ) : (
                        <p>No products found in this range.</p>
                      )}
                    </div>
                  </div>

                  {/* pagination  */}
                  <div className="products-view__pagination">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={handlePrevPage}
                          >
                            &laquo;
                          </button>
                        </li>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((pageNum) => (
                          <li
                            key={pageNum}
                            className={`page-item ${
                              currentPage === pageNum ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageClick(pageNum)}
                            >
                              {pageNum}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={handleNextPage}
                          >
                            &raquo;
                          </button>
                        </li>
                      </ul>
                    </nav>
                    <div className="products-view__pagination-legend">
                      Showing {visibleItems.length} of {filteredProducts.length}{" "}
                      products
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-space block-space--layout--before-footer"></div>
        </div>
      </div>
    </>
  );
};

export default Shop;
