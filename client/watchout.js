// function to create a set of asteroids
var generateLocations = function(numAsteroids) {
  var locations = [];
  for (var i = 0; i < numAsteroids; i ++) {
    var location = {};
    var body = d3.select("body");
    location.x = +d3.select('body').style('width').slice(0, -2) * Math.random();
    location.y = +d3.select('body').style('height').slice(0, -2) * Math.random();
    locations.push(location);
  }
  return locations;
};

var asteroids = d3.select('body').selectAll('.asteroids');
asteroids.data(generateLocations(10)).enter().append('div')
    .classed('asteroid', true)
    .style('left', function(d, i) { return d.x + 'px'; })
    .style('top', function(d) { return d.y + 'px';});