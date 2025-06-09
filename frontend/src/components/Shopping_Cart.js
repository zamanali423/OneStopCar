import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dummyImg from "../assets/images/Led.jpg";
import { removeToCart } from "../redux-toolkit/slices/cartSlice";

const Shopping_Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart);
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.salePrice * curr.value,
    0
  );
  return (
    <>
      <div className="indicator indicator--trigger--click">
        <a href="cart.html" className="indicator__button">
          <span className="indicator__icon">
            <svg width="32" height="32">
              <circle cx="10.5" cy="27.5" r="2.5" />
              <circle cx="23.5" cy="27.5" r="2.5" />
              <path
                d="M26.4,21H11.2C10,21,9,20.2,8.8,19.1L5.4,4.8C5.3,4.3,4.9,4,4.4,4H1C0.4,4,0,3.6,0,3s0.4-1,1-1h3.4C5.8,2,7,3,7.3,4.3
	l3.4,14.3c0.1,0.2,0.3,0.4,0.5,0.4h15.2c0.2,0,0.4-0.1,0.5-0.4l3.1-10c0.1-0.2,0-0.4-0.1-0.4C29.8,8.1,29.7,8,29.5,8H14
	c-0.6,0-1-0.4-1-1s0.4-1,1-1h15.5c0.8,0,1.5,0.4,2,1c0.5,0.6,0.6,1.5,0.4,2.2l-3.1,10C28.5,20.3,27.5,21,26.4,21z"
              />
            </svg>
            <span className="indicator__counter">{products?.length}</span>
          </span>
          <span className="indicator__title">Shopping Cart</span>
          <span className="indicator__value">Rs.{totalPrice}</span>
        </a>
        <div className="indicator__content">
          <div className="dropcart">
            <ul className="dropcart__list">
              {products?.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <li className="dropcart__item" key={index}>
                      <div className="dropcart__item-image image image--type--product">
                        <a
                          className="image__body"
                          href={`/${encodeURIComponent(product?.title)}`}
                        >
                          <img
                            className="image__tag"
                            src={product?.images[0] ?? dummyImg}
                            alt={product?.title}
                          />
                        </a>
                      </div>
                      <div className="dropcart__item-info">
                        <div className="dropcart__item-name">
                          <a href={`/${encodeURIComponent(product?.title)}`}>
                            {product?.title}
                          </a>
                        </div>
                        <div className="dropcart__item-meta">
                          <div className="dropcart__item-quantity">
                            {product?.value}
                          </div>
                          <div className="dropcart__item-price">
                            Rs.{product?.salePrice * product?.value}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dropcart__item-remove"
                        onClick={() => dispatch(removeToCart(product))}
                      >
                        <svg width="10" height="10">
                          <path
                            d="M8.8,8.8L8.8,8.8c-0.4,0.4-1,0.4-1.4,0L5,6.4L2.6,8.8c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4L3.6,5L1.2,2.6
	c-0.4-0.4-0.4-1,0-1.4l0,0c0.4-0.4,1-0.4,1.4,0L5,3.6l2.4-2.4c0.4-0.4,1-0.4,1.4,0l0,0c0.4,0.4,0.4,1,0,1.4L6.4,5l2.4,2.4
	C9.2,7.8,9.2,8.4,8.8,8.8z"
                          />
                        </svg>
                      </button>
                    </li>
                  );
                })
              ) : (
                <p>Cart is empty</p>
              )}
              <li className="dropcart__divider" role="presentation"></li>
            </ul>
            <div className="dropcart__totals">
              <table>
                <tr>
                  <th>Subtotal</th>
                  <td>Rs.{totalPrice}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>Rs.0.00</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>Rs.0.00</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>Rs.{totalPrice}</td>
                </tr>
              </table>
            </div>
            <div className="dropcart__actions">
              <a href="cart" className="btn btn-secondary">
                View Cart
              </a>
              <a href="checkout" className="btn btn-primary">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileShoppingCart = () => {
  const products = useSelector((store) => store.cart);
  return (
    <div className="mobile-header__indicators">
      <div className="mobile-indicator mobile-indicator--search d-md-none">
        <button type="button" className="mobile-indicator__button">
          <span className="mobile-indicator__icon">
            <svg width="20" height="20">
              <path
                d="M19.2,17.8c0,0-0.2,0.5-0.5,0.8c-0.4,0.4-0.9,0.6-0.9,0.6s-0.9,0.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9C10.9,14.5,9.5,15,8,15
	c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7c0,1.5-0.5,2.9-1.3,4c1.1,0.8,2.5,2,4,3.1C20,16.8,19.2,17.8,19.2,17.8z M8,3C5.2,3,3,5.2,3,8
	c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C13,5.2,10.8,3,8,3z"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="mobile-indicator d-none d-md-block">
        <a href="account-login.html" className="mobile-indicator__button">
          <span className="mobile-indicator__icon">
            <svg width="20" height="20">
              <path
                d="M20,20h-2c0-4.4-3.6-8-8-8s-8,3.6-8,8H0c0-4.2,2.6-7.8,6.3-9.3C4.9,9.6,4,7.9,4,6c0-3.3,2.7-6,6-6s6,2.7,6,6
	c0,1.9-0.9,3.6-2.3,4.7C17.4,12.2,20,15.8,20,20z M14,6c0-2.2-1.8-4-4-4S6,3.8,6,6s1.8,4,4,4S14,8.2,14,6z"
              />
            </svg>
          </span>
        </a>
      </div>
      <div className="mobile-indicator d-none d-md-block">
        <a href="wishlist" className="mobile-indicator__button">
          <span className="mobile-indicator__icon">
            <svg width="20" height="20">
              <path
                d="M14,3c2.2,0,4,1.8,4,4c0,4-5.2,10-8,10S2,11,2,7c0-2.2,1.8-4,4-4c1,0,1.9,0.4,2.7,1L10,5.2L11.3,4C12.1,3.4,13,3,14,3 M14,1
	c-1.5,0-2.9,0.6-4,1.5C8.9,1.6,7.5,1,6,1C2.7,1,0,3.7,0,7c0,5,6,12,10,12s10-7,10-12C20,3.7,17.3,1,14,1L14,1z"
              />
            </svg>
          </span>
        </a>
      </div>
      <div className="mobile-indicator">
        <a href="cart" className="mobile-indicator__button">
          <span className="mobile-indicator__icon">
            <svg width="20" height="20">
              <circle cx="7" cy="17" r="2" />
              <circle cx="15" cy="17" r="2" />
              <path
                d="M20,4.4V5l-1.8,6.3c-0.1,0.4-0.5,0.7-1,0.7H6.7c-0.4,0-0.8-0.3-1-0.7L3.3,3.9C3.1,3.3,2.6,3,2.1,3H0.4C0.2,3,0,2.8,0,2.6
	V1.4C0,1.2,0.2,1,0.4,1h2.5c1,0,1.8,0.6,2.1,1.6L5.1,3l2.3,6.8c0,0.1,0.2,0.2,0.3,0.2h8.6c0.1,0,0.3-0.1,0.3-0.2l1.3-4.4
	C17.9,5.2,17.7,5,17.5,5H9.4C9.2,5,9,4.8,9,4.6V3.4C9,3.2,9.2,3,9.4,3h9.2C19.4,3,20,3.6,20,4.4z"
              />
            </svg>
            <span className="mobile-indicator__counter">{products.length}</span>
          </span>
        </a>
      </div>
    </div>
  );
};

export { Shopping_Cart, MobileShoppingCart };
