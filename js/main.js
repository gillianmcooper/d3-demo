/* 575 boilerplate main.js */
window.onload = function(){

  var width = 900, height = 500;

  var container = d3.select("body")//creating the container inside the body div
    .append("svg")//tells that it is going to be an svg
    .attr("width", width)//setting the width with the variable declared above
    .attr("height", height)//setting the height with the above variable
    .attr("class", "container")//assigning the class as container

var innerRect = container.append("rect")//appending a rectangle for the inner rectangle to the above container
  .datum(400)//sets the datum
  .attr("width", function(d){
  return d*2})//width function
  .attr("height", function(d){
  return d;  })//height function
  .attr("class","innerRect")
  .attr("x", 50) //assigning the posistion on the x axis
  .attr("y", 50)

//array fo city populaitons
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

var x = d3.scale.linear()//creating the scale for the graph- using the built in .linear scale builder
  .range([90,730])
  .domain([0,3])
  var minPop = d3.min(cityPop, function(d){
    return d.population;
  });

  var maxPop = d3.max(cityPop, function(d){
    return d.population;
  });

  var y = d3.scale.linear()
    .range([450, 50])//defining the range of the scale bar
    .domain([
      0,
      600000
    ]);
var color = d3.scale.linear()// defining the color range for the circles
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

var title = container.append("text")//appending a title
  .attr("class", "title")
  .attr("text-anchor", "middle")
  .attr("x", 450)//titles placement
  .attr("y", 30)
  .text("City Populations");

var labels = container.selectAll(".labels")//appending labels for each circle
  .data(cityPop)
  .enter()
  .append("text")
  .attr("class", "labels")
  .attr("y", function(d){
    return y(d.population)+1;
  });
var nameLine = labels.append("tspan")//splitting the text so it is one two lines for the labels
  .attr("class", "nameLine")
  .attr("x", function(d,i){
    return x(i) + Math.sqrt(d.population*0.01/Math.PI) + 5;
  })
  .text(function(d){
    return d.city;
  });

var format = d3.format(",");//using this to format the number with a ',' ever 3rd digit

var popLine = labels.append("tspan")
  .attr("class", "popLine")
  .attr("x", function(d,i){
      return x(i) + Math.sqrt(d.population*0.01/Math.PI) + 5;
  })
  .attr("dy", "16")
  .text(function(d){
    return "Pop. " + format(d.population);
  });
var circles = container.selectAll(".circles") //creating an empty container for circles
        .data(cityPop) //passing the cityPop array
        .enter() //joining the data section and creates an array of placeholders
        .append("circle") //filling the container
        .attr("class", "circles")//naming the circles
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
