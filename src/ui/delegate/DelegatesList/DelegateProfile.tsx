import { ReactElement, useState, useCallback, useRef } from "react";
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
} from "src/elf-tailwindcss-classnames";
import { DuplicateIcon } from "@heroicons/react/outline";
import { AnnotationIcon } from "@heroicons/react/solid";
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
        padding("py-3", "px-4"),

        backgroundColor("bg-hackerSky"),
        borderRadius("rounded-xl"),
      )}
    >
      <div className={tw(display("flex"), flexDirection("flex-col"))}>
        <div
          className={tw(
            textColor("text-principalRoyalBlue"),
            fontWeight("font-bold"),
            display("flex"),
            alignItems("items-center"),
            margin("mb-1"),
          )}
        >
          {/* Blue circle placeholder for when we implement the 'avatar' for each Delegate  */}
          <span
            className={tw(
              display("inline-block"),
              height("h-5"),
              width("w-5"),
              borderRadius("rounded-xl"),
              backgroundColor("bg-principalRoyalBlue"),
              margin("mr-1.5"),
            )}
          />
          <span>{delegate.name}</span>
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

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{t`${votePower} votes`}</span>;
}

export default DelegateProfile;
