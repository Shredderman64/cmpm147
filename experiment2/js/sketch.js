// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// Globals
let seed = 239;

const skyColor = "#b87833";
const buildingColor1 = "rgb(100, 100, 100)";
const buildingColor2 = "rgb(50, 50, 50)";
const cloudColor = "#a65518";
const waterColor = "rgba(100, 100, 155, 0.7)";

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(600, 400);
  canvas.parent("canvas-container");
  let button = createButton("reimagine").mousePressed(() => seed++);
  button.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);

  background(skyColor);

  noStroke();

  fill(cloudColor);
  const clouds = 50 * random();
  for (let i = 0; i < clouds; i++) {
    let z = random();
    let x = width * ((random() + (millis() / 50000.0) / z) % 1);
    let s = width / 30 / z;
    let yLower = height / 2 + height / 10 / z + s;
    let yUpper = height / 2 - height / 10 / z - s;
    ellipse(x, yLower, s * 3, s * z);
    ellipse(x, yUpper, s * 3, s * z);
  }

  fill(buildingColor1);
  drawBuildings();
  fill(buildingColor2);
  drawBuildings();
  
  rectMode(CORNER);
  fill(waterColor);
  rect(0, height / 2, width, height / 2);
}

function drawBuildings() {
  rectMode(CENTER);
  const buildings = 50;
  const buildingWidth = width / buildings;
  for (let i = 0; i < buildings; i++) {
    let x = buildingWidth * i + buildingWidth / 2;
    let buildingHeight = max(200 * random() + 30, 30);
    rect(x, height / 2, buildingWidth, buildingHeight);
    
    if (buildingHeight > 200) {
      let spireHeight = max(25 * random(), 10);
      triangle(
        buildingWidth * i, (height - buildingHeight) / 2,
        buildingWidth * (i + 1), (height - buildingHeight) / 2,
        x, (height - buildingHeight) / 2 - spireHeight
      );
      triangle(
        buildingWidth * i, (height + buildingHeight) / 2,
        buildingWidth * (i + 1), (height + buildingHeight) / 2,
        x, (height + buildingHeight) / 2 + spireHeight
      );
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}