import { useState } from "react";
import { useDebounceFunction } from "src/ui/base/useDebounceFunction";
import { TooltipProviderValue } from "./TooltipProvider";

export interface UseTooltipProps {
  showDelay?: number;
  hideDelay?: number;
}

export default function useTooltip(
  props?: UseTooltipProps,
): TooltipProviderValue {
  const { showDelay = 100, hideDelay = 200 } = props || {};
  const [isShowing, setIsShowing] = useState(false);

  const [show, cancelShow] = useDebounceFunction(() => {
    setIsShowing(true);
  }, showDelay);

  const [hide, cancelHide] = useDebounceFunction(() => {
    setIsShowing(false);
  }, hideDelay);

  return {
    isShowing,
    show: () => {
      cancelHide();
      show();
    },
    hide: () => {
      cancelShow();
      hide();
    },
  };
}
