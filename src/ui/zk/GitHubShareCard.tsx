import React, { ReactElement } from "react";
import { GITHUB_ZK_URL } from "./constants";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { t, jt } from "ttag";
import classNames from "classnames";

const githubIssueLink = (
  <a
    href={GITHUB_ZK_URL}
    target="_blank"
    rel="noreferrer"
    className="text-yieldLightBlue"
  >{t`GitHub issue`}</a>
);

interface ShareCardProps {
  className?: string;
  publicId: string;
}

export default function ShareCard({
  className,
  publicId,
}: ShareCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col items-center justify-center gap-2 px-4 pt-3 pb-4 text-center text-white md:pt-8 md:px-14 md:pb-14">
        <div
          className={classNames(
            "bg-opacity-10",
            "bg-topaz",
            "flex",
            "h-32",
            "items-center",
            "justify-center",
            "mb-5",
            "relative",
            "rounded-full",
            "w-32",

            "before:absolute",
            "before:bg-topaz",
            "before:h-24",
            "before:opacity-50",
            "before:rounded-full",
            "before:w-24",

            "after:absolute",
            "after:bg-topaz",
            "after:h-16",
            "after:rounded-full",
            "after:w-16",
          )}
        >
          <ShieldExclamationIcon className="relative z-10 h-10" />
        </div>
        <div className="flex flex-col items-stretch">
          <h1 className="mb-4 text-3xl font-semibold">{t`Public ID Succesfully created`}</h1>
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
