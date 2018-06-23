"use strict";
(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.angle = options.angle;
    options.src = './assets/img/missle.png';
    options.rotation = 0;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 10;
  Bullet.SPEED = 6;
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);


  Bullet.prototype.wrappable = false;
  Bullet.prototype.isBullet = true;
})();
