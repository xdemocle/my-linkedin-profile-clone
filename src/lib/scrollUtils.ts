/**
 * Scroll to the top of the page
 */
export function scrollToTop(smooth = false): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth ? "smooth" : "auto",
  });
}

/**
 * Scroll to a specific element
 * @param {string} elementId - The ID of the element to scroll to
 * @param {boolean} smooth - Whether to use smooth scrolling
 * @param {number} offset - Offset in pixels from the top of the element
 */
export function scrollToElement(
  elementId: string,
  smooth = false,
  offset = 0
): void {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? "smooth" : "auto",
    });
  }
}

/**
 * Save the current scroll position with a key
 * @param {string} key - The key to save the scroll position with
 */
export function saveScrollPosition(key: string): void {
  sessionStorage.setItem(`scroll-${key}`, String(window.scrollY));
}

/**
 * Restore the scroll position for a key
 * @param {string} key - The key to restore the scroll position for
 * @param {boolean} smooth - Whether to use smooth scrolling
 */
export function restoreScrollPosition(key: string, smooth = false): void {
  const scrollY = sessionStorage.getItem(`scroll-${key}`);
  if (scrollY) {
    window.scrollTo({
      top: parseInt(scrollY, 10),
      behavior: smooth ? "smooth" : "auto",
    });
  }
}

/**
 * Prevent scrolling on the body
 */
export function disableBodyScroll(): void {
  document.body.style.overflow = "hidden";
}

/**
 * Enable scrolling on the body
 */
export function enableBodyScroll(): void {
  document.body.style.overflow = "";
}
