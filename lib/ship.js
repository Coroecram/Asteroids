(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vector = options.vector || [0, 0];
    options.color = options.color || Ship.COLOR;
    this.angle = options.angle;
    this.reloading = false;

    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 16;
  Ship.COLOR = "#008000";
  Ship.image = new Image();

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);


  Ship.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate((this.angle) * Math.PI/180);
    Ship.image.src = './assets/img/static-swordfish.gif';
    ctx.drawImage(Ship.image, 0, 0, 32, 32, -16, -16, 32, 32);
    ctx.restore();
  };

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
    if (Math.abs(this.vector[0] + addedVector[0]) < 10 &&
        Math.abs(this.vector[1] + addedVector[1]) < 10) {
      this.vector[0] += addedVector[0];
      this.vector[1] += addedVector[1];
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
      color: this.color,
      game: this.game
    });

    var recoil = [bulletVector[0]/-100, bulletVector[1] / -100]
    this.maxThrustCheck(recoil)

    if (!this.reloading) {
      var ship = this;
      this.game.add(bullet);
      this.reloading = true;
      setTimeout(this.reload.bind(this), 250);
    }

  };

  Ship.prototype.reload = function () {
    this.reloading = false;
  };



  Ship.prototype.relocate = function () {
    this.pos = this.game.reasonablePosition();
    this.vector = [0, 0];
  };

  Ship.prototype.isShip = true;
})();
