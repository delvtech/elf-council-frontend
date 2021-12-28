import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Image from "next/image";
import { t } from "ttag";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface SuccessCardProps {
  className?: string;
  publicId: string;
}

export default function SuccessCard({
  className,
  publicId,
}: SuccessCardProps): ReactElement {
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="text-white pt-3 px-4 pb-4 md:pt-8 md:px-14 md:pb-14 text-center flex justify-center items-center flex-col gap-2">
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
          <ShieldExclamationIcon className="h-10 relative z-10" />
        </div>
        <div className="flex flex-col items-stretch">
          <h1 className="text-3xl mb-4 font-semibold">{t`Public ID Succesfully created`}</h1>
          <p className="w-0 min-w-full">
            {t`Transmit your Public ID to the `}
            <a
              href="https://discord.gg/64bxSaHr"
              className="text-yieldLightBlue"
            >{t`Discord channel`}</a>
            {t` and keep your Key and Secret private.`}
          </p>
        </div>
        <HashString
          label={t`Public ID`}
          value={publicId}
          className="mb-10"
          placeholder={"0x".padEnd(42, "0")}
          showCopyButton={true}
        />
        <div className="flex gap-12">
          <Button
            variant={ButtonVariant.GRADIENT}
            onClick={() =>
              (window.location.href = "https://discord.gg/64bxSaHr")
            }
            className="flex gap-2"
          >
            {t`Go to Discord`}
            <Image
              width={24}
              height={24}
              src="/assets/discordlogo--light.svg"
              alt=""
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
