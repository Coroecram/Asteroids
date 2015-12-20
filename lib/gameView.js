(function (){
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, game) {
    this.ctx = ctx
    this.game = game;
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
    if (this.game.isOver()){
      this.game.reset();
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    var self = this;
    var ship = this.ship;

    key("w", function (e) { e.preventDefault();
                            ship.thrust("forward");
                           });
    key("up", function (e) { e.preventDefault();
                            ship.thrust("forward")
                            });
    key("a", function (e) { e.preventDefault();
                            ship.turn("left");
                           });
    key("left", function (e) { e.preventDefault();
                               ship.turn("left");
                             });
    key("s", function (e) { e.preventDefault();
                            ship.thrust("reverse");
                          });
    key("down", function (e) { e.preventDefault();
                              ship.thrust("reverse");
                              });
    key("d", function (e) { e.preventDefault();
                            ship.turn("right");
                          });
    key("right", function (e) { e.preventDefault();
                                ship.turn("right");
                               });
    key("space", function (e) { e.preventDefault();
                                ship.fireBullet();
                               });
    key("enter", function (e) { e.preventDefault();
                                self.game.togglePause();
                               });
  };

  GameView.prototype.isGameView = function () {
    true;
  };

})();
