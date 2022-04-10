import React, { ReactElement } from "react";
import RadiantShieldIcon from "./RadiantShieldIcon";
import { GITHUB_ZK_URL } from "./constants";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GitHubIcon from "src/ui/base/svg/GithubIcon";
import { t, jt } from "ttag";

const githubGistLink = (
  <a
    href={GITHUB_ZK_URL}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >{t`this GitHub gist`}</a>
);

interface GitHubShareCardProps {
  className?: string;
  publicId: string;
  onShareClick?: () => void;
}

export default function GitHubShareCard({
  className,
  publicId,
  onShareClick,
}: GitHubShareCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col items-center justify-center gap-2 px-4 pt-3 pb-4 text-center text-white md:px-14 md:pt-8 md:pb-14">
        <RadiantShieldIcon className="mb-5" />
        <div className="flex flex-col items-stretch">
          <h1 className="mb-4 text-3xl font-semibold">{t`Public ID Successfully Created`}</h1>
          <p className="w-0 min-w-full">
            {jt`Associate your new Public ID with your GitHub profile by forking ${githubGistLink} and pasting it in the body.`}
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
            onClick={onShareClick}
            variant={ButtonVariant.GRADIENT}
            href={GITHUB_ZK_URL}
            className="flex gap-2"
            target="_blank"
          >
            {t`Go to GitHub Gist`}
            <GitHubIcon width={24} height={24} className="fill-white" />
          </AnchorButton>
        </div>
      </div>
    </Card>
  );
}
