(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 3;
  Bullet.SPEED = 6;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;
})();
