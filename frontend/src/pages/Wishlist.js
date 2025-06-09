import React from "react";

const Wishlist = () => {
  return (
    <>
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <nav
              className="breadcrumb block-header__breadcrumb"
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb__list">
                <li
                  className="breadcrumb__spaceship-safe-area"
                  role="presentation"
                ></li>
                <li className="breadcrumb__item breadcrumb__item--parent breadcrumb__item--first">
                  <a href="index.html" className="breadcrumb__item-link">
                    Home
                  </a>
                </li>
                <li className="breadcrumb__item breadcrumb__item--parent">
                  <a href="" className="breadcrumb__item-link">
                    Breadcrumb
                  </a>
                </li>
                <li
                  className="breadcrumb__item breadcrumb__item--current breadcrumb__item--last"
                  aria-current="page"
                >
                  <span className="breadcrumb__item-link">Current Page</span>
                </li>
                <li
                  className="breadcrumb__title-safe-area"
                  role="presentation"
                ></li>
              </ol>
            </nav>
            <h1 className="block-header__title">Wishlist</h1>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="container container--max--xl">
          <div className="wishlist">
            <table className="wishlist__table">
              <thead className="wishlist__head">
                <tr className="wishlist__row wishlist__row--head">
                  <th className="wishlist__column wishlist__column--head wishlist__column--image">
                    Image
                  </th>
                  <th className="wishlist__column wishlist__column--head wishlist__column--product">
                    Product
                  </th>
                  <th className="wishlist__column wishlist__column--head wishlist__column--stock">
                    Stock status
                  </th>
                  <th className="wishlist__column wishlist__column--head wishlist__column--price">
                    Price
                  </th>
                  <th className="wishlist__column wishlist__column--head wishlist__column--button"></th>
                  <th className="wishlist__column wishlist__column--head wishlist__column--remove"></th>
                </tr>
              </thead>
              <tbody className="wishlist__body">
                <tr className="wishlist__row wishlist__row--body">
                  <td className="wishlist__column wishlist__column--body wishlist__column--image">
                    <div className="image image--type--product">
                      <a href="product-full.html" className="image__body">
                        <img
                          className="image__tag"
                          src="images/products/product-1-160x160.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--product">
                    <div className="wishlist__product-name">
                      <a href="">Brandix Spark Plug Kit ASR-400</a>
                    </div>
                    <div className="wishlist__product-rating">
                      <div className="wishlist__product-rating-stars">
                        <div className="rating">
                          <div className="rating__body">
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star"></div>
                          </div>
                        </div>
                      </div>
                      <div className="wishlist__product-rating-title">
                        3 reviews
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--stock">
                    <div className="status-badge status-badge--style--success status-badge--has-text">
                      <div className="status-badge__body">
                        <div className="status-badge__text">In Stock</div>
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--price">
                    $19.00
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--button">
                    <button type="button" className="btn btn-sm btn-primary">
                      Add to cart
                    </button>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--remove">
                    <button
                      type="button"
                      className="wishlist__remove btn btn-sm btn-muted btn-icon"
                    >
                      <svg width="12" height="12">
                        <path
                          d="M10.8,10.8L10.8,10.8c-0.4,0.4-1,0.4-1.4,0L6,7.4l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L4.6,6L1.2,2.6
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L6,4.6l3.4-3.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L7.4,6l3.4,3.4
	C11.2,9.8,11.2,10.4,10.8,10.8z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr className="wishlist__row wishlist__row--body">
                  <td className="wishlist__column wishlist__column--body wishlist__column--image">
                    <div className="image image--type--product">
                      <a href="product-full.html" className="image__body">
                        <img
                          className="image__tag"
                          src="images/products/product-2-160x160.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--product">
                    <div className="wishlist__product-name">
                      <a href="">Brandix Brake Kit BDX-750Z370-S</a>
                    </div>
                    <div className="wishlist__product-rating">
                      <div className="wishlist__product-rating-stars">
                        <div className="rating">
                          <div className="rating__body">
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                          </div>
                        </div>
                      </div>
                      <div className="wishlist__product-rating-title">
                        22 reviews
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--stock">
                    <div className="status-badge status-badge--style--success status-badge--has-text">
                      <div className="status-badge__body">
                        <div className="status-badge__text">In Stock</div>
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--price">
                    $224.00
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--button">
                    <button type="button" className="btn btn-sm btn-primary">
                      Add to cart
                    </button>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--remove">
                    <button
                      type="button"
                      className="wishlist__remove btn btn-sm btn-muted btn-icon"
                    >
                      <svg width="12" height="12">
                        <path
                          d="M10.8,10.8L10.8,10.8c-0.4,0.4-1,0.4-1.4,0L6,7.4l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L4.6,6L1.2,2.6
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L6,4.6l3.4-3.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L7.4,6l3.4,3.4
	C11.2,9.8,11.2,10.4,10.8,10.8z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr className="wishlist__row wishlist__row--body">
                  <td className="wishlist__column wishlist__column--body wishlist__column--image">
                    <div className="image image--type--product">
                      <a href="product-full.html" className="image__body">
                        <img
                          className="image__tag"
                          src="images/products/product-3-160x160.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--product">
                    <div className="wishlist__product-name">
                      <a href="">Left Headlight Of Brandix Z54</a>
                    </div>
                    <div className="wishlist__product-rating">
                      <div className="wishlist__product-rating-stars">
                        <div className="rating">
                          <div className="rating__body">
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star rating__star--active"></div>
                            <div className="rating__star"></div>
                            <div className="rating__star"></div>
                          </div>
                        </div>
                      </div>
                      <div className="wishlist__product-rating-title">
                        14 reviews
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--stock">
                    <div className="status-badge status-badge--style--success status-badge--has-text">
                      <div className="status-badge__body">
                        <div className="status-badge__text">In Stock</div>
                      </div>
                    </div>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--price">
                    $349.00
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--button">
                    <button type="button" className="btn btn-sm btn-primary">
                      Add to cart
                    </button>
                  </td>
                  <td className="wishlist__column wishlist__column--body wishlist__column--remove">
                    <button
                      type="button"
                      className="wishlist__remove btn btn-sm btn-muted btn-icon"
                    >
                      <svg width="12" height="12">
                        <path
                          d="M10.8,10.8L10.8,10.8c-0.4,0.4-1,0.4-1.4,0L6,7.4l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L4.6,6L1.2,2.6
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L6,4.6l3.4-3.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L7.4,6l3.4,3.4
	C11.2,9.8,11.2,10.4,10.8,10.8z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default Wishlist;
