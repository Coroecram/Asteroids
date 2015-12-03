(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MediumAsteroids = Asteroids.MediumAsteroids = function (seedVector, options) {
      var velocities = Asteroids.Util.splitParentVector(seedVector);
      debugger
      options.color = MediumAsteroids.COLOR;
      options.pos = options.pos;
      options.radius = MediumAsteroids.RADIUS;
      options.vel = velocities[0];

      var firstchild = [Asteroids.MovingObject.call(this, options)];
      options.vel = velocities[1];
      var children = firstchild.push(Asteroids.MovingObject.call(this, options))

      return children
    };

    MediumAsteroids.COLOR = "#505050";
    MediumAsteroids.RADIUS = 25;

    Asteroids.Util.inherits(MediumAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MediumAsteroids, Asteroids.Asteroid);

    MediumAsteroids.prototype.isMedAsteroid = true;
})();
