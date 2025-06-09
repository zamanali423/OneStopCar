import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navigate from "./Navigate";
import { productContext } from "../../context/productContext/productContext";
import toast from "react-hot-toast";

const Order_Detail = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const { sendMessageOnEmail, url, token, setAllOrders } =
    useContext(productContext);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order?.status) setStatus(order.status);
  }, [order]);

  const handleUpdate = async () => {
    if (!order) return;

    try {
      setLoading(true);
      const response = await fetch(`${url}/admin/orders/update/${order._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const updatedOrder = await response.json();

      if (!response.ok)
        throw new Error(updatedOrder.message || "Update failed");

      if (updatedOrder.status === "Completed") {
        await sendMessageOnEmail({
          ...updatedOrder,
          ...updatedOrder.customerDetail,
          itemDetail: updatedOrder.itemDetail,
        });
      }

      setAllOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );

      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.message || "Internet connection error");
    } finally {
      setLoading(false);
    }
  };

  const renderAddressCard = (label) => (
    <div className="card address-card address-card--featured">
      <div className="address-card__badge tag-badge tag-badge--theme">
        {label} Address
      </div>
      <div className="address-card__body">
        <div className="address-card__name">
          {order.customerDetail?.firstName} {order.customerDetail?.lastName}
        </div>
        <div className="address-card__row">
          {order.customerDetail?.address}
          <br />
          {order.customerDetail?.state}
          <br />
          {order.customerDetail?.country}
        </div>
        <div className="address-card__row">
          <div className="address-card__row-title">Phone Number</div>
          <div className="address-card__row-content">
            {order.customerDetail?.phone}
          </div>
        </div>
        <div className="address-card__row">
          <div className="address-card__row-title">Email Address</div>
          <div className="address-card__row-content">
            {order.customerDetail?.email}
          </div>
        </div>
      </div>
    </div>
  );

  if (!order) {
    return (
      <div className="container mt-5">
        <h3>Order not found!</h3>
      </div>
    );
  }

  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container container--max--xl">
          <div className="row">
            <Navigate />
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <div className="card">
                <div className="order-header">
                  <div className="order-header__actions">
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => window.history.back()}
                    >
                      Back to list
                    </button>
                  </div>
                  <h5 className="order-header__title">
                    Order #{order.orderNo}
                  </h5>
                  <div className="order-header__subtitle">
                    Was placed on{" "}
                    <mark>{new Date(order.date).toLocaleDateString()}</mark> and
                    is currently{" "}
                    <select
                      name="status"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {[
                        "Pending Payment",
                        "Processing",
                        "On Hold",
                        "Completed",
                        "Cancel",
                        "Failed",
                        "Refund",
                      ].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="card-divider" />
                <div className="card-table">
                  <div className="table-responsive-sm">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody className="card-table__body card-table__body--merge-rows">
                        {order.itemDetail?.map((p, idx) => (
                          <tr key={idx}>
                            <td>{p.title}</td>
                            <td>{p.quantity}</td>
                            <td>Rs.{p.cost * p.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tbody className="card-table__body card-table__body--merge-rows">
                        <tr>
                          <th>Subtotal</th>
                          <td colSpan="2">
                            Rs.{order.totalAmount + order.totalAmount * 0.3}
                          </td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td colSpan="2">Free</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Total</th>
                          <td colSpan="2">Rs.{order.totalAmount}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row mt-3 no-gutters mx-n2">
                <div className="col-sm-6 col-12 px-2">
                  {renderAddressCard("Shipping")}
                </div>
                <div className="col-sm-6 col-12 px-2 mt-sm-0 mt-3">
                  {renderAddressCard("Billing")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
      <div className="block-space block-space--layout--before-footer"></div>
    </>
  );
};

export default Order_Detail;
