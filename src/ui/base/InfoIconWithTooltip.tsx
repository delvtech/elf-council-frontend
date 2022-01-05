import React, { ReactElement, useCallback, useState } from "react";

import { InformationCircleIcon } from "@heroicons/react/solid";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import Link from "next/link";
import tw, { height } from "src/elf-tailwindcss-classnames";

interface InfoIconProps {
  className?: string;
  tooltipHref?: string;
  tooltipText: string;
}
export function InfoIconWithTooltip(props: InfoIconProps): ReactElement {
  const { className, tooltipHref, tooltipText } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const onOpenTooltip = useCallback(() => {
    setShowTooltip(true);
  }, []);
  const onCloseTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const tooltipIcon = tooltipHref ? (
    <Link href={tooltipHref}>
      {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <InformationCircleIcon className={tw(height("h-4"))} />
      </a>
    </Link>
  ) : (
    <InformationCircleIcon className={tw(height("h-4"))} />
  );

  return (
    <Tooltip
      arrow
      placement="top"
      open={showTooltip}
      onOpen={onOpenTooltip}
      onClose={onCloseTooltip}
      title={tooltipText}
    >
      <button className={classNames(className, tw(height("h-4")))}>
        {tooltipIcon}
      </button>
    </Tooltip>
  );
}
