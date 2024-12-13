class barrier{
  constructor(xPos, yPos, hi,wid,horizontal) {
    this.xPos = xPos;
    this.yPos = yPos;
    if(horizontal){
      this.hi = hi;
    this.wid = wid;
    }
    else{
      this.wid = hi;
    this.hi = wid;
    }
    
    
  }
  display(){
    rectMode(CENTER)
    rect(this.xPos, this.yPos, this.hi, this.wid)
    
    
  }
}