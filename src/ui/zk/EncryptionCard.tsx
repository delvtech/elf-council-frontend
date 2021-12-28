import React, { ReactElement, useEffect, useState } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import HashSlider from "./EncryptionCard/HashSlider";
import HashString from "src/ui/base/HashString";
import generateHash from "src/base/generateHash";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import downloadFile, { DownloadType } from "src/base/downloadFile";
import classNames from "classnames";
import ZKData from "./ZKData";

interface EncryptionCardProps {
  className?: string;
  onComplete?: () => void;
  onGenerated?: ([key, secret]: [string, string]) => void;
  onBackClick?: () => void;
  onNextClick: () => void;
}

export default function EncryptionCard({
  className,
  onComplete,
  onGenerated,
  onBackClick,
  onNextClick,
}: EncryptionCardProps): ReactElement {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  // reset downloaded if the key is changed
  useEffect(() => {
    setDownloaded(false);
    if (key) {
      const newSecret = generateHash(key.split("").reverse().join(""));
      setSecret(newSecret);
      onGenerated?.([key, newSecret]);
    }
  }, [key, onGenerated]);

  const handleDownloadClick = () => {
    downloadFile(
      "$elfi-airdrop-key-and-secret",
      JSON.stringify({ privateKey: key, secret } as ZKData),
      DownloadType.JSON,
    );
    setDownloaded(true);
    onComplete?.();
  };

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
          <H2 className="text-white">{t`Drag the slider below to generate a random string`}</H2>
          <p>
            {t`Numbers are generated based on how the mouse changes horizontal or
          vertical direction. You need two strings because lorem ipsum dolor ut 
          perspiciatis, unde omnis iste natus error sit voluptatem accusantium 
          dolore.`}{" "}
            <a href="#">{t`Learn more`}</a>
          </p>
        </div>
        <HashSlider className="mb-2" onChange={setKey} />
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
          placeholder={"0x".padEnd(42, "0")}
          readOnly
        />
        <div className="text-right flex gap-4 mt-6">
          {onBackClick && (
            <Button
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >{t`Back`}</Button>
          )}
          <div className="flex gap-4 ml-auto">
            <Button
              disabled={!key || !secret}
              variant={ButtonVariant.WHITE}
              onClick={handleDownloadClick}
            >{t`Download JSON`}</Button>
            <Button
              variant={ButtonVariant.GRADIENT}
              disabled={!downloaded}
              onClick={onNextClick}
            >{t`Next`}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
