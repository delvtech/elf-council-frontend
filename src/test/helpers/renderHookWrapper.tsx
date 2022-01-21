import React, { ReactElement, ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { Provider } from "@ethersproject/providers";

import { queryClient } from "src/elf/queryClient";

interface WrapperProps {
  provider: Provider;
  children: ReactNode;
}

/**
 * Provides the necessary context to enable testing our hooks.
 * @returns a wrapped component that renders a hook.
 */
export function renderHookWrapper({ children }: WrapperProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
