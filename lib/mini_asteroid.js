(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MiniAsteroids = Asteroids.MiniAsteroids = function (seed, options) {
      var velocities = Asteroids.Util.splitParentVector(seed, MiniAsteroids.SPEED);

      options.color = MiniAsteroids.COLOR;
      options.pos = options.pos;
      options.radius = MiniAsteroids.RADIUS;
      options.vel = velocities[0];

      var firstchild = [Asteroids.MovingObject.call(this, options)];
      options.vel = velocities[1];
      var children = firstchild.push(Asteroids.MovingObject.call(this, options));

      return children;
    };

    MiniAsteroids.COLOR = "#505050";
    MiniAsteroids.RADIUS = 12;
    MiniAsteroids.SPEED = 6;

    Asteroids.Util.inherits(MiniAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MiniAsteroids, Asteroids.Asteroid);

    MiniAsteroids.prototype.isMiniAsteroid = true;
})();
