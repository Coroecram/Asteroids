(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var PauseScreen = Asteroids.PauseScreen = function (options) {
    this.ship = new Image();
    this.ship.src = './assets/img/scaled-swordfish-pause.gif';
    this.missle = new Image();
    this.missle.src = './assets/img/missle-pause.png';
    this.coin = new Image();
    this.coin.src = './assets/img/coin-pause.png';
    this.money = new Image();
    this.money.src = './assets/img/scaled-money-pause.gif';
    this.bag = new Image();
    this.bag.src = './assets/img/scaled-bag-pause.png';
  };


  PauseScreen.prototype.draw = function(ctx){
    ctx.fillStyle= "black";
    ctx.fillRect(133, 125, 400, 475);

    ctx.fillStyle = 'white';
    ctx.font = '48px Roundup';
    ctx.textBaseline = 'top';
    ctx.fillText("Howdy Amigo!", 233, 135);

    ctx.font = '20px sans-serif';
    ctx.fillText("CONTROLS", 163, 190)
    ctx.font = '18px OrbitronLight';
    ctx.fillText("W / UP", 163, 225), ctx.fillText("FORWARD THRUST", 313, 225);
    ctx.fillText("A / LEFT", 163, 250), ctx.fillText("LEFT TURN", 313, 250);
    ctx.fillText("S / DOWN", 163, 275), ctx.fillText("REVERSE THRUST", 313, 275);
    ctx.fillText("D / RIGHT", 163, 300), ctx.fillText("RIGHT TURN", 313, 300);
    ctx.fillText("SPACE", 163, 325), ctx.fillText("FIRE MISSLE", 313, 325);
    ctx.fillText("ENTER", 163, 350), ctx.fillText("(UN)PAUSE", 313, 350);

    ctx.font = '24px OrbitronLight';
    ctx.fillStyle = "lightgreen";
    ctx.fillText("WOOLONGS", 253, 380);
    ctx.drawImage(this.ship, 163, 400, 30, 25);
    ctx.drawImage(this.missle, 163, 430, 30, 25);
    ctx.drawImage(this.coin, 163, 460, 30, 25);
    ctx.drawImage(this.money, 163, 490, 30, 25);
    ctx.drawImage(this.bag, 163, 520, 30, 25);

  };

})();
