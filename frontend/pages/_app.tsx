import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "styles/globals.css";

import { Web3ReactProvider } from "@web3-react/core";
import { getEthereumProviderLibrary } from "elf/efi/getEthereumProviderLibrary";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
