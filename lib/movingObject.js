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

  MovingObject.prototype.move = function () {
    var pos_x = this.pos[0] + this.vel[0];
    var pos_y = this.pos[1] + this.vel[1];
    this.pos = this.game.wrap([pos_x, pos_y], game.DIM_X);
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

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var objDistance = Math.sqrt(Math.pow(this.pos[0] - otherObj.pos[0], 2) +
                                Math.pow(this.pos[1] - otherObj.pos[1], 2));
    return objDistance < this.radius + otherObj.radius
  };



})();
