"use strict";
(function() {
  if (typeof(window.Asteroids) === "undefined") {
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = {};

  Util.vector = function(angle) {
    return [Math.cos((angle * Math.PI)/180), Math.sin((angle * Math.PI)/180)];
  };

  Util.randomVector = function(length) {
    var deg = 2 * Math.PI * Math.random();

    return Util.magnitude([Math.sin(deg), Math.cos(deg)], length);
  };

  Util.magnitude = function(vec, amount) {
    return [vec[0] * amount, vec[1] * amount];
  };

  Util.distance = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +
                              Math.pow(pos1[1] - pos2[1], 2));
  };

  Util.asteroidRotation = function() {
    var rotation = Math.random();
    return rotation * Math.floor(Math.random()*2) == 1 ? 1 : -1;
  };

  Util.asteroidSplitter = function(seed, type) {
    var positions = [[seed.pos[0]-20, seed.pos[1]-20],
                     [seed.pos[0]+20, seed.pos[1]+20]];

    var vectors = Asteroids.Util.splitParentVector(seed.vector);
    var constructor = (type === "medium" ? Asteroids.MediumAsteroids :
                                           Asteroids.MiniAsteroids)

    return [new constructor({pos: seed.pos, vector: vectors[0]}),
            new constructor({pos: seed.pos, vector: vectors[1]})];
  };

  Util.splitParentVector = function(seedVector) {
    var scaledLength = seedVector.length * 1.5;
    var origRadians = Math.atan2(seedVector[0], seedVector[1]);
    var firstAngle = origRadians + 0.785;
    var secondAngle = origRadians - 0.785;
    return [Util.magnitude([Math.sin(firstAngle), Math.cos(firstAngle)], scaledLength),
    Util.magnitude([Math.sin(secondAngle), Math.cos(secondAngle)], scaledLength)];
  };

  Util.sortNumbers = function(a, b) {
    return a - b;
  };

  Util.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

      return array;
  };

  Util.positionDistributor = function(xMax, yMax, objectPos) {
    var sectors = [0, 0, 0, 0, 0, 0]
    var xCutoff = xMax/3;
    var yCutoff = yMax/2;
    for (var i = 0; i < objectPos.length; i++) {
      var sectorKey = [Math.floor(objectPos[i][0] / xCutoff),
                       Math.floor(objectPos[i][1] / yCutoff)];
      switch(sectorKey.join()) {
        case '0,0':
          sectors[0] += 1;
          break;
        case '1,0':
          sectors[1] += 1;
          break;
        case '2,0':
          sectors[2] += 1;
          break;
        case '0,1':
          sectors[3] += 1;
          break;
        case '1,1':
          sectors[4] += 1;
          break;
        case '2,1':
          sectors[5] += 1;
          break;
      }
    }
    var leastPopulated = Util.leastPopulatedSector(sectors);

    return Util.randomPos(xCutoff, yCutoff, leastPopulated);
  };

  Util.leastPopulatedSector = function(sectors) {
    var min = Math.min.apply(null, sectors);
    var minIndices = [];
    for (var i = 0; i < sectors.length; i++){
      if (sectors[i] === min) {
        minIndices.push(i);
      }
    }
    if (minIndices.length === 1) {
      return minIndices[0];
    } else {
      return minIndices[Math.floor(Math.random() * minIndices.length)];
    }
  };

  Util.randomPos = function(xCutoff, yCutoff, leastPopulated) {
    var multiples = [[0,0], [1,0], [2,0], [0,1], [1,1], [2,1]][leastPopulated];
    var pos = [Math.random() * xCutoff + multiples[0] * xCutoff,
            Math.random() * yCutoff + multiples[1] * yCutoff];
    return pos;
  };
})();
