(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var PauseScreen = Asteroids.PauseScreen = function (options) {};


  PauseScreen.prototype.draw = function(ctx){
    ctx.fillStyle= "black"
    ctx.fillRect(250, 150, 300, 400);
  };

})();
