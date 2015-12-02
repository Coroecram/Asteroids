(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "#008000";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.thrust = function (thruster) {
    this.vel[0] += thruster[0];
    this.vel[1] += thruster[1];
  };

  Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

})();
