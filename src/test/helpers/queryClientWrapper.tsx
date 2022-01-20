import React, { ReactElement, ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { queryClient } from "src/elf/queryClient";

interface WrapperProps {
  children: ReactNode;
}

export function queryClientWrapper({ children }: WrapperProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
