import React, { Fragment, ReactElement } from "react";
import ZKPage from "src/ui/zk/ZKPage";
import { Platform } from "src/ui/zk/types";
import PageView from "src/ui/app/PageView";
import Head from "next/head";
import { t } from "ttag";

export default function ZK(): ReactElement {
  return (
    <Fragment>
      <Head>
        <title>{t`ZK Github Airdrop | Element Council Protocol`}</title>
      </Head>
      <PageView
        showSidebar={false}
        childrenContainerClassName="self-stretch flex justify-center"
      >
        <ZKPage platform={Platform.GITHUB} />
      </PageView>
    </Fragment>
  );
}
