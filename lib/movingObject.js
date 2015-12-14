(function() {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vector = options.vector;
    this.radius = options.radius;
    this.angle = options.angle;
    this.rotation = options.rotation;
    this.image = new Image();
    this.src = options.src;
    this.dim = this.radius * 2;
    this.offset = -this.radius

    this.game = options.game;
  };


  MovingObject.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate((this.angle += this.rotation) * Math.PI/180);
    this.image.src = this.src;
    ctx.drawImage(this.image, 0, 0,
                              this.dim, this.dim,
                              this.offset, this.offset,
                              this.dim, this.dim);
    ctx.restore();
  };

  MovingObject.prototype.pauseDraw = function(ctx){
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate((this.angle) * Math.PI/180);
    this.image.src = this.src;
    ctx.drawImage(this.image, 0, 0,
                              this.dim, this.dim,
                              this.offset, this.offset,
                              this.dim, this.dim);
    ctx.restore();
  };

  MovingObject.prototype.move = function (timePassed) {
    var delta = [this.vector[0], this.vector[1]];

    this.pos = [this.pos[0] + delta[0], this.pos[1] + delta[1]];

    if (this.game.outOfBounds(this.pos)) {
      if (this.wrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.wrappable = true;

  MovingObject.prototype.isCollidedWith = function (otherObj) {
    var objDistance = Asteroids.Util.distance(this.pos, otherObj.pos);
    return objDistance < this.radius + otherObj.radius
  };

  MovingObject.prototype.collideWith = function (otherObj) {
    if (this.isBullet && otherObj.isAsteroid) {
        this.game.remove(this);
        otherObj.game.remove(otherObj);
    } else if (this.isShip && otherObj.isAsteroid) {
        this.game.remove(this);
    } else if (this.isShip && otherObj.areWoolongs) {
        otherObj.addValue();
        otherObj.game.remove(otherObj);
    } else if (this.isBullet && otherObj.areWoolongs) {
        this.game.remove(this);
        otherObj.game.remove(otherObj);
    } else if (this.isAsteroid && otherObj.areWoolongs) {
        otherObj.game.remove(otherObj);
    }
  };

})();
