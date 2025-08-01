export function movement(e) {
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
}

// Key handlers
