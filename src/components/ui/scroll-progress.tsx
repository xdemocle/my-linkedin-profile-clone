import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  className?: string;
}

export function ScrollProgress({ 
  color = 'var(--primary)', 
  height = 3,
  className = ''
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = getDocHeight();

      // Calculate the percentage the user has scrolled
      const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    // Helper function to get the total page height
    const getDocHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set the progress
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 z-50 w-full ${className}`}
      style={{ 
        height: `${height}px`, 
        backgroundColor: 'transparent', 
        pointerEvents: 'none'
      }}
    >
      <div 
        className="h-full transition-all duration-150 ease-out"
        style={{ 
          width: `${scrollProgress}%`, 
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export default ScrollProgress;
