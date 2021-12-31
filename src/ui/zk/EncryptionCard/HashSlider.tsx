import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useMouseTracking from "src/ui/base/useMouseTracking";
import generateHash from "src/base/generateHash";
import classNames from "classnames";
import { useDebounce } from "react-use";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";

interface onChangePayload {
  hash: string;
  progress: number; // 0-100 (%)
}

interface HashSliderProps {
  className?: string;
  distanceRequirement?: number;
  onChange?: ({ hash, progress }: onChangePayload) => void;
}

export default function HashSlider({
  className,
  distanceRequirement,
  onChange,
}: HashSliderProps): ReactElement {
  const [slid, setSlid] = useState(false);
  const { mousePosition, startTracking, draggingTime, distanceTraveled } =
    useMouseTracking({
      trackDragTime: true,
      trackDistance: true,
    });
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  const handleStartDrag = () => {
    if (!slid) {
      setSlid(true);
    }
    startTracking().until("mouseup");
  };

  useEffect(() => {
    if (slid && mousePosition) {
      const newProgress = Math.min(
        (distanceTraveled * 100) / (distanceRequirement || 0),
        100,
      );
      const payload: onChangePayload = {
        hash: generateHash(...mousePosition, draggingTime, distanceTraveled),
        progress: newProgress,
      };
      onChange?.(payload);
      setProgress(newProgress);
    }
  }, [
    slid,
    onChange,
    mousePosition,
    draggingTime,
    distanceRequirement,
    distanceTraveled,
  ]);

  const tooltipDelay = 1000;
  useDebounce(
    () => {
      if (slid && progress < 100 && !showTooltip) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    },
    tooltipDelay,
    [slid, progress],
  );
  useEffect(() => {
    setShowTooltip(false);
  }, [progress]);

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
      trackerLeft: mousePosition
        ? Math.max(
            0,
            Math.min(
              mousePosition[0] - containerClientRect.left - trackerWidth / 2,
              containerClientRect.width - trackerWidth,
            ),
          )
        : 0,
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

  const trackerCSSLeft = `max(${containerPaddingLeft}, min(${trackerLeft}px, calc(${containerWidth}px - ${trackerWidth}px - ${containerPaddingRight})))`;
  const popupCSSLeft = trackerLeft
    ? `calc(${trackerLeft}px + ${trackerWidth}px / 2)`
    : "50%";

  return (
    <div className={classNames("flex flex-col gap-4 relative", className)}>
      <Tooltip className="inset-0">
        <Tooltip.Popup
          show={showTooltip}
          style={{
            // TODO: Replace with !absolute class when available in
            // eslint-plugin-tailwindcss
            position: "absolute",
            left: popupCSSLeft,
            transitionProperty: "opacity",
          }}
        >
          {t`Keep sliding`}
        </Tooltip.Popup>
      </Tooltip>
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
            left: trackerCSSLeft,
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
            {[...Array(8)].map((_, i) => (
              <RightArrow key={i} className="rotate-180 stroke-blueGrey" />
            ))}
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

      {/* progress bar */}
      {distanceRequirement && (
        <div className="relative h-2 rounded-full">
          {/* semi-opaque white bg and pulse effect on finish */}
          <div
            className={classNames(
              "absolute w-full h-full box-content top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 p-0 opacity-100 transition-all duration-1000",
              progress === 100 && "p-2 !opacity-0 !bg-topaz",
            )}
          ></div>
          {/* overflow container for gradient bg and green bg */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {/* gradient bg */}
            <div
              className={classNames(
                "absolute inset-0 transition-transform duration-700 ease-in bg-gradient-to-r from-deepRed via-goldYellow to-topaz",
                progress === 100 && "-translate-x-full",
              )}
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
              }}
            ></div>
            {/* green bg */}
            <div
              className={classNames(
                "absolute inset-0 transition-transform duration-700 ease-in bg-topaz translate-x-full",
                progress === 100 && "!translate-x-0",
              )}
            ></div>
          </div>
        </div>
      )}
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
