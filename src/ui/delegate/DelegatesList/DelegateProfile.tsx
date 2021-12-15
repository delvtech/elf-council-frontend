import { ReactElement, useState, useCallback, useRef } from "react";
import { Delegate } from "src/elf-council-delegates/delegates";
import Image from "next/image";
import { Tooltip } from "@material-ui/core";
import { copyToClipboard } from "src/base/copyToClipboard";
import { t } from "ttag";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";

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
    [delegate]
  );

  const handleCopyTwitterHandle = () => handleCopy("twitterHandle");
  const handleCopyAddress = () => handleCopy("address");

  return (
    <div
      className={tw(
        "flex",
        "justify-between",
        "py-3",
        "px-5",
        "bg-hackerSky",
        "rounded-xl"
      )}
    >
      <div className={tw("flex", "flex-col")}>
        <span className={tw("text-principalRoyalBlue", "font-bold")}>
          {delegate.name}
        </span>
        <span className={tw("text-blueGrey")}>
          {formatWalletAddress(delegate.address)}
        </span>
      </div>
      <div>
        <span className={tw("flex", "flex-col", "gap-1")}>
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.twitterHandle}
            title={t`Twitter handle copied`}
          >
            <button onClick={handleCopyTwitterHandle}>
              <Image
                height={20}
                width={20}
                src="/assets/Twitter.svg"
                alt={t`Tooltip icon`}
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
              <Image
                height={20}
                width={20}
                src="/assets/copy.svg"
                alt={t`Tooltip icon`}
              />
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

export default DelegateProfile;
