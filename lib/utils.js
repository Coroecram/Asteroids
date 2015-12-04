(function () {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVector = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return Util.magnitude([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.magnitude = function (vec, amount) {
    return [vec[0] * amount, vec[1] * amount];
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +
                              Math.pow(pos1[1] - pos2[1], 2));
  }

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.magnitude(vec, 1 / norm);
  };

  var norm = Util.norm = function (vec) {
    return Util.distance([0, 0], vec);
  };

  Util.asteroidSplitter = function (seed, type) {
    var positions = [[seed.pos[0]-40, seed.pos[1]-40],
                     [seed.pos[0]+40, seed.pos[1]+40]];
    var vectors = Asteroids.Util.splitParentVector(seed.vector);
    var constructor = (type === "medium" ? Asteroids.MediumAsteroids :
                                           Asteroids.MiniAsteroids)

    return [new constructor({pos: positions[0], vector: vectors[0], game: game}),
            new constructor({pos: positions[1], vector: vectors[1],  game: game})];
  };

  Util.splitParentVector = function (seedVector) {
    return [[seedVector[0] * 2.25, seedVector[1] * 0.75],
    [seedVector[0] * 0.75, seedVector[1] * 2.25]];

  };

  Util.sortNumbers = function (a, b) {
    return a - b;
  };

  Util.distributedPositions = function (xPositions, yPositions) {
    var xWeighted = Util.distBalance(xPositions.sort(Util.sortNumbers));
    var yWeighted = Util.distBalance(yPositions.sort(Util.sortNumbers));
    return [xWeighted, yWeighted];
  };

  Util.distBalance = function (dimPositions) {
    var length = dimPositions.length;
    var min = dimPositions[0];
    var max = dimPositions[length-1];
    if (dimPositions.length === 2){
      return Math.random() * ((max-50) - (min+50)) + min;
    } else {
      var mean = (min + max)/2;
      var midpoint = length/2;
      var weight = (dimPositions.reduce( (prev, curr) => prev + curr ))/length;

      var lessWeighted = (weight >= mean ? dimPositions.slice(0, Math.ceil(midpoint)) :
                                           dimPositions.slice(Math.floor(midpoint), length));
      return this.distBalance(lessWeighted);
    }
  };
})();
