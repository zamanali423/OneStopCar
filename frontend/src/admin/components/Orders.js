import React from "react";

const Orders = ({ currentOrders, loading, showOrderHistory }) => {
  return (
    <>
      <div className="card-table">
        <div className="table-responsive-sm">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : currentOrders.length > 0 ? (
                currentOrders.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => showOrderHistory(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{color:"red"}}>#{item?.orderNo}</td>
                    <td>{new Date(item?.date).toLocaleDateString()}</td>
                    <td>{item?.status}</td>
                    <td>Rs.{item?.totalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
