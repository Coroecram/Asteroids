(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Woolongs = Asteroids.Woolongs = function (options) {
      options.pos = options.game.reasonablePosition()
      options.color = "#008080";
      options.radius = Woolongs.RADIUS;
      options.vector = [0, 0];

      Asteroids.MovingObject.call(this, options);
    };

    Woolongs.RADIUS = 16;
    Woolongs.image = new Image();
    Asteroids.Util.inherits(Woolongs, Asteroids.MovingObject);

    Woolongs.prototype.draw = function () {
      Woolongs.image.src = './assets/img/money_sprite_by_gusteon.gif';
      ctx.drawImage(Woolongs.image, 0, 0, 32, 32, this.pos[0]-16, this.pos[1]-16, 32, 32);
    };

    Woolongs.prototype.areWoolongs = true;
})();
