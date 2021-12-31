import { useMedia } from "react-use";

/**
 * 'sm' breakpoint from tailwind.
 */
export const SMALL_BREAKPOINT = 640;
/**
 * 'md' breakpoint from tailwind.
 */
export const MEDIUM_BREAKPOINT = 768;
/**
 * 'lg' breakpoint from tailwind.
 */
export const LARGE_BREAKPOINT = 1024;

/**
 * 'xl' breakpoint from tailwind.
 */
export const EXTRA_LARGE_BREAKPOINT = 1280;

export function useIsTailwindSmallScreen(): boolean {
  const isSm = useIsTailwindSm();
  const isMd = useIsTailwindMd();
  return isSm || isMd;
}

export function useIsTailwindLargeScreen(): boolean {
  const isLg = useIsTailwindLg();
  const isXl = useIsTailwindXl();
  return isLg || isXl;
}

function useIsTailwindSm(): boolean {
  const isLessThanMd = useMedia(`(max-width: ${MEDIUM_BREAKPOINT}px)`);
  return isLessThanMd;
}
function useIsTailwindMd(): boolean {
  const isAtLeastMdBreakpoint = useMedia(`(min-width: ${MEDIUM_BREAKPOINT}px)`);
  const isLessThanLgBreakpoint = useMedia(
    `(max-width: ${LARGE_BREAKPOINT - 1}px)`,
  );
  return isAtLeastMdBreakpoint && isLessThanLgBreakpoint;
}

function useIsTailwindLg(): boolean {
  const isAtLeastLgBreakpoint = useMedia(`(min-width: ${LARGE_BREAKPOINT}px)`);
  const isLessThanXlBreakpoint = useMedia(
    `(max-width: ${EXTRA_LARGE_BREAKPOINT - 1}px)`,
  );
  return isAtLeastLgBreakpoint && isLessThanXlBreakpoint;
}

function useIsTailwindXl(): boolean {
  return useMedia(`(min-width: ${EXTRA_LARGE_BREAKPOINT - 1}px)`);
}
