var circles;
var currentDragged;
var clickRadius = 50;

function setup() {
  createCanvas(500, 500);

  imageMode(CENTER);

  circles = [];
  circles.push(new DraggableImage("p5js-beta.svg", 3 * width / 4, height / 2, clickRadius, color(0, 100, 0, 150)));
  circles.push(new DraggableImage("p5js-beta.svg", width / 2, height / 2, clickRadius, color(0, 0, 100, 150)));
  circles.push(new DraggableImage("p5js-beta.svg", width / 4, height / 2, clickRadius, color(255, 0, 255, 150)));
}

function draw() {
  background(100);

  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

function DraggableImage(filename, centerX, centerY, tempRadius, tempColor) {

  this.center = createVector(centerX, centerY);
  this.fillColor = tempColor;
  this.dragged = false;
  this.clickOffset = createVector(0, 0);
  this.img = createImg(filename);
  this.radius = tempRadius;
  this.img.position(this.center.x, this.center.y);
  this.img.context = this;

  this.img.mousePressed(function() {
    if (currentDragged == null) {
      currentDragged = this.context;
      this.context.setDragged(mouseX, mouseY);
    }
  });

  this.update = function() { //move with mouse
    if (this.dragged === true) {
      if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) //don't let it get away!
      {
        this.center.set(p5.Vector.add(createVector(mouseX, mouseY), this.clickOffset));
        this.img.position(this.center.x, this.center.y);
      }
    }
  }

  this.setDragged = function(fromX, fromY) {
    this.dragged = true;
    this.clickOffset = p5.Vector.sub(this.center, createVector(fromX, fromY));
  }

  this.releaseDragged = function() {
    this.dragged = false;
  }
}

function mouseReleased() {
  if (currentDragged != null) {
    currentDragged.releaseDragged();
    currentDragged = null;
  }
}