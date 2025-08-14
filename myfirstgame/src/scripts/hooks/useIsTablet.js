import { useState, useEffect } from "react";

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function updateIsTablet() {
      // typical tablet width range: 768px – 1024px
      setIsTablet(window.innerWidth <= 1024);
    }

    updateIsTablet();
    window.addEventListener("resize", updateIsTablet);
    return () => window.removeEventListener("resize", updateIsTablet);
  }, []);

  return isTablet;
}
