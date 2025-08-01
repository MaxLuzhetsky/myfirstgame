import planetSheet from "../img/planet-spritesheet.png";

export function planets(canvas, ctx) {
  const sprite = new Image();
  sprite.src = planetSheet; // your spritesheet URL

  // Spritesheet settings
  // Frame details
  const frameWidth = 100;
  const frameHeight = 100;
  const numFrames = 10;

  let currentFrame = 0;
  const fps = 10;
  const interval = 1000 / fps;

  let x = canvas.width;
  let y = getRandomY();

  const speedX = 2;

  function getRandomY() {
    return Math.random() * (canvas.height - frameHeight);
  }

  sprite.onload = () => {
    let lastTime = 0;

    function animate(timestamp) {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;

        // Get X from sprite sheet (assumes horizontal layout)
        const sx = currentFrame * frameWidth;
        const sy = 0;

        ctx.drawImage(
          sprite,
          sx,
          sy, // Crop start point in source image
          frameWidth,
          frameHeight, // Crop size
          x,
          y, // Position on canvas
          frameWidth,
          frameHeight // Draw size
        );

        currentFrame = (currentFrame + 1) % numFrames;
        x -= speedX;

        // Restart when offscreen
        if (x + frameWidth < 0) {
          x = canvas.width;
          y = getRandomY();
        }
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  };
}
