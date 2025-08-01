export function pickUps(
  xPos,
  yPos,
  ctx,
  ship,
  healHeart,
  playerHP,
  heal,
  enBullet
) {
  let updatedPlayerHP = playerHP;
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
      updatedPlayerHP += 25;
    }
  }
  return {
    playerHP: updatedPlayerHP,
  };
}
