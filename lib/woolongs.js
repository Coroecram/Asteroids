(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };


  var Woolongs = Asteroids.Woolongs = function (options) {
      options.pos = options.game.reasonablePosition()
      options.radius = Woolongs.RADIUS;
      options.vector = [0, 0];
      options.src = './assets/img/scaled-bag.png';
      Asteroids.MovingObject.call(this, options);
    };

    Woolongs.RADIUS = 16;
    Woolongs.image = new Image();
    Asteroids.Util.inherits(Woolongs, Asteroids.MovingObject);

    Woolongs.prototype.areWoolongs = true;

    Woolongs.prototype.calcValue = function () {
      debugger
      var base = Math.random();
      if (1-base < 0.4) {
        this.value = Math.floor(((Math.random()*5 + 5) * 1000));
        this.src = './assets/img/scaled-swordfish.gif'
      } else if (1 - base > 0.95) {
        return Math.floor(((Math.random()*20 + 30) * 1000))
      } else {
        return
      }
    };
})();
