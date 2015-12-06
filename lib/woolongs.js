(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Woolongs = Asteroids.Woolongs = function (options) {
      options.pos = options.game.reasonablePosition()
      options.radius = Woolongs.RADIUS;
      options.vector = [0, 0];
      options.src = './assets/img/scaled-money.gif';
      Asteroids.MovingObject.call(this, options);
    };

    Woolongs.RADIUS = 24;
    Woolongs.image = new Image();
    Asteroids.Util.inherits(Woolongs, Asteroids.MovingObject);

    Woolongs.prototype.areWoolongs = true;
})();
