var gif;
var rendering = true;

var angle = 30;
var d = 140;
var iter = 3;

var w = 600;
var h = 400;
var x = w * .5;
var y = h * .5;
var r = 0;

var cInc = +0.01;

var c, c2;
var system = new LSystem({
  axiom: 'f',
  rules: {
    'f': '+feg[+efg[+>feg[+fg]]]'
  },
  renderRules: {
    'f': function () {
      fill(c2);
      textSize(12);
      text('B', 0, 0);
      translate(d, 0);
    },
    'g': function () {
      fill(c);
      textSize(12);
      text('0', 0, 0);
      translate(d, 0);
    },
    'e': function () {
      fill(c);
      textSize(12);
      text('$', 0, 0);
      translate(d, 0);
    },
    'h': function () {
      rect(0, 0, d/3, d/3),
      translate(2 * d / 3, 0);
    },
    'i': function () {
      line(0, 0, d/4, d/4),
      translate(2 * d / 8, 0);
    },

      '<': function () {
        c = color((c.hsba[0] - cInc) % 360, c.hsba[1], c.hsba[2], c.hsba[3]);
        c2 = color((c2.hsba[0] - cInc) % 360, c2.hsba[1], c2.hsba[2], c2.hsba[3]);
      },
      '>': function () {
        c = color((c.hsba[0] - cInc) % 360, c.hsba[1], c.hsba[2], c.hsba[3]);
        c2 = color((c2.hsba[0] + cInc) % 360, c2.hsba[1], c2.hsba[2], c2.hsba[3]);
      },
        '[': function () {
          push();
        },
        ']': function () {
          pop();
        },
          '+': function () {
            rotate(angle);
          },
          '-': function () {
            rotate(-1 * angle);
          }
  }
});

function setup() {
  angleMode(DEGREES);
  colorMode(HSB);
  c = color(10, 100, 100, 1);
  c2 = color(190, 100, 100, 1);
  frameRate(30);
  createCanvas(w, h);
  setupGif();
}

function mousePressed() {
  rendering = !rendering;
  if (!rendering) {
    gif.render();
  }
}


function draw() {
  if (!rendering) {
    return;
  }
  angle += 0.1;
  noFill();
  background(color(0,0,5,1));
  translate(x, y);
  rotate(r);
  push();
  system.reset();
  system.simulate(iter);
  system.render();
  pop();

  var canvas = document.getElementById('defaultCanvas');

  gif.addFrame(canvas, {delay: 0, copy: true});

}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}


