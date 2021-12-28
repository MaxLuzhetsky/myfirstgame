//.......................................................................................................
let cvs = document.getElementById("canvasGame");
let ctx = cvs.getContext("2d");

let ship = new Image();
let bg = new Image();
let enemy = new Image();
let shot = new Image();
let enBullet = new Image();
let heal = new Image();
let spaceBg = new Image();
let boss = new Image();

let bossSpeedX = 1
let bossSpeedY = 1


let shotLazer = new Audio();
let music = new Audio();

let w_delay = 0;
heal.src = "img/heart.png"
ship.src = "img/myship.png";
bg.src = "img/milky.jpg";
enemy.src = "img/fighter.png";
shot.src = "img/laserBlue.png";
enBullet.src = "img/laserRed.png"
spaceBg.src = "img/spacebg/0.gif";
boss.src = "img/titan.png"

//hello me 
shotLazer.src = "audio/lazerShot.wav"
shotLazer.autoplay = true
music.src = "audio/cosm.mp3"

let xPos = 10;
let yPos = canvasGame.height / 2;
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let pressedSpace = false;
let reloadButton = false;
let cvertcanvasa = canvasGame.width / 4
let spawnTrigger = canvasGame.width - cvertcanvasa
let score = 0
let godmoddistanse = canvasGame.width - 50
let heartX = canvasGame.width
let heartY = Math.floor(Math.random() * canvasGame.height)

let playerHP = 100
let fighterHP = 20
let bossHP = 500

let enemyX = canvasGame.width
let enemyY = canvasGame.height / 2

let bossX = canvasGame.width
let bossY = canvasGame.height - 400

let spawnInterval = 2000

let randomEnemyY = Math.floor(Math.random() * (canvasGame.height - 50))

let enemies = [];
let enemyBullets = [];
let healHeart = []

//...............................................................................................................
healHeart[0] = {
    x: heartX,
    y: heartY
}
enemies[0] = {
    x: enemyX,
    y: enemyY,
    hp: fighterHP
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Управление .........................................................................

function keyDownHandler(e) {
    if (e.keyCode == 38) {
        upPressed = true;

    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    else if (e.keyCode == 37) {
        rightPressed = true;
    }
    else if (e.keyCode == 39) {
        leftPressed = true;
    }
    else if (e.keyCode == 32 && w_delay === 0) {

        if (shotLazer.paused) {
            shotLazer.play();
        } else {
            shotLazer.pause();
        }
        pressedSpace = true;
        w_delay = 100

    }
    else if (e.keyCode == 13) {
        reloadButton = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 38) {
        upPressed = false;
    }
    else if (e.keyCode === 40) {
        downPressed = false;
    }
    else if (e.keyCode === 37) {
        rightPressed = false;
    }
    else if (e.keyCode === 39) {
        leftPressed = false;
    }
    else if (e.keyCode == '32') {
        pressedSpace = false;
        w_delay = 0;
    }
    else if (e.keyCode == 13) {
        reloadButton = false;
    }
}


//Спавн выстрелов ........................................................................

const bullets = [];
class Bullet {
    constructor() {
        this.x = xPos + 50;
        this.y = yPos + 35;
        bullets.push(this);
    }
    draw() {
        this.x += 4;
        if (this.x < 0 && this.x > canvasGame.width) {
            bullets.splice(bullets.indexOf(this));
        }


        // fillRect не требует openPath!

        ctx.drawImage(shot, this.x + 10, this.y, 54, 9)

    }


}



// fillRect не требует openPath!







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

//Рендер объектов ..............................................................................

function draw() {
    music.play();
    music.volume = 0.2;
    ctx.drawImage(bg, 0, 0)
    //...............

    ctx.drawImage(ship, xPos, yPos)


    //Спавн Противников ............................................................................



    for (let i = 0; i < enemies.length; i++) {

        ctx.drawImage(enemy, enemies[i].x, enemies[i].y)

        enemies[i].x -= 2

        //Враг диспавнится после конца экрана.......................................................................
        if ((enemies[i].x + 50) < 0) {
            enemies.splice(i, 1)

        }

        //Колизия ...................................................................................
        for (let j = 0; j < bullets.length; j++) {

            if (bullets[j].x <= enemies[i].x + enemy.width
                && bullets[j].x + shot.width >= enemies[i].x
                && bullets[j].y <= enemies[i].y + enemy.height
                && bullets[j].y + shot.height >= enemies[i].y) {

                bullets.splice(j, 1);
                enemies[i].hp -= 10
                if (enemies[i].hp === 0) {
                    enemies.splice(i, 1)
                    score += 1000

                }

            }
            if (bullets[j].x > spawnTrigger) {
                bullets.splice(j, 1);
            }
            if (bullets[j].x <= bossX + boss.width
                && bullets[j].x + shot.width >= bossX
                && bullets[j].y <= bossY + boss.height
                && bullets[j].y + shot.height >= bossY) {
                bullets.splice(j, 1);
                bossHP -= 10
            }


        }
        //Колизия вражеского выстрела ..............................................................................

        //Колизия кораблей .........................................................................................
        if (xPos <= enemies[i].x + enemy.width - 10
            && xPos + ship.width - 10 >= enemies[i].x
            && yPos <= enemies[i].y + enemy.height - 10
            && yPos + ship.height - 10 >= enemies[i].y) {
            enemies.splice(i, 1)
            score += 1000
            playerHP -= 50
        }



    }

    //Выстрел противника .................................................................................

    for (let i = 0; i < enemies.length; i++) {
        for (let b = 0; b < enemyBullets.length; b++) {

            shotPosX = enemies[i].x - 50
            shotPosY = enemies[i].y + 35


            ctx.drawImage(enBullet, enemyBullets[b].x, enemyBullets[b].y)
            enemyBullets[b].x -= 1
            if (enemyBullets[b].x < 0 && enemyBullets[b].x > canvasGame.width) {
                enemyBullets.splice(b, 1);
            }
            if (enemyBullets[b].x <= xPos + ship.width - 10
                && enemyBullets[b].x + enBullet.width - 10 >= xPos
                && enemyBullets[b].y <= yPos + ship.height - 10
                && enemyBullets[b].y + enBullet.height - 10 >= yPos) {
                enemyBullets.splice(b, 1)
                playerHP -= 10
            }
        }


    }
    for (let h = 0; h < healHeart.length; h++) {
        ctx.drawImage(heal, healHeart[h].x, healHeart[h].y)
        healHeart[h].x -= 3

        if (healHeart[h].x <= xPos + ship.width - 10
            && healHeart[h].x + enBullet.width - 10 >= xPos
            && healHeart[h].y <= yPos + ship.height - 10
            && healHeart[h].y + enBullet.height - 10 >= yPos) {

            healHeart.splice(h, 1)
            playerHP += 25

        }
    }
    if (score >= 5000) {

        ctx.drawImage(boss, bossX, bossY)
        bossX -= bossSpeedX

        if (bossHP >= 0) {
            ctx.font = "16px Trebuchet MS";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("TITAN: " + bossHP, canvasGame.width / 2, 25);

        }
        
        if (bossX === (canvasGame.width - boss.width)) {
            bossSpeedX = 0
            bossY += bossSpeedY
            if (bossY >= canvasGame.height - boss.height) {
                bossSpeedY = -1
            } else if (bossY <= 0) {
                bossSpeedY = 1
            }
        }
        spawnInterval = 5000
        if (bossHP === 0) {
            bossX = 1000
            bossY = 1000
        }
    }
    //Cчет .........................................................................................

    ctx.font = "16px Trebuchet MS";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 830, 50);

    //Цель.........................................................................................
    ctx.font = "16px Trebuchet MS";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Gain 10000 point", 830, 20);
    //HP ..........................................................................................
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("HP " + playerHP, 10, 20)



    //Game Over ...................................................................................
    if (playerHP <= 0) {

        xPos = 1000
        yPos = 1000
        ctx.font = "40px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("GAME OVER", canvasGame.width / 2 - 150, canvasGame.height / 2)

        ctx.font = "24px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("Press ENTER to try again", canvasGame.width / 2 - 150, canvasGame.height / 2 + 100)

    }
    if (score >= 10000 && bossHP === 0) {
        xPos += 10
        playerHP = 1000
        ctx.font = "40px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.fillText("MISSION COMPLETE", canvasGame.width / 2 - 150, canvasGame.height / 2)
    }


    bullets.forEach(bullet => bullet.draw());


    if (upPressed && yPos > 0) {
        yPos -= 4;
    }
    else if (downPressed && yPos < canvasGame.height - ship.height) {
        yPos += 4;
    }
    if (rightPressed && xPos > 0) {
        xPos -= 3;
    }
    else if (leftPressed && xPos < canvasGame.width - ship.width) {
        xPos += 3;
    }
    if (pressedSpace) {

        new Bullet();

        pressedSpace = false;


    }
    if (reloadButton && playerHP <= 0) {
        location.reload();
    }


}


// Интервалы ...........................................................................................................

setTimeout(keyDownHandler, 1)
setInterval(draw, 10);
setInterval(function () {

    enemies.push({
        x: enemyX,
        y: Math.floor(Math.random() * (canvasGame.height - 50)),
        hp: fighterHP
    }
    );

}, 1000)
setInterval(function () {
    for (let i = 0; i < enemies.length; i++) {
        shotPosX = enemies[i].x - 50
        shotPosY = enemies[i].y + 35


        enemyBullets.push({
            x: shotPosX,
            y: shotPosY,

        })
    }
}, spawnInterval)
setInterval(function () {
    healHeart.push({
        x: heartX,
        y: Math.floor(Math.random() * (canvasGame.height - 50))
    })
}, 30000)


