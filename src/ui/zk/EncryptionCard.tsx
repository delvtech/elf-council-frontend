import React, { ReactElement, useCallback, useEffect, useState } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
import generateHashSeed from "./EncryptionCard/generateHashSeed";
import HashSlider, {
  onChangePayload as onHashChangePayload,
} from "./EncryptionCard/HashSlider";
import HashString from "src/ui/base/HashString";
import { utils } from "ethers";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import downloadFile, { DownloadType } from "src/base/downloadFile";
import { ZKData } from "./types";
import { HASH_LENGTH } from "./constants";

interface EncryptionCardProps {
  className?: string;
  onComplete: () => void;
  onGenerated: ([key, secret]: [string, string]) => void;
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
  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const key = keySecretPair?.[0];
  const secret = keySecretPair?.[1];
  const [secretHashSeed, setSecretHashSeed] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    generateHashSeed().then(setSecretHashSeed);
  }, []);

  // reset downloaded if the keySecretPair change
  useEffect(() => {
    setDownloaded(false);
  }, [key, secret]);

  const handleHashChange = useCallback(
    ({ hash: newKey, mouseInput, progress }: onHashChangePayload) => {
      const secretInput = [
        secretHashSeed || newKey,
        ...mouseInput.split("").reverse(),
      ].join("");
      // reset to avoid reuse
      setSecretHashSeed(undefined);
      const newSecret = utils.id(secretInput);
      setKeySecretPair([newKey, newSecret]);
      setProgress(progress);
      onGenerated?.([newKey, newSecret]);
    },
    [onGenerated, secretHashSeed],
  );

  const handleDownloadClick = () => {
    downloadFile(
      "$elfi-airdrop-key-and-secret",
      JSON.stringify({ privateKey: key, secret } as ZKData),
      DownloadType.JSON,
    );
    setDownloaded(true);
    onComplete();
  };

  return (
    <Card variant={CardVariant.BLUE} className={className}>
      <div className="flex flex-col gap-2 p-2 text-white sm:p-6">
        <h1 className="mb-2 text-3xl font-semibold">{t`Encryption`}</h1>
        <div className="flex flex-col gap-2 px-5 py-4 mb-4 rounded-lg sm:py-6 sm:px-8 bg-white/10">
          <H2 className="text-white">{t`Drag the slider below to generate a random string`}</H2>
          <p>
            {t`Numbers are generated based on how the mouse changes horizontal or
          vertical direction. You need two strings because lorem ipsum dolor ut 
          perspiciatis, unde omnis iste natus error sit voluptatem accusantium 
          dolore.`}{" "}
            <a href="http://TODO">{t`Learn more`}</a>
          </p>
        </div>
        <HashSlider
          className="mb-2"
          distanceRequirement={2000}
          onChange={handleHashChange}
        />
        <HashString
          className="mb-2"
          label={t`The Key`}
          inputProps={{
            className: "flex-1",
            value: key,
            placeholder: "0x".padEnd(HASH_LENGTH, "0"),
            readOnly: true,
          }}
        />
        <HashString
          className="mb-2"
          label={t`The Secret`}
          inputProps={{
            className: "flex-1",
            value: secret,
            placeholder: "0x".padEnd(HASH_LENGTH, "0"),
            readOnly: true,
          }}
        />
        <div className="flex gap-4 mt-6 text-right">
          {onBackClick && (
            <Button
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >{t`Back`}</Button>
          )}
          <div className="flex gap-4 ml-auto">
            <Button
              variant={ButtonVariant.WHITE}
              onClick={handleDownloadClick}
              disabled={!keySecretPair || progress < 100}
            >{t`Download JSON`}</Button>
            <Button
              variant={ButtonVariant.GRADIENT}
              onClick={onNextClick}
              disabled={!downloaded}
            >{t`Next`}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
