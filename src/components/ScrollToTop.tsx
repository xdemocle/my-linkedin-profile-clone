import { useEffect } from "react";
import { useLocation } from "wouter";

interface ScrollToTopProps {
  /**
   * Whether to use smooth scrolling
   * @default false
   */
  smooth?: boolean;

  /**
   * Delay in milliseconds before scrolling to top
   * Useful if you want to wait for a transition to complete
   * @default 0
   */
  delay?: number;
}

/**
 * ScrollToTop component that scrolls the window to the top when the route changes
 * This component should be placed inside the Router component
 */
export function ScrollToTop({
  smooth = false,
  delay = 0,
}: ScrollToTopProps = {}) {
  // Get the current location from wouter
  const [location] = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    };

    // If delay is specified, wait before scrolling
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [location, smooth, delay]);

  // This component doesn't render anything
  return null;
}
