class tiempo{
  constructor(x, y){
 this.x = 360;
 this.y = 20;
  }
  
  tempo(){
    textSize(20);
    fill(200);
    text(time, this.x, this.y);
    if(frameCount % 30 == 0 && time > 0){
    time--;
    }
  }
  
  
}
