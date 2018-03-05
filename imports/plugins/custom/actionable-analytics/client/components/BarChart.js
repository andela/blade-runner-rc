import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const propTypes = {
  barDataKey: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  labelValue: PropTypes.string.isRequired,
  xaxisDataKey: PropTypes.string.isRequired
};

/**
 * BarChart component
 * @param {Object} props
 *
 * @returns {Node} BarChart jsx
 */
const AnalyticsBarChart = ({ data, xaxisDataKey, barDataKey, labelValue }) => {
  return (
    <BarChart width={800} height={400} data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey={xaxisDataKey}/>
      <YAxis label={{ value: labelValue, angle: -90, position: "insideLeft" }}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Bar dataKey={barDataKey} fill="#30556A" />
    </BarChart>);
};

AnalyticsBarChart.propTypes = propTypes;

export default AnalyticsBarChart;
