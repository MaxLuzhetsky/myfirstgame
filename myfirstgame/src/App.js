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
        }}
      >
        <button onClick={() => window.location.reload()}>Restart Game</button>
        <Joystick
          move={(e) => {
            joystickRef.current = e
          }}
          stop={() => {
            joystickRef.current = {};
          }}
          size={200}
        />
      </div>
    </>
  );
}

export default App;
