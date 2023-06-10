import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Dubai",
    uv: 20,
  },
  {
    name: "Agman",
    uv: 30,
  },
  {
    name: "Abo Dahabi",
    uv: 26,
  },
  {
    name: "Dubai",
    uv: 59,
  },
];

const ChartsBar = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"  height={20}/>
        <YAxis width={30}/>
        <Tooltip />
        {/* <Legend /> */}
        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
        <Bar dataKey="uv" fill="rgba(151, 71, 255, 1)" maxBarSize={30}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartsBar;
