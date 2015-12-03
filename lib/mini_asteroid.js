(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroids = Asteroids.MiniAsteroids = function (options) {
      options.color = MiniAsteroids.COLOR;
      options.radius = MiniAsteroids.RADIUS;

      Asteroids.MovingObject.call(this, options);
    };

    MiniAsteroids.COLOR = "#FFA500";
    MiniAsteroids.RADIUS = 12;

    Asteroids.Util.inherits(MiniAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroids, Asteroids.Asteroid);

    MiniAsteroids.prototype.isMiniAsteroid = true;
})();
