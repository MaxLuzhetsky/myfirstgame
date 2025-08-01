// Place at the top of your game function, NOT inside draw:
const STAR_COUNT = 100;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 1.5 + 2.5 // 2.5 to 4 px per frame
  });
}

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.save();
ctx.globalAlpha = 0.8;
ctx.fillStyle = "#fff";
for (let star of stars) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fill();
  // Move star
  star.x -= star.speed;
  if (star.x < 0) {
    star.x = canvas.width;
    star.y = Math.random() * canvas.height;
    star.radius = Math.random() * 1.5 + 0.5;
    star.speed = Math.random() * 1.5 + 2.5; // reset speed
  }
}
ctx.restore();