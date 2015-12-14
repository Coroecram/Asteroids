(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
    this.paused = false;
    this.loopID = 0;
    this.ship = this.game.addShip();
  }

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var self = this;
    self.loopID = window.setInterval(function () {
      self.game.loop();
    }, 20);
  };

  GameView.prototype.togglePause = function () {
    var self = this;
    if (self.paused) {
      self.loopID = window.setInterval(function () {
        self.game.loop();
      }, 20);
      self.paused = false;
    } else {
      window.clearInterval(self.loopID);
      self.paused = true;
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
