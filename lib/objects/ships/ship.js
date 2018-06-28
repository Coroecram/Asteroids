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
    this.id = options.id;
    this.reloading = false;
    this.maxThrust = options.maxThrust;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.prototype = Object.create(Asteroids.MovingObject.prototype);
  Ship.prototype.constructor = Ship;
  Ship.prototype.thrust = function(direction) {
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
    var thrusted = false;
    if (Math.abs(this.vector[0] + addedVector[0]) < this.maxThrust) {
      this.vector[0] += addedVector[0];
      thrusted = true;
    }
    if (Math.abs(this.vector[1] + addedVector[1]) < this.maxThrust) {
      this.vector[1] += addedVector[1];
      thrusted = true;
    }

    return thrusted;
  };

  Ship.prototype.turn = function(direction) {
    if (direction == "right") {
      this.angle += 5
    } else {
      this.angle -= 5
    }
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
