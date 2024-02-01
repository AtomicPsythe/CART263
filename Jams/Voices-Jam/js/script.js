/**
Voices Jam
Foti Aivaliklis
*/

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

let showSubtitle = false;
let state = "title";

let correct;
let incorrect;
let gameshow;

let timer = 15;
let timerStarted = false;

let points = 0;

function preload() {
    correct = loadSound("assets/sounds/correct.mp3");
    incorrect = loadSound("assets/sounds/incorrect.mp3");
    gameshow = loadImage("assets/images/gameshow.jpg");
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
    speechSynthesizer.setRate(1.2);
    speechSynthesizer.setVoice("Google UK English Female")

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true; 
    speechRecognizer.start();
}

function reset() {
    timer = 15;
}

/**
Description of draw()
*/
function draw() {
    background(gameshow);

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

    if (frameCount % 60 === 0 && timer > 0 && timerStarted) {
        timer--;
    }
}

function title() {
    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("Welcome to Trivordia!", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("Click the screen to start!", width/2, height/1.5)
    pop();
}
function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    timerStarted = true;
}

function timerAndPoints() {
    push();
    rect(535, 130, 240, 50);
    textSize(30);
    text("PTS.", 565, 165);
    textSize(30);
    text("TIME", 670, 165);
    circle(710, 70, 100);
    textSize(34);
    text(timer, 690, 80);
    pop();
    push();
    circle(600, 70, 100);
    textSize(34);
    text(points, 580, 80);
    pop();
}

function q1() {
    // the timer and point indicator
    timerAndPoints();
    if (timer === 0 && state === "q1") {
        state = "q2"
        timer = 15;
        q2();
    }

    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("What video game did Mario \n first appear in?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("A) Donkey Kong", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("B) Super Mario Bros.", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("C) Mario's Cement Factory", width/2, height/1.4)
    pop();   
}

function q2() {
    // the timer and point indicator
    timerAndPoints();
    if (timer === 0 && state === "q2") {
        state = "q3"
        timer = 15;
        q3();
    }

    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("Which of these games is \n oldest?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("A) Asteroids", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("B) Galaxian", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("C) Pong", width/2, height/1.4)
    pop();   
}

function q3() {
    // the timer and point indicator
    timerAndPoints();
    if (timer === 0 && state === "q3") {
        state = "q4"
        timer = 10;
        q4();
    }

    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("What is the best selling video \n game of all time?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("A) Tetris", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("B) Minecraft", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("C) Grand Theft Auto", width/2, height/1.4)
    pop();   
}

function q4() {
    // the timer and point indicator
    timerAndPoints();
    if (timer === 0 && state === "q4") {
        state = "q5"
        timer = 5;
        q5();
    }

    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("What is the best selling video \n game console of all time?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("A) Nintendo DS", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("B) Sony Playstation 2", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("C) XBox 360", width/2, height/1.4)
    pop();   
}

function q5() {
    // the timer and point indicator
    timerAndPoints();
    if (timer === 0 && state === "q5") {
        state = "ending"
        ending();
    }

    push();
    textSize(38);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("What is the species of Sonic \n the Hedgehog's friend Knuckles?", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("A) Two-tailed fox", width/2, height/1.8)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("B) Robot", width/2, height/1.6)
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("C) Echidna", width/2, height/1.4)
    pop();   
}

function ending() {
    push();
    textSize(36);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    text("Game over, thank you for playing!\n Refresh the page to play again!", width/2, height/3);
    pop();
    push();
    textSize(26);
    fill(255, 255, 255);
    textAlign(CENTER);
    text("Your finishing score was    .", width/2, height/1.5)
    text(points, 540, height/1.5)
    pop();
}

function handleSpeechInput() {
    console.log(speechRecognizer.resultString.toLowerCase()); // make this lowercase to understand all possible answers
    // question 1
    if (speechRecognizer.resultString.toLowerCase() === "donkey kong") {
        points++;
        correct.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong");
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "super mario bros") {
        points--;
        incorrect.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "mario's cement factory") {
        points--;
        incorrect.play();
        state = "q2"
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong")
        reset();
    }
    // question 2
    if (speechRecognizer.resultString.toLowerCase() === "asteroids") {
        points--;
        incorrect.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "galaxian") {
        points--;
        incorrect.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "pong") {
        points++;
        correct.play();
        state = "q3"
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto")
        reset();
    }
    // question 3
    if (speechRecognizer.resultString.toLowerCase() === "tetris") {
        points++;
        correct.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "minecraft") {
        points--;
        incorrect.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "grand theft auto") {
        points--;
        incorrect.play();
        state = "q4"
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360")
        reset();
    }
    // question 4
    if (speechRecognizer.resultString.toLowerCase() === "nintendo ds") {
        points--;
        incorrect.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "sony playstation 2") {
        points++;
        correct.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
        reset();
    }
    if (speechRecognizer.resultString.toLowerCase() === "xbox 360") {
        points--;
        incorrect.play();
        state = "q5"
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna")
        reset();
    }
    // question 5
    if (speechRecognizer.resultString.toLowerCase() === "two-tailed fox") {
        points--;
        incorrect.play();
        state = "ending"
    }
    if (speechRecognizer.resultString.toLowerCase() === "robot") {
        points--;
        incorrect.play();
        state = "ending"
    }
    if (speechRecognizer.resultString.toLowerCase() === "echidna") {
        points++;
        correct.play();
        state = "ending"
    }
}

function mousePressed() {
    if (state === "title") {
        state = "q1";
        speechSynthesizer.speak("What video game did Mario first appear in? A) Donkey Kong, B) Super Mario Bros., C) Mario's Cement Factory");
    }
    // if (state === "q1") {
    //     speechSynthesizer.speak("What video game did Mario first appear in? A) Donkey Kong, B) Super Mario Bros., C) Mario's Cement Factory");
    // }
    if (state === "q2") {
        speechSynthesizer.speak("Which of these games is oldest? A) Asteroids, B) Galaxian, C) Pong");
    }
    if (state === "q3") {
        speechSynthesizer.speak("What is the best selling video game of all time? A) Tetris, B) Minecraft, C) Grand Theft Auto");
    }
    if (state === "q4") {
        speechSynthesizer.speak("What is the best selling video game console of all time? A) Nintendo DS, B) Sony Playstation 2, C) XBox 360");
    }
    if (state === "q5") {
        speechSynthesizer.speak("What is the species of Sonic the Hedgehog's friend Knuckles? A) Two-tailed fox, B) Robot, C) Echidna");
    }
}