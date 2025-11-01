import { useEffect } from "react";

export function useDisableSpacebarScroll() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        // Prevents default behavior: scrolling down the page
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
