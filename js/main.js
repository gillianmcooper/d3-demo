/* 575 boilerplate main.js */
window.onload = function(){

  var width = 900, height = 500;

  var container = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "container")

var innerRect = container.append("rect")
  .datum(400)
  .attr("width", function(d){
  return d*2})
  .attr("height", function(d){
  return d;  })
  .attr("class","innerRect")
  .attr("x", 50) //position from left on the x (horizontal) axis
  .attr("y", 50)


  var cityPop = [
      {
          city: 'Hamilton',
          population: 152000
      },
      {
          city: 'Wellington',
          population: 204000
      },
      {
          city: 'Christchurch',
          population: 366100
      },
      {
          city: 'Otago',
          population: 202467
      }
  ];

var x = d3.scale.linear()
  .range([90,730])
  .domain([0,3])
  var minPop = d3.min(cityPop, function(d){
    return d.population;
  });

  var maxPop = d3.max(cityPop, function(d){
    return d.population;
  });

  var y = d3.scale.linear()
    .range([450, 50])
    .domain([
      0,
      600000
    ]);
var color = d3.scale.linear()
  .range([
    "#FDBE85",
    "#D94701"
  ])
  .domain([
    minPop,
    maxPop
  ]);

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")

var axis = container.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(50,0)")
  .call(yAxis);
  yAxis(axis);

var title = container.append("text")
  .attr("class", "title")
  .attr("text-anchor", "middle")
  .attr("x", 450)
  .attr("y", 30)
  .text("City Populations");

var labels = container.selectAll(".labels")
  .data(cityPop)
  .enter()
  .append("text")
  .attr("class", "labels")
  .attr("y", function(d){
    return y(d.population)+1;
  });
var nameLine = labels.append("tspan")
  .attr("class", "nameLine")
  .attr("x", function(d,i){
    return x(i) + Math.sqrt(d.population*0.01/Math.PI) + 5;
  })
  .text(function(d){
    return d.city;
  });

var format = d3.format(",");

var popLine = labels.append("tspan")
  .attr("class", "popLine")
  .attr("x", function(d,i){
      return x(i) + Math.sqrt(d.population*0.01/Math.PI) + 5;
  })
  .attr("dy", "16")
  .text(function(d){
    return "Pop. " + format(d.population);
  });
var circles = container.selectAll(".circles") //but wait--there are no circles yet!
        .data(cityPop) //passing the array
        .enter() //joining the data section and creates an array of placeholders
        .append("circle") //add a circle for each piece of data
        .attr("class", "circles")//create a class name to call it by
        .attr("id", function(d){
          return d.city;
        })
        .attr("r", function(d){ //circle radius
           var area = d.population*0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){ //x coordinate
            return 90 + (i * 180);
        })
        .attr("cy", function(d){ //y coordinate
            return y(d.population);
        })
        .style("fill", function(d,i){
            return color(d.population);
        })
        .style("stroke", "#000")
        .attr("cx", function(d, i){
          return x(i);
        });
    console.log(x);
};
