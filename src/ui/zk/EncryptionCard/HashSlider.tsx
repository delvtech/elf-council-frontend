import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import generateHashSeed from "./generateHashSeed";
import useMouseTracking from "src/ui/base/useMouseTracking";
import { utils } from "ethers";
import classNames from "classnames";
import { useDebounce } from "react-use";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { Spinner } from "src/ui/base/Spinner/Spinner";
import { t } from "ttag";

export interface onChangePayload {
  hash: string;
  mouseInput: string;
  progress: number; // 0-100 (%)
}

interface HashSliderProps {
  className?: string;
  distanceRequirement?: number;
  onChange?: ({ hash, mouseInput, progress }: onChangePayload) => void;
}

export default function HashSlider({
  className,
  distanceRequirement,
  onChange,
}: HashSliderProps): ReactElement {
  const [slid, setSlid] = useState(false);
  const {
    mousePosition,
    startTracking,
    startTrackingTouch,
    draggingTime,
    distanceTraveled,
  } = useMouseTracking({
    trackDragTime: true,
    trackDistance: true,
  });
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hash, setHash] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateHashSeed().then(setHash);
  }, []);

  const handleSliderMouseDown = () => {
    if (!slid) {
      setSlid(true);
    }
    startTracking().until("mouseup");
  };

  const handleSliderTouchStart = () => {
    if (!slid) {
      setSlid(true);
    }
    startTrackingTouch().until("touchend");
  };

  useEffect(() => {
    if (slid && mousePosition) {
      const newProgress = Math.min(
        (distanceTraveled * 100) / (distanceRequirement || 0),
        100,
      );
      setHash((oldHash) => {
        const input = [
          oldHash,
          ...mousePosition,
          draggingTime,
          distanceTraveled,
        ].join("");
        return utils.id(input);
      });
      setProgress(newProgress);
    }
  }, [
    slid,
    mousePosition,
    draggingTime,
    distanceRequirement,
    distanceTraveled,
  ]);

  useEffect(() => {
    if (hash && mousePosition) {
      onChange?.({
        hash,
        mouseInput: [...mousePosition, draggingTime, distanceTraveled].join(""),
        progress,
      });
    }
  }, [hash, onChange, mousePosition, draggingTime, distanceTraveled, progress]);

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

  return (
    <div className={classNames("relative flex flex-col gap-4", className)}>
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
        {hash ? (
          <div
            role="slider"
            aria-valuemin={0}
            aria-valuemax={(containerWidth ?? 0) - (trackerWidth ?? 0)}
            aria-valuenow={trackerLeft}
            aria-valuetext={hash}
            tabIndex={0}
            ref={trackerRef}
            className="group absolute flex h-8 w-8 cursor-grab items-center rounded-full bg-gradient-to-b from-principalBlue to-principalRoyalBlue shadow active:cursor-grabbing"
            style={{
              left: trackerCSSLeft,
            }}
            onMouseDown={handleSliderMouseDown}
            onTouchStart={handleSliderTouchStart}
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
            <Tooltip
              className="absolute left-0 right-0 -top-3"
              content={t`Keep sliding`}
              isOpen={showTooltip}
            >
              <span></span>
            </Tooltip>
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
        ) : (
          <Spinner />
        )}
      </div>

      {/* progress bar */}
      {distanceRequirement && (
        <div className="relative h-2 rounded-full">
          {/* semi-opaque white bg and pulse effect on finish */}
          <div
            className={classNames(
              "absolute top-1/2 left-1/2 box-content h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 p-0 opacity-100 transition-all duration-1000",
              progress === 100 && "!bg-topaz p-2 !opacity-0",
            )}
          ></div>
          {/* overflow container for gradient bg and green bg */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {/* gradient bg */}
            <div
              className={classNames(
                "absolute inset-0 bg-gradient-to-r from-deepRed via-goldYellow to-topaz transition-transform duration-700 ease-in",
                progress === 100 && "-translate-x-full",
              )}
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
              }}
            ></div>
            {/* green bg */}
            <div
              className={classNames(
                "absolute inset-0 translate-x-full bg-topaz transition-transform duration-700 ease-in",
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
