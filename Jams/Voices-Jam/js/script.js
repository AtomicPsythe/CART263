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
    speechSynthesizer.continuous = true; 
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

function q3() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("What is the best selling video \n game of all time?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("A) Tetris", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("B) Minecraft", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("C) Grand Theft Auto", width/2, height/1.4)
    pop();   
}

function q4() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("What is the best selling video \n game console of all time?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("A) Nintendo DS", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("B) Sony Playstation 2", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("C) XBox 360", width/2, height/1.4)
    pop();   
}

function q5() {
    push();
    textSize(48);
    fill(159, 51, 51);
    textAlign(CENTER, CENTER);
    text("What is the species of Sonic \n the Hedgehog's friend Knuckles?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("A) Two-tailed fox", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("B) Robot", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(159, 51, 51);
    textAlign(CENTER);
    text("C) Echidna", width/2, height/1.4)
    pop();   
}

function handleSpeechInput() {
    console.log(speechRecognizer.resultString);
    // question 1
    if (speechRecognizer.resultString === "Donkey Kong") {
        correct.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
    }
    if (speechRecognizer.resultString === "Super Mario Bros") {
        incorrect.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
    }
    if (speechRecognizer.resultString === "Mario's Cement Factory") {
        incorrect.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
    }
    // question 2
    if (speechRecognizer.resultString === "Asteroids") {
        incorrect.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
    }
    if (speechRecognizer.resultString === "Galaxian") {
        incorrect.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
    }
    if (speechRecognizer.resultString === "Pong") {
        correct.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
    }
    // question 3
    if (speechRecognizer.resultString === "Tetris") {
        correct.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
    }
    if (speechRecognizer.resultString === "Minecraft") {
        incorrect.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
    }
    if (speechRecognizer.resultString === "Grand Theft Auto") {
        incorrect.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
    }
    // question 4
    if (speechRecognizer.resultString === "Nintendo DS") {
        incorrect.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
    }
    if (speechRecognizer.resultString === "Sony Playstation 2") {
        correct.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
    }
    if (speechRecognizer.resultString === "XBox 360") {
        incorrect.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
    }
    // question 5
    if (speechRecognizer.resultString === "Two-tailed fox") {
        incorrect.play();
        state = "ending"
    }
    if (speechRecognizer.resultString === "Robot") {
        incorrect.play();
        state = "ending"
    }
    if (speechRecognizer.resultString === "Echidna") {
        correct.play();
        state = "ending"
    }
}

function mousePressed() {
    if (state === "title") {
        state = "q1";
    }
    if (state === "q1") {
        speechSynthesizer.speak("What video game did Mario first appear in? A) Donkey Kong, B) Super Mario Bros., C) Mario's Cement Factory");
    }
    if (state === "q2") {
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
    }
    if (state === "q3") {
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
    }
    if (state === "q4") {
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
    }
    if (state === "q5") {
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
    }
}