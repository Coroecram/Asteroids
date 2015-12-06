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

  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.wrappable = false;
  Bullet.prototype.isBullet = true;
})();
