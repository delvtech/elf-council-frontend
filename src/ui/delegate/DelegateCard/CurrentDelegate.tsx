import {
  ReactElement,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
} from "react";
import Button from "src/ui/base/Button/Button";
import { Delegate } from "src/elf-council-delegates/delegates";
import tw, {
  padding,
  margin,
  display,
  justifyContent,
  backgroundColor,
  borderRadius,
  flexDirection,
  textColor,
  fontWeight,
  alignItems,
  gap,
  position,
  height,
  width,
} from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import Image from "next/image";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { copyToClipboard } from "src/base/copyToClipboard";
import { Tooltip } from "@material-ui/core";
import { DuplicateIcon } from "@heroicons/react/outline";
import classNames from "classnames";

interface CurrentDelegateProps {
  className?: string;
  delegate: Delegate;
  setEditDelegate: Dispatch<SetStateAction<boolean>>;
}

const defaultToolTipState = {
  twitterHandle: false,
  address: false,
};

export function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { className = "", delegate, setEditDelegate } = props;
  const [showToolTip, setshowToolTip] = useState(defaultToolTipState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClickEdit = useCallback(() => {
    setEditDelegate((prevState) => !prevState);
  }, [setEditDelegate]);

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
    [delegate],
  );

  const handleCopyTwitterHandle = () => handleCopy("twitterHandle");
  const handleCopyAddress = () => handleCopy("address");

  return (
    <div
      className={classNames(
        className,
        tw(
          margin("mt-3"),
          padding("py-6", "px-4"),
          display("flex"),
          justifyContent("justify-between"),
          backgroundColor("bg-hackerSky"),
          borderRadius("rounded-xl"),
        ),
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
        <span className={tw(textColor("text-blueGrey"))}>
          {formatWalletAddress(delegate.address)}
        </span>
        <span
          className={tw(
            display("flex"),
            alignItems("items-center"),
            gap("gap-2"),
            margin("mt-1.5"),
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
      <div>
        <Button onClick={handleClickEdit} variant={ButtonVariant.WHITE}>
          Edit
        </Button>
      </div>
    </div>
  );
}
