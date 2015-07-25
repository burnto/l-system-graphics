var i = 0;
var ds;
function setup() {
    frameRate(15);

    createCanvas(640, 480);
 ds = new LSystem();
   ds.simulate(4);
}



function draw() {
 background(0);
   ds.render();

  // if (mouseIsPressed) {
    //     fill(0);
    // } else {
    //     fill(255);
    // }
    // rect(0, 0, 10, 300);
    // fill(0);
    // textSize(36);
    // textFont("bt_mono");
    // text("Braintree", mouseX, mouseY);
}

