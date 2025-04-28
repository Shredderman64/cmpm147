"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
let eyes = new Map();
function p3_preload() {}

function p3_setup() {
  angleMode(DEGREES);
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  eyes = new Map();
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j, x, y) {
  noStroke();
  fill(255, 200);

  push();
  translate(x, y);

  if (eyes.get(`${i}${j}`) == null)
    eyes.set(`${i}${j}`, new Eye(i, j));
  else {
    let eye = eyes.get(`${i}${j}`);
    eye.draw(x, y);
  }
  
  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  strokeWeight(3);
  let seed = XXH.h32("tile:" + [i, j], worldSeed);
  if (seed % 16 == 0) stroke("lightblue");
  else if (seed % 20 == 0) stroke("green");
  else if (seed % 4 == 0) stroke("orange");
  
  ellipse(0, 0, tw);

  noStroke();
  fill(0);
}

function p3_drawAfter() {}

class Eye {
  constructor(i, j) {
    this.seed = XXH.h32("tile:" + [i, j], worldSeed);
    this.vigilance = 200;
    this.lastMouse = [mouseX, mouseY];
    this.theta = 0;
    this.thetaStep = random(-5, 5);
  }
  
  lazyEye(x, y) {
    if (mouseX == this.lastMouse[0] && mouseY == this.lastMouse[1] && this.vigilance > 0) {
      this.vigilance--;
    } else if (mouseX != this.lastMouse[0] || mouseY != this.lastMouse[1]) {
      this.lastMouse = [mouseX, mouseY];
      this.vigilance = 200;
    }
    
    if (this.vigilance == 0) {
      this.theta += this.thetaStep;
    } else {
      let v1 = createVector(1, 0);
      let v2 = createVector(mouseX - x, mouseY - y);
      this.theta = v1.angleBetween(v2);
    }
  }
  
  draw(x, y) {
    if (this.seed % 4 == 0) {
      ellipse(0, 0, tw);
      
      if (this.seed % 16 == 0) fill("lightblue");
      else if (this.seed % 20 == 0) fill("green");
      else fill("orange");
      ellipse(cos(this.theta) * tw / 4, sin(this.theta) * tw / 4, 15);

      fill("black");
      ellipse(cos(this.theta) * tw / 4, sin(this.theta) * tw / 4, 8);
      this.lazyEye(x, y);
    }
  }
}