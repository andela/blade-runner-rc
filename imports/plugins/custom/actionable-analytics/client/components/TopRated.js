import React from "react";
import AnalyticsBarChart from "./BarChart";

/**
 * Top Rated section
 * @param {Object} topRated
 *
 * @returns {Node} jsx section
 */
const TopRated = (topRated) => {
  return (
    <div className="top-rated">
      <h4>Top Rated</h4>
      <AnalyticsBarChart
        data={topRated.topRated}
        xaxisDataKey={"name"}
        barDataKey={"rating"}
        labelValue={"Rating"}
      />
    </div>
  );
};

export default TopRated;
