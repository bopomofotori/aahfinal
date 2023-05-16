let phase = 0
let amp = new p5.Amplitude(); 

class Line {
  //allows putting inputs on the sketch page
  constructor (point1, point2) {
  this.point1 = point1;
  this.point2 = point2;
}
  
show () {
  let level = amp.getLevel();
  
  //line color affected by amplitude level
    if (level <= 0.01) {
    stroke(102,255,this.point1)}
      if (level > 0.01 && level <= 0.04) {
    stroke (255, 0, this.point1*20)}
        if (level > 0.04 && level <= 0.06) {
   stroke(151, 37, 207,this.point1*20);}
          if (level > 0.06 && level <= 0.08) {
    stroke(242, 220, 19,this.point1*20);}
             if (level > 0.08 && level < 0.1) {
   stroke(245, 245, 207,this.point1*20);}
          
  strokeWeight(3);
  noFill(0);
  translate (this.point1,this.point2) // moves the lines to various places on the page
  beginShape(); 
  for (let a = 0; a < TWO_PI; a+=4) // defines how many points on the shape - in this instance, '4' makes it appear as a line
      
    //using the level variable to affect its movement
  {
    let xoff = map(cos(a+phase), -1,1,5,level*70);
    let yoff = map(sin(a+phase),-1,1,5,level*70);
    let r = map (noise(xoff, yoff), 0, 1, 100, level*20);
    let x = r * cos (a);
    let y = r * sin (a);
    vertex(x,y);
}
  endShape(CLOSE);
}
}