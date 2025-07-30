import shipSrc from '../img/myship.png';
import bgSrc from '../img/milky.jpg';
import enemySrc from '../img/fighter.png';
import shotSrc from '../img/laserBlue.png';
import enBulletSrc from '../img/laserRed.png';
import healSrc from '../img/heart.png';
import spaceBgSrc from '../img/spacebg/0.gif';
import bossSrc from '../img/titan.png';
import hpIconSrc from '../img/heart1.png';
import lvIconSrc from '../img/lv.png';
import bossB1Src from '../img/bossshot11.png';
import bossB2Src from '../img/bossshot22.png';
import shotLazerSrc from '../audio/lazerShot.wav';
import musicSrc from '../audio/cosm.mp3';

export function game(canvas, musicEnabledRef) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Images
  const ship = new Image(); ship.src = shipSrc;
  const bg = new Image(); bg.src = bgSrc;
  const enemy = new Image(); enemy.src = enemySrc;
  const shot = new Image(); shot.src = shotSrc;
  const enBullet = new Image(); enBullet.src = enBulletSrc;
  const heal = new Image(); heal.src = healSrc;
  const spaceBg = new Image(); spaceBg.src = spaceBgSrc;
  const boss = new Image(); boss.src = bossSrc;
  const hpIcon = new Image(); hpIcon.src = hpIconSrc;
  const lvIcon = new Image(); lvIcon.src = lvIconSrc;
  const bossB1 = new Image(); bossB1.src = bossB1Src;
  const bossB2 = new Image(); bossB2.src = bossB2Src;

  // Audio
  const shotLazer = new Audio(shotLazerSrc);
  const music = new Audio(musicSrc);
  music.loop = true;
  music.volume = 0.2;

  // Game state
  let bossSpeedX = 1, bossSpeedY = 1;
  let w_delay = 0;
  let xPos = 10;
  let yPos = canvas.height / 2;
  let upPressed = false, downPressed = false, rightPressed = false, leftPressed = false;
  let pressedSpace = false, reloadButton = false;
  let cvertcanvasa = canvas.width / 4;
  let spawnTrigger = canvas.width - cvertcanvasa;
  let score = 0;
  let godmoddistanse = canvas.width - 50;
  let heartX = canvas.width;
  let heartY = Math.floor(Math.random() * canvas.height);
  let playerLv = 3;
  let mssn = "Gain 5000 points";
  let playerHP = 100, fighterHP = 20, bossHP = 1000;
  let enemyX = canvas.width, enemyY = canvas.height / 2;
  let bossX = canvas.width, bossY = canvas.height - 400;
  let spawnInterval = 2000;
  let enemies = [{ x: enemyX, y: enemyY, hp: fighterHP }];
  let enemyBullets = [];
  let healHeart = [{ x: heartX, y: heartY }];
  let bosscannon1 = [], bosscannon2 = [];
  let bullets = [];

  // Key handlers
  function keyDownHandler(e) {
    if (e.keyCode === 38) upPressed = true;
    else if (e.keyCode === 40) downPressed = true;
    else if (e.keyCode === 37) rightPressed = true;
    else if (e.keyCode === 39) leftPressed = true;
    else if (e.keyCode === 32 && w_delay === 0) {
      if (shotLazer.paused) shotLazer.play();
      pressedSpace = true;
      w_delay = 100;
    }
    else if (e.keyCode === 13) reloadButton = true;
  }
  function keyUpHandler(e) {
    if (e.keyCode === 38) upPressed = false;
    else if (e.keyCode === 40) downPressed = false;
    else if (e.keyCode === 37) rightPressed = false;
    else if (e.keyCode === 39) leftPressed = false;
    else if (e.keyCode === 32) { pressedSpace = false; w_delay = 0; }
    else if (e.keyCode === 13) reloadButton = false;
  }

  // Bullet class
  class Bullet {
    constructor() {
      this.x = xPos + 50;
      this.y = yPos + 35;
      bullets.push(this);
    }
    draw() {
      this.x += 4;
      ctx.drawImage(shot, this.x + 10, this.y, 54, 9);
    }
  }

  // Draw function
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(ship, xPos, yPos);

    // Enemies
    if (bossHP > 0) {
      for (let i = enemies.length - 1; i >= 0; i--) {
        ctx.drawImage(enemy, enemies[i].x, enemies[i].y);
        enemies[i].x -= 2;
        if ((enemies[i].x + 50) < 0) enemies.splice(i, 1);

        // Bullet collision
        for (let j = bullets.length - 1; j >= 0; j--) {
          if (
            bullets[j].x <= enemies[i].x + enemy.width &&
            bullets[j].x + shot.width >= enemies[i].x &&
            bullets[j].y <= enemies[i].y + enemy.height &&
            bullets[j].y + shot.height >= enemies[i].y
          ) {
            bullets.splice(j, 1);
            enemies[i].hp -= 10;
            if (enemies[i].hp === 0) {
              enemies.splice(i, 1);
              score += 100;
            }
          }
          if (bullets[j] && bullets[j].x > spawnTrigger) bullets.splice(j, 1);
          if (
            bullets[j] &&
            bullets[j].x <= bossX + boss.width &&
            bullets[j].x + shot.width >= bossX &&
            bullets[j].y <= bossY + boss.height &&
            bullets[j].y + shot.height >= bossY
          ) {
            bullets.splice(j, 1);
            bossHP -= 10;
          }
        }

        // Ship collision
        if (
          xPos <= enemies[i].x + enemy.width - 10 &&
          xPos + ship.width - 10 >= enemies[i].x &&
          yPos <= enemies[i].y + enemy.height - 10 &&
          yPos + ship.height - 10 >= enemies[i].y
        ) {
          enemies.splice(i, 1);
          score += 100;
          playerHP -= 50;
        }
      }
    }

    // Enemy bullets
    for (let i = 0; i < enemies.length; i++) {
      for (let b = enemyBullets.length - 1; b >= 0; b--) {
        ctx.drawImage(enBullet, enemyBullets[b].x, enemyBullets[b].y);
        enemyBullets[b].x -= 1;
        if (enemyBullets[b].x < 0 || enemyBullets[b].x > canvas.width) {
          enemyBullets.splice(b, 1);
        }
        if (
          enemyBullets[b] &&
          enemyBullets[b].x <= xPos + ship.width - 10 &&
          enemyBullets[b].x + enBullet.width - 10 >= xPos &&
          enemyBullets[b].y <= yPos + ship.height - 10 &&
          enemyBullets[b].y + enBullet.height - 10 >= yPos
        ) {
          enemyBullets.splice(b, 1);
          playerHP -= 10;
        }
      }
    }

    // Heal hearts
    for (let h = healHeart.length - 1; h >= 0; h--) {
      ctx.drawImage(heal, healHeart[h].x, healHeart[h].y);
      healHeart[h].x -= 3;
      if (
        healHeart[h].x <= xPos + ship.width - 10 &&
        healHeart[h].x + enBullet.width - 10 >= xPos &&
        healHeart[h].y <= yPos + ship.height - 10 &&
        healHeart[h].y + enBullet.height - 10 >= yPos
      ) {
        healHeart.splice(h, 1);
        playerHP += 25;
      }
    }

    // Boss
    if (score >= 5000) {
      mssn = "Defeat the Titan";
      ctx.drawImage(boss, bossX, bossY);
      spawnInterval = 5000;
      bossX -= bossSpeedX;

      // Boss cannons
      if (bossX <= spawnTrigger) {
        for (let bb = bosscannon1.length - 1; bb >= 0; bb--) {
          ctx.drawImage(bossB1, bosscannon1[bb].x, bosscannon1[bb].y);
          bosscannon1[bb].x -= 1;
          if (bosscannon1[bb].x < 0 || bosscannon1[bb].x > canvas.width) bosscannon1.splice(bb, 1);
          if (
            bosscannon1[bb] &&
            bosscannon1[bb].x <= xPos + ship.width - 10 &&
            bosscannon1[bb].x + enBullet.width - 10 >= xPos &&
            bosscannon1[bb].y <= yPos + ship.height - 10 &&
            bosscannon1[bb].y + enBullet.height - 10 >= yPos
          ) {
            bosscannon1.splice(bb, 1);
            playerHP -= 25;
          }
        }
        for (let bd = bosscannon2.length - 1; bd >= 0; bd--) {
          ctx.drawImage(bossB2, bosscannon2[bd].x, bosscannon2[bd].y);
          bosscannon2[bd].x -= 1;
          if (bosscannon2[bd].x < 0 || bosscannon2[bd].x > canvas.width) bosscannon2.splice(bd, 1);
          if (
            bosscannon2[bd] &&
            bosscannon2[bd].x <= xPos + ship.width - 10 &&
            bosscannon2[bd].x + enBullet.width - 10 >= xPos &&
            bosscannon2[bd].y <= yPos + ship.height - 10 &&
            bosscannon2[bd].y + enBullet.height - 10 >= yPos
          ) {
            bosscannon2.splice(bd, 1);
            playerHP -= 25;
          }
        }
      }
      if (bossHP >= 0) {
        ctx.font = "16px Trebuchet MS";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("TITAN:  " + bossHP, canvas.width / 2, 25);
      }
      if (bossX === (canvas.width - boss.width)) {
        bossSpeedX = 0;
        bossY += bossSpeedY;
        if (bossY >= canvas.height - boss.height) bossSpeedY = -1;
        else if (bossY <= 0) bossSpeedY = 1;
      }
      if (bossHP === 0) {
        bossSpeedX = -1;
        ctx.clearRect(canvas.width / 2, 25, 20, 10);
        if (bossX > canvas.width) ctx.clearRect(bossX, bossY, boss.width, boss.height);
      }
    }

    // Score, mission, HP, LV
    ctx.font = "16px Trebuchet MS";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: " + score, 830, 50);
    ctx.fillText(mssn, 830, 20);
    ctx.font = "20px Arial";
    ctx.drawImage(hpIcon, 10, 0);
    ctx.fillText("- " + playerHP, 50, 25);
    ctx.drawImage(lvIcon, 100, 0);
    ctx.fillText("- " + playerLv, 150, 25);

    // Game Over
    if (playerHP <= 0) {
      playerLv -= 1;
      playerHP = 100;
      xPos = 10;
      yPos = canvas.height / 2;
    }
    if (playerLv < 0) {
      xPos = 1000;
      yPos = 1000;
      ctx.font = "40px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("GAME OVER", canvas.width / 2 - 150, canvas.height / 2);
      ctx.font = "24px Arial";
      ctx.fillText("Press ENTER to try again", canvas.width / 2 - 150, canvas.height / 2 + 100);
    }
    if (bossHP === 0) {
      playerHP = 1000;
      ctx.beginPath();
      ctx.arc(xPos + 35, yPos + 35, ship.width / 2, 0, Math.PI * 2, true);
      ctx.moveTo(xPos, yPos);
      ctx.fill();
      xPos = 1000;
      yPos = 1000;
      ctx.font = "40px Arial";
      ctx.fillText("MISSION COMPLETE", canvas.width / 2 - 150, canvas.height / 2);
    }

    bullets.forEach(bullet => bullet.draw());

    // Player movement
    if (upPressed && yPos > 0) yPos -= 4;
    else if (downPressed && yPos < canvas.height - ship.height) yPos += 4;
    if (rightPressed && xPos > 0) xPos -= 3;
    else if (leftPressed && xPos < canvas.width - ship.width) xPos += 3;
    if (pressedSpace) {
      new Bullet();
      pressedSpace = false;
    }
    if ((reloadButton && playerLv <= 0) || bossHP === 0) {
      window.location.reload();
    }
  }

  // Intervals
  const intervals = [];
  intervals.push(setInterval(draw, 10));
  intervals.push(setInterval(() => {
    enemies.push({
      x: enemyX,
      y: Math.floor(Math.random() * (canvas.height - 50)),
      hp: fighterHP
    });
  }, 1000));
  intervals.push(setInterval(() => {
    for (let i = 0; i < enemies.length; i++) {
      let shotPosX = enemies[i].x - 50;
      let shotPosY = enemies[i].y + 35;
      if (enemies[i].x <= spawnTrigger) {
        enemyBullets.push({ x: shotPosX, y: shotPosY });
      }
    }
  }, 1000));
  intervals.push(setInterval(() => {
    healHeart.push({
      x: heartX,
      y: Math.floor(Math.random() * (canvas.height - 50))
    });
  }, 30000));
  intervals.push(setInterval(() => {
    let cannon1ShotX = bossX - 10;
    let cannon1ShotY = bossY + 20;
    bosscannon1.push({ x: cannon1ShotX, y: cannon1ShotY });
    let cannon2ShotX = bossX - 10;
    let cannon2ShotY = bossY + 240;
    bosscannon2.push({ x: cannon2ShotX, y: cannon2ShotY });
  }, 2000));

  // Key listeners
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);

  // Music: play only after user interaction
  function tryPlayMusic() {
    if (musicEnabledRef && musicEnabledRef.current && music.paused) {
      music.play().catch(() => {});
    }
  }
  window.addEventListener("click", tryPlayMusic);

  // Cleanup for React
  return () => {
    intervals.forEach(clearInterval);
    window.removeEventListener("keydown", keyDownHandler);
    window.removeEventListener("keyup", keyUpHandler);
    window.removeEventListener("click", tryPlayMusic);
    music.pause();
  };
}