(function() {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };


  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };


  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function (timePassed) {
    var delta = [this.vel[0], this.vel[1]];

    this.pos = this.game.wrap([this.pos[0] + delta[0], this.pos[1] + delta[1]]);
  };

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var objDistance = Math.sqrt(Math.pow(this.pos[0] - otherObj.pos[0], 2) +
                                Math.pow(this.pos[1] - otherObj.pos[1], 2));
    return objDistance < this.radius + otherObj.radius
  };

  MovingObject.prototype.collideWith = function (otherObj) {
    if (this instanceof Asteroids.Asteroid && otherObj instanceof Asteroids.Asteroid) {
        this.game.remove(this), this.game.remove(otherObj);
    } else if (this instanceof Asteroids.Bullet && otherObj instanceof Asteroids.Asteroid) {
        this.game.remove(this), this.game.remove(otherObj);
    } else if (this instanceof Asteroids.Ship && otherObj instanceof Asteroids.Asteroid) {
        this.game.remove(this);
    }
  };

})();
