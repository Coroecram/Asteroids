"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function(options) {
    options.radius = options.radius;
    options.vector = options.vector || [0, 0];
    options.angle = options.angle;
    options.src = options.src;
    options.rotation = 0;
    this.reloading = false;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.prototype = Object.create(Asteroids.MovingObject.prototype);
  Ship.prototype.constructor = Ship;
  Ship.prototype.thrust = function(direction) {
    if (this.game.paused) {
      return
    };
    var thruster = Asteroids.Util.vector(this.angle + 90);
    if (direction === "forward"){
      thruster[0] *= -0.25;
      thruster[1] *= -0.25;
    } else {
      thruster[0] *= 0.125;
      thruster[1] *= 0.125;
    }

    this.maxThrustCheck(thruster);
  };

  Ship.prototype.maxThrustCheck = function(addedVector) {
    if (Math.abs(this.vector[0] + addedVector[0]) < 3) {
          this.vector[0] += addedVector[0];
          if (this.playerShip) {
            this.game.credits -= 100;
          }
    }
    if (Math.abs(this.vector[1] + addedVector[1]) < 3) {
        this.vector[1] += addedVector[1];
        if (this.playerShip) {
          this.game.credits -= 100;
        }
    }
  };

  Ship.prototype.turn = function(direction) {
    if (this.game.paused) {
      return
    };
    this.game.credits -= 3;
    if (direction == "right") {
      this.angle += 5
    } else {
      this.angle -= 5
    }
  };

  Ship.prototype.fireBullet = function() {
    return this.game.paused ? null : this.game.addBullet(this);
  };

  Ship.prototype.reload = function() {
    this.reloading = false;
    return;
  };

  Ship.prototype.inPlay = function() {
    this.invincible = false;
    return;
  };

  Ship.prototype.isShip = true;
})();
