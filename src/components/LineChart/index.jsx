import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { CustomSelect } from "../DataTableV2/DataTable.styles";
import DateRangePickerV2 from "../DateRangePickerV2";
import { Row } from "../Shared";
import useWindowSize from "../../hooks/useWindowSize";
const data = [
  { name: "JUL", value: 25, fValue: 22 },
  { name: "AUG", value: 20, fValue: 20 },
  { name: "SEP", value: 30, fValue: 36 },
  { name: "OCT", value: 45, fValue: 34 },
  { name: "NOV", value: 40, fValue: 28 },
  { name: "DEC", value: 23, fValue: 33 },
  { name: "DEC1", value: 23, fValue: 33 },
  { name: "DEC2", value: 23, fValue: 33 },
  { name: "DEC4", value: 23, fValue: 33 },
  { name: "DEC3", value: 100, fValue: 33 },
];

const width = 980;
const height = 140;
const padding = 18;

const LineChart = ({ header, filters }) => {
  const [chartData, setChartData] = useState(data);
  const svgRef = useRef();
  const size = useWindowSize();

  const width = size.width < 980 ? size.width - 200 : 980;
  const height = 140;
  const padding = 18;

  useEffect(() => {
    //clear svg before drawing new chart
    d3.select(svgRef.current).selectAll("*").remove();
    // setup x and y scales
    const xScale = d3
      .scalePoint()
      .domain(chartData.map((d) => d.name))
      .range([padding, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(chartData, (d) => {
          return d.value;
        }),
        d3.max(chartData, (d) => {
          return d.value;
        }),
      ])
      .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).tickSize(0).ticks(5);

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + padding * 3)
      .attr("height", height + padding * 3)
      .call(responsivefy) // this is all it takes to make the chart responsive
      .append("g")
      .attr("transform", `translate(${padding * 2}, ${padding})`);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - padding + 10})`)
      .attr("id", "xaxis")
      .style("color", "#282A37")
      .style("font-size", "12px")
      .style("font-family", "GilroyRegular")
      .call(xAxis)
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${padding},0)`)
      .attr("id", "yaxis")
      .style("color", "#282A37")
      .style("font-size", "12px")
      .style("font-family", "GilroyRegular")
      .call(yAxis)
      .call((g) => g.select(".domain").remove());

    // Setup functions to draw lines

    const line = d3
      .line()
      .x((d) => xScale(d.name))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .attr("d", (value) => line(chartData))
      .attr("fill", "none")
      .attr("strokeWidth", "2px")
      .attr("stroke", "#9747FF");

    function responsivefy(svg) {
      // container will be the DOM element the svg is appended to
      // we then measure the container and find its aspect ratio
      const container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width"), 10),
        height = parseInt(svg.style("height"), 10),
        aspect = width / height;

      // add viewBox attribute and set its value to the initial size
      // add preserveAspectRatio attribute to specify how to scale
      // and call resize so that svg resizes on inital page load
      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

      // add a listener so the chart will be resized when the window resizes
      // to register multiple listeners for same event type,
      // you need to add namespace, i.e., 'click.foo'
      // necessary if you invoke this function for multiple svgs
      // api docs: https://github.com/mbostock/d3/wiki/Selections#on
      d3.select(window).on("resize." + container.attr("id"), resize);

      // this is the code that actually resizes the chart
      // and will be called on load and in response to window resize
      // gets the width of the container and proportionally resizes the svg to fit
      function resize() {
        const targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
    }
  }, [chartData]);

  return (
    <Container>
      <Header>
        <div className="title">Branch Perfomance</div>
        {filters && <Filters filters={filters} />}
      </Header>
      <div id="chart" ref={svgRef}></div>
    </Container>
  );
};

export default LineChart;

const Filters = ({ filters }) => {
  return (
    <Row gap={"1rem"} style={{ justifyContent: "flex-end" }}>
      {filters.map((filter, index) => (
        <div key={index}>
          {filter.type === "Select" ? (
            <CustomSelect
              className="select-filter"
              classNamePrefix="filter-opt"
              isClearable={true}
              isSearchable={true}
              placeholder={filter.label}
              name={filter.key}
              options={filter.opt}
            />
          ) : (
            <DateRangePickerV2 />
          )}
        </div>
      ))}
    </Row>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* background-color: green; */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 2rem;
  .title {
    font-family: gilroyBold;
    font-size: 1.5rem;
    width: 100%;
  }
  .subTilte {
    font-family: GilroyRegular;
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  font-family: GilroyRegular;
`;

const ColorKey = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  gap: 0.5rem;
  .color {
    width: 16px;
    height: 16px;
    border-radius: 5px;
    background-color: ${(props) => props.color};
  }
`;
