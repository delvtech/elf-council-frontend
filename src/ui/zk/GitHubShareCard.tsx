import React, { ReactElement } from "react";
import RadiantShieldIcon from "./RadiantShieldIcon";
import { GITHUB_ZK_URL } from "./constants";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Image from "next/image";
import { t, jt } from "ttag";

const githubIssueLink = (
  <a
    href={GITHUB_ZK_URL}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >{t`GitHub issue`}</a>
);

interface GitHubShareCardProps {
  className?: string;
  publicId: string;
}

export default function GitHubShareCard({
  className,
  publicId,
}: GitHubShareCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col items-center justify-center gap-2 px-4 pt-3 pb-4 text-center text-white md:px-14 md:pt-8 md:pb-14">
        <RadiantShieldIcon className="mb-5" />
        <div className="flex flex-col items-stretch">
          <h1 className="mb-4 text-3xl font-semibold">{t`Public ID Successfully Created`}</h1>
          <p className="w-0 min-w-full">
            {jt`Share your new Public ID in a comment on Element's ${githubIssueLink} to associate it with your GitHub username.`}
          </p>
        </div>
        <HashString
          label={t`GitHub Public ID`}
          className="mb-10"
          showCopyButton
          inputProps={{
            value: publicId,
            readOnly: true,
          }}
        />
        <div className="flex gap-12">
          <AnchorButton
            variant={ButtonVariant.GRADIENT}
            href={GITHUB_ZK_URL}
            className="flex gap-2"
            target="_blank"
          >
            {t`Go to GitHub Issue`}
            <Image
              width={24}
              height={24}
              src="/assets/githublogo--light.svg"
              alt=""
            />
          </AnchorButton>
        </div>
      </div>
    </Card>
  );
}
