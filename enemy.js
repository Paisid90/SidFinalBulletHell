class enemy {
  constructor(xPos, yPos, xSpeed, ySpeed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.state = 1;
    this.stress = 0;
    this.limit = random(lowerLimitBase, upperLimitBase);
    this.patience = random(0,lowerLimitBase/2);
    this.type = 1
  }

  
  
  
  
  
  
  display() {
    fill(map(this.patience, 0, this.limit, 0, 256), 156, 250);
    if(gameover == false){
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    }
    this.xPos = constrain(this.xPos,-10,width+10)
    this.yPos = constrain(this.yPos,-10,height+10)
    if (this.state === 2) {
      this.stress++;
    } else {
      this.stress = 0;
    }

    if (this.stress > 30) {
      fill(map(this.patience, 0, this.limit, 200, 256), 156, 250);
      this.dodge()
      this.stress = 0
    }
    quad(this.xPos-15, this.yPos,this.xPos, this.yPos-15,this.xPos+15, this.yPos,this.xPos, this.yPos+15,)
    ellipse(this.xPos, this.yPos, 23)
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

  
  
  let speed = 5; 
  
  
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
        this.shoot(enemyShotSpeed);
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

    let newShot = new shot(this.xPos, this.yPos, velocityX, velocityY, 100,1);
    
    //enemyNS.triggerAttackRelease("8n");
    enemyShots.push(newShot);
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