import { ReactElement, useCallback, useState, useRef } from "react";
import { Delegate } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import { t } from "ttag";
import { copyToClipboard } from "src/base/copyToClipboard";
import { Tooltip } from "@material-ui/core";
import { DuplicateIcon } from "@heroicons/react/outline";
import { AnnotationIcon } from "@heroicons/react/solid";
import classNames from "classnames";

interface CurrentDelegateProps {
  className?: string;
  delegate: Delegate;
}

const defaultToolTipState = {
  twitterHandle: false,
  address: false,
};

export function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { className = "", delegate } = props;
  const [showToolTip, setshowToolTip] = useState(defaultToolTipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Slightly overengineered handleCopy?
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
      className={classNames(
        className,
        tw(
          "flex",
          "py-4",
          "px-4",
          "justify-between",
          "bg-hackerSky",
          "rounded-xl"
        )
      )}
    >
      <div className={tw("flex", "flex-col")}>
        <div
          className={tw(
            "text-principalRoyalBlue",
            "font-bold",
            "flex",
            "items-center",
            "mb-1"
          )}
        >
          <span
            className={tw(
              "inline-block",
              "h-5",
              "w-5",
              "rounded-xl",
              "bg-principalRoyalBlue",
              "mr-1.5"
            )}
          ></span>
          <span>{delegate.name}</span>
        </div>
        <span className={tw("text-blueGrey")}>
          {t`${delegate.numDelegatedVotes} votes`}
        </span>
        <span className={tw("text-blueGrey")}>
          {formatWalletAddress(delegate.address)}
        </span>
      </div>

      <div className={tw("flex", "flex-col", "justify-center", "gap-2")}>
        <Tooltip
          arrow
          placement="top"
          open={showToolTip.twitterHandle}
          title={t`Twitter handle copied`}
        >
          <button onClick={handleCopyTwitterHandle}>
            <AnnotationIcon className={tw("h-5", "text-principalRoyalBlue")} />
          </button>
        </Tooltip>
        <Tooltip
          arrow
          placement="top"
          open={showToolTip.address}
          title={t`Address copied`}
        >
          <button onClick={handleCopyAddress}>
            <DuplicateIcon className={tw("h-5", "text-principalRoyalBlue")} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
