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

  Util.vector = function (angle) {
    return [Math.cos((angle * Math.PI)/180), Math.sin((angle * Math.PI)/180)];
  };

  Util.randomVector = function (length) {
    var deg = 2 * Math.PI * Math.random();

    debugger
    return Util.magnitude([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.magnitude = function (vec, amount) {
    return [vec[0] * amount, vec[1] * amount];
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +
                              Math.pow(pos1[1] - pos2[1], 2));
  };

  Util.asteroidRotation = function () {
    var rotation = Math.random();
    return rotation * Math.floor(Math.random()*2) == 1 ? 1 : -1;
  };

  Util.asteroidSplitter = function (seed, type) {
    var positions = [[seed.pos[0]-20, seed.pos[1]-20],
                     [seed.pos[0]+20, seed.pos[1]+20]];

    var vectors = Asteroids.Util.splitParentVector(seed.vector);
    var constructor = (type === "medium" ? Asteroids.MediumAsteroids :
                                           Asteroids.MiniAsteroids)

    return [new constructor({pos: seed.pos, vector: vectors[0], game: game}),
            new constructor({pos: seed.pos, vector: vectors[1],  game: game})];
  };

  Util.splitParentVector = function (seedVector) {
    var scaledLength = seedVector.length * 1.5;
    var origRadians = Math.atan2(seedVector[0], seedVector[1]);
    var firstAngle = origRadians + 0.785;
    var secondAngle = origRadians - 0.785;
    return [Util.magnitude([Math.sin(firstAngle), Math.cos(firstAngle)], scaledLength),
    Util.magnitude([Math.sin(secondAngle), Math.cos(secondAngle)], scaledLength)];
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
