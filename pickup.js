class pickup{
  
  constructor(xPos, yPos, type){
    this.xPos = xPos
    this.yPos = yPos
    this.type = type
  }
  
  
  display(){
    if(this.type == "health"){
      fill(232, 72, 72)
      ellipse(this.xPos,this.yPos,20)
      
    }
    else if(this.type == "ammo"){
      fill(255, 247, 99)
      ellipse(this.xPos,this.yPos,20)
    }
    else if(this.type == "upgrade"){
      fill(175, 117, 250)
      ellipse(this.xPos,this.yPos,20)
      
    }
  }
  
  trigger(){
    synth.triggerAttackRelease("A5", "8n");
    if(this.type == "health"){
      hero.life++
      
    }
    else if(this.type == "ammo"){
      hero.shots=10
      tick = 0
    }
    else if(this.type == "upgrade"){
      upgrading = true
        }
      
    }
    
  }
  
  
