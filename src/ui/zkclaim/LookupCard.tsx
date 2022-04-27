import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import HashString from "src/ui/base/HashString";
import { ButtonVariant } from "src/ui/base/Button/styles";
import useFile from "src/ui/base/useFile";
import { ZKData } from "src/ui/zk/types";
import { GITHUB_ZK_URL, HASH_LENGTH } from "src/ui/zk/constants";
import ElementUrl from "src/elf/urls";
import { t, jt } from "ttag";

interface LookupCardProps {
  className?: string;
  onChange?: ([key, secret]: [string, string]) => void;
  onNextStep: () => void;
}

export default function LookupCard({
  className,
  onChange,
  onNextStep,
}: LookupCardProps): ReactElement {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const { file, openFileBrowser } = useFile({ accept: ".json" });

  useEffect(() => {
    onChange?.([key, secret]);
  }, [key, secret, onChange]);

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

  const discordLink = (
    <a
      key="discordLink"
      href={ElementUrl.DISCORD}
      target="_blank"
      rel="noreferrer"
      className="text-yieldLightBlue"
    >
      {t`Discord`}
    </a>
  );

  const githubLink = (
    <a
      key="githubLink"
      href={GITHUB_ZK_URL}
      target="_blank"
      rel="noreferrer"
      className="text-yieldLightBlue"
    >
      {t`GitHub`}
    </a>
  );

  return (
    <Card variant={CardVariant.BLUE} className={className}>
      <div className="flex flex-col gap-2 p-2 text-white sm:px-6 sm:py-4">
        <h1 className="mb-2 text-3xl font-semibold">{t`Claim Airdrop`}</h1>
        <p>
          {jt`To check your eligibility for this airdrop, upload or enter the Key and Secret generated while creating the Public ID you shared in ${discordLink} or through ${githubLink}.`}
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
        <div className="mt-6 flex justify-end gap-4 text-right">
          <Button
            variant={ButtonVariant.WHITE}
            onClick={openFileBrowser}
          >{t`Upload JSON`}</Button>
          <Button
            variant={ButtonVariant.GRADIENT}
            disabled={!key || !secret}
            onClick={onNextStep}
          >{t`Check Airdrop`}</Button>
        </div>
      </div>
    </Card>
  );
}
