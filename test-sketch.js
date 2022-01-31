//initialize a counter variable
var count1=0
var count2=4
var count3=2
var count4=1
var count5=5

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  
//rectangle 1
  fill(230,30,140);
  noStroke();  rect(-50/2+count1,100/2,50,50);
  
  count1=count1+2;

  //rectangle 2
  fill(107,171,176);
  noStroke();
  rect(-100+count2,200,100,100);
  
  count2=count2+5;
  
  //rectangle 3
  fill(157,146,240);
  noStroke();
  rect(-75+count3,100,75,200);
  count3=count3+9
  
  //rectangle 4
  fill(171,82,44);
  noStroke();
  rect(-200+count4,300,200,80);
  count4=count4+4
  
  //rectangle 5
  fill(153,186,154);
  noStroke();
  rect(-100+count5,75,100,40);
  count5=count5+1
}