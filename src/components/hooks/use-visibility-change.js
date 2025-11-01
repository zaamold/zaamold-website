import { useEffect } from "react";

/**
 * Run a callback when the document's visibility changes.
 * @param {Function} onChange - Called with a boolean `isHidden` argument.
 */
export function useVisibilityChange(onChange) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      onChange(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [onChange]);
}
