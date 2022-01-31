import React, { ReactElement } from "react";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Image from "next/image";
import { t } from "ttag";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface ShareCardProps {
  className?: string;
  publicId: string;
  label: string;
  url: string;
  icon?: string | ReactElement;
  description: string | ReactElement;
}

export default function ShareCard({
  className,
  publicId,
  label,
  url,
  icon,
  description,
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
          <p className="w-0 min-w-full">{description}</p>
        </div>
        <HashString
          label={`${label} Public ID`}
          className="mb-10"
          showCopyButton={true}
          inputProps={{
            value: publicId,
            placeholder: "0x".padEnd(42, "0"),
            readOnly: true,
          }}
        />
        <div className="flex gap-12">
          <AnchorButton
            variant={ButtonVariant.GRADIENT}
            href={url}
            className="flex gap-2"
          >
            {t`Go to ${label}`}
            {typeof icon === "string" ? (
              <Image width={24} height={24} src={icon} alt="" />
            ) : (
              icon
            )}
          </AnchorButton>
        </div>
      </div>
    </Card>
  );
}
