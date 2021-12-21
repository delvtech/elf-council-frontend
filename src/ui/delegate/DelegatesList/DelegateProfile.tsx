import { ReactElement, useState, useCallback, useRef } from "react";
import { Tooltip } from "@material-ui/core";
import { t } from "ttag";
import { AnnotationIcon } from "@heroicons/react/solid";
import { DuplicateIcon } from "@heroicons/react/outline";
import tw from "src/elf-tailwindcss-classnames";
import { Delegate } from "src/elf-council-delegates/delegates";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { copyToClipboard } from "src/base/copyToClipboard";
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
        "items-center",
        "justify-between",
        "py-3",
        "px-4",
        "bg-hackerSky",
        "rounded-xl"
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
          <NumDelegatedVotes account={delegate.address}/>
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
              <AnnotationIcon
                className={tw("h-5", "text-principalRoyalBlue")}
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
              <DuplicateIcon className={tw("h-5", "text-principalRoyalBlue")} />
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
