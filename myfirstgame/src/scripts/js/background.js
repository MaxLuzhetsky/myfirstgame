import shipSrc from "../img/myship.png";
import newBg from "../img/bg.jpg";

export function Background(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Images
  const ship = new Image();
  ship.src = shipSrc;
  const bg = new Image();
  bg.src = newBg;

  bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  };
}
