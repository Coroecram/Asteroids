"use strict";
(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroids = Asteroids.MiniAsteroids = function (options) {
      options.color = MiniAsteroids.COLOR;
      options.radius = MiniAsteroids.RADIUS;
      options.angle = 0;
      options.rotation = Asteroids.Util.asteroidRotation();
      options.src = './assets/img/asteroid-mini.png'

      Asteroids.MovingObject.call(this, options);
    };

    MiniAsteroids.COLOR = "#FFA500";
    MiniAsteroids.RADIUS = 12.5;

    Asteroids.Util.inherits(MiniAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroids, Asteroids.Asteroid);

    MiniAsteroids.prototype.isMiniAsteroid = true;
})();
