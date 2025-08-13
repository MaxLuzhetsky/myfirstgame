export function hud(score, mssn, playerHP, playerLv, ctx, hpIcon, lvIcon) {
  // Score, mission, HP, LV
  ctx.font = "16px Trebuchet MS";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Score: " + score, 200, 25);
  ctx.fillText(mssn, 830, 20);
  ctx.font = "20px Arial";
  ctx.drawImage(hpIcon, 10, 0);
  ctx.fillText("- " + playerHP, 50, 25);
  ctx.drawImage(lvIcon, 100, 0);
  ctx.fillText("- " + playerLv, 150, 25);
}
