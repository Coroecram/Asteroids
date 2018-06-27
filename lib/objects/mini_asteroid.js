"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroids = Asteroids.MiniAsteroids = function(options) {
      options.color = MiniAsteroids.COLOR;
      options.radius = MiniAsteroids.RADIUS;
      options.angle = 0;
      options.rotation = Asteroids.Util.asteroidRotation();
      options.src = './assets/img/asteroid-mini.png'

      Asteroids.Asteroid.call(this, options);
    };

    MiniAsteroids.COLOR = "#FFA500";
    MiniAsteroids.RADIUS = 12.5;

    MiniAsteroids.prototype = Object.create(Asteroids.Asteroid.prototype);
    MiniAsteroids.prototype.constructor = MiniAsteroids;
    MiniAsteroids.prototype.isMiniAsteroid = true;
})();
