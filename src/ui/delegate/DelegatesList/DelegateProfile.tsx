import React, { ReactElement, useState, useCallback, useRef } from "react";
import { Tooltip } from "@material-ui/core";
import { t } from "ttag";
import tw, {
  display,
  alignItems,
  justifyContent,
  padding,
  backgroundColor,
  borderRadius,
  flexDirection,
  textColor,
  fontWeight,
  gap,
  height,
  width,
  margin,
  textOverflow,
  textAlign,
} from "src/elf-tailwindcss-classnames";
import { AnnotationIcon } from "@heroicons/react/solid";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { copyToClipboard } from "src/base/copyToClipboard";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import Image from "next/image";
interface DelegateProfileProps {
  delegate: Delegate;
}

const defaultToolTipState = {
  twitterHandle: false,
  address: false,
};

function DelegateProfile(props: DelegateProfileProps): ReactElement {
  const { delegate } = props;
  const [showToolTip, setshowToolTip] = useState(defaultToolTipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(
    (type: "twitterHandle" | "address") => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const nextState = { ...defaultToolTipState };
      nextState[type] = true;
      setshowToolTip(nextState);
      timeoutRef.current = setTimeout(() => {
        setshowToolTip(defaultToolTipState);
        timeoutRef.current = null;
      }, 1000);
      copyToClipboard(delegate[type]);
    },
    [delegate],
  );

  const handleCopyTwitterHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCopy("twitterHandle");
  };
  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCopy("address");
  };

  return (
    <div
      className={tw(
        display("flex"),
        alignItems("items-center"),
        justifyContent("justify-between"),
        padding("py-3", "px-4"),
        backgroundColor("bg-hackerSky"),
        borderRadius("rounded-xl"),
      )}
    >
      <div
        className={tw(
          alignItems("items-start"),
          textAlign("text-left"),
          width("w-10/12"),
          textOverflow("truncate"),
        )}
      >
        <div className="text-principalRoyalBlue font-bold flex items-center mb-1">
          {/* Blue circle placeholder for when we implement the 'avatar' for each Delegate  */}
          <WalletJazzicon
            account={delegate.address}
            size={20}
            className={tw(
              display("inline-block"),
              height("h-5"),
              width("w-5"),
              borderRadius("rounded-xl"),
              backgroundColor("bg-principalRoyalBlue"),
              margin("mr-1.5"),
            )}
          />
          <span className="truncate">{delegate.name}</span>
        </div>
        <span className={tw(textColor("text-blueGrey"))}>
          <NumDelegatedVotes account={delegate.address} />
        </span>
      </div>
      <div>
        <span
          className={tw(
            display(display("flex")),
            flexDirection("flex-col"),
            gap("gap-1"),
            alignItems("items-center"),
            justifyContent("justify-center"),
          )}
        >
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.twitterHandle}
            title={t`Twitter handle copied`}
          >
            <button onClick={handleCopyTwitterHandle}>
              <AnnotationIcon
                className={tw(
                  height("h-5"),
                  textColor("text-principalRoyalBlue"),
                )}
              />
            </button>
          </Tooltip>
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.address}
            title={t`Address copied`}
          >
            <button onClick={handleCopyAddress}>
              <div className="relative h-4 w-4">
                <Image
                  layout="fill"
                  src="/assets/crown.svg"
                  alt={t`Crown icon`}
                />
              </div>
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{t`${votePower} votes`}</span>;
}

export default DelegateProfile;
