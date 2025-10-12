import { useState, useEffect } from "react";

/**
 * Custom hook for matching media queries
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // Initialize with current match state (SSR-safe)
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update state if it doesn't match the current value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (modern browsers support addEventListener)
    if (media.addEventListener) {
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      // @ts-ignore - deprecated but needed for older browsers
      media.addListener(listener);

      // @ts-ignore
      return () => media.removeListener(listener);
    }
  }, [query, matches]);

  return matches;
}
