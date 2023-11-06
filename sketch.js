let circles = [];
let yOffset = 0;
let color1, color2, color3;
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
        interpColor = lerpColor(color(196, 99, 85), color(189, 120, 51), map(d, 0, mouseX, 0, 1));
      } else {
        interpColor = lerpColor(color(209, 134, 61), color(88, 142, 189), map(d, mouseX, 500, 0, 1));
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
        let xOffset = sin(frameCount * 10 + i * 10 + j * 2) * 10;
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
        interpColor = lerpColor(color(220, 147, 47), color(69, 106, 162), map(d, mouseX, 500, 0, 1));
      }
      stroke(interpColor);
      strokeWeight(2);
      vertex(x, y);
      noFill();
    }
    endShape(CLOSE);
  }
  drawChurch();
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

//make the element of Church
function drawChurch() {
  color1 = color(32, 55, 69);
  color2 = color(102, 43, 59);
  color3 = color(50, 30, 40);
  fill(120, 75, 50);
  push();
  rotateX(-7);
  translate(0, 200, -10);
  scale(0.5);
  beginShape();
  for (let y = -130; y <= 75; y += 10) {
    let lerpedColor;
    if (y < -30) {
      lerpedColor = lerpColor(color1, color2, map(y, -130, -30, 0, 1));
    } else {
      lerpedColor = lerpColor(color2, color3, map(y, -30, 75, 0, 1));
    }
    fill(lerpedColor);
    vertex(-260, 75, -130);
    vertex(-10, 75, -130);
    vertex(-15, 75, -100);
    vertex(-30, 75, -80);
    vertex(-60, 75, -80);
    vertex(-70, 75, -65);
    vertex(-85, 75, -50);
    vertex(-100, 75, -50);
    vertex(-105, 75, -10);
    vertex(-130, 75, 0);
    vertex(-140, 75, -10);
    vertex(-140, 75, 50);
    vertex(-150, 75, 70);
    vertex(-165, 75, 50);
    vertex(-170, 75, -10);
    vertex(-200, 75, -50);
    vertex(-250, 75, -80);
    noStroke();
  }
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}