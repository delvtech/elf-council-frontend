import React, { ReactElement } from "react";

import Container from "components/Container";
import PageView from "components/PageView";
import { Web3ReactProvider } from "@web3-react/core";
import { getEthereumProviderLibrary } from "elf/efi/getEthereumProviderLibrary";

export default function Home(): ReactElement {
  return (
    <Web3ReactProvider getLibrary={getEthereumProviderLibrary}>
      <PageView>
        <Container />
      </PageView>
    </Web3ReactProvider>
  );
}
