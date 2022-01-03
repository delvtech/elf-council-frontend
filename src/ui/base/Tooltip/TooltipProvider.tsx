import React, { PropsWithChildren, ReactElement } from "react";

export interface TooltipProviderValue {
  isShowing: boolean;
  show: () => void;
  hide: () => void;
}

export const TooltipContext = React.createContext({
  isShowing: false,
  show: () => {},
  hide: () => {},
} as TooltipProviderValue);

export default function TooltipProvider({
  tooltip,
  children,
}: PropsWithChildren<{ tooltip: TooltipProviderValue }>): ReactElement {
  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
}
