import React, { ReactElement } from "react";
import "styles/globals.css";

import { Web3ReactProvider } from "@web3-react/core";
import { getEthereumProviderLibrary } from "elf/efi/getEthereumProviderLibrary";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
