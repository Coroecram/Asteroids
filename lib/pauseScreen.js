(function () {
  if (typeof(window.Asteroids) === "undefined"){
    window.Asteroids = {};
  };

  var PauseScreen = Asteroids.PauseScreen = function (options) {
    this.image = new Image();
    this.shipSrc = './assets/img/scaled-swordfish.gif';
    this.missleSrc = './assets/img/missle.png';
    this.coinSrc = './assets/img/coin.png';
    this.moneySrc = './assets/img/scaled-money.gif';
    this.bagSrc = './assets/img/scaled-bag.png';
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
    this.image.src = this.coinSrc;
    ctx.drawImage(this.image, 163, 400, 25, 25);
    this.image.src = this.moneySrc;
    ctx.drawImage(this.image, 163, 440, 25, 25);
    this.image.src = this.bagSrc;
    ctx.drawImage(this.image, 163, 480, 25, 25);
    this.image.src = this.shipSrc;
    ctx.drawImage(this.image, 163, 520, 25, 25);
    this.image.src = this.missleSrc;
    ctx.drawImage(this.image, 163, 560, 25, 25);

  };

})();
