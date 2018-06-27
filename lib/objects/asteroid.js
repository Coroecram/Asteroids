"use strict";
(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Asteroid = Asteroids.Asteroid = function (options) {
    this.frame = 0;
    options.color = Asteroid.COLOR;
    options.pos = options.pos || console.log(Asteroids.Game.Game);
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
