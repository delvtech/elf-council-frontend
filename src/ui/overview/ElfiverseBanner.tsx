import { ReactElement, useMemo } from "react";
import { FireIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { t } from "ttag";
import classNames from "classnames";

import ElementUrls from "src/elf/urls";
import Card from "src/ui/base/Card/Card";
import { ButtonVariant, getButtonClass } from "src/ui/base/Button/styles";
import { assertNever } from "src/base/assertNever";
import { useNFTTokenBalanceOf } from "src/ui/overview/useNFTTokenBalanceOf";

interface ElfiverseBannerProps {
  account: string | null | undefined;
  recentDelegators: string[];
}

// Constants
const TOTAL_ELVES = 2000;
const CUT_OFF = 2000;
const START_DATE = new Date("April 6, 2022");

enum WhitelistStatus {
  WHITELISTED = "Whitelisted",
  NOT_WHITELISTED = "Not Whitelisted",
  MINTED = "Minted",
  CLOSED = "Closed",
}

function ElfiverseBanner({
  account,
  recentDelegators,
}: ElfiverseBannerProps): ReactElement | null {
  const { data: mintedCount } = useNFTTokenBalanceOf(account);

  const remainingElves = TOTAL_ELVES - recentDelegators.length;

  const hasMinted = mintedCount && mintedCount.gt(0);
  const isWhitelisted = useMemo(() => {
    return recentDelegators.slice(0, CUT_OFF).some((delegator) => {
      return new RegExp(account?.slice(2) || "", "i").test(delegator);
    });
  }, [account, recentDelegators]);

  if (remainingElves <= 0) {
    return null;
  }

  const getWhitelistStatus = () => {
    if (hasMinted) {
      return WhitelistStatus.MINTED;
    }

    if (new Date() < START_DATE) {
      return WhitelistStatus.CLOSED;
    }

    if (isWhitelisted) {
      return WhitelistStatus.WHITELISTED;
    }

    if (!isWhitelisted) {
      return WhitelistStatus.NOT_WHITELISTED;
    }

    // Will not reach this
    return WhitelistStatus.CLOSED;
  };

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
        {account && (
          <div className="flex w-[fit-content] items-center gap-2 rounded-lg p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
            <WhiteListStatusIndicator status={getWhitelistStatus()} />
          </div>
        )}

        {/* CTA / Button */}
        <div className="flex items-center gap-4 rounded-xl p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
          <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-hackerSky">
            <FireIcon className="h-[28px] text-principalRoyalBlue" />
          </div>
          <span className="text-sm leading-4">
            {t`${remainingElves} / ${TOTAL_ELVES} ELF NFTs Whitelist\u00A0Remaining`}
          </span>

          <a
            href={ElementUrls.NFT_APP}
            target="_blank"
            rel="noreferrer"
            className={classNames(
              getButtonClass({ variant: ButtonVariant.GRADIENT }),
              "ml-auto inline-flex w-1/2 max-w-[250px] items-center justify-center py-3 px-4 text-center font-bold leading-4 focus:outline-none focus:ring-2 focus:ring-brandDarkBlue focus:ring-offset-2",
            )}
          >{t`Visit ELF Website`}</a>
        </div>
      </div>
    </Card>
  );
}

interface WhiteListStatusIndicatorProps {
  status: WhitelistStatus;
}

function WhiteListStatusIndicator({
  status,
}: WhiteListStatusIndicatorProps): ReactElement {
  const getStatusColor = () => {
    switch (status) {
      case WhitelistStatus.WHITELISTED:
        return "bg-principalRoyalBlue";
      case WhitelistStatus.NOT_WHITELISTED:
        return "bg-goldYellow";
      case WhitelistStatus.MINTED:
        return "bg-statusGreen";
      case WhitelistStatus.CLOSED:
        return "bg-orange";
      default:
        assertNever(status);
        return "";
    }
  };

  return (
    <>
      <span
        className={classNames(
          "inline-block h-[15px] w-[15px] rounded-full",
          getStatusColor(),
        )}
      ></span>
      <span className="text-sm">{t`Current whitelist status: ${status}`}</span>
    </>
  );
}

export default ElfiverseBanner;
