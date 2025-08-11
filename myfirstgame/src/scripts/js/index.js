import shipSrc from "../img/myship.png";
import enemySrc from "../img/fighter.png";
import shotSrc from "../img/laserBlue.png";
import enBulletSrc from "../img/laserRed.png";
import healSrc from "../img/heart.png";
import spaceBgSrc from "../img/spacebg/0.gif";
import bossSrc from "../img/titan.png";
import hpIconSrc from "../img/heart1.png";
import lvIconSrc from "../img/lv.png";
import bossB1Src from "../img/bossshot11.png";
import bossB2Src from "../img/bossshot22.png";
import shotLazerSrc from "../audio/lazerShot.wav";
import musicSrc from "../audio/cosm.mp3";
import newBg from "../img/bg.jpg";
import { bossFunctional } from "./boss.js";
import { enemyLogic } from "./enemyLogic.js";
import { pickUps } from "./pickUp.js";
import { hud } from "./hud.js";

export function game(canvas, musicEnabledRef, joystick) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Images
  const ship = new Image();
  ship.src = shipSrc;
  const bg = new Image();
  bg.src = newBg;
  const enemy = new Image();
  enemy.src = enemySrc;
  const shot = new Image();
  shot.src = shotSrc;
  const enBullet = new Image();
  enBullet.src = enBulletSrc;
  const heal = new Image();
  heal.src = healSrc;
  const spaceBg = new Image();
  spaceBg.src = spaceBgSrc;
  const boss = new Image();
  boss.src = bossSrc;
  const hpIcon = new Image();
  hpIcon.src = hpIconSrc;
  const lvIcon = new Image();
  lvIcon.src = lvIconSrc;
  const bossB1 = new Image();
  bossB1.src = bossB1Src;
  const bossB2 = new Image();
  bossB2.src = bossB2Src;

  // Audio

  const music = new Audio(musicSrc);
  music.loop = true;
  music.volume = 0.2;

  //  Positions----------------------------------

  let bossSpeedX = 1,
    bossSpeedY = 1;
  let w_delay = 0;
  let xPos = 10;
  let yPos = canvas.height / 2;
  let heartX = canvas.width;
  let heartY = Math.floor(Math.random() * canvas.height);
  let enemyX = canvas.width,
    enemyY = canvas.height / 2;
  let bossX = canvas.width,
    bossY = canvas.height - 400;

  // Buttons--------------------------------------
  let upPressed = false,
    downPressed = false,
    rightPressed = false,
    leftPressed = false;
  let pressedSpace = false,
    reloadButton = false;
  let cvertcanvasa = canvas.width / 4;
  let spawnTrigger = canvas.width - cvertcanvasa;

  // Info--------------------------------------
  let score = 0;
  let mssn = "Gain 5000 points";
  let playerLv = 3;

  let playerHP = 100,
    fighterHP = 20,
    bossHP = 1000;
  let spawnInterval = 2000;

  //  Enemies and pickups --------------------------------------
  let enemies = [{ x: enemyX, y: enemyY, hp: fighterHP }];
  let enemyBullets = [];
  let healHeart = [{ x: heartX, y: heartY }];
  let bosscannon1 = [],
    bosscannon2 = [];
  let bullets = [];
  let bossDefeated = false;
  let shipLeaving = false;

  // Key handlers
  function keyDownHandler(e) {
    if (e.keyCode === 38) upPressed = true;
    else if (e.keyCode === 40) downPressed = true;
    else if (e.keyCode === 37) rightPressed = true;
    else if (e.keyCode === 39) leftPressed = true;
    else if (e.keyCode === 32 && w_delay === 0) {
      const shotSound = new Audio(shotLazerSrc);
      shotSound.volume = 0.5;
      shotSound.play();
      pressedSpace = true;
      w_delay = 100;
    } else if (e.keyCode === 13) reloadButton = true;
  }
  function keyUpHandler(e) {
    if (e.keyCode === 38) upPressed = false;
    else if (e.keyCode === 40) downPressed = false;
    else if (e.keyCode === 37) rightPressed = false;
    else if (e.keyCode === 39) leftPressed = false;
    else if (e.keyCode === 32) {
      pressedSpace = false;
      w_delay = 0;
    } else if (e.keyCode === 13) reloadButton = false;
  }

  // Draw function
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // HUD
    hud(score, mssn, playerHP, playerLv, ctx, hpIcon, lvIcon);

    // // Background
    // ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    //  planets(canvas, ctx);

    const lines = [];
    const count = 25;

    for (let i = 0; i < count; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 2,
      });
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;

    for (let line of lines) {
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.x + line.length, line.y);
      ctx.stroke();

      line.x -= line.speed;

      // Recycle the line to the right when it leaves the left side
      if (line.x + line.length < 0) {
        line.x = canvas.width + Math.random() * 50;
        line.y = Math.random() * canvas.height;
        line.length = Math.random() * 20 + 10;
        line.speed = Math.random() * 2 + 2;
      }
    }



    // Enemies
    const result = enemyLogic(
      bossHP,
      bossX,
      bossY,
      enemies,
      bullets,
      enemyBullets,
      ctx,
      canvas,
      xPos,
      yPos,
      ship,
      enBullet,
      playerHP,
      boss,
      enemy,
      shot,
      score,
      spawnTrigger
    );
    playerHP = result.playerHP;
    score = result.score;
    bossHP = result.bossHP;

    //Pickups
    const pickUpsResults = pickUps(
      xPos,
      yPos,
      ctx,
      ship,
      healHeart,
      playerHP,
      heal,
      enBullet
    );
    
    playerHP = pickUpsResults.playerHP;

    // Boss
    const bossResults = bossFunctional(
      bosscannon1,
      bosscannon2,
      bossHP,
      bossX,
      bossY,
      bossSpeedX,
      bossSpeedY,
      spawnInterval,
      spawnTrigger,
      score,
      mssn,
      ctx,
      canvas,
      xPos,
      yPos,
      ship,
      enBullet,
      playerHP,
      boss,
      bossB1,
      bossB2
    );

    playerHP = bossResults.updatedPlayerHP;
    score = bossResults.updatedScore;
    bossHP = bossResults.updatedBossHP;
    bossX = bossResults.updatedBossX;
    bossY = bossResults.updatedBossY;
    bossSpeedX = bossResults.updatedBossSpeedX;
    bossSpeedY = bossResults.updatedBossSpeedY;

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
      ctx.fillText(
        "Press ENTER to try again",
        canvas.width / 2 - 150,
        canvas.height / 2 + 100
      );
    }
    // Boss defeat logic
    if (bossHP === 0 && !bossDefeated) {
      bossDefeated = true;
      shipLeaving = true;
    }

    // Move ship forward after boss defeat
    if (shipLeaving) {
      setTimeout(() => {
        xPos += 8;
        ctx.drawImage(ship, xPos, yPos);
        if (xPos > canvas.width) {
          shipLeaving = false;
        }
      }, 3000);
    } else {
      ctx.drawImage(ship, xPos, yPos);
    }

    // Draw "MISSION COMPLETE" message when boss defeated
    if (bossDefeated) {
      ctx.font = "40px Arial";
      ctx.fillText(
        "MISSION COMPLETE",
        canvas.width / 2 - 150,
        canvas.height / 2
      );
    }

    // Bullet class

    class Bullet {
      constructor() {
        this.x = xPos + 25;
        this.y = yPos + 35;
        bullets.push(this);
      }
      draw() {
        this.x += 4;
        ctx.drawImage(shot, this.x + 10, this.y, 54, 9);
      }
    }

    bullets.forEach((bullet) => bullet.draw());

      ctx.drawImage(ship, xPos, yPos);

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
    }
  }

  // Intervals
  const intervals = [];
  intervals.push(setInterval(draw, 10));
  intervals.push(
    setInterval(() => {
      enemies.push({
        x: enemyX,
        y: Math.floor(Math.random() * (canvas.height - 50)),
        hp: fighterHP,
      });
    }, 1000)
  );
  intervals.push(
    setInterval(() => {
      for (let i = 0; i < enemies.length; i++) {
        let shotPosX = enemies[i].x - 50;
        let shotPosY = enemies[i].y + 35;
        if (enemies[i].x <= spawnTrigger) {
          enemyBullets.push({ x: shotPosX, y: shotPosY });
        }
      }
    }, 1000)
  );
  intervals.push(
    setInterval(() => {
      healHeart.push({
        x: heartX,
        y: Math.floor(Math.random() * (canvas.height - 50)),
      });
    }, 30000)
  );
  intervals.push(
    setInterval(() => {
      let cannon1ShotX = bossX - 10;
      let cannon1ShotY = bossY + 20;
      bosscannon1.push({ x: cannon1ShotX, y: cannon1ShotY });
      let cannon2ShotX = bossX - 10;
      let cannon2ShotY = bossY + 240;
      bosscannon2.push({ x: cannon2ShotX, y: cannon2ShotY });
    }, 2000)
  );

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
