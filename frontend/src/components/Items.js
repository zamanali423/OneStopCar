import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyImg from "../assets/images/Led.jpg";
import Placeholder from "./Placeholder";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux-toolkit/slices/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Items = ({ filteredItems, sliderRef }) => {
  const settings = {
    dots: false,
    infinite: filteredItems.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  // add to cart
  const dispatch = useDispatch();

  const handleCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  return (
    <>
      <div className="block-products-carousel__carousel">
        {filteredItems?.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {filteredItems.map((item) => {
              const encodedTitle = encodeURIComponent(item.title);
              return (
                <div key={item._id} className="owl-item active">
                  <div className="block-products-carousel__column">
                    <div className="block-products-carousel__cell">
                      <div className="product-card product-card--layout--grid">
                        <div class="product-card__actions-list">
                          <button
                            class="product-card__action product-card__action--quickview"
                            type="button"
                            aria-label="Quick view"
                          >
                            <svg width="16" height="16">
                              <path
                                d="M14,15h-4v-2h3v-3h2v4C15,14.6,14.6,15,14,15z M13,3h-3V1h4c0.6,0,1,0.4,1,1v4h-2V3z M6,3H3v3H1V2c0-0.6,0.4-1,1-1h4V3z
	 M3,13h3v2H2c-0.6,0-1-0.4-1-1v-4h2V13z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            class="product-card__action product-card__action--wishlist"
                            type="button"
                            aria-label="Add to wish list"
                          >
                            <svg width="16" height="16">
                              <path
                                d="M13.9,8.4l-5.4,5.4c-0.3,0.3-0.7,0.3-1,0L2.1,8.4c-1.5-1.5-1.5-3.8,0-5.3C2.8,2.4,3.8,2,4.8,2s1.9,0.4,2.6,1.1L8,3.7
	l0.6-0.6C9.3,2.4,10.3,2,11.3,2c1,0,1.9,0.4,2.6,1.1C15.4,4.6,15.4,6.9,13.9,8.4z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            class="product-card__action product-card__action--compare"
                            type="button"
                            aria-label="Add to compare"
                          >
                            <svg width="16" height="16">
                              <path d="M9,15H7c-0.6,0-1-0.4-1-1V2c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v12C10,14.6,9.6,15,9,15z"></path>
                              <path d="M1,9h2c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1v-4C0,9.4,0.4,9,1,9z"></path>
                              <path d="M15,5h-2c-0.6,0-1,0.4-1,1v8c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V6C16,5.4,15.6,5,15,5z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="product-card__image">
                          <div className="image image--type--product">
                            <Link
                              to={`/${encodedTitle}`}
                              className="image__body"
                            >
                              <img
                                className="image__tag"
                                src={item.images?.[0] || dummyImg}
                                alt={item.title}
                              />
                            </Link>
                          </div>
                          <div className="status-badge status-badge--style--success product-card__fit status-badge--has-icon status-badge--has-text">
                            <div className="status-badge__body">
                              <div className="status-badge__icon">
                                <svg width="13" height="13">
                                  <path d="M12,4.4L5.5,11L1,6.5l1.4-1.4l3.1,3.1L10.6,3L12,4.4z" />
                                </svg>
                              </div>
                              <div className="status-badge__text">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-card__info">
                          <div className="product-card__meta">
                            <span className="product-card__meta-title">
                              SKU:
                            </span>{" "}
                            {item.sku}
                          </div>
                          <div className="product-card__name">
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
                            <Link to={`/${encodedTitle}`}>{item.title}</Link>
                          </div>
                          <div className="product-card__rating">
                            <div className="rating product-card__rating-stars">
                              <div className="rating__body">
                                {Array.from({ length: 5 }, (_, index) => (
                                  <div
                                    key={index}
                                    className={`rating__star ${
                                      index < item.rating
                                        ? "rating__star--active"
                                        : ""
                                    }`}
                                  ></div>
                                ))}
                                <div className="rating__star"></div>
                              </div>
                            </div>
                            <div className="product-card__rating-label">
                              {item.rating} on 5 stars
                            </div>
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
                              <path d="M20,4.4V5l-1.8,6.3c-0.1,0.4-0.5,0.7-1,0.7H6.7c-0.4,0-0.8-0.3-1-0.7L3.3,3.9..." />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <Placeholder />
        )}
      </div>
    </>
  );
};

export default Items;
