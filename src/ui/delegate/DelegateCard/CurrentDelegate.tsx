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
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import Image from "next/image";
import { t } from "ttag";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { copyToClipboard } from "src/base/copyToClipboard";
import { Tooltip } from "@material-ui/core";

interface CurrentDelegateProps {
  delegate: Delegate;
  setEditDelegate: Dispatch<SetStateAction<boolean>>;
}

const defaultToolTipState = {
  twitterHandle: false,
  address: false,
};

export function CurrentDelegate(props: CurrentDelegateProps): ReactElement {
  const { delegate, setEditDelegate } = props;
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
    [delegate]
  );

  const handleCopyTwitterHandle = () => handleCopy("twitterHandle");
  const handleCopyAddress = () => handleCopy("address");

  return (
    <div
      className={tw(
        "py-6",
        "px-4",
        "my-2",
        "flex",
        "justify-between",
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
        <span className={tw("flex", "gap-2", "mt-1.5")}>
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
      <div>
        <Button onClick={handleClickEdit} variant={ButtonVariant.WHITE}>
          Edit
        </Button>
      </div>
    </div>
  );
}
