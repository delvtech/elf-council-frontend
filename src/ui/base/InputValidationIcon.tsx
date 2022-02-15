import React, { ReactElement } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

interface InputValidationIconProps {
  isValid: boolean;
  invalidToolipContent: string;
}

export function InputValidationIcon({
  isValid,
  invalidToolipContent,
}: InputValidationIconProps): ReactElement {
  if (isValid) {
    return <CheckCircleIcon className="h-8 w-8 text-statusGreen" />;
  }

  return (
    <Tooltip
      isOpen
      content={<span className="text-deepRed">{invalidToolipContent}</span>}
    >
      <XCircleIcon className="h-8 w-8 text-deepRed" />
    </Tooltip>
  );
}
