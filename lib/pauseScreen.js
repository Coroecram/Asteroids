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
    ctx.fillRect(133, 115, 400, 485);

    ctx.fillStyle = 'white';
    ctx.font = '48px Roundup';
    ctx.textBaseline = 'top';
    ctx.fillText("Howdy Amigo!", 233, 115);
    ctx.fillText("Go get 'em bucakroo!", 180, 545)

    ctx.font = '18px OrbitronLight';
    ctx.fillText("CONTROLS", 163, 175)
    ctx.fillText("W / UP", 163, 205), ctx.fillText("FORWARD THRUST", 313, 205);
    ctx.fillText("A / LEFT", 163, 230), ctx.fillText("LEFT TURN", 313, 230);
    ctx.fillText("S / DOWN", 163, 255), ctx.fillText("REVERSE THRUST", 313, 255);
    ctx.fillText("D / RIGHT", 163, 280), ctx.fillText("RIGHT TURN", 313, 280);
    ctx.fillText("SPACE", 163, 305), ctx.fillText("FIRE MISSLE", 313, 305);
    ctx.fillText("ENTER", 163, 330), ctx.fillText("(UN)PAUSE", 313, 330);

    ctx.font = '24px OrbitronLight';
    ctx.fillStyle = "lightgreen";
    ctx.fillText("WOOLONGS", 163, 365);
    ctx.drawImage(this.ship, 163, 395, 30, 25);
    ctx.drawImage(this.missle, 163, 425, 30, 25);
    ctx.drawImage(this.coin, 163, 455, 30, 25);
    ctx.drawImage(this.money, 163, 485, 30, 25);
    ctx.drawImage(this.bag, 163, 515, 30, 25);
    ctx.font = '20px OrbitronLight';
    ctx.textBaseline = 'top';
    ctx.fillText("5000 - 9999", 253, 460);
    ctx.fillText("10000 - 29999", 253, 490);
    ctx.fillText("30000 - 49999", 253, 520);
    ctx.fillStyle = "red";
    ctx.fillText("50000", 253, 400);
    ctx.fillText("10000", 253, 430);

  };

})();
