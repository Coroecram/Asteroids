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

      return Util.proportion([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.proportion = function (vec, amount) {
    return [vec[0] * amount, vec[1] * amount];
  };

  Util.distance = function (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +
                                Math.pow(pos1[1] - pos2[1], 2));
  }

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.proportion(vec, 1 / norm);
  };

  var norm = Util.norm = function (vec) {
    return Util.distance([0, 0], vec);
  };

  Util.sortNumbers = function (a, b) {
    return a - b;
  };

})();
