(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroid = Asteroids.MiniAsteroid = function (options) {
      options.color = MiniAsteroid.COLOR;
      options.pos = options.pos || options.game.reasonablePosition();
      options.radius = MiniAsteroid.RADIUS;
      options.vel = options.vel || Asteroids.Util.randomVector(MiniAsteroid.SPEED);

      Asteroids.MovingObject.call(this, options);
    };

    MiniAsteroid.COLOR = "#505050";
    MiniAsteroid.RADIUS = 12;
    MiniAsteroid.SPEED = 6;

    Asteroids.Util.inherits(MiniAsteroid, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroid, Asteroids.Asteroid);

    MiniAsteroid.prototype.isMiniAsteroid = true;
})();
