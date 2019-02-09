import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart extends Component {

    drawChart() {
    
        // 2. Use the margin convention practice 
        var margin = {top: 30, right: 30, bottom: 30, left: 30}
        , width = (window.innerWidth * .55) - margin.left - margin.right // Use the window's width 
        , height = (window.innerHeight * .55) - margin.top - margin.bottom; // Use the window's height

        // The number of datapoints
        var n = 21;

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
        // .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
        console.log(dataset);

        // 1. Add the SVG to the page and employ #2
        var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 3. Call the x axis in a group tag
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator 
        svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(i) })
        .attr("cy", function(d) { return yScale(d.y) })
        .attr("r", 5);

    //   const data = [120, 50, 60, 60, 90, 100];
        
    //   const svg = d3.select(".chart").append("svg").attr("width", 700).attr("height", 300);

    //   console.log(svg)

    // svg.selectAll("rect")
    // .data(data)
    // .enter()
    // .append("rect")
    // .attr("x", (d, i) => i * 70)
    // .attr("y", 0)
    // .attr("width", 25)
    // .attr("height", (d, i) => d)
    // .attr("fill", "green");
      
    }
  
    componentDidMount() {
      this.drawChart();
    }

    render(){
        return <div className="chart" id={"#" + this.props.id}>Chart</div>
      }
  }
  
  export default BarChart;