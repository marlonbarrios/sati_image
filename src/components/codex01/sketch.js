//create a simple image editor in p5.js
//by Daniel Shiffman
//http://shiffman.net/a2z

// A variable for the canvas
var canvas;

// A variable for the image
var img;

// A variable for the button
var button;

// A variable for the slider
var slider;

function setup() {

  // Create a canvas
  canvas = createCanvas(200, 200);

  // Create a button
  button = createButton('save');
  button.mousePressed(saveImage);

  // Create a slider
  slider = createSlider(0, 255, 127);

  // Load the image
  img = loadImage("assets/laDefense.jpg");

}

function draw() {
  // Draw the image
  image(img, 0, 0);

  // Get the slider value
  var val = slider.value();

  // Draw a circle
  fill(val);
  ellipse(100, 100, 50, 50);
}

// Save the image
function saveImage() {
  saveCanvas(canvas, 'myCanvas', 'jpg');
}

// Path: index.html