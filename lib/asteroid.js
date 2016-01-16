(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Asteroid = Asteroids.Asteroid = function (options) {
      options.color = Asteroid.COLOR;
      options.pos = [300, 400]//options.pos || options.game.reasonablePosition();
      options.radius = Asteroid.RADIUS;
      options.angle = 0;
      options.rotation = Asteroids.Util.asteroidRotation();
      options.src = './assets/img/asteroid-large.png'
      options.vector = options.vector || Asteroids.Util.randomVector(Asteroid.SPEED);

      Asteroids.MovingObject.call(this, options);
    };

  Asteroid.COLOR = "#008080";
  Asteroid.RADIUS = 29;
  Asteroid.SPEED = 2;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.isAsteroid = true;
})();
