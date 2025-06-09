import React, { useContext, useState } from "react";
import Navigate from "./Navigate";
import logo from "../../assets/images/logo90x90.png";
import Orders from "../components/Orders";
import { useNavigate } from "react-router";
import { productContext } from "../../context/productContext/productContext";
const Dashboard = () => {
  const { allOrders, loading } = useContext(productContext);
  const navigate = useNavigate();
  const showOrderHistory = (order) => {
    navigate(`/order_detail/${order.orderNo}`, {
      state: { order },
    });
  };
  return (
    <>
      <div className="block-space block-space--layout--after-header"></div>
      <div className="block">
        <div className="container container--max--xl">
          <div className="row">
            <Navigate />
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <div className="dashboard">
                <div className="dashboard__profile card profile-card">
                  <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                      <img src={logo} alt="OneStopCar" />
                    </div>
                    <div className="profile-card__name">OneStopCar</div>
                    <div className="profile-card__email">
                      sales@onestopcar.com
                    </div>
                    <div className="profile-card__edit">
                      <a
                        href="edit_profile"
                        className="btn btn-secondary btn-sm"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="dashboard__address card address-card address-card--featured">
                  <div className="address-card__badge tag-badge tag-badge--theme">
                    Default
                  </div>
                  <div className="address-card__body">
                    <div className="address-card__name">M.Abiid</div>
                    <div className="address-card__row">
                      G Mangolia Park
                      <br />
                      near, M gate
                      <br />
                      Gujranwala
                    </div>
                    <div className="address-card__row">
                      <div className="address-card__row-title">
                        Phone Number
                      </div>
                      <div className="address-card__row-content">
                        0311-053-2034
                      </div>
                    </div>
                    <div className="address-card__row">
                      <div className="address-card__row-title">
                        Email Address
                      </div>
                      <div className="address-card__row-content">
                        onestopcar.admin@gmail.com
                      </div>
                    </div>
                    <div className="address-card__footer">
                      <a href="">Edit Address</a>
                    </div>
                  </div>
                </div>
                <div className="dashboard__orders card">
                  <div className="card-header">
                    <h5>Recent Orders</h5>
                  </div>
                  <div className="card-divider"></div>
                  {/* orders  */}
                  <Orders
                    currentOrders={allOrders.slice(0, 4)}
                    loading={loading}
                    showOrderHistory={showOrderHistory}
                  />
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

export default Dashboard;
