(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = 600
  Game.DIM_Y = 600
  Game.NUM_ASTEROIDS = 5

  Game.prototype.add = function (object) {
    this.asteroids.push(object);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var newPos_x = Math.abs(pos[0] % Game.DIM_X);
    var newPos_y = Math.abs(pos[1] % Game.DIM_Y);
    return [newPos_x, newPos_y];
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length-1; i++){
      for (var j = i+1; j < this.asteroids.length; j++){
        if ( this.asteroids[i].isCollidedWith(this.asteroids[j]) ){
          // alert("COLLISION")
        };
      }
    }
  };

  Game.prototype.randomPosition = function () {
  return [
    Game.DIM_X * Math.random(),
    Game.DIM_Y * Math.random()
  ];
};

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid){

  }

})();
