//ASTEROID STUFF


// function to create a set of asteroids
window.numAsteroids = 10;

var generateLocations = function() {
  var locations = [];
  for (var i = 0; i < window.numAsteroids; i ++) {
    var newLocation = generateRandomLocation();
    locations.push(newLocation);
  }
  return locations;
};

var generateRandomLocation = function() {
  var x = (+d3.select('body').style('width').slice(0, -2) - 175) * Math.random() + 75; 
  var y = (+d3.select('body').style('height').slice(0, -2) - 175) * Math.random() + 70;
  return { x:x, y:y };
}


// adds SVG element to the body
var svg = d3.select("body").append("svg")
    .attr("width", '100%')
    .attr("height", '90%')
  .append("g");



// STYLING JELLYFISH TEST

// var defs= svg.append('defs')
// defs.append('pattern')
//     .attr('id', 'fish')
//     .attr('patternUnits', 'userSpaceOnUse')
//     .attr('width', 160) //160
//     .attr('height', 150) //150
//   .append('svg:image')
//     .attr('xlink:href', 'http://orig11.deviantart.net/d50e/f/2012/356/0/0/jellyfish_icon_by_piirustus-d5ost8i.gif')
//     .attr("width", 70) //150
//     .attr("height", 70) //150
//     .attr('x',65) //20
//     .attr('y',65); //20



// svg.append("circle")
//     .attr("r",'60') //75
//     .attr('cx',100)
//     .attr('cy',100)
//     .attr('stroke',"black") 
//     .attr('stroke-width',"3")
//     .attr("fill", "url(#fish)");

// TEST

// places asteroids onto the body
//var asteroids = d3.select('body').selectAll('.asteroids');
var generateAsteroids = function() {
  svg.selectAll('circle').data(generateLocations())
    .enter().append('circle')
    .classed('asteroid', true)
    .attr('cx', function(d, i) { return d.x + 'px'; })
    .attr('cy', function(d) { return d.y + 'px';})
    .attr('r', 20)
    .attr('fill','white');
};


var moveAsteroids = function() {
  var asteroids = d3.selectAll('.asteroid');
  asteroids.data(generateLocations());
  asteroids.transition().duration(2000)
    .attr('cx', function(d, i) { return d.x + 'px'; })
    .attr('cy', function(d) { return d.y + 'px';});
};


// Initial setup
generateAsteroids();
setInterval(function() {moveAsteroids();},2100);


// PLAYER STUFF

// TEST

var defs= svg.append('defs')
defs.append('pattern')
    .attr('id', 'fish')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 150) //160
    .attr('height', 150) //150
    .attr('x',-50)
    .attr('y',-50)
  .append('svg:image')
    .attr('xlink:href', 'https://38.media.tumblr.com/adb56cc7e2a2fbeaec8dfef1d409b543/tumblr_nn27cqMKDY1u4vod5o1_500.gif')
    .attr("width", 70) //150
    .attr("height", 70) //150
    .attr('x',15) //20
    .attr('y',15); //20

// svg.append("circle")
//     .attr("r",'30') //75
//     .attr('cx',100)
//     .attr('cy',100)
//     .attr('stroke',"black") 
//     .attr('stroke-width',"3")
//     .attr("fill", "url(#fish)");

// TEST


var generatePlayer = function() {
  svg.selectAll('.player').data([generateRandomLocation()])
    .enter().append('circle')
    .classed('player', true)
    .attr("transform", function(d){return 'translate(' + d.x + ',' + d.y + ')'})
    .attr('r', 30)
    .attr('cx',0)
    .attr('cy',0)
    .attr("fill", "url(#fish)");
};

var drag = d3.behavior.drag().on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

generatePlayer();
d3.selectAll('.player').call(drag);


// COLLISION STUFF

window.collisionCounter = 0;
window.highScore = 0;
window.currentScore = 0;

var findCollisions = function() {
  var asteroids = d3.selectAll('.asteroid');
  //find centerpoint of player
  var playerX = d3.transform(d3.select('.player').attr("transform")).translate[0]; 
  var playerY = d3.transform(d3.select('.player').attr("transform")).translate[1];

  var numCollisions = 0;
  // loop over array of asteroids
  asteroids.each(function(asteroid) {
    // find centerpoint of asteroid
    var asteroidX = asteroid.x;
    var asteroidY = asteroid.y;

    // check if player is overlapping with asteroid
    // absolute value of difference between player.x and asteroid.x < radii 
    var overlappingX = Math.abs(playerX - asteroidX) < 35;
    // absolute value of difference between player.y and asteroid.y < radii
    var overlappingY = Math.abs(playerY - asteroidY) < 35;
    
    if (overlappingX && overlappingY) {
      numCollisions = 1;
    }

  });
  return numCollisions;
}


// run the loop forever 
setInterval(function() {
  var numCollisions = findCollisions();
  collisionCounter += numCollisions;
  d3.selectAll('.collisions').selectAll('span').text(function () {return collisionCounter;});
  if (currentScore > highScore) {
    highScore = currentScore;
    d3.selectAll('.high').selectAll('span').text(function () {return highScore;});
  }
  if (numCollisions === 0) {
    currentScore++;
  } else {
    currentScore = 0;
  }
  d3.selectAll('.current').selectAll('span').text(function () {return currentScore;});
},50);


