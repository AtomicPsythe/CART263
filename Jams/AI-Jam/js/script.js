/**
AI Jam
Foti Aivaliklis
*/

// change canvas size to phone size (makes it interactive)

"use strict";

// Current state of program
let state = `title`; // loading, running
// User's webcam
let video;
// The name of our model
let modelName = `CocoSsd`;
// ObjectDetector object (using the name of the model for clarify)
let cocossd;
// The current set of predictions made by CocoSsd once it's running
let predictions = [];

let objectToShow = "cell phone";
let objects = ["cell phone", "scissors", "glasses"];

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the CocoSsd model and when it's ready start detection
  // and switch to the running state
  cocossd = ml5.objectDetector('cocossd', {}, function() {
    // Ask CocoSsd to start detecting objects, calls gotResults
    // if it finds something
    cocossd.detect(video, gotResults);
    // Switch to the running state
    state = `running`;
  });
}

function gotResults(err, results) {
  // If there's an error, report it
  if (err) {
    console.error(err);
  }
  // Otherwise, save the results into our predictions array
  else {
    predictions = results;
  }
  // Ask CocoSsd to detect objects again so it's continuous
  cocossd.detect(video, gotResults);
}

/**
Description of draw()
*/
function draw() {
  if (state === "title") {
    title();
  }
  if (state === `loading`) {
    loading();
  }
  else if (state === `running`) {
    running();
  }
}

function title() {
    background(0);
    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("title", width/2, height/4);
    pop();
}

function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

function running() {
  // Display the webcam
  image(video, 0, 0, width, height);

  push();
  textSize(32);
  fill(255, 255, 255);
  text(`Show a ${objectToShow}`, width/2, height/9);
  // play mysterious sound here
  pop();

  // Check if there currently predictions to display
  if (predictions) {
        // If so run through the array of predictions
        console.log(predictions);
        for (let i = 0; i < predictions.length; i++) {
            // Get the object predicted
            let object = predictions[i];
            if (predictions[i].label !== "person" && predictions[i].confidence >= 0.6) {
                // Highlight it on the canvas
                highlightObject(object);
            }
            if (predictions[i].label === objectToShow) {
                push();
                textSize(32);
                fill(255, 255, 255);
                text("Correct!", width/2, height/2);
                objectToShow = random(objects);
                // play correct sound here
            }
    }
  }
}

function highlightObject(object) {
  // Display a box around it
  push();
  noFill();
  stroke(255, 255, 0);
  rect(object.x, object.y, object.width, object.height);
  pop();
  // Display the label and confidence in the center of the box
  push();
  textSize(18);
  fill(255, 255, 0);
  textAlign(CENTER, CENTER);
  text(`${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
  pop();
}

function mousePressed() {
    if (state === "title") {
        state = "loading";
    }
}