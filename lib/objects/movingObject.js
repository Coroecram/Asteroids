"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var MovingObject = Asteroids.MovingObject = function(options) {
    this.id = options.id || null;
    this.frame = options.frame || 0;
    this.pos = options.pos;
    this.vector = options.vector;
    this.radius = options.radius;
    this.angle = options.angle;
    this.rotation = options.rotation || 0;
    this.invincible = options.invincible || false;
    if (this.isWoolongs) {
      console.log(this.invincible);
    }
    this.image = new Image();
    this.src = options.src;
    this.dim = this.radius * 2;
    this.offset = -this.radius
    this.toRemove = false;
  };

  // From Game.js
  MovingObject.DIM_X = 667;
  MovingObject.DIM_Y = 533;
  MovingObject.CANVAS_Y = 633;


  MovingObject.prototype.draw = function(ctx){
    if (this.isShip && this.invincible) {
      ctx.fillStyle = '#EEC900';

      ctx.beginPath();
      ctx.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );
      ctx.fill();
    };

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

  MovingObject.prototype.move = function(timePassed) {
    var delta = [this.vector[0], this.vector[1]];

    this.pos = [this.pos[0] + delta[0], this.pos[1] + delta[1]];
    if (this.outOfBounds()) {
      if (this.wrappable) {
        this.pos = this.wrap();
      } else {
        this.toRemove = true;
      }
    }
  };

  MovingObject.prototype.outOfBounds = function() {
    return (this.pos[0] < 0) || (this.pos[1] < 100) ||
      (this.pos[0] > MovingObject.DIM_X) || (this.pos[1] > MovingObject.CANVAS_Y);
  };

  var wrapper = function(dim, max) {
    var cutoff = (max === MovingObject.DIM_X ? 0 : 100);
    if (dim < cutoff) {
      return max - (dim % max) + cutoff;
    } else if (dim > max) {
      return dim % max + cutoff;
    } else {
      return dim;
    }
  };

  MovingObject.prototype.wrap = function(pos) {
    return [ wrapper(this.pos[0], MovingObject.DIM_X), wrapper(this.pos[1], MovingObject.CANVAS_Y)];
  };

  MovingObject.prototype.incrementFrame = function() {
    return;
  }

  MovingObject.prototype.wrappable = true;

  MovingObject.prototype.inPlay = function() {
    this.invincible = false;
  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var objDistance = Asteroids.Util.distance(this.pos, otherObj.pos);
    return objDistance < this.radius + otherObj.radius
  };

  MovingObject.prototype.getId = function(){
    return this.id ? (this.id-1) : null;
  };

})();
