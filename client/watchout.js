// function to create a set of asteroids
window.numAsteroids = 10;

var generateLocations = function() {
  var locations = [];
  for (var i = 0; i < window.numAsteroids; i ++) {
    var location = {};
    var body = d3.select("body");
    var newLocation = generateRandomLocation();
    location.x = newLocation[0];
    location.y = newLocation[1];
    locations.push(location);
  }
  return locations;
};

var generateRandomLocation = function() {
  var x = (+d3.select('body').style('width').slice(0, -2) - 175) * Math.random() + 75; 
  var y = (+d3.select('body').style('height').slice(0, -2) - 175) * Math.random() + 70;
  return [x,y];
}


// adds SVG element to the body
var svg = d3.select("body").append("svg")
    .attr("width", '100%')
    .attr("height", '90%')
  .append("g");

// places asteroids onto the body
//var asteroids = d3.select('body').selectAll('.asteroids');
var generateAsteroids = function() {
  svg.selectAll('circle').data(generateLocations())
    .enter().append('circle')
    .classed('asteroid', true)
    .attr('cx', function(d, i) { return d.x + 'px'; })
    .attr('cy', function(d) { return d.y + 'px';})
    .attr('r', 20);
};


var moveAsteroids = function() {
  var asteroids = d3.selectAll('.asteroid');
  asteroids.data(generateLocations());
  asteroids.transition().duration(2000)
    .attr('cx', function(d, i) { return d.x + 'px'; })
    .attr('cy', function(d) { return d.y + 'px';});
};

generateAsteroids();
setInterval(function() {moveAsteroids();},2100);

//setTimeout
  //move all asteroids 

