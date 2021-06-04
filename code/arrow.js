let angle = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}
function drawArrow(x,y,angle,size){
    push();
    strokeWeight(2);
    translate(x,y);
    rotate(radians(angle) );
    triangle(0,0,size,size,size,-size);
    pop();
}
function draw() {
    background(210);
    // strokeWeight(6);
    // point(50,60);
    drawArrow(50,60,angle,35);
    // angle = (angle+6) % 360;
    
}