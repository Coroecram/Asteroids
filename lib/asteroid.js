(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Asteroid = Asteroids.Asteroid = function (options) {
      options.color = Asteroid.COLOR;
      options.pos = options.pos || options.game.reasonablePosition();
      options.radius = Asteroid.RADIUS;
      options.vector = options.vector || Asteroids.Util.randomVector(Asteroid.SPEED);

      Asteroids.MovingObject.call(this, options);
    };

    Asteroid.COLOR = "#008080";
    Asteroid.RADIUS = 50;
    Asteroid.SPEED = 2;

    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

    Asteroid.prototype.isAsteroid = true;
})();
