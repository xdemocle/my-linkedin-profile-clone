import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Hook that scrolls the window to the top when the route changes
 * @param {boolean} smooth - Whether to use smooth scrolling (default: false)
 */
export function useScrollRestoration(smooth = false) {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [location, smooth]);
}
