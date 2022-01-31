import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import useFile from "src/ui/base/useFile";
import { ZKData } from "src/ui/zk/types";
import { DISCORD_ZK_URL, GITHUB_ZK_URL } from "src/ui/zk/zkURLs";
import { t, jt } from "ttag";

interface LookupCardProps {
  className?: string;
  onComplete?: (data: ZKData) => void;
  onNextClick: () => void;
}

// TODO: save somewhere to be shared with ../zk/EncryptionCard
const HASH_LENGTH = 66;

export default function LookupCard({
  className,
  onComplete,
  onNextClick,
}: LookupCardProps): ReactElement {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const { file, openFileBrowser } = useFile({ accept: ".json" });

  useEffect(() => {
    if (key && secret) {
      onComplete?.({ privateKey: key, secret });
    }
  }, [key, secret, onComplete]);

  useEffect(() => {
    if (!file) {
      return;
    }
    try {
      const { privateKey, secret } = JSON.parse(file as string) as ZKData;
      setKey(privateKey);
      setSecret(secret);
    } catch (err) {
      console.error(err);
      // TODO: show invalid file error
    }
  }, [file]);

  return (
    <Card variant={CardVariant.BLUE} className={className}>
      <div className="flex flex-col gap-2 p-2 text-white sm:p-6">
        <h1 className="mb-2 text-3xl font-semibold">{t`Claim Airdrop`}</h1>
        <p>
          {jt`To check your elligibility for this airdrop, upload or enter the Key and Secret generated while creating the Public ID you shared in ${(
            <a
              href={DISCORD_ZK_URL}
              target="_blank"
              rel="noreferrer"
              className="text-yieldLightBlue"
            >
              Discord
            </a>
          )} or on ${(
            <a
              href={GITHUB_ZK_URL}
              target="_blank"
              rel="noreferrer"
              className="text-yieldLightBlue"
            >
              GitHub
            </a>
          )}.`}
        </p>
        <p className="mb-6">
          {t`Element cannot retrieve your Key and Secret for you.`}
        </p>
        <HashString
          className="mb-2"
          label={t`The Key`}
          inputProps={{
            value: key,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setKey(e.target?.value),
            placeholder: "0x".padEnd(HASH_LENGTH, "0"),
            minLength: HASH_LENGTH,
            maxLength: HASH_LENGTH,
          }}
        />
        <HashString
          className="mb-2"
          label={t`The Secret`}
          inputProps={{
            value: secret,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setSecret(e.target?.value),
            placeholder: "0x".padEnd(HASH_LENGTH, "0"),
            minLength: HASH_LENGTH,
            maxLength: HASH_LENGTH,
          }}
        />
        <div className="flex justify-end gap-4 mt-6 text-right">
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
