import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebounce } from "react-use";

interface UseMouseTrackingOptions {
  trackTime?: boolean;
  trackDragTime?: boolean;
}

export default function useMouseTracking(options?: UseMouseTrackingOptions): {
  mousePosition: [number, number];
  startTracking: () => {
    until: (event: string, target?: EventTarget) => void;
  };
  stopTracking: () => void;
  trackingTime: number;
  isTracking: boolean;
  draggingTime: number;
} {
  const { trackTime = false, trackDragTime = false } = options || {};
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const trackingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [draggingTime, setDraggingTime] = useState(0);
  const draggingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCounter = useCallback(
    (
      ref: MutableRefObject<NodeJS.Timeout | null>,
      onChange: (reducer: (prevState: number) => number) => void,
    ) => {
      if (ref.current) {
        return;
      }
      ref.current = setInterval(() => {
        onChange((time) => time + 10);
      }, 10);
    },
    [],
  );

  const stopCounter = useCallback(
    (ref: MutableRefObject<NodeJS.Timeout | null>) => {
      if (!ref.current) {
        return;
      }
      clearInterval(ref.current);
      ref.current = null;
    },
    [],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (trackDragTime) {
        startCounter(draggingIntervalRef, setDraggingTime);
      }
      e.preventDefault();
      setMousePosition([e.clientX, e.clientY]);
    },
    [trackDragTime, startCounter],
  );

  useDebounce(() => stopCounter(draggingIntervalRef), 10, [
    stopCounter,
    draggingIntervalRef.current,
  ]);

  const stopTracking = useCallback(() => {
    stopCounter(trackingIntervalRef);
    stopCounter(draggingIntervalRef);
    window.removeEventListener("mousemove", handleMouseMove);
    setIsTracking(false);
  }, [stopCounter, handleMouseMove]);

  const until = useMemo(() => {
    let memoTarget: EventTarget | null = null;
    let memoEvent = "";
    const handleUntilEvent = () => {
      stopTracking();
      if (memoTarget && memoEvent) {
        memoTarget.removeEventListener(memoEvent, handleUntilEvent);
      }
    };
    return (event: string, target: EventTarget = window) => {
      memoTarget = target;
      memoEvent = event;
      target.addEventListener(event, handleUntilEvent);
    };
  }, [stopTracking]);

  const startTracking = useCallback(() => {
    if (trackTime) {
      setTrackingTime(0);
      startCounter(trackingIntervalRef, setTrackingTime);
    }
    window.addEventListener("mousemove", handleMouseMove);
    setIsTracking(true);
    return { until };
  }, [trackTime, startCounter, handleMouseMove, until]);

  // handle unmount
  useEffect(
    () => () => {
      stopCounter(trackingIntervalRef);
      stopCounter(draggingIntervalRef);
      window.removeEventListener("mousemove", handleMouseMove);
    },
    [stopCounter, handleMouseMove],
  );

  return {
    mousePosition,
    startTracking,
    stopTracking,
    trackingTime,
    isTracking,
    draggingTime,
  };
}
