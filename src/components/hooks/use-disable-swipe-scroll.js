import { useEffect } from "react";

export function useDisableSwipeScroll({ gameRef }) {
  useEffect(() => {
    if (!gameRef) return;
    const el = gameRef.current;
    if (!el) return;

    const preventScroll = (e) => {
      e.preventDefault();
    };

    // Use non-passive listener so preventDefault actually works
    el.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      el.removeEventListener("touchmove", preventScroll);
    };
  }, []);
}
