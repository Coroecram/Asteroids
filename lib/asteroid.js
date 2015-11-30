(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Asteroid = Asteroids.Asteroid = function (game, pos) {
    this.vel = [Math.floor((Math.random() + 0.5) * 2), Math.floor((Math.random() + 0.5) * 2)]
    Asteroids.MovingObject.call(this, {
      pos: pos,
      vel: this.vel,
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      game: game
    });
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.COLOR = "blue";
  Asteroid.RADIUS = 30;

})();
