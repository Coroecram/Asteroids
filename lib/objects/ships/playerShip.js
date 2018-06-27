"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var PlayerShip = Asteroids.PlayerShip = function(options) {
    options.frame = 0;
    options.id = 0;
    options.pos = options.pos;
    options.src = './assets/img/scaled-swordfish.gif';
    options.radius = PlayerShip.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(PlayerShip, Asteroids.MovingObject);
  PlayerShip.RADIUS = 32;
  PlayerShip.RELOAD_TIME = 750;

  PlayerShip.prototype.wrappable = true;
})();
