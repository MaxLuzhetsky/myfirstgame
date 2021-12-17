let cvs = document.getElementById("canvasGame");
let ctx = cvs.getContext("2d");

let ship = new Image();
let bg = new Image();
let enemy = new Image();
let shot = new Image();
let shotLazer = new Audio();
let music = new Audio();
 
let w_delay = 0 ;

ship.src = "img/myship.png";
bg.src = "img/milky.jpg";
enemy.src= "img/fighter.png";
shot.src = "img/laserBlue.png";
 //hello me 
shotLazer.src = "audio/lazerShot.wav"
shotLazer.autoplay= true
music.src = "audio/cosm.mp3"

let xPos = 10;
let yPos = canvasGame.height/2;
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let pressedSpace = false;
let cvertcanvasa = canvasGame.width/10
let spawnTrigger = canvasGame.width - cvertcanvasa
let score = 0 

let enemyX = canvasGame.width
let enemyY = canvasGame.height/2

let enemies = [];


enemies[0] = {
  x : enemyX,
  y : enemyY
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        upPressed = true;
        
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 37){
        rightPressed = true;
    }
    else if(e.keyCode == 39){
        leftPressed = true;
    }
    else if(e.keyCode == 32 && w_delay === 0) {
       
    if(shotLazer.paused){
        shotLazer.play();
    }else{
        shotLazer.pause();
    }
        pressedSpace = true;
        w_delay = 100
       
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 38) {
        upPressed = false;
    }
    else if(e.keyCode === 40) {
        downPressed = false;
    }
    else if(e.keyCode === 37){
        rightPressed = false;
    }
    else if(e.keyCode === 39){
        leftPressed = false;
    }
    else if(e.keyCode == '32') {
        pressedSpace = false;
        w_delay = 0 ;
    }
}



const bullets = [];
class Bullet {
   constructor(){
      this.x = xPos+50;
      this.y = yPos+35;
      bullets.push(this);
   }
   draw(){
      this.x += 4 ;
      if(this.x < 0 && this.x > canvas.width ){
          bullets.splice(bullets.indexOf(this));
      }
     
      // fillRect не требует openPath!
      
      ctx.drawImage(shot , this.x+10 , this.y , 54 , 9)
      
   }
   
 
}
/*const enemies = [];
function spawnEnemy(){
    
    

    // Generate a random x position.
    let randomXPosition = canvasGame.width - 100
    
    // Generate a random y position.
    let randomYPosition = Math.floor(Math.random() * canvasGame.height) + 1;
    
    //Create a new Enemy instance and use above coordinates to place it in a random spot.
    //Fill the rest of this object like you did with var bullet = {...}.
    let  newEnemy = {
        xPosition: randomXPosition,
        yPosition: randomYPosition
    };
    enemies.push(newEnemy);
    ctx.drawImage(enemy , randomXPosition , randomYPosition )
}
*/

function draw() {
    music.play();
    music.volume = 0.2;
 ctx.drawImage(bg,0 , 0);
 ctx.drawImage(ship , xPos , yPos)
 
 ctx.font = "16px Trebuchet MS";
 ctx.fillStyle = "#ffffff";
 ctx.fillText("Score: "+score, 8, 20); 
 for ( let i = 0 ; i < enemies.length ; i++ ){
    ctx.drawImage(enemy , enemies[i].x  , enemies[i].y)
    enemies[i].x-= 2

    if (enemies[i].x === spawnTrigger){
        enemies.push({
            x: enemyX,
            y: Math.floor(Math.random()*(canvasGame.height-50))
        });
    }
    
    
    for ( let j = 0 ; j < bullets.length ; j++){

    
    if ( bullets[j].x <= enemies[i].x + enemy.width  
        && bullets[j].x + shot.width >= enemies[i].x 
        && bullets[j].y <= enemies[i].y + enemy.height 
        && bullets[j].y + shot.height >= enemies[i].y){
            bullets.splice(j, 1 );
            enemies.splice(i, 1 )
            score += 10
            
        }
    }
    /*if (Bullet.x + shot.width >= enemies[i].x 
        && Bullet.x <= enemies[i].x + enemy.width
        && (Bullet.y <= Bullet.y + enemy.height || Bullet.y + shot.height >= enemies[i].y) ){
            bullets.splice(Bullet)
        }
        */
 }

bullets.forEach(bullet => bullet.draw()); 

if(upPressed && yPos > 0  ) {
    yPos -= 4;
}
else if(downPressed && yPos < canvasGame.height-ship.height) {
    yPos += 4;
}
if (rightPressed && xPos > 0 ){
    xPos -= 3;
}
else if(leftPressed && xPos < canvasGame.width-ship.width){
    xPos += 3;
}
if(pressedSpace  )  {
    
    new Bullet();
    
    pressedSpace = false;
    
    
  }

}




setTimeout (keyDownHandler , 1)
setInterval(draw, 10);
