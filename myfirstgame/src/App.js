import { useRef, useEffect, useState } from "react";
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

  // ✅ Keep canvas size in state so it updates on resize
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

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
    setTimeout(() => document.dispatchEvent(keyUp), 50);
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
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = "auto";
    };
  }, []);

  const canvasStyle = {
    width: canvasSize.width,
    height: canvasSize.height,
    border: "1px solid #fff",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  };

  return (
    <>
      <div
        style={{ maxWidth: "1500px", position: "relative", display: "flex" }}
      >
        <canvas
          ref={backgroundRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={canvasStyle}
        />
        <canvas
          ref={starRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{ ...canvasStyle, zIndex: 1 }}
        />
        <canvas
          ref={planetsRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{ ...canvasStyle, zIndex: 2 }}
        />
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
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
          touchAction: "none",
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
            backgroundColor: "rgb(61, 89, 171)",
            borderRadius: "50%",
            opacity: 0.8,
            border: "none",
          }}
        >
          Press Space
        </button>
      </div>
    </>
  );
}

export default App;
