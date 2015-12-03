(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MedAsteroid = Asteroids.MediumAsteroids = function (options) {
      var velocities = Asteroids.Util.splitParentVector(parent, MediumAsteroids.SPEED);

      options.color = MediumAsteroids.COLOR;
      options.pos = options.pos;
      options.radius = MediumAsteroids.RADIUS;
      options.vel = options.vel || Asteroids.Util.randomVector(parent, MediumAsteroids.SPEED);

      var firstchild = [Asteroids.MovingObject.call(this, options)];
      options.vel = velocities[1];
      var children = firstchild.push(Asteroids.MovingObject.call(this, options))

      return children
    };

    MediumAsteroids.COLOR = "#505050";
    MediumAsteroids.RADIUS = 25;
    MediumAsteroids.SPEED = 4;

    Asteroids.Util.inherits(MediumAsteroids, Asteroids.MovingObject);
    Asteroids.Util.inherits(MediumAsteroids, Asteroids.Asteroid);

    MediumAsteroids.prototype.isMedAsteroid = true;
})();
