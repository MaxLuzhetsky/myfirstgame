import { useRef, useEffect } from "react";
import { game } from "./scripts/js/index";
import { Background } from "./scripts/js/background";
import { planets } from "./scripts/js/planets";
import { star } from "./scripts/js/star";
import { Joystick } from "react-joystick-component";
import { useIsTablet } from "./scripts/hooks/useIsTablet";

function App() {
  const joystickRef = useRef({});
  const backgroundRef = useRef(null);
  const starRef = useRef(null);
  const planetsRef = useRef(null);
  const canvasRef = useRef(null);
  const isTablet = useIsTablet();

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  const canvasStyle = {
    width: canvasWidth,
    height: canvasHeight,
    border: "1px solid #fff",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  };

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

  useEffect(() => {
    // Disable scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      // Restore scroll after cleanup
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = "auto";
    };
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={backgroundRef}
          width={canvasWidth}
          height={canvasHeight}
          style={canvasStyle}
        />
        <canvas
          ref={starRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ ...canvasStyle, zIndex: 1 }}
        />
        <canvas
          ref={planetsRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ ...canvasStyle, zIndex: 2 }}
        />
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ ...canvasStyle, zIndex: 3 }}
        />
      </div>

      <div
        style={{
          display: isTablet ? "flex" : "none",
          position: "absolute",
          top: isTablet ? "70%" : 400,
          left: 50,
          width: "90%",
          justifyContent: "space-between",
          zIndex: 3,
        }}
      >
        <div style={{ width: 200, height: 200 }}>
          <Joystick
            move={(e) => {
              joystickRef.current = e;
            }}
            stop={() => {
              joystickRef.current = {};
            }}
            size={isTablet ? 100 : 200}
          />
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            width: isTablet ? "100px" : "200px",
            height: isTablet ? "100px" : "200px",
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: 0.8,
          }}
        >
          Restart Game
        </button>
        <button
          onClick={pressSpace}
          style={{
            width: isTablet ? "100px" : "200px",
            height: isTablet ? "100px" : "200px",
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: 0.8,
          }}
        >
          Press Space
        </button>
      </div>
    </>
  );
}

export default App;
