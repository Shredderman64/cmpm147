/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */

function getInspirations() {
    return [
      {
        name: "Just a bucket",
        assetUrl: "./img/bucket.jpg",
      },
      {
        name: "Apple",
        assetUrl: "./img/apple.jpeg",
      },
      {
        name: "Green apple",
        assetUrl: "./img/apple_green.jpg",
      }
    ];
  }
  
  let shapeCount = 1000;
  let mutQuotient = 20;
  let initColor = 225;
  
  function initDesign(inspiration) {
    resizeCanvas(inspiration.image.width / 8, inspiration.image.height / 8);
  
    let design = {
      bg: 128,
      fg: [],
    };
  
    for (let i = 0; i < shapeCount; i++) {
      design.fg.push({
        x: random(width),
        y: random(height),
        w: random(width / 2),
        h: random(height / 2),
        type: random(),
        fill: initColor,
      });
    }
    return design;
  }
  
  function renderDesign(design, inspiration) {
    rectMode(CENTER);
    ellipseMode(CENTER);
    background(design.bg);
    noStroke();
    let z = 60;
    for (let obj of design.fg) {
      if (inspiration.name === "Apple")
        fill(255, obj.fill, obj.fill, 128)
      else if (inspiration.name === "Green apple")
        fill(obj.fill, 255, obj.fill, 128)
      else
        fill(obj.fill, 128);
      
      //rect(obj.x, obj.y, obj.w, obj.h);
      
      if (obj.type < 0.5) {
        beginShape();
        vertex(obj.x - random(z), obj.y - random(z));
        vertex(obj.x + random(z), obj.y - random(z));
        vertex(obj.x + random(z), obj.y + random(z));
        vertex(obj.x - random(z), obj.y + random(z));
        endShape();
      } else {
         ellipse(obj.x, obj.y, obj.w);
      }
    }
  }
  
  function mutateDesign(design, inspiration, rate) {
    design.bg = mut(design.bg, 0, 255, rate);
    for (let box of design.fg) {
      box.fill = mut(box.fill, 0, 255, rate);
      box.x = mut(box.x, 0, width, rate);
      box.y = mut(box.y, 0, height, rate);
      box.w = mut(box.w, 0, width / 2, rate);
      box.h = mut(box.h, 0, height / 2, rate);
    }
  }
  
  function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / mutQuotient), min, max);
  }
  