import React, { ReactElement } from "react";

import Container from "components/Container";
import PageView from "components/PageView";

export default function Home(): ReactElement {
  return (
    <PageView>
      <Container />
    </PageView>
  );
}
