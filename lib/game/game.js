"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function(ctx) {
    this.positions = [];
    this.asteroids = [];
    this.mediumAsteroids = [];
    this.miniAsteroids = [];
    this.woolongs = [];
    this.playerShip = null;
    this.ships = [];
    this.bullets = [];
    for ( var i = 0; i < 3; i++ ) {
      this.bullets[i] = [];
    }
    this.explosions = [];
    this.gameView = {};
    this.gameOver = false;
    this.startTime = Date.now();
    this.gameView = new Asteroids.GameView(ctx, this)
    this.stats = {maxCredits: 250,
                  totalCredits: 0,
                  shipsLost: 0,
                  misslesFired: 0,
                  asteroidCount: 0};
    this.credits = 250;
    this.pauseScreen = new Asteroids.PauseScreen();
    this.paused = true;
  };
  // Remember to change in MovingObject
  Game.DIM_X = 667;
  Game.DIM_Y = 533;
  Game.CANVAS_Y = 633;
  Game.NUM_ASTEROIDS = 3;
  var Util = Asteroids.Util;

  Game.prototype.start = function() {
    this.initializePlayerShip();
    this.addAsteroids();
    this.addWoolongs();
  };

  Game.prototype.add = function(object) {
    if (object.isAsteroid) {
      this.asteroids.push(object);
    } else if (object.isBullet) {
        this.bullets[object.getId()].push(object);
    } else if (object.isShip) {
        this.ships[object.getId()] = object; // Subtract 1 due to 0 as falsy in MovingObject constructor
    } else if (object.isWoolongs) {
      this.woolongs.push(object)
    }
  };

  Game.prototype.initializePlayerShip = function() {
    var ship = new Asteroids.PlayerShip(
      { pos: [(Game.DIM_X/2),
        (Game.CANVAS_Y/2)],
        angle: 0,
        game: this,
        invincible: true}
      );
      this.add(ship);
      this.playerShip = ship;
      window.setTimeout(function() { ship.inPlay() } , 5000);
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ pos: i == 0 ? [Game.DIM_X/4,Game.CANVAS_Y/4] : this.reasonablePosition() }));
    }
  };

  Game.prototype.addWoolongs = function(source) {
    if (this.woolongs.length >= 10) {
      this.woolongs = this.woolongs.slice(1);
    }
    var woolongs = new Asteroids.Woolongs({ game: this,
                                            pos: source ? source.pos : this.reasonablePosition(),
                                            source: source,
                                            invincible: true })
    this.add(woolongs);
    window.setTimeout(function() { woolongs.inPlay() }, 500);
  };

  Game.prototype.fireBullet = function(from) {
    if(!this.paused && !from.reloading){

      if (from == this.playerShip) {
        if (this.credits > 11000) {
          this.credits -= 10000;
          from.reloading = true;
          console.log("this.stats missles: " + this.stats.misslesFired);
          this.addBullet(from);
        }
      } else {
        this.addBullet(from);
      }
    }
  };

  Game.prototype.addBullet = function(from) {
    var bulletVector = Asteroids.Util.magnitude(
      Asteroids.Util.vector(from.angle - 90),
      Asteroids.Bullet.SPEED
    );

    var bulletVector = [
      bulletVector[0] + from.vector[0], bulletVector[1] + from.vector[1]
    ];

    var bullet = new Asteroids.Bullet({
      id: from.id,
      pos: from.pos,
      vector: bulletVector,
      angle: from.angle,
      game: this
    });

    var recoil = [bulletVector[0] / -150, bulletVector[1] / -150]

    from.maxThrustCheck(recoil)
    this.add(bullet, from);
    setTimeout(from.reload.bind(from), from.reloadTime);
  };

  Game.prototype.addCredits = function(woolongs) {
        this.stats.totalCredits += woolongs.value;
      this.credits += woolongs.value;
      if (this.stats.maxCredits < this.credits) {
        this.stats.maxCredits = this.credits;
      }
  };

  Game.prototype.allObjects = function() {
    return [].concat(this.asteroids, this.ships, this.mediumAsteroids, this.miniAsteroids, this.bullets[0], this.bullets[1], this.bullets[2], this.woolongs).reverse();
  };

  Game.prototype.allSpawnedObjects = function() {
    return [].concat(this.ships, this.bullets[0], this.bullets[1], this.bullets[2], this.woolongs, this.asteroids, this.mediumAsteroids, this.miniAsteroids);
  };

  Game.prototype.draw = function(ctx) {
    var that = this;
    ctx.clearRect(0, 100, Game.DIM_X, Game.DIM_Y);
    that.isOver();
    var toRemove = [];
    that.allObjects().forEach(function(object) {
      if (object.toRemove) {
        toRemove.push(object);
      } else {
        object.draw(ctx);
        ctx.clearRect(0, 0, Game.DIM_X, 100);
      }
    });

    toRemove.forEach(function(o) {
      that.remove(o);
    });

    ctx.fillStyle = 'lightgreen';
    ctx.font = '24px OrbitronLight';
    ctx.textBaseline = 'top';
    var figures = this.credits.toString().length + 1;
    ctx.fillText ("Woolong Balance: " + (this.credits -= 1),
                                     (420-(Math.ceil(figures * 18.33))),
                                      50);
    this.credits -= 10;
  };

  Game.prototype.pauseDraw = function(ctx) {
    ctx.clearRect(0, 100, Game.DIM_X, Game.DIM_Y);
    this.isOver();

    this.allObjects().forEach(function(object) {
      object.pauseDraw(ctx);
      ctx.clearRect(0, 0, Game.DIM_X, 100);
    });
    ctx.fillStyle = 'lightgreen';
    ctx.font = '24px OrbitronLight';
    ctx.textBaseline = 'top';
    var figures = this.credits.toString().length + 1;
    ctx.fillText ("Woolong Balance: " + (this.credits),
                                     (420-(Math.ceil(figures * 18.33))),
                                      50);
  };

  Game.prototype.isOver = function() {
    if (this.credits <= 0) {
      this.stats.timePlayed = Date.now() - this.startTime;
      if (!this.gameOver) {
        console.log("gameover stats");
        console.log(this.stats);
        this.gameOver = new Asteroids.GameOver(this.stats);
      }
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.reset = function() {
    this.asteroids = [];
    this.ships = [];
    this.mediumAsteroids = [];
    this.miniAsteroids = [];
    this.woolongs = [];
    this.bullets = [];
    for ( var i = 0; i < 3; i++ ) {
      this.bullets[i] = [];
    }
    this.startTime = Date.now();
    this.stats.maxCredits = 250000;
    this.stats.totalCredits = 0;
    this.stats.shipsLost = 0;
    this.stats.misslesFired = 0;
    this.stats.asteroidCount = 0;
    this.gameOver = false;
    this.credits = 250000;

    this.start();
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    that.allObjects().forEach(function(obj1) {
      that.allObjects().forEach(function(obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          if (obj1.isBullet && obj2.isAsteroid) {
            obj1.toRemove = !obj1.invincible;
            obj2.toRemove = !obj2.invincible;
          } else if (obj1.isShip && obj2.isAsteroid) {
            obj1.toRemove = !obj1.invincible;
          } else if (obj1.isShip && obj2.isWoolongs) {
            that.addCredits(obj2);
            obj2.toRemove = true;
          } else if (obj1.isBullet && obj2.isWoolongs) {
            obj1.toRemove = true;
            obj2.toRemove = true;
          } else if (obj1.isAsteroid && obj2.isWoolongs) {
            obj2.toRemove = !obj2.invincible;
          }
        }
      });
    });
  };

  Game.prototype.allPositions = function() {
    this.positions = [];
    this.allSpawnedObjects().forEach(function(object) {
      this.positions.push(object.pos);
    }.bind(this));
  };

  Game.prototype.reasonablePosition = function() {
    this.allPositions();
    if (this.positions.length != 0){
      return Util.positionDistributor(Game.DIM_X, Game.CANVAS_Y, this.positions);
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(object){
    if (object.isBullet) {
      var bulletArr = this.bullets[object.getId()];
      bulletArr.splice(bulletArr.indexOf(object), 1);
    } else if (object.isAsteroid) {
      this.stats.asteroidCount += 1;
      this.asteroidDestroyed(object);
      //this.addExplosion(object);
    } else if (object.isShip) {
      this.bullets[object.getId()] = [];
      if (object.isPlayerShip) {
        this.stats.shipsLost += 1;
        this.playerShip.relocate(this.reasonablePosition());
        this.credits -= 50000;
        window.setTimeout(function() { object.inPlay() } , 5000);
      } else {
        this.ships[object.getId()] = null;
      }
      //this.addExplosion(object)
    } else if (object.isWoolongs) {
      this.woolongs.splice(this.woolongs.indexOf(object), 1);
      this.addWoolongs();
    }
  };

  Game.prototype.asteroidDestroyed = function(asteroid) {
    if (asteroid.isMediumAsteroid) {
      var minis = Util.asteroidSplitter(asteroid, "mini");
      var idx = this.mediumAsteroids.indexOf(asteroid);
      this.mediumAsteroids.splice(idx, 1);
      this.miniAsteroids = this.miniAsteroids.concat(minis);
    } else if (asteroid.isMiniAsteroid) {
      var idx = this.miniAsteroids.indexOf(asteroid);
      this.miniAsteroids.splice(idx, 1);
    } else {
      var mediums = Util.asteroidSplitter(asteroid, "medium");
      idx = this.asteroids.indexOf(asteroid);
      this.asteroids[idx] = new Asteroids.Asteroid({ pos: this.reasonablePosition() });
      this.mediumAsteroids = this.mediumAsteroids.concat(mediums);
    }

    this.addWoolongs(asteroid);
  };

  Game.prototype.keysPressed = function() {
    if (!this.paused) {
      var ship = this.playerShip;
      var that = this;
      key.getPressedKeyCodes().forEach(function(key) {
        switch(key) {
          case 87:
          case 38:
            if (ship.thrust("forward")) {
              that.credits -= 100;
            }
            return;
          case 83:
          case 40:
            if (ship.thrust("reverse")) {
              that.credits -= 100;
            }
            return;
          case 65:
          case 37:
            that.credits -= 3;
            return ship.turn("left");
          case 68:
          case 39:
            that.credits -= 3;
            return ship.turn("right");
          case 32:
            that.fireBullet(ship);
            return;
        }
      });
    }
  };

  Game.prototype.togglePause = function() {
    if (this.isOver()) {
      return this.reset();
    }
    this.paused = !this.paused;
  };

  Game.prototype.loop = function() {
    if (!this.paused && !this.isOver()) {
      this.keysPressed();
      this.draw(this.gameView.ctx);
      this.step();
    } else if (this.paused) {
      this.pauseDraw(this.gameView.ctx);
      this.pauseScreen.draw(this.gameView.ctx);
    } else if (this.isOver()) {
      this.gameOver.draw(this.gameView.ctx);
    }
  };
})();
