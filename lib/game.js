(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.mediumAsteroids = [];
    this.miniAsteroids = [];
    this.woolongs = [];
    this.ship = [];
    this.bullets = [];
    this.positions = [];
    this.credits = 70000;

    this.addAsteroids();
    this.addWoolongs();
  };

  Game.DIM_X = 667;
  Game.DIM_Y = 533;
  Game.CANVAS_Y = 633;
  Game.NUM_ASTEROIDS = 4;
  var Util = Asteroids.Util;

  Game.prototype.add = function (object) {
  if (object.isAsteroid) {
    this.asteroids.push(object);
  } else if (object.isBullet) {
      this.bullets.push(object);
  } else if (object.isShip) {
      this.ship.push(object);
  } else if (object.areWoolongs) {
    this.woolongs.push(object)
  }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addWoolongs = function () {
    this.add(new Asteroids.Woolongs({ game: this }));
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(
                { pos: [(Game.DIM_X/2),
                        (Game.CANVAS_Y/2)],
                  angle: 0,
                  game: this}
               );

    this.add(ship);
    return ship;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ship, this.asteroids, this.mediumAsteroids, this.miniAsteroids, this.bullets, this.woolongs);
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ship, this.asteroids, this.mediumAsteroids, this.miniAsteroids, this.bullets, this.woolongs).reverse();
  };

  Game.prototype.allSpawnedObjects = function () {
    return [].concat(this.ship, this.asteroids, this.mediumAsteroids, this.miniAsteroids);
  };

  Game.prototype.allPositions = function () {
    var positions = [];
    this.allSpawnedObjects().forEach(function (object) {
      positions.push(object.pos);
    });

    return positions;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 100, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
        object.draw(ctx);
        ctx.clearRect(0, 0, Game.DIM_X, 100);
    });
    ctx.fillStyle = 'lightgreen';
    ctx.font = '24px OrbitronLight';
    ctx.textBaseline = 'top';
    ctx.fillText ("Bank Account: " + (this.credits -= 1), 300, 50);
    this.credits -= 10;
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.outOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 100) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.CANVAS_Y);
  };

  Game.prototype.wrap = function (pos) {
    return [ wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.CANVAS_Y)];
  };

  var wrap = function (pos, max) {
    var cutoff = (max === 667 ? 0 : 100);
    if (pos < cutoff) {
      return max - (pos % max) + cutoff;
    } else if (pos > max) {
      return pos % max + cutoff;
    } else {
      return pos;
    }
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();

    allObjects.forEach(function (obj1) {
      allObjects.forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };


  Game.prototype.reasonablePosition = function () {
    var positions = this.allPositions();
    var xPositions = [0, Game.DIM_X];
    var yPositions = [100, Game.CANVAS_Y];

    if (positions.length != 0){
      positions.forEach(function (position) {
        xPositions.push(position[0]);
        yPositions.push(position[1]);
      })
    }

    return Util.distributedPositions(xPositions, yPositions);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object){
    if (object.isBullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object.isAsteroid) {
      this.asteroidDestroyed(object);
    } else if (object.isShip) {
      this.bullets = [];
      this.ship[0].relocate();
    } else if (object.areWoolongs) {
      this.woolongs = [];
      this.addWoolongs();
    }
  };

  Game.prototype.asteroidDestroyed = function (asteroid) {
    if (asteroid.isMediumAsteroid) {
      var minis = Util.asteroidSplitter(asteroid, "mini");
      var idx = this.mediumAsteroids.indexOf(asteroid);
      this.mediumAsteroids.splice(idx, 1);
      this.miniAsteroids = this.miniAsteroids.concat(minis);
    } else if (asteroid.isMinssiAsteroid) {
      var idx = this.miniAsteroids.indexOf(asteroid);
      this.miniAsteroids.splice(idx, 1);
    } else {
      var mediums = Util.asteroidSplitter(asteroid, "medium");
      idx = this.asteroids.indexOf(asteroid);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
      this.mediumAsteroids = this.mediumAsteroids.concat(mediums);
    }
  }

})();
