/**
Voices Jam
Foti Aivaliklis
*/

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

let showSubtitle = false;
let currentSpeech = "Your Answer:";
let state = "title";

let correct;
let incorrect;

function preload() {
    correct = loadSound("assets/sounds/correct.mp3");
    incorrect = loadSound("assets/sounds/incorrect.mp3");
}

/**
Description of setup
*/
function setup() {
    createCanvas(800, 800);

    userStartAudio();
    correct.setVolume(0.5);
    incorrect.setVolume(0.5);

    // Synthesis Settings
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice("Google UK English Female")

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.start();

    console.log(speechSynthesizer.listVoices());
}


/**
Description of draw()
*/
function draw() {
    background(227, 127, 111);

    if (state === "title") {
        title();
    }
    else if (state === "q1") {
        q1();
    }
    else if (state === "q2") {
        q2();
    }
    else if (state === "q3") {
        q3();
    }
    else if (state === "q4") {
        q4();
    }
    else if (state === "q5") {
        q5();
    }
    else if (state === "ending") {
        ending();
    }
}

function title() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("Welcome to Trivordia!", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("Click the screen to start!", width/2, height/1.5)
    pop();
}

function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false;
}

function q1() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("What video game did Mario first \n appear in?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("A) Donkey Kong", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("B) Super Mario Bros.", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("C) Mario's Cement Factory", width/2, height/1.4)
    pop();   
}

function q2() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("Which of these games is oldest?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("A) Asteroids", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("B) Galaxian", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("C) Pong", width/2, height/1.4)
    pop();   
}

function handleSpeechInput() {
    console.log(speechRecognizer.resultString);
    // question 1
    if (speechRecognizer.resultString === "Donkey Kong") {
        correct.play();
    }
    if (speechRecognizer.resultString === "Super Mario Bros") {
        incorrect.play();
    }
    if (speechRecognizer.resultString === "Mario's Cement Factory") {
        incorrect.play();
    }
    // question 2
    if (speechRecognizer.resultString === "Asteroids") {
        correct.play();
    }
    if (speechRecognizer.resultString === "Galaxian") {
        incorrect.play();
    }
    if (speechRecognizer.resultString === "Pong") {
        incorrect.play();
    }
}

function mousePressed() {
    if (state === "title") {
        state = "q1";
    }
    if (state === "q1") {
        speechSynthesizer.speak("What video game did Mario first appear in? A) Donkey Kong, B) Super Mario Bros., C) Mario's Cement Factory");
    }
    if (state === "q1") {
        state === "q2";
    }
    if (state === "q2") {
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
    }
}