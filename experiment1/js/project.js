// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
}

const fillers = {
  rank: [
    "Cadet",
    "Marine",
    "Traveler",
    "Scout",
    "Nerd",
    "Guy",
    "Ball",
    "Schmuck",
  ],
  pre: ["Generic", "Spacehead", "John Joe Johnson", "Space Ventura"],
  post: ["Space Training", "Supernova", "Rocket Science", "Ventures"],
  school: ["Academy", "College", "Trade School", "Military Base", "Blast Site"],
  emote: [
    "glad",
    "shocked",
    "chuffed",
    "enthused",
    "absolutely gobsmacked",
    "thankful",
  ],
  training: [
    "Spagettification",
    "Zero-G",
    "Vacuum Exposure",
    "Temporal Paradox",
    "Rampaging Gorilla on the Shuttle",
    "Clusterfuckton of Space Hornets",
  ],
  system: [
    "Quantum Vortex",
    "Dos Equis",
    "Ad Astra",
    "Killer Klowns",
    "Upside-Down Everything",
    "GTFO",
    "Jacksonville",
  ],
  hazard1: [
    "dark energy storms",
    "time loops",
    "violent solar winds",
    "inverted gravity",
    "carcinogenic stardust",
    "quasar beams",
  ],
  hazard2: [
    "shuttle fever",
    "the pressure of a thousand atmospheres",
    "recursive realities",
    "volcanic moons",
    "staring into the abyss",
    "the radioactive remnants of a dead god",
  ],
  hazard3: [
    "purple nurples",
    "space dysentery",
    "a clusterfuckton of space hornets",
    "Elon Musk",
  ],
};

const template = `Congratulations on becoming a certified Space $rank! We here at the $pre $post $school are $emote to see you make it out of our $training course in one piece.

You must be aching to start your first mission, so here are the details. You'll be heading to the $system system, where you'll have to deal with $hazard1, $hazard2, and everybody's least favorite, $hazard3.

Good luck and godspeed.`;
// STUDENTS: You don't need to edit code below this line.

const slotPattern = /\$(\w+)/;

function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  box.innerText = story;
}

/* global clicker */
clicker.onclick = generate;

generate();

// let's get this party started - uncomment me
//main();