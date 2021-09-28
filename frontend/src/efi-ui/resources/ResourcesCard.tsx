import React, { ReactElement } from "react";
import Button from "src/efi-ui/base/Button/Button";
import Card from "src/efi-ui/base/Card/Card";
import CardHeader from "src/efi-ui/base/Card/CardHeader";
import Well from "src/efi-ui/base/Well/Well";
import tw from "src/elf-tailwindcss-classnames";
import { jt, t } from "ttag";

const howToParticipateLink = (
  <a
    key="how-to-participate"
    href=""
    className={tw("font-semibold", "text-blue-800", "hover:underline")}
  >
    {t`How to Participate`}
  </a>
);
const howVotingWorksLink = (
  <a
    key="how-voting-works"
    href=""
    className={tw("font-semibold", "text-blue-800", "hover:underline")}
  >
    {t`How Voting Works`}
  </a>
);
const votingWalletSetupLink = (
  <a
    key="voting-wallet-setup"
    href=""
    className={tw("font-semibold", "text-blue-800", "hover:underline")}
  >
    {t`Voting Wallet Setup`}
  </a>
);

const usefulToolsLink = (
  <a
    key="useful-tools"
    href=""
    className={tw("font-semibold", "text-blue-900", "hover:underline")}
  >
    {t`Tools`}
  </a>
);
const onChainGovernanceLink = (
  <a
    key="on-chain-governance"
    href=""
    className={tw("font-semibold", "text-blue-900", "hover:underline")}
  >
    {t`On-Chain Governance`}
  </a>
);

export default function ResourcesCard(): ReactElement {
  return (
    <Card>
      <CardHeader
        title={t`Resources`}
        description={t`Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti
          consectetur.`}
        action={
          <div className="sm:space-x-4">
            <Button>{t`View Template`}</Button>
            <Button>{t`New Proposal`}</Button>
          </div>
        }
      />
      <h4
        className={tw("my-4", "text-blue-400", "font-semibold")}
      >{t`Get Started with Governance`}</h4>

      <Well className={tw("space-y-6", "text-blue-900")}>
        <div>{jt`Read our guide on ${howToParticipateLink}.`}</div>
        <div>{jt`Learn about ${howVotingWorksLink}.`}</div>
        <div>{jt`Prepare to vote ${votingWalletSetupLink}.`}</div>
        <div>{jt`Check out useful ${usefulToolsLink}.`}</div>
      </Well>

      <div
        className={tw("mt-4", "text-sm", "font-semibold", "text-blue-900")}
      >{t`Governance involves processes conducted both on-chain and off-chain.`}</div>

      <h4
        className={tw("text-blue-400", "font-semibold", "mt-20")}
      >{t`On-Chain Governance`}</h4>
      <p
        className={tw("mt-1", "mb-4", "text-sm", "text-gray-500")}
      >{t`On-chain governance refers to Governance Polls and Executive Votes. Anyone who owns ELF can participate in these votes.`}</p>
      <Well className={tw("space-y-6", "text-blue-900")}>
        <div>{jt`Learn more about ${onChainGovernanceLink}`}</div>
      </Well>
    </Card>
  );
}
