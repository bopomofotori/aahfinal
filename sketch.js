//Source code from Vidisha Jain. 

// Yuerong Li 
//Aah --Audio Reactive mirror
//2023.5

let state = 1; 
let fft, spectrum;
let trebEnergy, midEnergy, bassEnergy;
var on = false;
let c = 0;
let d = 50;



let video;
let poseNet;
let poses = [];



function setup() {
  createCanvas(340, 800); 
  background (255, 200, 120);


  // setup the camera capture
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  
  // start the microphone input
  mic = new p5.AudioIn(); 
  mic.start(); 
  
  amp = new p5.Amplitude(); 
  amp.setInput(mic);

  fft = new p5.FFT();
  fft.setInput(mic);

  
  // add event listener for keypress
  window.addEventListener("keypress", function(event) {
    if (event.key === "x") {
      clear();
      state = 1;
    }
  });


}

function changecolor(){
   let level = amp.getLevel();
  print(level);
  
  if (level <= 0.01) {
    noStroke();
    fill(102,255,204, 70); //green
  }
  
  if (level > 0.01 && level <= 0.04) {
    noStroke();
    fill(255, 0, 105,80) //pink
  }
  
  if (level > 0.04 && level <= 0.07) {
    noStroke();
    fill(151, 37, 207,40) //purple
  }
  
  if (level > 0.07 && level <= 0.08) {
    noStroke();
    fill(242, 220, 19,70) //yellow
  }
  
  if (level > 0.08 && level < 0.1) {
    noStroke();
    fill(245, 245, 207,47) //cream
  }
}


function draw() {
  
   // adjust the size of the video based on the microphone input level
  let level = amp.getLevel();
  let videoSize = map(level, 0, 1, width / 8, width);
  let videoX = (width - videoSize) / 2;
  let videoY = (height - videoSize) / 2;
  
  
 // draw the video capture in the background
  image(video, videoX, videoY, videoSize, videoSize);

  
  if (on) {
    
    if (state ==1){
    
      background(255)
      // fill(20, 30, 180)
      text('PRESS KEY 0', 60, 320);
  }
     //visual reactive 
    if (state == 2){

    c +=2; 
  if(c > width){
    c = 0;
    d += 50;
  }

  if(c > height){
    d = 0;
}
      
  let level = amp.getLevel();
  print(level);
  
  if (level <= 0.01) {
    noStroke();
    fill(102,255,204, 100);
    ellipse (c,d,level*200, 100);
  }
  
  if (level > 0.01 && level <= 0.04) {
    noStroke();
    fill(255, 0, 102,30)
    ellipse (c, d, level*200, 400);
  }
  
  if (level > 0.04 && level <= 0.06) {
    noStroke();
    fill(151, 37, 207,40)
    ellipse (c, d, level*400, 400);
  }
  
  if (level > 0.06 && level <= 0.08) {
    noStroke();
    fill(242, 220, 19,70)
    rect (c, d, level*300, 400);
  }
  
  if (level > 0.08 && level < 0.1) {
    noStroke();
    fill(245, 245, 207,47)
    ellipse (c, d, level*400, 400);
  }
    }
       
  } 
  
  //start button
  else {
   background(255);
  rectMode (CENTER);
 stroke (255);
    noFill();
    line(180, 300, 100, 50);
  fill (0);
    noStroke();
  textSize(25);
text('START', 100, 300);

//change color on hover 
  if (mouseX < 250 && mouseX > 150 && mouseY < 325 && mouseY > 275) {
  rectMode (CENTER);
     fill(255);
  rect(180, 300, 100, 50);
  fill (255);
    text('START', 100, 300);
fill(0);
  }
}
  
 
}

//define key 
function keyTyped() {
  state = 1
  
  if (key === '0') {
    background(255);
    state = 2;
  }
  
  
}
  
//click button 
function mousePressed () {
  if (mouseX < 400 && mouseX > 150 && mouseY < 400 && mouseY > 200) 
    (on= true)
}

//restart 
  function mouseClicked() {
    state = 1;
}
