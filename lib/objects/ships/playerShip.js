"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var PlayerShip = Asteroids.PlayerShip = function(options) {
    this.reloadTime = PlayerShip.RELOAD_TIME;
    options.frame = 0;
    options.id = 1; // Can't have 0 due to booleans
    options.pos = options.pos;
    options.src = './assets/img/scaled-swordfish.gif';
    options.radius = PlayerShip.RADIUS;
    options.maxThrust = PlayerShip.MAX_THRUST;

    Asteroids.Ship.call(this, options);
  };

  PlayerShip.RADIUS = 32;
  PlayerShip.RELOAD_TIME = 750;
  PlayerShip.MAX_THRUST = 3;

  PlayerShip.prototype = Asteroids.Ship.prototype;
  PlayerShip.prototype.constructor = PlayerShip;

  PlayerShip.prototype.isPlayerShip = true;
  PlayerShip.prototype.wrappable = true;

  PlayerShip.prototype.relocate = function(pos) {
    this.pos = pos;
    this.vector = [0, 0];
    this.angle = 0;
    this.toRemove = false;
    this.invincible = true;
  };

})();
