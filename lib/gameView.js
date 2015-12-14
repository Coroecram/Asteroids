(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
    this.paused = false;
    this.gameLoop = function () {
      this.game.draw(this.ctx);
      this.game.step();
    };
    debugger

    this.ship = this.game.addShip();
  }

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var self = this;
    window.setInterval(function () {
      self.gameLoop();
    }, 20);
  };

  GameView.prototype.togglePause = function () {
    var self = this;
    if (self.paused) {
      window.setInterval(function () {
        self.gameLoop();
      }, 20);
    } else {
      debugger
      window.clearInterval(function () {
        self.gameLoop();
      }, 20);
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var self = this;
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
    key("enter", function () { self.togglePause() });
  };

  GameView.prototype.isGameView = function () {
    true;
  };

})();
