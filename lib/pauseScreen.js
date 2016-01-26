"use strict";
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

    ctx.font = '24px OrbitronLight';
    ctx.fillStyle = "lightgreen";
    ctx.fillText("WOOLONGS", 163, 175);
    ctx.drawImage(this.ship, 163, 205, 30, 25);
    ctx.drawImage(this.missle, 163, 235, 30, 25);
    ctx.drawImage(this.coin, 163, 265, 30, 25);
    ctx.drawImage(this.money, 163, 295, 30, 25);
    ctx.drawImage(this.bag, 163, 325, 30, 25);
    ctx.font = '20px OrbitronLight';
    ctx.textBaseline = 'top';
    ctx.fillText("5000 - 9999", 253, 270);
    ctx.fillText("10000 - 29999", 253, 300);
    ctx.fillText("30000 - 50000", 253, 330);
    ctx.fillStyle = "red";
    ctx.fillText("50000", 253, 210);
    ctx.fillText("10000", 253, 240);

    ctx.font = '18px OrbitronLight';
    ctx.fillStyle = 'white';
    ctx.fillText("CONTROLS", 163, 365)
    ctx.fillText("W / UP", 163, 390), ctx.fillText("FORWARD THRUST", 313, 390);
    ctx.fillText("A / LEFT", 163, 415), ctx.fillText("LEFT TURN", 313, 415);
    ctx.fillText("S / DOWN", 163, 440), ctx.fillText("REVERSE THRUST", 313, 440);
    ctx.fillText("D / RIGHT", 163, 465), ctx.fillText("RIGHT TURN", 313, 465);
    ctx.fillText("SPACE", 163, 490), ctx.fillText("FIRE MISSLE", 313, 490);
    ctx.font = '22px Orbitron';
    ctx.fillStyle = 'green'
    ctx.fillText("ENTER", 163, 515), ctx.fillText("(UN)PAUSE", 313, 515);
  };
})();
