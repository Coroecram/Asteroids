(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroid = Asteroids.MiniAsteroid = function (parent, options) {
      options.color = MiniAsteroid.COLOR;
      options.pos = options.pos;
      options.radius = MiniAsteroid.RADIUS;
      options.vel = Asteroids.Util.splitParentVector(parent, MiniAsteroid.SPEED);

      Asteroids.MovingObject.call(this, options);
    };

    MiniAsteroid.COLOR = "#505050";
    MiniAsteroid.RADIUS = 12;
    MiniAsteroid.SPEED = 6;

    Asteroids.Util.inherits(MiniAsteroid, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroid, Asteroids.Asteroid);

    MiniAsteroid.prototype.isMiniAsteroid = true;
})();
