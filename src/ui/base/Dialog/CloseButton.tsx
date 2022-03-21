import { XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { ReactElement } from "react";

interface CloseButtonProps {
  onClose: () => void;
  className?: string;
}

function CloseButton({
  onClose,
  className = "",
}: CloseButtonProps): ReactElement {
  return (
    <button
      onClick={onClose}
      className={classNames(
        className,
        "z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow",
      )}
    >
      <XIcon className="h-6 w-6 text-white" />
    </button>
  );
}

export default CloseButton;
