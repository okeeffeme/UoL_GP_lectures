let traces = [];

function setup() {
  createCanvas(900, 600);
  background(110);

  for (let i = 0; i < 60; i++) {
    traces.push(
      new Trace(color(random(200, 225),225, random(200, 225)))
    )
  }

}

function draw() {
  background(color(20, 20));

  for (let t of traces) {
    t.run();
  }
}

class Trace {
  constructor(colour){
    this.velocity = createVector(0, 0);
    this.location = createVector(width/2+random(-10, 10), height/2+random(-10, 10));
    this.prevLocation = createVector(width/2+random(-10, 10), height/2+random(-10, 10));
    // this.acceleration = createVector(0.03, 0);
    this.maxVelocity = random(11, 9);
    this.colour = colour;
  }

  draw(){
    fill(this.colour);
    stroke(this.colour);
    strokeWeight(2);
    // ellipse(this.location.x, this.location.y, 2,2 )
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.prevLocation= this.location.copy();
  }

  move(){
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.3);
    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }

  edges(){
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  run(){
    this.draw();
    this.move();
    // this.edges();
  }
}