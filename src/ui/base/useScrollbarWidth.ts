import { MutableRefObject, useEffect, useState } from "react";

/**
 * A hook to determine the width of a given html element's scrollbar. Useful for ui purposes;
 * whether or not to account for a scrollbar and its width based on the user's own system
 * preferences/browser
 *
 * @param elementRef The ref of the html element
 * @returns The scrollbar width of the given html element in pixels
 */
function useScrollbarWidth(
  elementRef: MutableRefObject<HTMLElement | null>,
): number {
  const [scrollWidth, setScrollWidth] = useState(0);

  // Needed to ensure the scrollbar width in case hook called before the DOM is ready
  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const { offsetWidth, clientWidth } = elementRef.current;

    const raf = requestAnimationFrame(() => {
      setScrollWidth(offsetWidth - clientWidth);
    });

    return () => cancelAnimationFrame(raf);
  }, [elementRef]);

  return scrollWidth;
}

export default useScrollbarWidth;
