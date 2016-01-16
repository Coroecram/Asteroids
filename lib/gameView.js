(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
    this.loopID = 0;
    this.ship = this.game.ship;
  }

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var self = this;
    self.loopID = window.setInterval(function () {
      self.game.loop();
    }, 20);
  };

  GameView.prototype.togglePause = function () {
    if (this.game.isOver()){
      this.game.reset();
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var self = this;

    key("up", function (e) { e.preventDefault(); });
    key("left", function (e) { e.preventDefault(); });
    key("down", function (e) { e.preventDefault(); });
    key("right", function (e) { e.preventDefault(); });
    key("space", function (e) { e.preventDefault(); });
    key("enter", function (e) {
                                e.preventDefault();
                                self.game.togglePause();
                              });
  };

  GameView.prototype.isGameView = function () {
    true;
  };

})();
