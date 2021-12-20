import { ReactElement, useState, useCallback, useRef } from "react";
import { Delegate } from "src/elf-council-delegates/delegates";
import Image from "next/image";
import { Tooltip } from "@material-ui/core";
import { copyToClipboard } from "src/base/copyToClipboard";
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
  position,
  height,
  width,
} from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import { DuplicateIcon } from "@heroicons/react/outline";

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

  const handleCopyTwitterHandle = () => handleCopy("twitterHandle");
  const handleCopyAddress = () => handleCopy("address");

  return (
    <div
      className={tw(
        display("flex"),
        alignItems("items-center"),
        justifyContent("justify-between"),
        padding("py-3", "px-5"),
        backgroundColor("bg-hackerSky"),
        borderRadius("rounded-xl"),
      )}
    >
      <div className={tw(display("flex"), flexDirection("flex-col"))}>
        <span
          className={tw(
            textColor("text-principalRoyalBlue"),
            fontWeight("font-bold"),
          )}
        >
          {delegate.name}
        </span>
        <span className={textColor("text-blueGrey")}>
          {formatWalletAddress(delegate.address)}
        </span>
      </div>
      <div>
        <span
          className={tw(
            display("flex"),
            flexDirection("flex-col"),
            gap("gap-1"),
          )}
        >
          <Tooltip
            arrow
            placement="top"
            open={showToolTip.twitterHandle}
            title={t`Twitter handle copied`}
          >
            <button
              className={tw(position("relative"), height("h-5"), width("w-5"))}
              onClick={handleCopyTwitterHandle}
            >
              <Image
                layout="fill"
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
              <DuplicateIcon
                className={tw(
                  height("h-5"),
                  textColor("text-principalRoyalBlue"),
                )}
              />
            </button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

export default DelegateProfile;
