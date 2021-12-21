import React, { ReactElement, useCallback, useState } from "react";

import { Tooltip } from "@material-ui/core";
import Link from "next/link";
import tw from "tailwindcss-classnames";
import classNames from "classnames";

interface TextWithTooltipProps {
  className?: string;
  textHref?: string;
  tooltipText?: string;
  text: string;
}
export function TextWithTooltip(props: TextWithTooltipProps): ReactElement {
  const { className, textHref, tooltipText, text } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  const onOpenTooltip = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const onCloseTooltip = useCallback(() => {
    setShowTooltip(false);
  }, []);

  const textSpan = (
    <span className={classNames(className, tw("hover:underline"))}>{text}</span>
  );
  const textWithLink = textHref ? (
    <Link href={textHref} passHref>
      {textSpan}
    </Link>
  ) : (
    { textSpan }
  );

  return (
    <Tooltip
      arrow
      placement="top"
      open={showTooltip}
      onOpen={onOpenTooltip}
      onClose={onCloseTooltip}
      title={tooltipText || ""}
    >
      <button>{textWithLink}</button>
    </Tooltip>
  );
}
