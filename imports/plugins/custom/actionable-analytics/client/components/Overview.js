import React from "react";

/**
 * Overview section component
 * @param {Object} overview
 *
 * @returns {Node} jsx section
 */
const Overview = (overview) => {
  const { data } = overview;
  return (
    <div className="overview">
      <h4>Overview</h4>
      <div>
        <ul className="list-group">
          <li className="list-group-item">Total Sales: <strong>${data.totalSales}</strong></li>
          <li className="list-group-item">Total Shipping Cost: <strong>${data.shippingCost}</strong></li>
          <li className="list-group-item">Total Items Purchased: <strong>{data.totalItemsPurchased}</strong></li>
          <li className="list-group-item">Total Orders Placed: <strong>{data.totalOrdersPlaced}</strong></li>
          <li className="list-group-item">Cancelled Orders: <strong>{data.cancelledOrders}</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
