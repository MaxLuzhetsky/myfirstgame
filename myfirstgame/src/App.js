import React, { useRef, useEffect } from "react";
import { game } from "./scripts/js/index";
import { Background } from "./scripts/js/background";
import { planets } from "./scripts/js/planets";

function App() {
  const backgroundRef = useRef(null);
  const planetsRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup;
    if (backgroundRef.current) {
      Background(backgroundRef.current);
    }
    if (planetsRef.current) {
      planets(planetsRef.current);
    }
    if (canvasRef.current) {
      cleanup = game(canvasRef.current);
    }

    return () => {
      if (cleanup) {
        cleanup(); // ✅ clean up game loop
      }
    };
  }, []);

  return (
    <div>
      <button onClick={() => window.location.reload()}>Restart Game</button>
      <canvas
        ref={backgroundRef}
        width={800}
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
        ref={planetsRef}
        width={800}
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
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid #fff",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default App;
