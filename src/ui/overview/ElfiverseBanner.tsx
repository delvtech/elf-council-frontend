import { ReactElement } from "react";
import { FireIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";

function ElfiverseBanner(): ReactElement {
  return (
    <Card className="flex w-full flex-col gap-4 shadow-md xl:max-w-[512px]">
      {/* Header */}
      <div className="flex">
        <div className="mt-2 flex w-3/4 flex-col gap-2">
          <span className="font-bold text-principalRoyalBlue">
            {t`Our first minting drop is now live`}
          </span>
          <p className="text-sm leading-6 text-[#979797]">
            {t`Delegate your voting power to yourself or others now to be eligible for minting your ELF NFT.`}
          </p>
        </div>

        <div className="ml-2 w-1/4">
          <div className="ml-auto w-[fit-content]">
            <Image
              src="/assets/overview-page/elfi-nft.png"
              width={100}
              height={100}
              alt="Elfi NFT"
              className="pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[#979797]">
        {/* Whitelist status */}
        <div className="flex w-[fit-content] items-center gap-2 rounded-lg p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
          <span className="inline-block h-[15px] w-[15px] rounded-full bg-principalRoyalBlue"></span>
          <span className="text-sm">{t`Current whitelist status: Whitelisted`}</span>
        </div>

        {/* CTA / Button */}
        <div className="flex items-center gap-4 rounded-xl p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
          <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-hackerSky">
            <FireIcon className="h-[28px] text-principalRoyalBlue" />
          </div>
          <span className="text-sm leading-4">{t`1,021 / 5000 ELF NFTs Whitelist Remaining`}</span>
          <Button
            className="ml-auto w-1/2 items-center justify-center"
            variant={ButtonVariant.GRADIENT}
          >
            {t`Visit ELF Website`}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ElfiverseBanner;
