function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 246, 175);
  
  for (let x = 0; x < width; x += 55) {
    for (let y = 0; y < height; y += 85) {
      let d = dist(mouseX, mouseY, x, y);
      let distortion = map(d, 0, 300, 1, 40);
      distortion = constrain(distortion, 10, 100);

      noStroke();
      fill(255, 209, 124);
      ellipse(x, y, distortion / 0.9, distortion * 1.2);

      fill(255, 138, 105);
      ellipse(x, y, distortion / 0.6, distortion * 0.9);

      fill(69, 65, 188);
      ellipse(x, y, distortion / 0.3, distortion * 0.6);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
