import starSpriteSheet from "../img/star.png";

export function star(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const starSprite = new Image();
  starSprite.src = starSpriteSheet;

  const starFrameWidth = starSprite.width / 50;
  const starFrameHeight = starSprite.height;
  const starNumFrames = 50;

  let starCurrentFrame = 0;
  let starFramesDrawn = 0;

  let starX = canvas.width / 2 - starFrameWidth / 2;
  let starY = canvas.height / 2 - starFrameHeight / 2;

  starSprite.onload = () => {
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);

      // ctx.strokeStyle = "red";
      // ctx.strokeRect(x, y, frameWidth, frameHeight);  to see the sprite bounds

      starCurrentFrame = starCurrentFrame % starNumFrames;

      const sx = starCurrentFrame * starFrameWidth;
      const sy = 0;

      ctx.filter = "blur(6px)";
      ctx.drawImage(
        starSprite,
        sx,
        sy,
        starFrameWidth,
        starFrameHeight,
        starX,
        starY,
        starFrameWidth,
        starFrameHeight
      );

      starFramesDrawn++;
      if (starFramesDrawn >= 10) {
        starCurrentFrame++;
        starFramesDrawn = 0;
      }
    }
    animate();
  };
}
