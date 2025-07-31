export function bossFunctional(
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
) {
  let updatedBossHP = bossHP;
  let updatedScore = score;
  let updatedPlayerHP = playerHP;
  let updatedBossX = bossX;
  let updatedBossY = bossY;
  let updatedBossSpeedX = bossSpeedX;
  let updatedBossSpeedY = bossSpeedY;

  if (score >= 500) {
    mssn = "Defeat the Titan";
    ctx.drawImage(boss, updatedBossX, updatedBossY);
    spawnInterval = 5000;
    updatedBossX -= updatedBossSpeedX;

    // Boss cannons
    if (updatedBossX <= spawnTrigger) {
      for (let bb = bosscannon1.length - 1; bb >= 0; bb--) {
        ctx.drawImage(bossB1, bosscannon1[bb].x, bosscannon1[bb].y);
        bosscannon1[bb].x -= 1;
        if (bosscannon1[bb].x < 0 || bosscannon1[bb].x > canvas.width)
          bosscannon1.splice(bb, 1);
        if (
          bosscannon1[bb] &&
          bosscannon1[bb].x <= xPos + ship.width - 10 &&
          bosscannon1[bb].x + enBullet.width - 10 >= xPos &&
          bosscannon1[bb].y <= yPos + ship.height - 10 &&
          bosscannon1[bb].y + enBullet.height - 10 >= yPos
        ) {
          bosscannon1.splice(bb, 1);
          updatedPlayerHP -= 25;
        }
      }
      for (let bd = bosscannon2.length - 1; bd >= 0; bd--) {
        ctx.drawImage(bossB2, bosscannon2[bd].x, bosscannon2[bd].y);
        bosscannon2[bd].x -= 1;
        if (bosscannon2[bd].x < 0 || bosscannon2[bd].x > canvas.width)
          bosscannon2.splice(bd, 1);
        if (
          bosscannon2[bd] &&
          bosscannon2[bd].x <= xPos + ship.width - 10 &&
          bosscannon2[bd].x + enBullet.width - 10 >= xPos &&
          bosscannon2[bd].y <= yPos + ship.height - 10 &&
          bosscannon2[bd].y + enBullet.height - 10 >= yPos
        ) {
          bosscannon2.splice(bd, 1);
          updatedPlayerHP -= 25;
        }
      }
    }
    if (updatedBossHP >= 0) {
      ctx.font = "16px Trebuchet MS";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("TITAN:  " + bossHP, canvas.width / 2, 25);
    }
    if (updatedBossX === canvas.width - boss.width) {
      updatedBossSpeedX = 0;
      updatedBossY += updatedBossSpeedY;
      if (updatedBossY >= canvas.height - boss.height) updatedBossSpeedY = -1;
      else if (updatedBossY <= 0) updatedBossSpeedY = 1;
    }
    if (updatedBossHP === 0) {
      updatedBossSpeedX = -1;
      ctx.clearRect(canvas.width / 2, 25, 20, 10);
      if (updatedBossX > canvas.width)
        ctx.clearRect(updatedBossX, updatedBossY, boss.width, boss.height);
    }
  }

  return {
    updatedBossHP,
    updatedScore,
    updatedPlayerHP,
    updatedBossX,
    updatedBossY,
    updatedBossSpeedX,
    updatedBossSpeedY,
  };
}
