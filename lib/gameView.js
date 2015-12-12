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

    key("w", function () { ship.thrust("forward") });
    key("up", function () { ship.thrust("forward") });
    key("a", function () { ship.turn("left") });
    key("left", function () { ship.turn("left") });
    key("s", function () { ship.thrust("reverse") });
    key("down", function () { ship.thrust("reverse") });
    key("d", function () { ship.turn("right") });
    key("right", function () { ship.turn("right") });
    key("space", function () { ship.fireBullet() });
  };


})();
