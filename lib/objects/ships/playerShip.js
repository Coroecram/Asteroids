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

    Asteroids.Ship.call(this, options);
  };

  PlayerShip.RADIUS = 32;
  PlayerShip.RELOAD_TIME = 750;

  PlayerShip.prototype = Asteroids.Ship.prototype;
  PlayerShip.prototype.constructor = PlayerShip;
  
  PlayerShip.prototype.wrappable = true;

  PlayerShip.prototype.relocate = function() {
    var self = this;
    self.game.credits -= 50000;
    self.pos = self.game.reasonablePosition();
    self.vector = [0, 0];
    self.angle = 0;
    self.invincible = true;

    window.setTimeout(function() { self.inPlay() } , 1500);
  };

})();
