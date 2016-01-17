(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vector = options.vector || [0, 0];
    options.angle = options.angle;
    options.src = './assets/img/scaled-swordfish.gif';
    options.rotation = 0;
    this.reloading = false;
    this.lastMissle = true;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 21.5;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.thrust = function (direction) {
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

  Ship.prototype.maxThrustCheck = function (addedVector) {
    if (Math.abs(this.vector[0] + addedVector[0]) < 3) {
          this.vector[0] += addedVector[0];
          this.game.credits -= 100;
    }
    if (Math.abs(this.vector[1] + addedVector[1]) < 3) {
        this.vector[1] += addedVector[1];
        this.game.credits -= 100;
    }
  };

  Ship.prototype.turn = function (direction) {
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

  Ship.prototype.fireBullet = function () {
    if (this.game.paused) {
      return
    };

    var bulletVector = Asteroids.Util.magnitude(
      Asteroids.Util.vector(this.angle - 90),
      Asteroids.Bullet.SPEED
    );

    var bulletVector = [
      bulletVector[0] + this.vector[0], bulletVector[1] + this.vector[1]
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vector: bulletVector,
      angle: this.angle,
      game: this.game
    });

    var recoil = [bulletVector[0] / -150, bulletVector[1] / -150]
    this.maxThrustCheck(recoil)

    if (!this.reloading && this.game.credits > 11000) {
      var ship = this;
      this.game.add(bullet);
      this.game.credits -= 10000;
      this.reloading = true;
      setTimeout(this.reload.bind(this), 750);
    }
  };

  Ship.prototype.reload = function () {
    this.reloading = false;
  };

  Ship.prototype.relocate = function () {
    var self = this;
    self.game.credits -= 50000;
    self.pos = self.game.reasonablePosition();
    self.vector = [0, 0];
    self.angle = 0;
    self.invincible = true;

    window.setTimeout(function () { self.inPlay() } , 1500);
  };

  Ship.prototype.isShip = true;
})();
