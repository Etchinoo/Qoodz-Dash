import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
const index = () => {
  //   const [chartData, setChartData] = useState(data);
  const svgRef = useRef();
  useEffect(() => {
    // clear svg before drawing new chart
    d3.select(svgRef.current).selectAll("*").remove();
    var width = 200;
    var height = 200;
    var padding = 0;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of padding.
    var radius = Math.min(width, height) / 2 - padding;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .call(responsivefy) // this is all it takes to make the chart responsive
      // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      // .attr("transform", `translate(${width / 2}, ${height / 2})`);
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create dummy data
    // var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
    var data = [
      { name: "Male", value: "72", color:"#9747FF" },
      { name: "Female", value: "28", color:"#AEDDEB" },
    ];

    // set the color scale
    // var color = d3.scaleOrdinal().domain(data).range(["#98abc5", "#a05d56"]);

    // // Compute the position of each group on the pie:
    // var pie = d3.pie().value(function (d) {
    //   return d.value;
    // });

    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);
    var data_ready = pie(data);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(60) // This is the size of the donut hole
          .outerRadius(radius)
      )
      .attr("fill", (d) => d.data.color)
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("opacity", 0.8);


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
  }, []);

  return <div  ref={svgRef}></div>;
};

export default index;
