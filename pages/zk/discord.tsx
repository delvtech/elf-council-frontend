import Head from "next/head";
import React, { Fragment, ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { Platform } from "src/ui/zk/types";
import ZKPage from "src/ui/zk/ZKPage";
import { t } from "ttag";

export default function ZK(): ReactElement {
  return (
    <Fragment>
      <Head>
        <title>{t`ZK Discord Airdrop | Element Council Protocol`}</title>
      </Head>
      <PageView
        showSidebar={false}
        childrenContainerClassName="self-stretch flex justify-center"
      >
        <ZKPage platform={Platform.DISCORD} />
      </PageView>
    </Fragment>
  );
}
