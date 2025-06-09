import React, { useContext, useEffect, useState } from "react";
import Navigate from "./Navigate";
import { productContext } from "../../context/productContext/productContext";
import { Link, useNavigate } from "react-router-dom";
import Orders from "../components/Orders";

const Order_History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const { allOrders, loading} = useContext(productContext);
  const navigate = useNavigate();

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
              <div className="card">
                <div className="card-header">
                  <h5>Order History</h5>
                </div>
                <div className="card-divider"></div>
                {/* orders  */}
                <Orders
                  currentOrders={currentOrders}
                  loading={loading}
                  showOrderHistory={showOrderHistory}
                />
                <div className="card-divider"></div>
                <div className="card-footer">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link page-link--with-arrow"
                        onClick={handlePrevPage}
                        aria-label="Previous"
                      >
                        <span
                          className="page-link__arrow page-link__arrow--left"
                          aria-hidden="true"
                        >
                          <svg width="7" height="11">
                            <path d="M6.7,0.3c-0.4-0.4-0.9-0.4-1.3,0L0,5.5l5.4,5.2c0.4,0.4,0.9,0.3,1.3,0c0.4-0.4,0.4-1,0-1.3l-4-3.9l4-3.9C7.1,1.2,7.1,0.6,6.7,0.3z" />
                          </svg>
                        </span>
                      </button>
                    </li>
                    {pageNumbers.map((num) => (
                      <li
                        key={num}
                        className={`page-item ${
                          currentPage === num ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link page-link--with-arrow"
                        onClick={handleNextPage}
                        aria-label="Next"
                      >
                        <span
                          className="page-link__arrow page-link__arrow--right"
                          aria-hidden="true"
                        >
                          <svg width="7" height="11">
                            <path d="M0.3,10.7c0.4,0.4,0.9,0.4,1.3,0L7,5.5L1.6,0.3C1.2-0.1,0.7,0,0.3,0.3c-0.4,0.4-0.4,1,0,1.3l4,3.9l-4,3.9C-0.1,9.8-0.1,10.4,0.3,10.7z" />
                          </svg>
                        </span>
                      </button>
                    </li>
                  </ul>
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

export default Order_History;
