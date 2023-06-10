import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const width = 480;
const height = 385;
const padding = 25;

const BarChart = ({ title, subTitle, borderColor, barColor, data }) => {
  const [chartData, setChartData] = useState(data);
  const svgRef = useRef();

  useEffect(() => {
    //Setup functions for scales
    //Xscale
    const xScale = d3
      .scaleBand()
      .domain(chartData.map((d) => d.name))
      .range([padding, width - padding]);
    //Yscale
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.value))])
      .range([height - padding, padding])
      .nice();
    // setup x and y axis functions
    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).tickSize(0).ticks(5);
    //function to draw bars
    const drawBars = () => {
      d3.select(svgRef.current)
        .selectAll("rect")
        .data(chartData)
        .join("rect")
        // .style("max-width", "80px")
        .attr("x", (d) => xScale(d.name) + 33)
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth() - padding - 30)
        // .attr("max-width", 24)
        .attr("height", (d) => height - padding - yScale(d.value))
        .attr("fill", barColor);
    };
    //draw bars
    drawBars();
    // draw x and y axis
    d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(0,${height - padding + 10})`)
      .attr("id", "xaxis")
      .style("color", "#282A37")
      .style("font-size", "16px")
      .style("font-family", "GilroyRegular")
      .call(xAxis)
      .call((g) => g.select(".domain").remove());

    d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .attr("id", "yaxis")
      .style("font-size", "16px")
      .style("font-family", "GilroyRegular")
      .style("color", "#282A37")
      .call(yAxis)
      .call((g) => g.select(".domain").remove());
  }, [chartData]);

  return (
    <ChartCard borderColor={borderColor}>
      <Header>
        <div className="title">{title}</div>
        <div className="subTitle">{subTitle}</div>
      </Header>
      <svg id="chart" viewBox={`0 0 ${width} ${height}`} ref={svgRef}></svg>
    </ChartCard>
  );
};

export default BarChart;

const ChartCard = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border: 25px solid ${(props) => props.borderColor};
  width: 100%;
  border-radius: 25px;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  .title {
    font-family: GilroyRegular;
  }
  .subTitle {
    font-family: GilroyRegular;
  }
`;
