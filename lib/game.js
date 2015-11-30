(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.ship = [];
    this.bullets = [];

    this.addAsteroids();
  };

  Game.DIM_X = 600
  Game.DIM_Y = 600
  Game.NUM_ASTEROIDS = 5

  Game.prototype.add = function (object) {
  if (object instanceof Asteroids.Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
  } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
  }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
  var ship = new Asteroids.Ship({
    pos: this.randomPosition(),
    game: this
  });

    this.add(ship);
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ship, this.asteroids, this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    return [ wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)];
  };

  var wrap = function (pos, max) {
    if (pos < 0) {
      return max - (pos % max);
    } else if (pos > max) {
      return pos % max;
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


  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
};

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (movingObject){
    if (movingObject instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(movingObject), 1);
    } else if (movingObject instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(movingObject);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (movingObject instanceof Asteroids.Ship) {
      this.ship.splice(this.ships.indexOf(movingObject), 1);
    }
  };

})();
