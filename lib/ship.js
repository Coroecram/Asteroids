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
    if (Math.abs(this.vel[0] + thruster[0]) < 10) {
      this.vel[0] += thruster[0];
    }
    if (Math.abs(this.vel[1] + thruster[1]) < 10) {
      this.vel[1] += thruster[1];
    }
  };

  Ship.prototype.fireBullet = function () {
    if (this.vel == [0, 0]) {
      return;
    }

    var bulletVel = Asteroids.Util.proportion(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      bulletVel[0] + this.vel[0], bulletVel[1] + this.vel[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };

    Ship.prototype.relocate = function () {
      this.pos = this.game.reasonablePosition();
      this.vel = [0, 0];
    };

    Ship.prototype.isShip = true;
  })();
