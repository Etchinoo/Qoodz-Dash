import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import useWindowSize from "../../hooks/useWindowSize";

const data = [
  { name: "18-24", value: 20 },
  { name: "25-34", value: 55 },
  { name: "35-44", value: 20 },
  { name: "45-54", value: 5 },
  { name: "55-64", value: 45 },
  { name: "65+", value: 70 },
];

const HorzBarChart = ({ barColor = "#0D99FF", _data, age_ranges }) => {
  const svgRef = useRef();
  const size = useWindowSize();

  const padding = 16;
  const width = 980;
  var height = 250;

  const draw = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    // setup x and y scales
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3
      .scaleBand()
      .domain(age_ranges?.map((d) => d.range))
      .range([height, 0]);
    // setup x and y axis functions
    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisLeft(yScale).tickSize(0);

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width * 6)
      .attr("height", height + padding)
      .call(responsivefy) // this is all it takes to make the chart responsive
      .append("g")
      .attr("transform", `translate(${0}, ${padding})`);
    svg
      .selectAll("myRect")
      .data(age_ranges)
      .enter()
      .append("rect")
      .attr("x", padding * 4)
      .attr("y", function (d) {
        return yScale(d.range) - padding / 1.4;
      })
      .attr("width", (d) => xScale(d.count))
      .attr("height", yScale.bandwidth() - padding)
      // .attr("fill", "#69b3a2");
      .attr("fill", barColor);

    svg
      .append("g")
      .attr("id", "yaxis")
      .attr("transform", `translate(${padding * 3},-18)`)
      .call(yAxis)
      .style("color", "#282A37")
      .style("font-size", "16px")
      .style("font-family", "GilroyRegular")
      .call((g) => g.select(".domain").remove());

    svg
      .append("g")
      .attr("transform", `translate(${padding * 4}, ${height - padding})`)
      .call(xAxis)
      .attr("id", "xaxis")
      .style("color", "#282A37")
      .style("font-size", "16px")
      .style("font-family", "GilroyRegular")
      .call((g) => g.select(".domain").remove());

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
  };
  useEffect(() => {
    //clear svg before drawing new chart
    if (age_ranges) {
      draw();
    }
  }, [age_ranges]);

  return (
    <div div className={"chartContainer"}>
      <StatTitle>Age Range Disrtibution</StatTitle>
      <div id="chart" ref={svgRef}></div>
    </div>
  );
};

export default HorzBarChart;

const StatTitle = styled.div`
  font-family: "GilroyRegular";
  font-size: 18px;
  line-height: 28px;
  color: #282a37;
`;
