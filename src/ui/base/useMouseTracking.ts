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
  trackDistance?: boolean;
  trackTime?: boolean;
  trackDragTime?: boolean;
}

function getDistance(
  startPosition: [number, number],
  endPosition: [number, number],
): number {
  return Math.sqrt(
    Math.pow(endPosition[0] - startPosition[0], 2) +
      Math.pow(endPosition[1] - startPosition[1], 2),
  );
}

export default function useMouseTracking(options?: UseMouseTrackingOptions): {
  startTracking: () => {
    until: (event: string, target?: EventTarget) => void;
  };
  startTrackingTouch: () => {
    until: (event: string, target?: EventTarget) => void;
  };
  stopTracking: () => void;
  isTracking: boolean;
  mousePosition: [number, number] | undefined;
  distanceTraveled: number;
  trackingTime: number;
  draggingTime: number;
} {
  const {
    trackDistance = false,
    trackTime = false,
    trackDragTime = false,
  } = options || {};
  const [isTracking, setIsTracking] = useState(false);
  const [mousePosition, setMousePosition] = useState<[number, number]>();
  const [distanceTraveled, setDistanceTraveled] = useState(0);
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
      let startPosition: [number, number] | undefined = undefined;
      setMousePosition((state) => {
        startPosition = state;
        return [e.clientX, e.clientY];
      });
      if (trackDistance && startPosition) {
        setDistanceTraveled((distance) => {
          if (!startPosition) {
            return distance;
          }
          return distance + getDistance(startPosition, [e.clientX, e.clientY]);
        });
      }
    },
    [trackDragTime, trackDistance, startCounter],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (trackDragTime) {
        startCounter(draggingIntervalRef, setDraggingTime);
      }
      let startPosition: [number, number] | undefined = undefined;
      setMousePosition((state) => {
        startPosition = state;
        return [e.touches[0].clientX, e.touches[0].clientY];
      });
      if (trackDistance && startPosition) {
        setDistanceTraveled((distance) => {
          if (!startPosition) {
            return distance;
          }
          return (
            distance +
            getDistance(startPosition, [
              e.touches[0].clientX,
              e.touches[0].clientY,
            ])
          );
        });
      }
    },
    [trackDragTime, trackDistance, startCounter],
  );

  const mouseMovementDelay = 20;
  useDebounce(() => stopCounter(draggingIntervalRef), mouseMovementDelay, [
    stopCounter,
    draggingIntervalRef.current,
  ]);

  const stopTracking = useCallback(() => {
    stopCounter(trackingIntervalRef);
    stopCounter(draggingIntervalRef);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
    setIsTracking(false);
  }, [stopCounter, handleMouseMove, handleTouchMove]);

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

  const startTrackingTouch = useCallback(() => {
    if (trackTime) {
      setTrackingTime(0);
      startCounter(trackingIntervalRef, setTrackingTime);
    }
    window.addEventListener("touchmove", handleTouchMove);
    setIsTracking(true);
    return { until };
  }, [trackTime, startCounter, handleTouchMove, until]);

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
    startTracking,
    startTrackingTouch,
    stopTracking,
    isTracking,
    mousePosition,
    distanceTraveled,
    trackingTime,
    draggingTime,
  };
}
