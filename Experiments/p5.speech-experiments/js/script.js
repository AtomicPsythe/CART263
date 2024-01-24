/**
Voice Output Experiments
Foti Aivaliklis
*/

// OUTPUT EXPERIMENTS

// "use strict";

// const speechSynthesizer = new p5.Speech();

// let showSubtitle = false;
// let toSay = "I'm crawling through your air conditioning ducts right now."

// /**
// Description of setup
// */
// function setup() {
//     createCanvas(500, 500);

//     // Synthesis Settings
//     speechSynthesizer.setPitch(0.2);
//     speechSynthesizer.setRate(0.5);
//     speechSynthesizer.setVoice("Google UK English Male")

//     speechSynthesizer.onStart = speechStarted;
//     speechSynthesizer.onEnd = speechEnded;

//     console.log(speechSynthesizer.listVoices());
// }


// /**
// Description of draw()
// */
// function draw() {
//     background(227, 127, 111);

//     if (showSubtitle) {
//         textSize(36);
//         text(toSay, 100, 100);
//     }
// }

// function mousePressed() {
//     // Say Something
//     speechSynthesizer.speak(toSay);
// }

// function speechStarted() {
//     showSubtitle = true;
// }

// function speechEnded() {
//     showSubtitle = false;
// }

// INPUT EXPERIMENTS

"use strict";

const speechRecognizer = new p5.SpeechRec();
let currentSpeech = "?"
let lightsAreOn = false;

/**
Description of setup
*/
function setup() {
    createCanvas(500, 500);

    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.continuous = true;
    speechRecognizer.start();
}

/**
Description of draw()
*/
function draw() {
    background(0);

    if (lightsAreOn) {
        background(255);
    }

    // textAlign(CENTER, CENTER);
    // textSize(24);
    // text("Say that you love me", width/2, height/3);

    // text(currentSpeech, width/2, height/2);
}

function handleSpeechInput() {
    // if (speechRecognizer.resultString === "I love you") {
    //     currentSpeech = "You're damn right you do.";
    // }
    // else {
    //     currentSpeech = ":(";
    // }

    console.log(speechRecognizer.resultString);
    if (speechRecognizer.resultString.toLowerCase() === "turn the lights on") {
        lightsAreOn = true;
    }
    else if (speechRecognizer.resultString.toLowerCase() === "turn the lights off") {
        lightsAreOn = false;
    }
}

// function mousePressed() {
// }

