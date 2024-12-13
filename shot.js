class shot {
  
    constructor (xPos, yPos, xSpeed, ySpeed, lSpan,type){
    this.lSpan = lSpan
    this.xPos = xPos
    this.yPos = yPos
    this.xSpeed = xSpeed
    this.ySpeed = ySpeed
    this.type = type

    }
      
    
    
    display(){
      if(this.type == 0){
      fill(256,256,0)
      }
      else{
        fill(256,100,100)
      }
       if (this.check() == false){
        this.xPos+=this.xSpeed
        this.yPos+=this.ySpeed
        //this.xPos = constrain(this.xPos, 100,1100 )
        //this.yPos = constrain(this.yPos, 100, 700 )
        ellipse(this.xPos, this.yPos, 10)
         this.lSpan++
        }
        
    }
    

    check(){
        if (this.xPos<0 || this.xPos>width ||this.yPos<0||this.yPos>height){
            return true
        }
        else{
            return false
        }
    }
}