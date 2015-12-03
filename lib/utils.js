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
    // debugger
    return Util.magnitude([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.magnitude = function (vec, amount) {
    // debugger
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

  Util.asteroidSplitter = function (type, seed) {
    var positions = [[seed.pos[0]-20, seed.pos[1]-20],
                     [seed.pos[0]+20, seed.pos[1]+20]];
    var velocities = Asteroids.Util.splitParentVector(seed.vel);
  };

  Util.splitParentVector = function (seedVector) {
    var amount = 1.5;
    return [[seedVector[0] * 1.5 * amount, seedVector[1] * 0.5 * amount],
    [seedVector[0] * 0.5 * amount, seedVector[1] * 1.5 * amount]];
    debugger;

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
