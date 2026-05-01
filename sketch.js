let balls = new Set;

function setup() {
  createCanvas(900, 600);
  background(110);
  // ball = new Ball(color(random(200, 225)));
}

function draw() {
  background(color(20, 180));

  const gravity = createVector(0, 0.1);

  for (let b of balls) {
    if (b.age > 0) {
      const friction = b.velocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(0.01);
      b.applyForce(friction);
      b.applyForce(gravity);
      b.run();
    } else {
      balls.delete(b)
    }
  }
}

function mouseDragged() {
  balls.add(new Ball(mouseX, mouseY, color(random(100, 225), random(100, 225), random(100, 225))));
}

class Ball {
  constructor(x, y, colour){
    this.size = random(60, 30);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.location = createVector(x, y);
    // this.prevLocation = createVector(width/2+random(-10, 10), height/2+random(-10, 10));
    // this.acceleration = createVector(0.03, 0);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = random(11, 9);
    this.colour = colour;
    this.age = random(220);
  }

  draw(){
    push();
      fill(this.colour);
      stroke(this.colour);
      strokeWeight(2);
      
      drawingContext.shadowBlur = 6;
      drawingContext.shadowColor = this.colour;

      ellipse(this.location.x, this.location.y, this.size, this.size);
    pop();
    // line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    // this.prevLocation= this.location.copy();
  }

  move(){
    // let mouse = createVector(mouseX, mouseY);
    // let dir = p5.Vector.sub(mouse, this.location);
    // dir.normalize();
    // dir.mult(0.3);
    // this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  incrementAge() {
      this.age -= 1;
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
    this.incrementAge();
  }
}