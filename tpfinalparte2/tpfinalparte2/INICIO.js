class inicio{
   constructor(x, y, size){
     this.x = 400;
     this.y = 150;
     this.size = 17;
  }
  
  inicio(){
    background(10);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    fill(193, 14, 14);
    rect(20, 30, 760, 340);
    fill(0);
    text(textoinstrucciones[0], this.x, this.y);
    fill(10);
    ellipse(this.x, 230, 150, 80);
    textSize(30);
    fill(200);
    text("PLAY",this.x, 230);
}

 creditos(){
 }
 
 mousePressed(){
   
 }
}
