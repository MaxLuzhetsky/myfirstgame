import React, { useRef, useEffect, useState } from "react";
import { game } from "./scripts/js/index";

function App() {
 const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup;
    if (canvasRef.current) {
      cleanup = game(canvasRef.current);
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div>
 
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid #fff" }}
      />
    </div>
  );
}

export default App;
