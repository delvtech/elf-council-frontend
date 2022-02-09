import "@fontsource/rubik";
import "@fontsource/rubik/600.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/500.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "styles/globals.css";

import { Web3ReactProvider } from "@web3-react/core";
import { AppProps } from "next/app";
import React, { ReactElement } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getEthereumProviderLibrary } from "src/elf/getEthereumProviderLibrary";
import { queryClient } from "src/elf/queryClient";
import { addressesJson } from "src/elf-council-addresses";
import { Notifications } from "src/ui/notifications/Notifications";

// We want to log out addresses for sanity/debugging purposes
// eslint-disable-next-line no-console
console.log(addressesJson);
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
        <Notifications />
        <Component {...pageProps} />
      </Web3ReactProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
