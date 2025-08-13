import { useRef, useEffect } from "react";
import { game } from "./scripts/js/index";
import { Background } from "./scripts/js/background";
import { planets } from "./scripts/js/planets";
import { star } from "./scripts/js/star"; // Assuming stars function is exported from bullets.js
import { Joystick } from "react-joystick-component";

function App() {
  const joystickRef = useRef({});
  const backgroundRef = useRef(null);
  const starRef = useRef(null);
  const planetsRef = useRef(null);
  const canvasRef = useRef(null);

  const pressSpace = () => {
    const keyDown = new KeyboardEvent("keydown", {
      key: " ",
      code: "Space",
      keyCode: 32,
      which: 32,
      bubbles: true,
    });

    const keyUp = new KeyboardEvent("keyup", {
      key: " ",
      code: "Space",
      keyCode: 32,
      which: 32,
      bubbles: true,
    });

    document.dispatchEvent(keyDown);

    // small delay before keyup so it looks like a real press
    setTimeout(() => {
      document.dispatchEvent(keyUp);
    }, 50);
  };

  useEffect(() => {
    let cleanup;

    if (backgroundRef.current && starRef.current && planetsRef.current) {
      star(starRef.current);
      Background(backgroundRef.current);
      planets(planetsRef.current);
    }

    if (canvasRef.current) {
      cleanup = game(canvasRef.current, joystickRef);
    }

    return () => cleanup && cleanup();
  }, []);

  return (
    <>
      <div>
        <canvas
          ref={backgroundRef}
          width={1500}
          height={600}
          style={{
            border: "1px solid #fff",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
        <canvas
          ref={starRef}
          width={1500}
          height={600}
          style={{
            border: "1px solid #fff",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <canvas
          ref={planetsRef}
          width={1500}
          height={600}
          style={{
            border: "1px solid #fff",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
        <canvas
          ref={canvasRef}
          width={1500}
          height={600}
          style={{
            border: "1px solid #fff",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3,
          }}
        />
      </div>

      <div
        style={{
          border: "1px solid #fff",
          position: "absolute",
          top: 400,
          left: 0,
          zIndex: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => window.location.reload()}>Restart Game</button>
        <Joystick
          move={(e) => {
            joystickRef.current = e;
          }}
          stop={() => {
            joystickRef.current = {};
          }}
          size={200}
        />
        <button onClick={pressSpace}>Press Space</button>
      </div>
    </>
  );
}

export default App;
