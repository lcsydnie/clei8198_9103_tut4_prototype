let circles = [];
let yOffset = 0;
let performAnimation = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(30);
  rotateX(85);

  //Draw the lake and the the reflection of sunset
  translate(0, 0, -40);
  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= mouseX) {
        interpColor = lerpColor(color(196, 99, 85), color(189,120,51), map(d, 0, mouseX, 0, 1));
      } else {
        interpColor = lerpColor(color(209,134,61), color(88,142,189), map(d, mouseX, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2);
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }

//draw the effect of Ripple Diffusion
  for (let circle of circles) {
    background(30);
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.radius * 2);
  }

  if (performAnimation) {
    for (let i = 0; i < 100; i++) {
      beginShape();
      for (let j = 0; j < 360; j += 10) {
        let rad = i * 5;
        let x = rad * cos(j);
        let y = rad * sin(j);
        let d = dist(0, 0, x, y);
        let interpColor;
        if (d <= 200) {
          interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, 200, 0, 1));
        } else {
          interpColor = lerpColor(color(220, 147, 47), color(69, 106, 162), map(d, 200.1, 500, 0, 1));
        }
        stroke(interpColor);
        strokeWeight(2);
        let xOffset = sin(frameCount * 5 + i * 10 + j * 2) * 10;
        vertex(x + xOffset, y);
        noFill();
      }
      endShape(CLOSE);
    }
  }


  //draw the sky and the sunset
  translate(0, 0, 100);
  rotateX(7);

  for (var i = 0; i < 100; i++) {
    beginShape();
    for (var j = 0; j < 360; j += 10) {
      var rad = i * 5;
      var x = rad * cos(j);
      var y = rad * sin(j);
      var d = dist(0, 0, x, y);
      var interpColor;
      if (d <= mouseX) {
        interpColor = lerpColor(color(196, 99, 85), color(220, 147, 47), map(d, 0, mouseX, 0, 1));
      } else {
        interpColor = lerpColor(color(220, 147, 47), color(69,106,162), map(d, mouseX, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2);
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }
}

//set the mousepressed to activate the interaction of Ripple Diffusion
function mousePressed() {
  let newCircle = {
    x: mouseX,
    y: mouseY,
    radius: random(20, 50),
    color: color(random(255), random(255), random(255))
  };
  circles.push(newCircle);
  performAnimation = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
