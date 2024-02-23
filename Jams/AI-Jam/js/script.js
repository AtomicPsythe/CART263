/**
AI Jam
Foti Aivaliklis

Description: A prototype game using the Image Detector from ml5 where your goal is to find and show the correct item on the screen.
             Once you have found every correct item, you are victorious and can play again, however if you do not find the correct items 
             and run out of time, then you lose and must try again. Have fun and good luck!
*/

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

// defining the specific objects that needed to be found
let objectToShow = "cell phone";
let objects = ["scissors", "apple", "book", "chair", "backpack", "spoon", "keyboard", "bottle", "remote"];

// the emoji mapping
let emojis = undefined;

// the timer and points variables
let timer = 15;
let timerStarted = false;

// variables for the sounds
let correct;
let incorrect;
let waiting;
let endingYippie;

// bad counter that tracks how many times you have run out of time
let badCounter = 0;

/**
Inputting and defining sounds and images
*/
function preload() {
  emojis = loadJSON(`assets/cocossd-emoji-mapping.json`);
  correct = loadSound("assets/sounds/correct.mp3");
  incorrect = loadSound("assets/sounds/incorrect.mp3");
  waiting = loadSound("assets/sounds/waiting.mp3");
  endingYippie = loadSound("assets/sounds/children yippie.mp3");
}


/**
Gives the computer the ability to run ml5 and allows the cocossd camera to function
*/
function setup() {
  createCanvas(640, 480);

  // makes the audio playable and sets the correct volume for each audio file
  userStartAudio();
  correct.setVolume(0.5);
  incorrect.setVolume(0.5);
  waiting.setVolume(0.2);
  endingYippie.setVolume(0.5);

  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  // Start the CocoSsd model and when it's ready start detection
  // and switch to the running state
  cocossd = ml5.objectDetector('cocossd', {}, function () {
    // Ask CocoSsd to start detecting objects, calls gotResults
    // if it finds something
    cocossd.detect(video, gotResults);
    // Switch to the running state
    state = `running`;
  });

  // plays and loops the background music
  waiting.play();
  waiting.loop();
}

// resets the timer once it enters a new state
function reset() {
  timer = 15;
}

// checks if there is any errors in the functionality of the program
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
Goes through each state and allows it to function smoothly + allows for the timer to begin counting down
*/
function draw() {
  if (state === "title") {
    title();
  }
  if (state === `loading`) {
    loading();
  }
  if (state === `running`) {
    running();
  }
  if (state === `active`) {
    timerActive();
  }
  if (state === `pause`) {
    console.log(`paused...`)
    push();
    textSize(32);
    fill(255, 255, 255);
    text("Times up! Wait for restart.", width / 4, height / 2);
    pop();
  }
  if (state === "ending") {
    ending();
  }
  if (state === "ending2") {
    ending2();
  }

  // allows for the timer to count down
  if (frameCount % 60 === 0 && timer > 0 && timerStarted) {
    timer--;
  }
}

// creates the title state 
function title() {
  background(0);
  push();
  textSize(38);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text("Welcome to Search n' Show!", width / 2, height / 4);
  text("The game will begin shortly...", width / 2, height / 1.5);
  pop();
}

// the transition phase between the title and running states
function loading() {
  background(255);

  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

// creates the UI for the timer
function timerActive() {
  push();
  rect(460, 130, 90, 50);
  textSize(30);
  text("TIME", 470, 165);
  circle(510, 70, 100);
  textSize(34);
  text(timer, 490, 80);
  pop();
  
}


// the running program: does not highlight a "person", checks if the objects 
// shown on screen are the objects that needed to be shown, and checks if the correct object is found in time
function running() {
  // Display the webcam
  image(video, 0, 0, width, height);

  timerActive();
  rect(160, 20, 260, 50);
  push();
  textSize(32);
  fill(0);
  text(`Find: ${objectToShow}`, 180, height / 9);
  timerStarted = true;
  pop();

  if (objects.length > 0) {
    // Check if there currently predictions to display
    if (predictions) {
      // If so run through the array of predictions
      // console.log(predictions);
      for (let i = 0; i < predictions.length; i++) {
        // Get the object predicted
        let object = predictions[i];
        if (predictions[i].label !== "person" && predictions[i].confidence >= 0.6) {
          // Highlight it on the canvas
          highlightObject(object);
        }
        // checks of the label is the same as the object needed to be found
        if (predictions[i].label === objectToShow) {
          timer = 15;
          push();
          textSize(32);
          fill(255, 255, 255);
          text("Correct!", width / 3, height / 2);
          correct.play();
          timerStarted = true;
          objects.splice(objects.indexOf(objectToShow), 1);
          objectToShow = random(objects);
          pop();
          console.log(`Found ${objectToShow} which is at ${i} with confidence ${predictions[i].confidence}`)
          break;
        }
        if (timer === 5) {
          waiting.rate(2);
          tint(255, 0, 0, 100);
        }
        else if (timer === 20) {
          waiting.rate(1);
          noTint();
        }
        // if the timer reaches 0, the program pauses for a bit before starting up again and you get one stack on the bad counter
        else if (timer === 0) {
          badCounter++;
          console.log(badCounter);
          state = "pause";
          setTimeout(unPause, 3000);
          incorrect.play();
        }
        // if you run out of time twice you get a game over screen
        else if (badCounter === 2) {
          state = "ending";
        }
      }
    }
  }
  // goes to the correct ending state and plays a victorious sound
  else {
    state = "ending";
    endingYippie.play();
  }
}

// shows the ending screen once all of the objects are found
function ending() {
  background(0);
  push();
  textSize(38);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text("Congrats on finding every object!", width / 2, height / 4);
  text("Refresh the page to play again :)", width / 2, height / 1.5);
  pop();
}

// shows the game over ending screen if you run out of time on two occasions
function ending2() {
  background(0);
  push();
  textSize(38);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text("You ran out of time and couldn't find every \n every object :(", width / 2, height / 4);
  text("Refresh the page to try again :)", width / 2, height / 1.5);
  pop();
}

// allows for every recognizable object to be highlighted on the screen
function highlightObject(object) {
  // Get the emoji for this object label (from the JSON)
  let emoji = emojis[object.label];

  if (emoji) {
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
    text(`${emoji}, ${object.label}, ${object.confidence.toFixed(2)}`, object.x + object.width / 2, object.y + object.height / 2);
    pop();
  }
}

function mousePressed() {
  if (state === "title") {
    state = "loading";
  }
}

// once the pause is done, the program starts up again like normal
function unPause() {
  timer = 15;
  timerStarted = false;
  objectToShow = random(objects);
  state = `running`
  waiting.rate(1);
  noTint();
}