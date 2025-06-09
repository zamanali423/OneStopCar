import React, { useContext, useState } from "react";
import { productContext } from "../context/productContext/productContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { clearCart } from "../redux-toolkit/slices/cartSlice";
import Breadcrumb from "../components/Breadcrumb";

const Checkout = () => {
  const { sendMessageOnEmail, url } = useContext(productContext);
  const products = useSelector((store) => store.cart);
  const regularPrice = products.reduce(
    (acc, curr) => acc + curr.regularPrice * curr.value,
    0
  );
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.salePrice * curr.value,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    orderNotes: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
  });

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { firstName, lastName, email, phone, state, address } = inputData;
    if (!firstName || !lastName || !email || !phone || !state || !address) {
      toast.error("Please fill all the required fields");
      return false;
    }
    return true;
  };

  // place order
  const giveOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    if (products.length <= 0) {
      toast.error("Once add products then place order");
      setIsLoading(false);
      return;
    }

    const items = products.map((item) => ({
      title: item.title,
      cost: item.salePrice,
      quantity: item.value,
      total: item.salePrice * item.value,
      image: item.images[0],
    }));

    const latestOrderRes = await fetch(`${url}/orders/latest-order-no`);

    if (!latestOrderRes.ok) {
      setIsLoading(false);
      toast.error("Failed to fetch the latest order number");
      throw new Error("Failed to fetch the latest order number");
    }

    const latestOrderData = await latestOrderRes.json();
    const latestOrderNo = latestOrderData.orderNo;
    const newOrderNo = latestOrderNo ? latestOrderNo + 1 : 4200;

    const newOrder = {
      orderNo: newOrderNo,
      date: new Date(),
      status: "Processing",
      orderNotes: inputData.orderNotes,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      email: inputData.email,
      phone: inputData.phone,
      state: inputData.state,
      address: inputData.address,
      itemDetail: items,
      totalAmount: totalPrice,
    };
    try {
      const res = await fetch(`${url}/orders/new-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        toast.error("Failed to place order");
        throw new Error("Failed to place order");
      }

      const order = await res.json();
      await sendMessageOnEmail(newOrder);

      // Clear the cart and navigate to the order detail page only if the order is placed successfully
      localStorage.removeItem("cart");
      dispatch(clearCart());
      setIsLoading(false);
      // Navigate to the order detail page with the order details
      navigate("/order_success", { state: { order } });

      setInputData({
        orderNotes: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        state: "",
        address: "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="block-header block-header--has-breadcrumb block-header--has-title">
        <div className="container">
          <div className="block-header__body">
            <Breadcrumb previous="Shop" current="Checkout" />
            <h1 className="block-header__title">Checkout</h1>
          </div>
        </div>
      </div>
      <div className="checkout block">
        <div className="container container--max--xl">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="alert alert-lg alert-primary">
                Returning customer? <a href="">Click here to login</a>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="card mb-lg-0">
                <div className="card-body card-body--padding--2">
                  <h3 className="card-title">Billing details</h3>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="checkout-first-name">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-first-name"
                        placeholder="First Name"
                        name="firstName"
                        value={inputData.firstName}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="checkout-last-name">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-last-name"
                        placeholder="Last Name"
                        name="lastName"
                        value={inputData.lastName}
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="checkout-company-name">
                      Company Name{" "}
                      <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="checkout-company-name"
                      placeholder="Company Name"
                      value="OneStopCar"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label for="checkout-country">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Pakistan"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label for="checkout-street-address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="checkout-street-address"
                      placeholder="Street Address"
                      name="address"
                      value={inputData.address}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label for="checkout-state">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="checkout-state"
                      placeholder="City"
                      name="state"
                      value={inputData.state}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="checkout-email">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="checkout-email"
                        placeholder="Email address"
                        name="email"
                        value={inputData.email}
                        onChange={handleInput}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="checkout-phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="checkout-phone"
                        placeholder="Phone"
                        name="phone"
                        value={inputData.phone}
                        onChange={handleInput}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="card-divider"></div>

                <div className="card-body card-body--padding--2">
                  <h3 className="card-title">Shipping Details</h3>

                  <div className="form-group">
                    <label for="checkout-comment">
                      Order notes <span className="text-muted">(Optional)</span>
                    </label>
                    <textarea
                      id="checkout-comment"
                      className="form-control"
                      rows="4"
                      name="orderNotes"
                      value={inputData.orderNotes}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
              <div className="card mb-0">
                <div className="card-body card-body--padding--2">
                  <h3 className="card-title">Your Order</h3>
                  <table className="checkout__totals">
                    <thead className="checkout__totals-header">
                      <tr>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="checkout__totals-products">
                      {products.length > 0 ? (
                        products.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {item?.title} × {item?.value}
                              </td>
                              <td>Rs.{item?.salePrice * item?.value}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <p>No product in cart</p>
                      )}
                    </tbody>
                    <tbody className="checkout__totals-subtotals">
                      <tr>
                        <th>Subtotal</th>
                        <td>Rs.{regularPrice}</td>
                      </tr>
                      <tr>
                        <th>Discount</th>
                        <td>Rs.{regularPrice - totalPrice}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>Free</td>
                      </tr>
                    </tbody>
                    <tfoot className="checkout__totals-footer">
                      <tr>
                        <th>Total</th>
                        <td>Rs.{totalPrice}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="checkout__payment-methods payment-methods">
                    <ul className="payment-methods__list">
                      <li class="payment-methods__item payment-methods__item--active">
                        <label class="payment-methods__item-header">
                          <span class="payment-methods__item-radio input-radio">
                            <span class="input-radio__body">
                              <input
                                class="input-radio__input"
                                name="checkout_payment_method"
                                type="radio"
                                checked
                              />
                              <span class="input-radio__circle"></span>
                            </span>
                          </span>
                          <span class="payment-methods__item-title">
                            Cash on delivery
                          </span>
                        </label>
                        <div class="payment-methods__item-container">
                          <div class="payment-methods__item-details text-muted">
                            Pay with cash upon delivery.
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="checkout__agree form-group">
                    <div className="form-check">
                      <span className="input-check form-check-input">
                        <span className="input-check__body">
                          <input
                            className="input-check__input"
                            type="checkbox"
                            id="checkout-terms"
                          />
                          <span className="input-check__box"></span>
                          <span className="input-check__icon">
                            <svg width="9px" height="7px">
                              <path d="M9,1.395L3.46,7L0,3.5L1.383,2.095L3.46,4.2L7.617,0L9,1.395Z" />
                            </svg>
                          </span>
                        </span>
                      </span>
                      <label className="form-check-label" for="checkout-terms">
                        I have read and agree to the website{" "}
                        <a target="_blank" href="terms_condition">
                          terms and conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-xl btn-block"
                    onClick={giveOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </button>
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

export default Checkout;
