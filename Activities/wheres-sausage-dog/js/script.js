/**
Activity 1 - Where's Sausage Dog
Foti Aivaliklis
*/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

/**
Creates a For loop for all of the animal + sausage dog images
*/
function preload() {
    for (let i = 0; i < NUM_ANIMAL_IMAGES, i++;) {
        let animalImage = loadImage("assets/images/animal${i}.png");
        animalImages.push(animalImage);
    }

    sausageDogImage = loadImage("assets/images/sausage-dog.png");
}


/**
Creates a For loop for the animal + sausage dog images and sets them all at a random location
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // create the animals
    for (let i = 0, i < NUM_ANIMALS, i++;) {
        let x = random(0, width);
        let y = random(0, height);
        let animalImage = random(animalImages);
        let animal = new Animal(x, y, animalImage);
        animals.push(animal);
    }

    let x = random(0, width);
    let y = random(0, height);
    sausageDog = new sausageDog(x, y, sausageDogImage);
}


/**
Creates the program itself (displays the images and the background)
*/
function draw() {
    background(255, 255, 0);

    for (let i = 0, i < animals.length; i++) {
        animals[i].update();
    }

    sausageDog.update();
}

// confirms that the sausage dog was pressed when the mouse clicks on it
function mousePressed() {
    sausageDog.mousePressed();
}