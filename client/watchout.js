// function to create a set of asteroids
var generateLocations = function(numAsteroids) {
  var locations = [];
  for (var i = 0; i < numAsteroids; i ++) {
    var location = {};
    var body = d3.select("body");
    location.x = (+d3.select('body').style('width').slice(0, -2) - 175) * Math.random() + 75; 
    location.y = (+d3.select('body').style('height').slice(0, -2) - 175) * Math.random() + 70;
    locations.push(location);
  }
  return locations;
};

// adds SVG element to the body
var svg = d3.select("body").append("svg")
    .attr("width", '100%')
    .attr("height", '90%')
  .append("g");

// places asteroids onto the body
//var asteroids = d3.select('body').selectAll('.asteroids');
svg.selectAll('circle').data(generateLocations(10)).enter().append('circle')
    .classed('asteroid', true)
    .attr('cx', function(d, i) { return d.x + 'px'; })
    .attr('cy', function(d) { return d.y + 'px';})
    .attr('r', 20);

