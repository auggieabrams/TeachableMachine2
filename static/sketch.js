let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/9OjMy27q7/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(400, 400); // Adjust canvas size to your preference
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  moveTo(300,300)
  video.hide();
  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);

  // Calculate the position to center the video on the canvas
  let x = (width - video.width) / 2;
  let y = (height - video.height) / 2;

  // Draw the video in the center
  image(flippedVideo, x, y);

  // Draw the label just below the video screen
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, y + video.height + 20); // Adjust the vertical position as needed
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classify again!
  classifyVideo();
}