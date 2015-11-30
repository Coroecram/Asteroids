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

})();
