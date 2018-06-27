"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Explosion = Asteroids.Explosion = function(from) {
    options.frame = 0;
    options.src = './assets/img/explosion/explosion_strip_trans.png';
    options.pos = from.pos;
    options.rotation = from.rotation;
    options.vector = from.vector;
    options.radius = Explosion.RADIUS;

    this.incrementFrame = function() {
      this.frame += 1;
      return;
    }

    Asteroids.MovingObject.call(this, options);
  };

  Explosion.RADIUS = 32;

  Explosion.prototype.wrappable = true;
})();
