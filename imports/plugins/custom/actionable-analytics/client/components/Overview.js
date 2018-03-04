import React from "react";
import { Reaction } from "/client/api";

/**
 * Overview section component
 * @param {Object} overview
 *
 * @returns {Node} jsx section
 */
const Overview = (overview) => {
  const { data } = overview;
  if (!data) {
    return <h2>No data exists for this time period</h2>;
  }

  const locale = Reaction.Locale.get();
  let currencySymbol = "";
  if (Object.keys(locale).length !== 0) {
    currencySymbol = locale.shopCurrency.symbol;
  }

  return (
    <div className="overview">
      <h4>Overview</h4>
      <div>
        <ul className="list-group">
          <li className="list-group-item">Total Sales: <strong>
            <span>{currencySymbol}</span>
            {data.totalSales}
          </strong>
          </li>
          <li className="list-group-item">Total Shipping Cost: <strong>
            <span>{currencySymbol}</span>
            {data.shippingCost}
          </strong>
          </li>
          <li className="list-group-item">Total Items Purchased: <strong>{data.totalItemsPurchased}</strong></li>
          <li className="list-group-item">Total Orders Placed: <strong>{data.totalOrdersPlaced}</strong></li>
          <li className="list-group-item">Cancelled Orders: <strong>{data.cancelledOrders}</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
