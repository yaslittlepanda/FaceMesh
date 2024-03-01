let facemesh;
let video;
let predictions = [];

let modelIsReady = false;
let img;
const offset = 15;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
  // img = loadImage('eyes.png');
}

function modelReady() {
  console.log("Model ready!");
  modelIsReady = true;
}

function draw() {
  if(!modelIsReady){
    image(video, 0, 0, width, height);
    // image(img, 0, 0);
  }
  else{
    background(255);
    drawKeypoints();
    printAnnotations();
  }

}

function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    let x = predictions[0].annotations.midwayBetweenEyes[0][0];
    let y = predictions[0].annotations.midwayBetweenEyes[0][1];
    fill(255,0,0);
    ellipse(x,y,10,10);

    // right eye variables
    const rightEyeUpper = predictions[0].annotations.rightEyeUpper1[0];
    let rightEyeUpperX = rightEyeUpper[0];
    let rightEyeUpperY = rightEyeUpper[1];
    let rightEyeUpperZ = rightEyeUpper[2];
    const rightEyeLower = predictions[0].annotations.rightEyeLower1[0];
    let rightEyeLowerY = rightEyeLower[1];

    //left eye variables
     const leftEyeUpper = predictions[0].annotations.leftEyeUpper1[0];
    let leftEyeUpperX = leftEyeUpper[0];
    let leftEyeUpperY = leftEyeUpper[1];
    let leftEyeUpperZ = leftEyeUpper[2];
    const leftEyeLower = predictions[0].annotations.leftEyeLower1[0];
    let leftEyeLowerY = leftEyeLower[1];

    // draw eyes
    fill(255);
    circle(rightEyeUpperX+offset, (rightEyeUpperY + rightEyeLowerY)/2, 40); //200/rightEyeUpperZ?
    circle(leftEyeUpperX-offset, (leftEyeUpperY + leftEyeLowerY)/2, 40);

    console.log(rightEyeUpper);

    // image(img,rightEyeUpperX,(rightEyeUpperY + rightEyeLowerY)/2);
  }
}


function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
