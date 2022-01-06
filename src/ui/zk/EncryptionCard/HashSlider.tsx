import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMouseTracking from "src/ui/base/useMouseTracking";
import { utils } from "ethers";
import classNames from "classnames";

interface HashSliderProps {
  className?: string;
  onChange?: ({
    hash,
    mouseInput,
  }: {
    hash: string;
    mouseInput: string;
  }) => void;
}

export default function HashSlider({
  className,
  onChange,
}: HashSliderProps): ReactElement {
  const [slid, setSlid] = useState(false);
  const [hash, setHash] = useState("");
  const { mousePosition, startTracking, draggingTime } = useMouseTracking({
    trackDragTime: true,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  const handleStartDrag = () => {
    if (!slid) {
      setSlid(true);
    }
    startTracking().until("mouseup");
  };

  useEffect(() => {
    if (slid) {
      setHash((oldHash) => {
        const input = [oldHash, ...mousePosition, draggingTime].join("");
        return utils.id(input);
      });
    }
  }, [slid, mousePosition, draggingTime]);

  useEffect(() => {
    if (hash) {
      onChange?.({
        hash,
        mouseInput: [...mousePosition, draggingTime].join(""),
      });
    }
  }, [hash, onChange, mousePosition, draggingTime]);

  const {
    trackerLeft,
    trackerWidth,
    containerWidth,
    containerPaddingLeft,
    containerPaddingRight,
  } = useMemo(() => {
    if (!containerRef.current || !trackerRef.current) {
      return {
        trackerLeft: 0,
        containerPaddingLeft: 0,
        containerPaddingRight: 0,
      };
    }
    const containerClientRect = containerRef.current.getBoundingClientRect();
    const containerStyles = getComputedStyle(containerRef.current);
    const containerPaddingLeft =
      containerStyles.getPropertyValue("padding-left");
    const containerPaddingRight =
      containerStyles.getPropertyValue("padding-right");
    const trackerWidth = trackerRef.current.getBoundingClientRect().width;
    return {
      trackerLeft: Math.max(
        0,
        Math.min(
          mousePosition[0] - containerClientRect.left - trackerWidth / 2,
          containerClientRect.width - trackerWidth,
        ),
      ),
      trackerWidth,
      containerWidth: containerClientRect.width,
      containerPaddingLeft,
      containerPaddingRight,
    };
  }, [mousePosition]);

  const arrowContainerClassName = classNames(
    "absolute",
    "flex",
    "gap-1",
    "group-active:gap-2",
    "transition-all",
    "pointer-events-none",
    "after:absolute",
    "after:inset-0",
    "group-hover:after:animate-none",
    "group-active:after:animate-none",
    "after:from-transparent",
    "after:to-transparent",
    "group-hover:after:to-white",
    "group-active:after:to-white",
  );

  return (
    <div
      ref={containerRef}
      className={classNames(
        "relative",
        "bg-white",
        "rounded-full",
        "p-2",
        "h-12",
        "overflow-hidden",

        // inner white shadow to make arrows fade out at the edges
        "after:absolute",
        "after:pointer-events-none",
        "after:z-10",
        "after:inset-0",
        "after:rounded-full",
        "after:shadow-white",
        "after:shadow-[inset_0_0_4px_6px]",

        className,
      )}
    >
      <div
        role="slider"
        // TODO: getting a11y errors for interactive div w/out a role attribute.
        // Setting role="slider" requires a aria-valuenow and tabIndex to be
        // compliant
        aria-valuenow={0}
        tabIndex={0}
        ref={trackerRef}
        className="absolute flex items-center w-8 h-8 rounded-full shadow bg-gradient-to-b from-principalBlue to-principalRoyalBlue cursor-grab active:cursor-grabbing group"
        style={{
          left: `max(${containerPaddingLeft}, min(${trackerLeft}px, calc(${containerWidth}px - ${trackerWidth}px - ${containerPaddingRight})))`,
        }}
        onMouseDown={handleStartDrag}
      >
        <div
          className={classNames(
            "right-full",
            "mr-2",
            "group-active:mr-4",
            "after:bg-gradient-to-l",
            "after:animate-fade-wave-left",
            arrowContainerClassName,
          )}
        >
          {[...Array(8)]
            .map((_, i) => (
              <RightArrow key={i} className="rotate-180 stroke-blueGrey" />
            ))
            .reverse()}
        </div>
        <div
          className={classNames(
            "left-full",
            "ml-2",
            "group-active:ml-4",
            "after:bg-gradient-to-r",
            "after:animate-fade-wave",
            arrowContainerClassName,
          )}
        >
          {[...Array(8)].map((_, i) => (
            <RightArrow key={i} className="stroke-blueGrey" />
          ))}
        </div>
      </div>
    </div>
  );
}

function RightArrow(props: React.ComponentProps<"svg">): ReactElement {
  return (
    <svg
      className={props.className}
      width="11"
      height="20"
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="0.5 0.5 10.5 10 0.5 19.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
