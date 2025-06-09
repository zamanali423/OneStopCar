import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import logo from "../assets/images/logo2.png";
import h4 from "../assets/images/h4.jpg";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "../components/InvoiceDocument";

const Order_Success = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const navigate = useNavigate();

  if (
    !order ||
    !order.totalAmount ||
    !order.itemDetail ||
    order.itemDetail.length === 0
  ) {
    toast.error("Order data is invalid");
    return;
  }

  if (!order) {
    navigate("/order-tracker");
    return null;
  }

  return (
    <>
      <div className="block-space block-space--layout--spaceship-ledge-height"></div>
      <div className="block order-success">
        <div className="container">
          <div className="order-success__body">
            <div className="order-success__header">
              <div className="order-success__icon">
                <svg width="100" height="100">
                  <path
                    d="M50,100C22.4,100,0,77.6,0,50S22.4,0,50,0s50,22.4,50,50S77.6,100,50,100z M50,2C23.5,2,2,23.5,2,50
        s21.5,48,48,48s48-21.5,48-48S76.5,2,50,2z M44.2,71L22.3,49.1l1.4-1.4l21.2,21.2l34.4-34.4l1.4,1.4L45.6,71
        C45.2,71.4,44.6,71.4,44.2,71z"
                  />
                </svg>
              </div>
              <h1 className="order-success__title">Thank you</h1>
              <div className="order-success__subtitle">
                Your order has been received
              </div>
              <div className="order-success__actions">
                <a href="/" className="btn btn-sm btn-secondary">
                  Go To Homepage
                </a>
              </div>
            </div>
            <div className="card order-success__meta">
              <ul className="order-success__meta-list">
                <li className="order-success__meta-item">
                  <span className="order-success__meta-title">
                    Order number:
                  </span>
                  <span className="order-success__meta-value">
                    #{order.orderNo}
                  </span>
                </li>
                <li className="order-success__meta-item">
                  <span className="order-success__meta-title">Created At:</span>
                  <span className="order-success__meta-value">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </li>
                <li className="order-success__meta-item">
                  <span className="order-success__meta-title">Total:</span>
                  <span className="order-success__meta-value">
                    {order.totalAmount}
                  </span>
                </li>
                <li className="order-success__meta-item">
                  <span className="order-success__meta-title">
                    Payment Method:
                  </span>
                  <span className="order-success__meta-value">
                    Cash On Delivery
                  </span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="order-list">
                <table>
                  <thead className="order-list__header">
                    <tr>
                      <th className="order-list__column-label" colspan="2">
                        Product
                      </th>
                      <th className="order-list__column-quantity">Quantity</th>
                      <th className="order-list__column-total">Total</th>
                    </tr>
                  </thead>
                  <tbody className="order-list__products">
                    {order?.itemDetail?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="order-list__column-image">
                            <div className="image image--type--product">
                              <a
                                href={`/${item?.title}`}
                                className="image__body"
                              >
                                <img
                                  className="image__tag"
                                  src={item?.image ?? h4}
                                  alt={`/${item?.title}`}
                                />
                              </a>
                            </div>
                          </td>
                          <td className="order-list__column-product">
                            <a href={`/${item?.title}`}>{item?.title}</a>
                            <div className="order-list__options">
                              <ul className="order-list__options-list">
                                <li className="order-list__options-item">
                                  <span className="order-list__options-label">
                                    Color:
                                  </span>
                                  <span className="order-list__options-value">
                                    Black
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </td>
                          <td
                            className="order-list__column-quantity"
                            data-title="Quantity:"
                          >
                            {item?.quantity}
                          </td>
                          <td className="order-list__column-total">
                            Rs.{item?.total}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                  <tbody className="order-list__subtotals">
                    <tr>
                      <th className="order-list__column-label" colspan="3">
                        Subtotal
                      </th>
                      <td className="order-list__column-total">
                        Rs.{order?.totalAmount}
                      </td>
                    </tr>
                    <tr>
                      <th className="order-list__column-label" colspan="3">
                        Shipping
                      </th>
                      <td className="order-list__column-total">Free</td>
                    </tr>
                  </tbody>
                  <tfoot className="order-list__footer">
                    <tr>
                      <th className="order-list__column-label" colspan="3">
                        Total
                      </th>
                      <td className="order-list__column-total">
                        Rs.{order?.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="order-success__addresses">
              <div className="order-success__address card address-card">
                <div className="address-card__badge tag-badge tag-badge--theme">
                  Shipping Address
                </div>
                <div className="address-card__body">
                  <div className="address-card__name">
                    {order?.customerDetail.firstName}{" "}
                    {order?.customerDetail.lastName}
                  </div>
                  <div className="address-card__row">
                    {order?.customerDetail.address}
                    <br />
                    {order?.customerDetail.state}
                    <br />
                    {order?.customerDetail.country}
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Phone Number</div>
                    <div className="address-card__row-content">
                      {order?.customerDetail.phone}
                    </div>
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Email Address</div>
                    <div className="address-card__row-content">
                      {order?.customerDetail.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-success__address card address-card">
                <div className="address-card__badge tag-badge tag-badge--theme">
                  Billing Address
                </div>
                <div className="address-card__body">
                  <div className="address-card__name">
                    {" "}
                    {order?.customerDetail.firstName}{" "}
                    {order?.customerDetail.lastName}
                  </div>
                  <div className="address-card__row">
                    {order?.customerDetail.address}
                    <br />
                    {order?.customerDetail.state}
                    <br />
                    {order?.customerDetail.country}
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Phone Number</div>
                    <div className="address-card__row-content">
                      {order?.customerDetail.phone}
                    </div>
                  </div>
                  <div className="address-card__row">
                    <div className="address-card__row-title">Email Address</div>
                    <div className="address-card__row-content">
                      {order?.customerDetail.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <PDFDownloadLink
            document={<InvoiceDocument order={order} />}
            fileName={`OneStopCar-Invoice-${order.orderNo}.pdf`}
          >
            {({ loading }) => (
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Generating..." : "Download Invoice PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default Order_Success;
