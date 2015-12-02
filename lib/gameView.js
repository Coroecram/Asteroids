(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
    this.game.addShip();
  }

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval(function () {
      this.game.draw(this.ctx);
    }, 20);
    window.setInterval(function () {
      this.game.step();
    }, 20);
  };

  GameView.THRUSTS = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.THRUSTS).forEach(function (k) {
      var thrust = GameView.THRUSTS[k];
      key(k, function () { ship.thrust(thrusts); });
    });

    key("space", function () { ship.fireBullet() });
  };


})();
