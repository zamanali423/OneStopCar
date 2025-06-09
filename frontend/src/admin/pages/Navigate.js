import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { productContext } from "../../context/productContext/productContext";

const Navigate = () => {
  const { pathname } = useLocation();
  const { logout } = useContext(productContext);
  const navigate = useNavigate();

  const Logout = () => {
    logout();
    navigate("/register");
  };
  return (
    <>
      <div className="col-12 col-lg-3 d-flex">
        <div className="account-nav flex-grow-1">
          <h4 className="account-nav__title">Navigation</h4>
          <ul className="account-nav__list">
            <li
              className={`account-nav__item ${
                pathname === "/dashboard" ? "account-nav__item--active" : ""
              }`}
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              className={`account-nav__item ${
                pathname === "/vehicles" ? "account-nav__item--active" : ""
              }`}
            >
              <Link to="/vehicles">Garage</Link>
            </li>
            <li
              className={`account-nav__item ${
                pathname === "/edit_profile" ? "account-nav__item--active" : ""
              }`}
            >
              <Link to="/edit_profile">Edit Profile</Link>
            </li>
            <li
              className={`account-nav__item ${
                pathname === "/order_history" ? "account-nav__item--active" : ""
              }`}
            >
              <Link to="/order_history">Order History</Link>
            </li>
            {/* <li
              className={`account-nav__item ${
                pathname === "/order_detail" ? "account-nav__item--active" : ""
              }`}
            >
              <Link to="/order_detail">Order Details</Link>
            </li> */}
            <li
              className={`account-nav__item ${
                pathname === "/change_password"
                  ? "account-nav__item--active"
                  : ""
              }`}
            >
              <Link to="/change_password">Password</Link>
            </li>
            <li className="account-nav__divider" role="presentation"></li>
            <li className="account-nav__item ">
              <Link to="" onClick={Logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigate;
