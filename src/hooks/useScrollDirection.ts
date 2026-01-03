import { useCallback, useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | "none";

interface ScrollOptions {
  threshold?: number; // Minimum scroll distance to trigger direction change
  idleHideDelay?: number; // Time in ms to hide navbar after scrolling stops
  initiallyVisible?: boolean;
}

export function useScrollDirection({
  threshold = 10,
  idleHideDelay = 3000, // 3 seconds of idle time before hiding
  initiallyVisible = true,
}: ScrollOptions = {}) {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("none");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(initiallyVisible);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastActivity, setLastActivity] = useState(() => Date.now());

  // Reset idle timer when scrolling happens
  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now());
    setIsScrolling(true);
  }, []);

  // Handle scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reset idle timer on any scroll
      resetIdleTimer();

      if (Math.abs(currentScrollY - prevScrollY) < threshold) {
        return;
      }

      // Determine scroll direction
      const newScrollDirection = currentScrollY > prevScrollY ? "down" : "up";

      // Update visibility based on scroll direction
      if (newScrollDirection === "down" && currentScrollY > 80) {
        setVisible(false);
      } else if (newScrollDirection === "up") {
        setVisible(true);
      }

      setScrollDirection(newScrollDirection);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY, threshold, resetIdleTimer]);

  // Handle idle time
  useEffect(() => {
    if (!idleHideDelay) return;

    const idleCheck = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      // If we've been idle for longer than our delay and we're not at the top
      if (
        timeSinceLastActivity > idleHideDelay &&
        isScrolling &&
        window.scrollY > 100
      ) {
        setVisible(false);
        setIsScrolling(false);
      }
    }, 1000); // Check once per second

    return () => clearInterval(idleCheck);
  }, [idleHideDelay, lastActivity, isScrolling]);

  // Show navbar when mouse is near the top of the screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If the mouse is near the top of the viewport (within 50px)
      if (e.clientY < 50) {
        setVisible(true);
        resetIdleTimer();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resetIdleTimer]);

  return { scrollDirection, visible, isScrolling };
}
