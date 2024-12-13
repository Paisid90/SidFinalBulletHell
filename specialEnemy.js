class specialEnemy {
  constructor(xPos, yPos, xSpeed, ySpeed,size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.state = 1;
    this.stress = 0;
    this.limit = random(lowerLimitBase/3, upperLimitBase/3);
    if(size>0){
      this.size = size
    }
    else{
      this.size = 80
    }
    this.patience = this.limit;
    this.type = 2
  }

  
  
  
  
  
  
  
  
  
  display() {
    fill(140, map(this.patience, 0, this.limit, 160, 256), 150);
    if(gameover == false){
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed*=1-(this.size+20)*1/500
    this.ySpeed*=1-(this.size+20)*1/500
    }
    this.xPos = constrain(this.xPos,-10,width+10)
    this.yPos = constrain(this.yPos,-10,height+10)
    if (this.state === 2) {
      this.stress++;
    } else {
      this.stress = 0;
    }

    if (this.stress > 30) {
      fill(250, map(this.patience, 0, this.limit,250,256), 156, 250);
      this.dodge()
      this.stress = 0
    }
    ellipse(this.xPos,this.yPos,this.size)
  }

  
  dodge() {
  
  let dx = mouseX - hero.x;
  let dy = mouseY - hero.y;

  
  let perpX = -dy; 
  let perpY = dx;

 
  let magnitude = dist(0, 0, perpX, perpY);
  if (magnitude !== 0) { 
    perpX /= magnitude;
    perpY /= magnitude;
  }

  
  
  let speed = 15; 
  
  
    if(random(-1,1)>0){
  this.xSpeed += perpX * speed;
  this.ySpeed += perpY * speed;
    }
    else{
      this.xSpeed -= perpX * speed;
  this.ySpeed -= perpY * speed;
    }
  
  if (this.xPos < 50 || this.xPos > width-50 || this.yPos < 50 || this.yPos > height-50) {

    this.xSpeed -= perpX * speed;
    this.ySpeed -= perpY * speed;
  }
}

  
  
  
  idle() {
    if (this.patience < this.limit) {
        this.patience++;
    } else {
        this.patience = 0;
        this.shoot(enemyShotSpeed*3);
    }
    
    // Smoother edge avoidance
    let edgeBuffer = 50;
    if (this.xPos > width - edgeBuffer) {
        this.xSpeed -= 0.5; // Gradual deceleration
    } else if (this.xPos < edgeBuffer) {
        this.xSpeed += 0.5;
    }
    
    if (this.yPos > height - edgeBuffer) {
        this.ySpeed -= 0.5;
    } else if (this.yPos < edgeBuffer) {
        this.ySpeed += 0.5;
    }
    
    // Rest of the existing movement logic remains the same
    if (this.patience % 50 == 0) {
        this.xSpeed += (random(map(this.xSpeed, -5, 5, 0, -2), map(this.xSpeed, -5, 5, 2, 0)));
        this.ySpeed += (random(map(this.ySpeed, -5, 5, 0, -2), map(this.ySpeed, -5, 5, 2, 0)));
    }
    
    if (abs(this.xSpeed) > 4) {
        this.xSpeed *= 0.95;
    }
    if (abs(this.ySpeed) > 4) {
        this.ySpeed *= 0.95;
    }
}
  
  
  
  
  
  shoot(shotSpeed) {
    let directionX = hero.x - this.xPos;
    let directionY = hero.y - this.yPos;

    let magnitude = dist(0, 0, directionX, directionY);
    let normalizedX = directionX / magnitude;
    let normalizedY = directionY / magnitude;
    let velocityX = normalizedX * shotSpeed;
    let velocityY = normalizedY * shotSpeed;
//enemyNS.triggerAttackRelease("8n");
    this.xSpeed = velocityX
    this.ySpeed = velocityY
  }

  
  
  
  
  
  
  
  
  watched(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = dist(x1, y1, x2, y2);
    let dot = ((this.xPos - x1) * dx + (this.yPos - y1) * dy) / (length * length);
    let closestX = x1 + dot * dx;
    let closestY = y1 + dot * dy;
    let onSegment =
      closestX >= min(x1, x2) &&
      closestX <= max(x1, x2) &&
      closestY >= min(y1, y2) &&
      closestY <= max(y1, y2);
    let distanceToCenter = dist(closestX, closestY, this.xPos, this.yPos);

    if (onSegment && distanceToCenter <= 60) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
}