import planetSheet from "../img/planet-spritesheet.png";
import planet1 from "../img/iceplanet.png";
import planet2 from "../img/deadplanet.png";
import planet3 from "../img/earthlikeplanet.png";
import planet4 from "../img/earthlike.png";

const planetImages = [planetSheet, planet1, planet2, planet3, planet4];

export function planets(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const sprite = new Image();
  sprite.src = planetSheet;

  const frameWidth = sprite.width / 41;
  const frameHeight = sprite.height;
  const numFrames = 41;

  let currentFrame = 0;
  let framesDrawn = 0;

  let x = canvas.width;
  let y = getRandomY();
  const speedX = 1.5;

  function getRandomY() {
    return Math.random() * (canvas.height - frameHeight);
  }

  sprite.onload = () => {
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);

      // ctx.strokeStyle = "red";
      // ctx.strokeRect(x, y, frameWidth, frameHeight);  to see the sprite bounds

      currentFrame = currentFrame % numFrames;

      const sx = currentFrame * frameWidth;
      const sy = 0;

      ctx.filter = "blur(4px)";
      ctx.drawImage(
        sprite,
        sx,
        sy,
        frameWidth,
        frameHeight,
        x,
        y,
        frameWidth,
        frameHeight
      );

      framesDrawn++;
      if (framesDrawn >= 10) {
        currentFrame++;
        framesDrawn = 0;
      }
      x -= speedX;

      if (x + frameWidth < 0) {
        x = canvas.width;
        y = getRandomY();
      }
    }
    animate();
  };
}
