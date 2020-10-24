var scaler = 200;
var c0;
var formato = 1;
var r = 192, g = 192, b = 192;

function setup() {
 createCanvas(windowWidth, windowHeight);
 frameRate(10);
 noFill();
 c0 = new Creature(width/2, height/2);
 fSlider = createSlider(1, 100, 1); 
}

function draw() {
  
  background(0);
  stroke(r, g, b);
  c0.display();
  formato = fSlider.value()/100;
  criarMenu(c0.getM(), c0.getN1(), c0.getN2(), c0.getN3());
}

function Creature(x, y){
  this.x = x;
  this.y = y;
  this.m = random(1, 10);
  this.n1 = random(1, 100);
  this.n2 = random(1, 100);
  this.n3 = random(1, 100);
  
  
  this.display = function(){
    drawShape(this.x, this.y, this.m, this.n1, this.n2, this.n3); 
  }
  
  this.mutation = function(){
    this.m  = random(1, 10);
    this.n1 = random(1, 100);
    this.n2 = random(1, 100);
    this.n3 = random(1, 100);
  }
  
  this.getM = function(){
    return this.m;
  }
  
  this.getN1 = function(){
   return this.n1;
  }
  
  this.getN2 = function(){
   return this.n2; 
  }
  
  this.getN3 = function(){
   return this.n3; 
  }

}


function drawShape(x, y, m, n1, n2, n3){
  push();
  translate(x, y);
  
  
  var newscaler = scaler;
  for(var s = 16; s > 0; s--){
    beginShape();
    
    var mm = m + random(1, 30);
    var nn1 = n1 + random(1, 100);
    var nn2 = n2 + random(1, 100);
    var nn3 = n3 + random(1, 100);
    newscaler = newscaler * formato;
    var sscaler = newscaler;
    
    
    var points = superformula(mm, nn1, nn2, nn3);
    curveVertex(points[points.length-1].x * sscaler, points[points.length-1].y * sscaler);
    for(var i = 0; i < points.length; i++){
      curveVertex(points[i].x * sscaler, points[i].y * sscaler); 
    }
    curveVertex(points[0].x * sscaler, points[0].y * sscaler);
    endShape();    
  }  
  pop();
}

function superformula(m, n1, n2, n3){
  var numPoints = 360;
  var phi = TWO_PI / numPoints;
  var points = [];
  for(var i = 0; i <= numPoints; i++){
   points[i] = superformulaPoint(m, n1, n2, n3, phi * i); 
  }
  return points;
}

function superformulaPoint(m, n1, n2, n3, phi){
 var r;
 var t1, t2;
 var a = 1, b = 1;
 var x = 0;
 var y = 0;
 
 t1 = cos(m * phi / 4) / a;
 t1 = abs(t1);
 t1 = pow(t1, n2);
 
 t2 = sin(m * phi / 4) / b;
 t2 = abs(t2);
 t2 = pow(t2, n3);
 
 r = pow(t1 + t2, 1/n1);
 if(abs(r) == 0){
  x = 0;
  y = 0;
 }else{
   r = 1 / r;
   x = r * cos(phi);
   y = r * sin(phi);
 }
 
 return new p5.Vector(x, y); 
}



function criarMenu(c0m, c0n1, c0n2, c0n3){
  strokeWeight(5);
  stroke(0, 255, 0);
  fill(211,211,211)
  rect(width/2-600, height/2-200, 250, 400);
  strokeWeight(1);
  noStroke();
  fill(0);
  textSize(16);
  text("Detalhes", width/2-480, height/2-160);
  fSlider.position(width/2-550, height/2-150);
  
  rect(width/2-410, height/2-155, 30, 30);
  fill(0,255,0);
  textSize(14);
  textAlign(CENTER);
  text(formato, width/2-396, height/2-138);
  
  
  textSize(16);
  fill(0);
  rect(width/2-550, height/2-100, 150, 30);
  fill(0, 255, 0);
  text("M: ",width/2-510, height/2-80);
  text(round(c0m),width/2-450, height/2-80);
  
  fill(0);
  rect(width/2-550, height/2-50, 150, 30);
  fill(0, 255, 0);
  text("N1: ",width/2-510, height/2-30);
  text(round(c0n1),width/2-450, height/2-30);
  
  fill(0);
  rect(width/2-550, height/2-0, 150, 30);
  fill(0, 255, 0);
  text("N2: ",width/2-510, height/2+20);
  text(round(c0n2),width/2-450, height/2+20);
  
  fill(0);
  rect(width/2-550, height/2+50, 150, 30);
  fill(0, 255, 0);
  text("N3: ",width/2-510, height/2+70);
  text(round(c0n3),width/2-450, height/2+70);
  
  
  fill(0);
  strokeWeight(2);
  stroke(0, 255, 0);
  rect(width/2-530, height/2+100, 100, 80);
  textSize(16);
  textAlign(CENTER);
  noStroke();
  fill(0, 255, 0);
  text("MUTAR", width/2-480, height/2+145);
  
  noFill();
  strokeWeight(1); 
}


function mousePressed(){
 if(mouseX > width/2-530 && mouseX < (width/2-530)+100 && mouseY > height/2+100 && mouseY < height/2+180){   
    c0.mutation();
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);    
 } 
}
