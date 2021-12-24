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
              <CrownSvg />
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

function CrownSvg(): ReactElement {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
      className="text-principalRoyalBlue fill-current"
    >
      <path d="M8.33333 0C3.725 0 0 3.75 0 8.33333C0 12.9167 3.75 16.6667 8.33333 16.6667C12.9167 16.6667 16.6667 12.9167 16.6667 8.33333C16.6667 3.75 12.9167 0 8.33333 0ZM11.6667 11.2C11.6667 11.4833 11.4833 11.6667 11.2 11.6667H5.46667C5.18333 11.6667 5 11.4833 5 11.2V10.8333H11.6667V11.2ZM11.6667 10H5L4.16667 5L6.66667 6.66667L8.33333 4.16667L10 6.66667L12.5 5L11.6667 10Z" />
    </svg>
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
