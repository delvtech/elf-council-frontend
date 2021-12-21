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
    <Link href={tooltipHref} passHref>
      <InformationCircleIcon className={tw(height("h-4"))} />
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
