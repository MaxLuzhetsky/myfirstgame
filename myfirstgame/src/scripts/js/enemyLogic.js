export function enemyLogic(
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
) {
  let updatedPlayerHP = playerHP;
  let updatedScore = score;
  let updatedBossHP = bossHP;

  if (updatedBossHP > 0) {
    for (let i = enemies.length - 1; i >= 0; i--) {
      ctx.drawImage(enemy, enemies[i].x, enemies[i].y);
      enemies[i].x -= 2;
      if (enemies[i].x + 50 < 0) enemies.splice(i, 1);

      // Bullet collision
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (
          bullets[j] &&
          bullets[j].x <= enemies[i].x + enemy.width &&
          bullets[j].x + shot.width >= enemies[i].x &&
          bullets[j].y <= enemies[i].y + enemy.height &&
          bullets[j].y + shot.height >= enemies[i].y
        ) {
          bullets.splice(j, 1);
          enemies[i].hp -= 10;
          if (enemies[i].hp === 0) {
            enemies.splice(i, 1);
            updatedScore += 100;
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
          updatedBossHP -= 100;
        }
      }

      // Ship collision
      if (
        enemies[i] &&
        xPos <= enemies[i].x + enemy.width - 10 &&
        xPos + ship.width - 10 >= enemies[i].x &&
        yPos <= enemies[i].y + enemy.height - 10 &&
        yPos + ship.height - 10 >= enemies[i].y
      ) {
        enemies.splice(i, 1);
        updatedScore += 100;
        updatedPlayerHP -= 50;
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
        updatedPlayerHP -= 10;
      }
    }
  }
  return {
    playerHP: updatedPlayerHP,
    score: updatedScore,
    bossHP: updatedBossHP,
  };
}
