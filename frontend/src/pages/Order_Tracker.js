import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { productContext } from "../context/productContext/productContext";

const Order_Tracker = () => {
  const [orderNo, setOrderNo] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { url } = useContext(productContext);

  const validateInputs = () => {
    if (!orderNo || !email) {
      toast.error("Please fill all the required fields");
      return false;
    }
    return true;
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (
      orderNo.startsWith("e") ||
      orderNo.startsWith(".") ||
      orderNo.startsWith("E")
    ) {
      toast.error("Order ID contain only numbers");
      return;
    }
    try {
      if (!validateInputs()) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const res = await fetch(
        `${url}/orders/track-order?orderNo=${orderNo}&email=${email}`
      );
      const order = await res.json();
      if (!res.ok) {
        toast.error(order.msg);
        setIsLoading(false);
      } else {
        setEmail("");
        setOrderNo(0);
        navigate("/order_success", { state: { order } });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Internet connection error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card ml-md-3 mr-md-3">
                <div className="card-body card-body--padding--2">
                  <h1 className="card-title card-title--lg">Track Order</h1>
                  <p className="mb-4">
                    Enter the order ID and email address that was used to create
                    the order, and then click the track button.
                  </p>
                  <form onSubmit={handleTrackOrder}>
                    <div className="form-group">
                      <label htmlFor="track-order-id">Order ID</label>
                      <input
                        id="track-order-id"
                        type="number"
                        className="form-control"
                        placeholder="Order ID"
                        value={orderNo}
                        onChange={(e) => setOrderNo(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="track-email">Email address</label>
                      <input
                        id="track-email"
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group pt-4 mb-1">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        {isLoading ? "Tracking..." : "Track Order"}
                      </button>
                    </div>
                  </form>
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

export default Order_Tracker;
