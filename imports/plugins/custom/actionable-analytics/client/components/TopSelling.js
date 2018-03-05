import React from "react";
import AnalyticsBarChart from "./BarChart";

/**
 * Top selling section
 * @param {Object} data
 *
 * @returns {Node} jsx section
 */
const TopSelling = (data) => {
  if (data.data.length === 0) {
    return <h2>No orders were placed within this period</h2>;
  }

  return (
    <div className="bar-chart">
      <h4>Top Selling Products</h4>
      <AnalyticsBarChart
        data={data.data}
        xaxisDataKey={"name"}
        barDataKey={"quantity"}
        labelValue={"Quantity Sold"}
      />
    </div>
  );
};

export default TopSelling;
