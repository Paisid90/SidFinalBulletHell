let hiScore = 0
let magazine = [];
let opposition = [];
let enemyShots = [];
let pickups = [];
let barriers = [];
let synth;
let noiseSynth;
let audioContextStarted = false;

function setup() {
magazine = [];
  opposition = [];
  enemyShots = [];
  pickups = [];
  situation = false
  frameRate(60)
  mult = 1
  
  
 
  upgrades = ["RELOAD","VELOCITY","INVINCIBILITY","AMMO","SHOT SPEED","NUKE","FIRERATE"]
  upg = 0
  maxShots = 10
  flash = 0
  menu = true
  tutorial = false
  createCanvas(1200, 800);
  frameRate(60);
  gameover = false;
  paused = false;
  hero = {
    x: width / 2,
    y: height / 2,
    xSpeed: 0,
    ySpeed: 0,
    radius: 40,
    life: 3,
    shots: 10
  };
  
  score = 0
  //Score dependent variables
  
  //enemies
  lowerLimitBase = 200
  upperLimitBase = 300
  lowerLimit = 200
  upperLimit = 300
  
  //waves
  waveTimer = 10
  numOpps = 4
  oppsInc = 0
  oppsSpawned = 0 
  oppsTick = 0
  
  upgrading = false
  uptick = 0
  
  shotSpeed = 15;
  speedinc = 0.5;
  tick = 10;
  tickInc = 1
  cooldown = 15;
  for (i = 0; i < 0; i++) {
    makeEnemy();
  
  }
  invTime = 50;
  
  //debug
  opplength = 0
  synth = new Tone.Synth().toDestination();
  noiseSynth = new Tone.NoiseSynth().toDestination();
  noiseSynth.volume.value = -20;
  enemyNS = new Tone.NoiseSynth().toDestination();
  enemyNS.volume.value = -25;
} 

function draw() {
  Tone.start();
  if(menu){
    noStroke()
    background(map(dist(width/2,600, mouseX,mouseY),200,0,0,235),map(dist(width/2,300, mouseX,mouseY),400,0,0,235),map(dist(width/2,450, mouseX,mouseY),200,0,0,230))
    rectMode(CENTER)
    textSize(84);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255,255,255,map(dist(mouseX,mouseY, width/2,mouseY),800,0,0,255))
    text("BULLETHELL", (width / 2), 100);
    fill(255,255,255,map(dist(width/2,300, mouseX,mouseY),100,0,0,255))
    text("EASY", (width / 2)-100, 300);
    stroke(255,255,255)
    rect(width/2,300,200,100)
    noStroke()
    
    fill(255,255,255,map(dist(width/2,450, mouseX,mouseY),100,0,0,255))
    text("MEDIUM", (width / 2)-120, 450);
    stroke(255,255,255)
    rect(width/2,450,200,100)
    noStroke()
    
     fill(255,255,255,map(dist(width/2,600, mouseX,mouseY),100,0,0,255))
    text("HARD", (width / 2)-100, 600);
    stroke(255,255,255)
    
    
    
    
    rect(width/2,600,200,100)
    if(mouseX>width/2-100&&mouseX<width/2+100){
      if(mouseY>250&&mouseY<350){
      if(mouseIsPressed){
         // Ensure Tone.js audio context is started
        
  synth.triggerAttackRelease("C4", "8n");
        
        //easy settings
        starttime = millis()
        menu = false
        lowerLimit = 200
  upperLimit = 300
        hero.life = 4
        enemyShotSpeed = 6
        tickInc = 1.25
        invMax = 60
        mult = 0.75
        numOpps = 2
      }
    }
      if(mouseY>400&&mouseY<500){
      if(mouseIsPressed){
        
        synth.triggerAttackRelease("C3", "6n");
        //medium settings
        starttime = millis()
        menu = false
        lowerLimit = 180
  upperLimit = 260
        enemyShotSpeed = 10
        tickInc = 1
        invMax = 50
        mult = 1
        numOpps = 3
      }
    }
      if(mouseY>550&&mouseY<650){
      if(mouseIsPressed){
        
        synth.triggerAttackRelease("F2", "4n");
        //hard settings
        starttime = millis()
        menu = false
        lowerLimit = 160
  upperLimit = 240
        hero.life = 2
        enemyShotSpeed = 15
        tickInc = 0.75
        invMax = 40
        mult = 1.5
        numOpps = 4
      }
    }
    }
    if(hiScore>0){
      noStroke()
      textSize(54);
      fill(255,255,255,map(dist(mouseX,mouseY, width/2,mouseY),800,0,0,255))
    text("HIGH SCORE", (width / 2)+370, 250);
      text(hiScore, (width / 2)+370, 320);
    stroke(255,255,255)
    noStroke()
    }
    rectMode(CORNER)
  }
  else{
  background(map(constrain(hero.life,0,3),3,0,90,210), 80, 110);
  if(gameover == false){
  gameRunner()
  }
  //draw hero
  invTime++;
  if (hero.life < 1) {
    gameover = true;
  }
  if (gameover == true) {
    fill(120, 100, 120,150);
    rect(0,0,width,height)
    textSize(84);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);

    text("GAME OVER", width / 2, height / 2);
    
    //button
    
    rectMode(CENTER)
    rect(width/2, height/2+100,200,100)
    rectMode(CORNER)
    textSize(24);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(150, 0, 0);

    text("TRY AGAIN?", width / 2, height/2+100)
    if(mouseX>width/2-100&&mouseX<width/2+100){
      if(mouseY>(height/2)+50&&mouseY<(height/2)+150){
      situation = true
        
      }}
    else{
      situation = false
    }
  }
  if(gameover == false){
  aim();
  
  fire();
    
  }
  stroke(0, 0, 0, 0);
  fill(256);
  if (invTime < invMax) {
    if (invTime % 17 > 1 && invTime % 17 < 7) {
      fill(250, 0, 0);
      background(110, 85, 115);
    }
  }


  ellipse(hero.x, hero.y, hero.radius);
  if(gameover == false){
  control();
  hit();
  hero.x += hero.xSpeed;
  hero.y += hero.ySpeed;
  }
  //move hero
    if(gameover == false){
  for (i = 0; i < pickups.length; i++) {
    pickups[i].display();
    if (dist(pickups[i].xPos,pickups[i].yPos, hero.x,hero.y)<25) {
      pickups[i].trigger()
      pickups = concat(
        subset(pickups, 0, i),
        subset(pickups, i + 1, pickups.length - (i + 1))
      );
    }
  }
    }
  for (i = 0; i < magazine.length; i++) {
    magazine[i].display();
    if (magazine[i].lSpan > 200) {
      magazine = concat(
        subset(magazine, 0, i),
        subset(magazine, i + 1, magazine.length - (i + 1))
      );
    }
  }
  for (i = 0; i < enemyShots.length; i++) {
    enemyShots[i].display();
    if (enemyShots[i].lSpan > 800) {
      enemyShots = concat(
        subset(enemyShots, 0, i),
        subset(enemyShots, i + 1, enemyShots.length - (i + 1))
      );
    }
  }
  for (i = 0; i < opposition.length; i++) {
    opposition[i].display();
    if(gameover == false){
    opposition[i].idle();
    opposition[i].watched(hero.x, hero.y, endX, endY);}
  }
    for (i = 0; i < opposition.length; i++) {
    if(opposition[i].type == 2){
       for (j = 0; j < opposition.length; j++) {
    if(opposition[i].type == 2){
      if(dist(opposition[i].xPos,opposition[i].yPos,opposition[j].xPos,opposition[j].yPos)<(opposition[i].size + opposition[j].size)/2){
        opposition[i].xSpeed += map(opposition[i].xPos-opposition[j].xPos,opposition[j].size,-1*opposition[j].size,1,-1)
        opposition[j].xSpeed += map(opposition[j].xPos-opposition[i].xPos,opposition[i].size,-1*opposition[i].size,1,-1)
        opposition[i].ySpeed += map(opposition[i].yPos-opposition[j].yPos,opposition[j].size,-1*opposition[j].size,1,-1)
        opposition[j].ySpeed += map(opposition[j].yPos-opposition[i].yPos,opposition[i].size,-1*opposition[i].size,1,-1)
      }
    }
  }
       }
  }
  checkDeath();
  if(gameover == false){
  for (p = 0; p < 10; p++) {
    fill(250, 250, 120, 5);
    noStroke();
    ellipse(hero.x, hero.y, 15 * p);
  }
  }
  //draw GUI
  for (i = 0; i < hero.life; i++) {
    stroke(100, 50, 70);
    strokeWeight(5);
    fill(256, 0, 0);
    ellipse(50 + 75 * i, 75, 50);
  }
  if(hero.shots>0){
  for (i = 0; i < hero.shots; i++) {
    stroke(100, 100, 50);
    strokeWeight(5);
    fill(256, 250, 0);
    ellipse(40 + 30 * i, 125, 20);
  }
  }
  else{
    if(tick>2){
    stroke(100, 100, 50);
    strokeWeight(5);
    fill(256, 250, 0);
    rect(40,115,map(tick, 200,0,0,300),20)
  }
  }
    if(upgrading == true){
      upgrade()
    }
    textSize(44);
    noStroke()
    textStyle(ITALIC);
    fill(256, 256, 256);
    if(gameover == false){
  displayscore = int(mult*(score + int(millis()-starttime)/10000))}
    text(displayscore, 50, height-50)
    if(displayscore>hiScore){
      hiScore = displayscore
    }
    
}
  
  noStroke()
  fill(256,256,256,flash)
  rect(0,0,width,height)
  if(flash>0){
    flash*=map(flash,180,0,0.9992,0.98)
  }
}




function gameRunner(){
  sec = millis()-starttime
  lowerLimitBase = lowerLimit *pow(0.99,score)
  upperLimitBase = upperLimit * pow(0.99,score)
  if (oppsInc > numOpps*1.7){
    oppsInc = 0
    numOpps ++
  }
  
  if((int(sec/1000)) % waveTimer == 0){
    oppsTick++
    if(oppsSpawned < numOpps){
      if(1/60*numOpps<oppsTick){
        
        if(random(0,75)<map(score,0,100,0,25)){
          makeSpecialEnemy()
        }
        else{
        makeEnemy()
        }
        oppsSpawned++
      }
    
      
    }
  }
  else{
    oppsSpawned = 0
  }
  
}








function checkDeath() {
  for (i = 0; i < magazine.length; i++) {
    for (j = 0; j < opposition.length; j++) {
      //console.log("Type:" + opposition[j].type + ". dist: "+ dist(magazine[i].xPos,magazine[i].yPos, opposition[j].xPos, opposition[j].yPos))
      if(opposition[j].type ==1){
      
      if (
        dist(
          magazine[i].xPos,
          magazine[i].yPos,
          opposition[j].xPos,
          opposition[j].yPos
        ) < 30
      ) {
        score++
        oppsInc++
        //console.log("aaaa")
        spawnPickup(opposition[j].xPos,
          opposition[j].yPos)
        magazine = concat(
          subset(magazine, 0, i),
          subset(magazine, i + 1, magazine.length - (i + 1))
        );

        opposition = concat(
          subset(opposition, 0, j),
          subset(opposition, j + 1, opposition.length - (j + 1))
        );
        
        break;
      }}
        else if(opposition[j].type ==2){
          if (
        dist(
          magazine[i].xPos,
          magazine[i].yPos,
          opposition[j].xPos,
          opposition[j].yPos
        ) < 5+(opposition[j].size/2)){
            //console.log("AA")
            if(opposition[j].size<31){
        score++
        oppsInc++
        //console.log("aaaa")
        spawnPickup(opposition[j].xPos,
          opposition[j].yPos)
        magazine = concat(
          subset(magazine, 0, i),
          subset(magazine, i + 1, magazine.length - (i + 1))
        );

        opposition = concat(
          subset(opposition, 0, j),
          subset(opposition, j + 1, opposition.length - (j + 1))
        );
        
        break;}
            else{
            magazine = concat(
          subset(magazine, 0, i),
          subset(magazine, i + 1, magazine.length - (i + 1))
        );
        opX = opposition[j].xPos
        opY = opposition[j].yPos
        opS = opposition[j].size*(2/3)
        
        opposition = concat(
          subset(opposition, 0, j),
          subset(opposition, j + 1, opposition.length - (j + 1))
        );
            let Enemy = new specialEnemy(
    opX,
    opY,
    5, 
    5,
              opS
  );
              opposition.push(Enemy);
              let Enemy2 = new specialEnemy(
    opX,
    opY,
    -5, 
    -5,
              opS
  );
  opposition.push(Enemy2);
              break
          }
          
        }
      
      }
    }
    
  }
}

function hit() {
  for (i = 0; i < enemyShots.length; i++) {
    if (dist(enemyShots[i].xPos, enemyShots[i].yPos, hero.x, hero.y) < 20) {
      if (invTime > invMax) {
        invTime = 0;
        synth.triggerAttackRelease("F1", "4n");
        
        hero.life--;
      }
    }
  }


          for (i = 0; i < opposition.length; i++) {
            if(opposition[i].type == 2){
    if (dist(opposition[i].xPos, opposition[i].yPos, hero.x, hero.y) < 20+opposition[i].size/2){
      if (invTime > invMax) {
        invTime = 0;
        hero.life--;
        hero.xSpeed+=map(hero.x-opposition[i].xPos,20+opposition[i].size/2,-20-opposition[i].size/2,8,-8)
        hero.ySpeed+=map(hero.y-opposition[i].yPos,20+opposition[i].size/2,-20-opposition[i].size/2,8,-8)
        
      }
    }
          }
  }
  
}
  
  
  
function spawnPickup(spawnX,spawnY){
  if(random(0,17)<1){
     let Pick = new pickup(
    spawnX,
    spawnY,
    "upgrade");
    pickups.push(Pick);
     }  else if(random(0,100)<constrain(map(hero.life,4,1,0,20),0,20)){
    //console.log(spawnX,spawnY)
    let Pick = new pickup(
    spawnX,
    spawnY,
    "health"
  );
  pickups.push(Pick);
  }
  else if(random(0,100)<constrain(map(hero.shots,maxShots,1,0,20),0,20)){
    //console.log(spawnY)
    let Pick = new pickup(
    spawnX,
    spawnY,
    "ammo"
  );
    pickups.push(Pick);
  }
}
function makeSpecialEnemy() {
  let Enemy = new specialEnemy(
    random(50, 1100),
    random(100, 700),
    0, 
    0
  );
  opposition.push(Enemy);
}
function makeEnemy() {
  let Enemy = new enemy(
    random(50, 1100),
    random(100, 700),
    0, 
    0
  );
  opposition.push(Enemy);
}

function aim() {
  strokeWeight(1);
  stroke(255, 0, 0, 100);
  endX = map(mouseX - hero.x, -1, 1, hero.x - 1000, hero.x + 1000);
  endY = map(mouseY - hero.y, -1, 1, hero.y - 1000, hero.y + 1000);
  line(hero.x, hero.y, endX, endY);
}

function fire() {
  if(hero.shots>0){
  if (mouseIsPressed) {
        

    
      
    if (tick == 0) {
      //noiseSynth.triggerAttackRelease("8n");
      
      hero.shots--
      
      background(130, 130, 120);

      let angle = atan2(mouseY - hero.y, mouseX - hero.x);

      let xSpeed = shotSpeed * cos(angle);
      let ySpeed = shotSpeed * sin(angle);

      tick = int(cooldown);
      let Bullet = new shot(
        hero.x,
        hero.y,
        xSpeed, 
        ySpeed,
        0,
        0
      );
      magazine.push(Bullet);
      
    } else {
      tick--;
    }
      
  
  }
    }
    else if (hero.shots == 0){
      tick = 200
      hero.shots = -1
    }
    else{
      tick-=tickInc
      //console.log(tick)
      if(tick <0){
        tick = 0
        hero.shots = maxShots
        
      }
    }
}


function mouseIsPressed() {
  if(paused == true){
    frameRate(60)
  }
  
  
}
function control() {
  
  if (keyIsDown(27) === true) {
    background(120, 100, 150);
    textSize(84);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    paused = true
    text("PAUSED", width / 2, height / 2);
    frameRate(0);
  }
  
  if (keyIsDown(87) === true) {
    hero.ySpeed -= map(abs(hero.ySpeed), 0, 10, 5, 0);
  }
  if (keyIsDown(65) === true) {
    hero.xSpeed -= map(abs(hero.xSpeed), 0, 10, 5, 0);
  }
  if (keyIsDown(83) === true) {
    hero.ySpeed += map(abs(hero.ySpeed), 0, 10, 5, 0);
  }
  if (keyIsDown(68) === true) {
    hero.xSpeed += map(abs(hero.xSpeed), 0, 10, 5, 0);
  }
  hero.xSpeed += map(hero.xSpeed, -10, 10, 0.5, -0.5);
  hero.ySpeed += map(hero.ySpeed, -10, 10, 0.5, -0.5);

  hero.ySpeed = constrain(hero.ySpeed, -10, 10);
  hero.xSpeed = constrain(hero.xSpeed, -10, 10);
  hero.x = constrain(hero.x, hero.radius / 2, width - hero.radius / 2);
  hero.y = constrain(hero.y, hero.radius / 2, height - hero.radius / 2);
}

function upgrade(){
  if(uptick<0.4){
    upg = int(random(0,7))
    //debug
    //upg = 5
  }
  uptick+=(0.3)
  textSize(84);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255, 0, 255,70);
    
   
if(uptick<50){
  
  text(upgrades[int(uptick)%upgrades.length], width / 2, height / 2);
}
  else if (uptick<80){
    
    text(upgrades[upg], width / 2, height / 2)
  }
  else if(uptick>85 && uptick %3 == 0){
   text(upgrades[upg], width / 2, height / 2)
}
else{
  uptick = 0
  upgrading = false
  if(upg == 0){
    //reload
    tickInc*=1.5
  }
  else if(upg == 1){
    //velocity
    enemyShotSpeed*=0.8
  }
  else if(upg == 2){
    //invincibility
    invMax*= 1.25
    invTime = 0
  }
  else if(upg == 3){
    //ammo
    maxShots++
  }
  else if(upg == 4){
    //shot speed
    shotSpeed*=1.25
  }
  else if(upg == 5){
    //nuke
    flash = 180
    for (i = 0; i < opposition.length; i++) {
    score++
        oppsInc++
        //console.log("aaaa")
        spawnPickup(opposition[i].xPos,
          opposition[i].yPos)
      
    }
     while(opposition.length>0){
       shorten(opposition)
     }
  }
  else if(upg == 6){
    //nuke
    cooldown *= 0.8
  }
  
  
}
}
function mousePressed(){
  startAudioContext()
  
}
  function mouseReleased(){
    if(situation){
      synth.triggerAttackRelease("C3", "6n");
                  setup()
    }
  }
function startAudioContext() {
  if (!audioContextStarted) {
    Tone.start(); // Start the audio context on first interaction
    audioContextStarted = true; // Ensure Tone.start() is only called once
    //console.log("Audio context started");
  }
}
//debug
function checkOppDeath(){
  if(opposition.length<opplength){
    console.log("someone just died")
    opplength = opposition.length
  }
  if(opposition.length>opplength){
    console.log("someone just was born")
    opplength = opposition.length
  }
}
