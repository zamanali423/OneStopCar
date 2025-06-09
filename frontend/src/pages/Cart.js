import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import dummyImg from "../assets/images/Led.jpg";
import { Link } from "react-router";
import { removeToCart, updateToCart } from "../redux-toolkit/slices/cartSlice";

const Cart = () => {
  const products = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.salePrice * curr.value,
    0
  );

  const handleOrder = () => {
    if (products.length <= 0) {
      toast.error("Once add products then checkout");
    } else {
      // Proceed to checkout logic here
    }
  };
  return (
    <>
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <Breadcrumb previous="Shop" current="Shopping Cart" />
            <h1 className="block-header__title">Shopping Cart</h1>
          </div>
        </div>
      </div>
      <div className="block">
        <div className="container">
          <div className="cart">
            <div className="cart__table cart-table">
              <table className="cart-table__table">
                <thead className="cart-table__head">
                  <tr className="cart-table__row">
                    <th className="cart-table__column cart-table__column--image">
                      Image
                    </th>
                    <th className="cart-table__column cart-table__column--product">
                      Product
                    </th>
                    <th className="cart-table__column cart-table__column--price">
                      Price
                    </th>
                    <th className="cart-table__column cart-table__column--quantity">
                      Quantity
                    </th>
                    <th className="cart-table__column cart-table__column--total">
                      Total
                    </th>
                    <th className="cart-table__column cart-table__column--remove"></th>
                  </tr>
                </thead>
                <tbody className="cart-table__body">
                  {products?.length > 0 ? (
                    products.map((item, index) => {
                      return (
                        <tr className="cart-table__row" key={index}>
                          <td className="cart-table__column cart-table__column--image">
                            <div className="image image--type--product">
                              <Link
                                to={`/${encodeURIComponent(item?.title)}`}
                                className="image__body"
                              >
                                <img
                                  className="image__tag"
                                  src={item?.images[0] ?? dummyImg}
                                  alt={`${item?.title}`}
                                />
                              </Link>
                            </div>
                          </td>
                          <td className="cart-table__column cart-table__column--product">
                            <Link
                              to={`/${encodeURIComponent(item?.title)}`}
                              className="cart-table__product-name"
                            >
                              {item?.title}
                            </Link>
                            <ul className="cart-table__options">
                              <li>Color: Black</li>
                            </ul>
                          </td>
                          <td
                            className="cart-table__column cart-table__column--price"
                            data-title="Price"
                          >
                            Rs.{item?.salePrice}
                          </td>
                          <td
                            className="cart-table__column cart-table__column--quantity"
                            data-title="Quantity"
                          >
                            <div className="cart-table__quantity input-number">
                              <input
                                className="form-control input-number__input"
                                type="number"
                                min="1"
                                value={item.value}
                                onChange={(e) => {
                                  const newValue = parseInt(e.target.value, 10);
                                  const maxQuantity = item.quantity;

                                  if (
                                    !isNaN(newValue) &&
                                    newValue >= 0 &&
                                    newValue <= maxQuantity
                                  ) {
                                    dispatch(
                                      updateToCart({
                                        _id: item._id,
                                        value: newValue,
                                      })
                                    );
                                  } else if (e.target.value === "") {
                                    dispatch(
                                      updateToCart({ _id: item._id, value: 1 })
                                    );
                                  } else {
                                    toast.error(
                                      `Value must be between 0 and ${maxQuantity}`
                                    );
                                  }
                                }}
                              />
                              <div className="input-number__add"></div>
                              <div className="input-number__sub"></div>
                            </div>
                          </td>
                          <td
                            className="cart-table__column cart-table__column--total"
                            data-title="Total"
                          >
                            Rs.{item?.salePrice * item?.value}
                          </td>
                          <td className="cart-table__column cart-table__column--remove">
                            <button
                              type="button"
                              className="cart-table__remove btn btn-sm btn-icon btn-muted"
                              onClick={() => dispatch(removeToCart(item))}
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
                      );
                    })
                  ) : (
                    <p style={{ textAlign: "center" }}>
                      No Product in this cart
                    </p>
                  )}
                </tbody>
                <tfoot className="cart-table__foot">
                  <tr>
                    <td colspan="6">
                      <div className="cart-table__actions">
                        <form className="cart-table__coupon-form form-row">
                          <div className="form-group mb-0 col flex-grow-1">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Coupon Code"
                            />
                          </div>
                          <div className="form-group mb-0 col-auto">
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                            >
                              Apply Coupon
                            </button>
                          </div>
                        </form>
                        <div className="cart-table__update-button">
                          <a className="btn btn-sm btn-primary" href="">
                            Update Cart
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="cart__totals">
              <div className="card">
                <div className="card-body card-body--padding--2">
                  <h3 className="card-title">Cart Totals</h3>
                  <table className="cart__totals-table">
                    <thead>
                      <tr>
                        <th>Subtotal</th>
                        <td>Rs.{totalPrice}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Shipping</th>
                        <td>
                          Free
                          <div>
                            <a href="">Calculate shipping</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total</th>
                        <td>Rs.{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <Link
                    className="btn btn-primary btn-xl btn-block"
                    to={products.length <= 0 ? "" : "/checkout"}
                    onClick={handleOrder}
                    aria-disabled={products.length <= 0}
                  >
                    Proceed to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default Cart;
