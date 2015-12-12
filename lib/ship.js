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

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 21.5;
  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.thrust = function (direction) {
    var thruster = Asteroids.Util.vector(this.angle + 90);
    if (direction === "forward"){
      thruster[0] *= -1;
      thruster[1] *= -1;
    } else {
      thruster[0] *= 0.5;
      thruster[1] *= 0.5;
    }

    this.maxThrustCheck(thruster);
  };

  Ship.prototype.maxThrustCheck = function (addedVector) {
    if (Math.abs(this.vector[0] + addedVector[0]) < 5 &&
        Math.abs(this.vector[1] + addedVector[1]) < 5) {
      this.game.credits -= 100;
      this.vector[0] += addedVector[0];
      this.vector[1] += addedVector[1];
    }
  };

  Ship.prototype.turn = function (direction) {
    this.game.credits -= 30;
    if (direction == "right") {
      this.angle += 10
    } else {
      this.angle -= 10
    }
  };

  Ship.prototype.fireBullet = function () {
    if (this.vector == [0, 0]) {
      return;
    }

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

    var recoil = [bulletVector[0]/-100, bulletVector[1] / -100]
    this.maxThrustCheck(recoil)

    if (!this.reloading) {
      var ship = this;
      this.game.add(bullet);
      this.game.credits -= 10000;
      this.reloading = true;
      setTimeout(this.reload.bind(this), 250);
    }

  };

  Ship.prototype.reload = function () {
    this.reloading = false;
  };

  Ship.prototype.relocate = function () {
    this.game.credits -= 50000;
    this.pos = this.game.reasonablePosition();
    this.vector = [0, 0];
    this.angle = 0;
  };

  Ship.prototype.isShip = true;
})();
