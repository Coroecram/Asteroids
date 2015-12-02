(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.ship = [];
    this.bullets = [];
    this.positions = [];

    this.addAsteroids();
  };

  Game.DIM_X = 600
  Game.DIM_Y = 600
  Game.NUM_ASTEROIDS = 2

  Game.prototype.add = function (object) {
  if (object instanceof Asteroids.Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
  } else if (object instanceof Asteroids.Ship) {
      this.ship.push(object);
  }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship(
                { pos: [(Game.DIM_X/2),
                        (Game.DIM_Y/2)],
                  game: this}
              );

    this.add(ship);
    return ship
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.ship, this.asteroids, this.bullets);
  };

  Game.prototype.allSpawnedObjects = function () {
    return [].concat(this.ship, this.asteroids);
  };

  Game.prototype.allPositions = function () {
    var positions = [];
    this.allSpawnedObjects().forEach(function (object) {
      positions.push(object.pos);
    });

    return positions;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.outOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
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


  Game.prototype.reasonablePosition = function () {
    var positions = this.allPositions();
    var xPositions = [0, Game.DIM_X];
    var yPositions = [0, Game.DIM_Y];

    if (positions.length != 0){
      positions.forEach(function (position) {
        xPositions.push(position[0]);
        yPositions.push(position[1]);
      })
    }

    return this.distributedPositions(xPositions, yPositions);
  };

  Game.prototype.distributedPositions = function (xPositions, yPositions) {
    var xWeighted = this.distBalance(xPositions.sort(Asteroids.Util.sortNumbers));
    var yWeighted = this.distBalance(yPositions.sort(Asteroids.Util.sortNumbers));
    return [xWeighted, yWeighted];
  };

  Game.prototype.distBalance = function (dimPositions) {
    var length = dimPositions.length;
    var min = dimPositions[0];
    var max = dimPositions[length-1];
    if (dimPositions.length === 2){
      return Math.random() * ((max-50) - (min+50)) + min;
    } else {
      var mean = (min + max)/2;
      var midpoint = length/2;
      var weight = (dimPositions.reduce( (prev, curr) => prev + curr ))/length;
      debugger
      var lessWeighted = (weight >= mean ? dimPositions.slice(0, Math.ceil(midpoint)) :
                                           dimPositions.slice(Math.floor(midpoint), length));
                                           debugger
      return this.distBalance(lessWeighted);
    }
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
      this.ship[0].relocate();
    }
  };

})();
