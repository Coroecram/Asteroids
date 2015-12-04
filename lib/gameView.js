(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
    this.ship = this.game.addShip();
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

    debugger
  GameView.THRUSTS = {
    "w": [ 0, -1],
    "s": [ 0,  1]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.THRUSTS).forEach(function (k) {
      var thrust = GameView.THRUSTS[k];
      key(k, function () { ship.thrust(thrust); });
    });

    key("space", function () { ship.fireBullet() });
    key("d", function () { ship.angle += 15 });
    key("a", function () { ship.angle -= 15 });
  };


})();
