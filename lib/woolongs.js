(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var Woolongs = Asteroids.Woolongs = function (options) {
    this.calcValue(options.asteroid);
    options.pos = options.pos || options.game.reasonablePosition();
    options.radius = Woolongs.RADIUS;
    options.vector = [0, 0];
    options.src = this.src;

    Asteroids.MovingObject.call(this, options);
  };

  Woolongs.RADIUS = 16;
  Woolongs.image = new Image();
  Asteroids.Util.inherits(Woolongs, Asteroids.MovingObject);

  Woolongs.prototype.areWoolongs = true;

  Woolongs.prototype.calcValue = function (asteroid) {
    var base = Math.random();
    if (asteroid) {
      if (asteroid.isMediumAsteroid) {
        this.value = Math.floor(((Math.random()*20 + 10) * 1000));
        this.src = './assets/img/scaled-money.gif';
      } else if (asteroid.isMiniAsteroid) {
        this.value = Math.floor(((Math.random()*20 + 30) * 1000));
        this.src = './assets/img/scaled-bag.png';
      } else {
        this.value = Math.floor(((Math.random()*5 + 5) * 1000));
        this.src = './assets/img/coin.png';
      }
    } else if (1-base < 0.4) {
      this.value = Math.floor(((Math.random()*5 + 5) * 1000));
      this.src = './assets/img/coin.png';
    } else if (1 - base > 0.95) {
      this.value = Math.floor(((Math.random()*20 + 30) * 1000));
      this.src = './assets/img/scaled-bag.png';
    } else {
        this.value = Math.floor(((Math.random()*20 + 10) * 1000));
        this.src = './assets/img/scaled-money.gif';
      return
    }
  };
})();
