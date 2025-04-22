// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const cloudColor = 'rgba(50, 50, 50, 0.2)';
function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (noise(i / 3, j / 3) > 0.6) grid[i][j] = "t";
    }
    let noiseLevel = numCols;
    let noiseScale = 0.075;
    let x = noiseLevel * noise(noiseScale * i);
    for (let j = floor(x); j < floor(x) + 3; j++) {
      grid[i][j] = "w";
    }
  }

  return grid;
}

function drawGrid(grid) {
  background(128);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "_") {
        placeTile(i, j, floor(random(4)), 0);
        if (noise(i, j) > 0.8) {
          placeTile(i, j, 26, floor(random(4)));
        }
      }
      if (grid[i][j] == "w") {
        
        placeTile(i, j, floor(random(4)), 14);
        drawContext(grid, i, j, "w", 0, 0);
      }
      if (grid[i][j] == "t") {
        placeTile(i, j, floor(random(4)), 0);
        placeTile(i, j, 14, 0);
        drawContext(grid, i, j, "t", 0, 0);
      }
    }
  }
  
  fill(cloudColor);
  noStroke();
  const clouds = 30 * random();
  for (let i = 0; i < clouds; i++) {
    let x = width * ((random() + (millis() / 50000.0)) % 1);
    let y = height * random();
    ellipse(x, y, 50 * random(1, 3), 20);
  }
}

function gridCheck(grid, i, j, target) {
  if (i < grid.length && i > -1 && j < grid[i].length && j > -1) {
    if (grid[i][j] == target) return true;
  }
  return false;
}

function gridCode(grid, i, j, target) {
  let northBit = gridCheck(grid, i - 1, j, target);
  let southBit = gridCheck(grid, i + 1, j, target);
  let eastBit = gridCheck(grid, i, j + 1, target);
  let westBit = gridCheck(grid, i, j - 1, target);
  let code =
    (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
  return code;
}

function drawContext(grid, i, j, target, ti, tj) {
  let item = [
    [2, 2],
    [0, 0],
  ];
  let code = gridCode(grid, i, j, target);
  if (target == "w") item = edgeLookup[code];
  if (target == "t") item = treeLookup[code];
  for (const [tiOffset, tjOffset] of item) {
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }
}

const edgeLookup = [
  [[0, 0]],
  [[0, 0]],
  [[0, 0]],
  [
    [9, 1],
    [11, 1],
  ],
  [
    [9, 0],
    [10, 2],
  ],
  [[9, 2]],
  [[9, 0]],
  [[9, 1]],
  [
    [11, 0],
    [10, 2],
  ],
  [[11, 2]],
  [[11, 0]],
  [[11, 1]],
  [
    [10, 0],
    [10, 2],
  ],
  [[10, 2]],
  [[10, 0]],
  [[0, 2]],
];

const treeLookup = [
  [[14, 0]],
  [[14, 0]],
  [[14, 0]],
  [[14, 0]],
  [[14, 0]],
  [[15, 2]],
  [[15, 0]],
  [[15, 1]],
  [[14, 0]],
  [[17, 2]],
  [[17, 0]],
  [[17, 1]],
  [[14, 0]],
  [[16, 2]],
  [[16, 0]],
  [[16, 1]],
];