import React, { ReactElement, useEffect, useState } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import HashString from "src/ui/base/HashString";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classNames from "classnames";
import Link from "next/link";
import useFile from "src/ui/base/useFile";
import ZKData from "src/ui/zk/ZKData";

interface ClaimCardProps {
  className?: string;
  onComplete?: ([key, secret]: [string, string]) => void;
  onNextClick: () => void;
}

export default function ClaimCard({
  className,
  onComplete,
  onNextClick,
}: ClaimCardProps): ReactElement {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const { file, openFileBrowser } = useFile({ accept: ".json" });

  useEffect(() => {
    if (key && secret) onComplete?.([key, secret]);
  }, [key, secret, onComplete]);

  useEffect(() => {
    if (!file) return;
    try {
      const data = JSON.parse(file as string) as ZKData;
      setKey(data.privateKey);
      setSecret(data.secret);
    } catch (err) {
      console.error(err);
      // TODO: show invalid file error
    }
  }, [file]);

  return (
    <Card variant={CardVariant.BLUE} className={className}>
      <div className="flex flex-col gap-2 p-2 sm:p-6 text-white">
        <h1 className="text-3xl mb-2 font-semibold">{t`Encryption`}</h1>
        <div
          className={classNames(
            "rounded-lg py-4 sm:py-6 px-5 sm:px-8 flex flex-col gap-2 mb-4",
            // eslint-disable-next-line tailwindcss/no-custom-classname
            classNames("bg-white/10"),
          )}
        >
          <H2 className="text-white">{t`Unlock your Public ID`}</H2>
          <p>
            {t`To claim the airdrop, enter your Secret and your Key, so we can 
            check against your Public ID. If you don’t have any,`}{" "}
            <Link href="/zk">
              <a className="text-yieldLightBlue">{t`create a new one`}</a>
            </Link>
            .
          </p>
        </div>
        <HashString
          className="mb-2"
          label={t`The Key`}
          value={key}
          placeholder={"0x".padEnd(42, "0")}
          readOnly
        />
        <HashString
          className="mb-2"
          label={t`The Secret`}
          value={secret}
          onChange={({ target }) => setSecret(target.value)}
          placeholder={"0x".padEnd(42, "0")}
          readOnly
        />
        <div className="text-right flex gap-4 justify-end mt-6">
          <Button
            variant={ButtonVariant.WHITE}
            onClick={openFileBrowser}
          >{t`Upload JSON`}</Button>
          <Button
            variant={ButtonVariant.GRADIENT}
            disabled={!key || !secret}
            onClick={onNextClick}
          >{t`Check Airdrop`}</Button>
        </div>
      </div>
    </Card>
  );
}
