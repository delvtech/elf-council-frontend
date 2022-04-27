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
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { Platform, ZKData } from "./types";
import { HASH_LENGTH } from "./constants";
import { pedersenHashConcat, toHex } from "zkp-merkle-airdrop-lib";

interface EncryptionCardProps {
  className?: string;
  platform?: Platform;
  onGenerated?: ([key, secret]: [string, string]) => void;
  onDownloaded?: (data: ZKData) => void;
  onPreviousStep?: () => void;
  onNextStep?: () => void;
}

export default function EncryptionCard({
  className,
  platform,
  onGenerated,
  onDownloaded,
  onPreviousStep,
  onNextStep,
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
      if (secretHashSeed) {
        setSecretHashSeed(undefined);
      }

      const newSecret = utils.id(secretInput);
      setKeySecretPair([newKey, newSecret]);
      setProgress(progress);
      onGenerated?.([newKey, newSecret]);
    },
    [onGenerated, secretHashSeed],
  );

  const handleDownloadClick = () => {
    if (key && secret) {
      const publicId = toHex(pedersenHashConcat(BigInt(key), BigInt(secret)));
      const data: ZKData = { privateKey: key, secret, publicId };
      downloadFile(
        `elfi${platform && `-${platform}`}-airdrop-key-and-secret`,
        JSON.stringify(data),
        DownloadType.JSON,
      );
      setDownloaded(true);
      onDownloaded?.(data);
    }
  };

  return (
    <Card variant={CardVariant.BLUE} className={className}>
      <div className="flex flex-col gap-2 p-2 text-white sm:px-6 sm:py-4">
        <h1 className="mb-2 text-3xl font-semibold">{t`Encryption`}</h1>
        <div className="mb-4 flex flex-col gap-2 rounded-lg bg-white/10 px-5 py-4 sm:py-6 sm:px-8">
          <H2 className="text-white">{t`Drag the slider below to generate your key and secret`}</H2>
          <p>
            {t`Move your cursor in any direction while dragging the slider to generate a new key and secret. Once the progress bar is completely full, download the JSON file containing your new key and secret before continuing to the next step.`}
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
        <div className="mt-6 flex gap-4 text-right">
          {onPreviousStep && (
            <Button
              variant={ButtonVariant.WHITE}
              onClick={onPreviousStep}
            >{t`Back`}</Button>
          )}
          <div className="ml-auto flex gap-4">
            <Button
              variant={ButtonVariant.WHITE}
              onClick={handleDownloadClick}
              disabled={!keySecretPair || progress < 100}
            >{t`Download JSON`}</Button>
            {onNextStep && (
              <Tooltip
                content={t`Download JSON before continuing`}
                disabled={!keySecretPair || progress < 100 || downloaded}
              >
                <Button
                  variant={ButtonVariant.GRADIENT}
                  onClick={onNextStep}
                  disabled={!downloaded}
                >{t`Next`}</Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
