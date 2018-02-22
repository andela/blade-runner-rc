import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BarChartData = (data) => {
  return (
    <BarChart width={600} height={300} data={data.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name"/>
      <YAxis label={{ value: "Quantity Sold", angle: -90, position: "insideLeft" }}/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartData;
