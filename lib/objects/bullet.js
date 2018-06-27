"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Bullet = Asteroids.Bullet = function(options) {
    this.frame = 0;
    options.radius = Bullet.RADIUS;
    options.src = './assets/img/missle.png';
    options.rotation = 0;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 10;
  Bullet.SPEED = 6;

  Bullet.prototype = Object.create(Asteroids.MovingObject.prototype);
  Bullet.prototype.constructor = Bullet;
  Bullet.prototype.wrappable = false;
  Bullet.prototype.isBullet = true;
})();
