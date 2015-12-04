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

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    key("w", function () { ship.forwardThrust() });
    key("a", function () { ship.angle -= 5 });
    key("s", function () { ship.reverseThrust() });
    key("d", function () { ship.angle += 5 });
    key("space", function () { ship.fireBullet() });
  };


})();
