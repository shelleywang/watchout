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

// places asteroids onto the body
var generateAsteroids = function() {
  svg.selectAll('.asteroid').data(generateLocations())
    .enter().append('image')
    .classed('asteroid', true)
    .attr('x', function(d, i) { return d.x + 'px'; })
    .attr('y', function(d) { return d.y + 'px';})
    .attr('xlink:href', 'jellyfish.gif')
    .attr('height',80)
    .attr('width',80);
};


var moveAsteroids = function(element) {
  // var asteroids = d3.selectAll('.asteroid');
  element.transition().duration(2000)
    .attr('x', function(d, i) { return generateRandomLocation().x + 'px'; })
    .attr('y', function(d) { return generateRandomLocation().y + 'px';})
    .each('end', function() {
      moveAsteroids( d3.select(this));
    } );
};

// Initial setup
generateAsteroids();
moveAsteroids(d3.selectAll('.asteroid'));


// PLAYER STUFF

var generatePlayer = function() {
  svg.selectAll('.player').data([generateRandomLocation()])
    .enter().append('image')
    .classed('player', true)
    .attr("transform", function(d){return 'translate(' + d.x + ',' + d.y + ')'})
    .attr('xlink:href', 'fish.gif')
    .attr('height',100)
    .attr('width',100)
    .attr('x', -50)
    .attr('y', -50);
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
window.prevCollision = false;
window.highScore = 0;
window.currentScore = 0;

var findCollisions = function() {
  var asteroids = d3.selectAll('.asteroid');
  //find centerpoint of player
  var playerX = d3.transform(d3.select('.player').attr("transform")).translate[0] ; 
  var playerY = d3.transform(d3.select('.player').attr("transform")).translate[1] ;

  var collision = false;
  // loop over array of asteroids
  asteroids.each(function(asteroid) {
    // find centerpoint of asteroid
    var asteroidX = asteroid.x;
    var asteroidY = asteroid.y;

    // check if player is overlapping with asteroid
    // absolute value of difference between player.x and asteroid.x < radii 
    var overlappingX = Math.abs(playerX - asteroidX) < 60;
    // absolute value of difference between player.y and asteroid.y < radii
    var overlappingY = Math.abs(playerY - asteroidY) < 60;
    
    if (overlappingX && overlappingY) {
      collision = true;
    }
  });

  if (collision) {
    if (prevCollision !== collision) {
      collisionCounter ++;
    }
  }
  prevCollision = collision;
}

d3.timer(findCollisions);


// run the loop forever 
setInterval(function() {
  d3.selectAll('.collisions').selectAll('span').text(function () {return collisionCounter;});
  if (currentScore > highScore) {
    highScore = currentScore;
    d3.selectAll('.high').selectAll('span').text(function () {return highScore;});
  }
  if (!prevCollision) {
    currentScore++;
  } else {
    currentScore = 0;
  }
  d3.selectAll('.current').selectAll('span').text(function () {return currentScore;});
},100);


