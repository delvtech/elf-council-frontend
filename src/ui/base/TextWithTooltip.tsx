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
    <Link href={textHref}>
      {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{textSpan}</a>
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
