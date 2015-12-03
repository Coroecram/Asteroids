(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var MedAsteroid = Asteroids.MedAsteroid = function (options) {
      options.color = MedAsteroid.COLOR;
      options.pos = options.pos || options.game.reasonablePosition();
      options.radius = MedAsteroid.RADIUS;
      options.vel = options.vel || Asteroids.Util.randomVector(MedAsteroid.SPEED);

      Asteroids.MovingObject.call(this, options);
    };

    MedAsteroid.COLOR = "#505050";
    MedAsteroid.RADIUS = 25;
    MedAsteroid.SPEED = 4;

    Asteroids.Util.inherits(MedAsteroid, Asteroids.MovingObject);
    Asteroids.Util.inherits(MedAsteroid, Asteroids.Asteroid);

    MedAsteroid.prototype.isMedAsteroid = true;
})();
