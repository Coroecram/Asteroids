(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var GameOver = Asteroids.GameOver = function (options) {
    this.image = new Image();
    this.src = './assets/img/gameover.jpg';
    this.misslesFired = options.misslesFired;
    this.shipsLost = options.shipsLost;
    debugger
    var seconds = ((Math.round(options.timePlayed/1000 * 100) / 100) % 60);
    var minutes = options.timePlayed/1000/60 << 0;
    this.timePlayed = minutes + ':' + (seconds < 10 ? "0" + seconds : seconds);
    this.totalCredits = options.totalCredits;
    this.maxCredits = options.maxCredits;
    this.asteroidCount = options.asteroidCount;
  };


  GameOver.prototype.draw = function(ctx){
    this.image.src = this.src;
    ctx.clearRect(0, 0, 667, 100);
    ctx.drawImage(this.image, 0, 100, 667, 533);

    ctx.textAlign = "left"
    ctx.font = '40px OrbitronBold';
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 203, 145);
    ctx.font = '24px OrbitronBold';
    ctx.fillStyle = "white";
    ctx.fillText("TIME PLAYED", 23, 235);
    ctx.fillText("CREDITS COLLECTED", 23, 285);
    ctx.fillText("MAX CREDITS", 23, 335);
    ctx.fillText("SHIPS CRASHED", 23, 385);
    ctx.fillText("MISSLES FIRED", 23, 435);
    ctx.fillText("ASTEROIDS DESTROYED", 23, 485);

    ctx.font = '24px OrbitronLight';
    ctx.textAlign = "right"
    ctx.fillText(this.timePlayed, 613, 235);
    ctx.fillText(this.totalCredits, 613, 285);
    ctx.fillText(this.maxCredits, 613, 335);
    ctx.fillText(this.shipsLost, 613, 385);
    ctx.fillText(this.misslesFired, 613, 435);
    ctx.fillText(this.asteroidCount, 613, 485);

    ctx.fillStyle = "lightgreen";
    ctx.fillText("Press ENTER to Play Again!", 523, 535);
    ctx.textAlign = "left"
  };

})();
