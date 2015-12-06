(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroids = Asteroids.MiniAsteroids = function (options) {
      options.color = MiniAsteroids.COLOR;
      options.radius = MiniAsteroids.RADIUS;
      options.angle = 0;
      options.rotation = Util.asteroidRotation();
      options.src = './assets/img/asteroid-medium.png'

      Asteroids.MovingObject.call(this, options);
    };

    MiniAsteroids.COLOR = "#FFA500";
    MiniAsteroids.RADIUS = 19;

    Asteroids.Util.inherits(MiniAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroids, Asteroids.Asteroid);

    MiniAsteroids.prototype.isMiniAsteroid = true;
})();
