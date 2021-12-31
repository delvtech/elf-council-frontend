import React, { ReactElement, useState, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";
import { DuplicateIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { copyToClipboard } from "src/base/copyToClipboard";
import { t } from "ttag";

interface HashStringProps {
  className?: string;
  value?: string;
  label?: string;
  showCopyButton?: boolean;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "style">;
}

const COPY_CLICK_TIMEOUT = 1250;
export default function HashString({
  className,
  label,
  showCopyButton,
  inputProps,
}: HashStringProps): ReactElement {
  const {
    value = "",
    className: inputClassNameFromProps,
    placeholder = "0x0",
    ...restOfInputProps
  } = inputProps || {};
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, COPY_CLICK_TIMEOUT);
    if (value) {
      copyToClipboard(value as string);
    }
  };

  const inputClassName = classNames(
    "placeholder:text-blueGrey px-4 h-12 bg-hackerSky border-blueGrey border box-border rounded-full text-principalRoyalBlue font-medium font-mono tracking-widest w-full sm:w-auto max-w-full",
    inputClassNameFromProps,
  );

  return (
    <div className={classNames("text-left", className)}>
      {label && (
        <p className="mb-2 text-lg font-semibold text-white">{label}</p>
      )}
      <div className="flex gap-3 sm:gap-4">
        <div
          className={classNames(
            "grid items-center relative overflow-hidden",
            inputClassName,
          )}
          style={{
            // important to ensure children fit from edge to edge
            padding: 0,
            border: "none",
            // any property that the "Copied" overlay shouldn't pickup from the
            // inputClassName should be set to inherit here.
            fontFamily: "inherit",
            fontWeight: "inherit",
            letterSpacing: "inherit",
          }}
        >
          <input
            type="text"
            className={inputClassName}
            placeholder={placeholder}
            style={{
              // important to ensure the input and span takeup the same space
              gridArea: "1/1",
              // important to remove margin here as it will be added to the
              // parent div
              margin: 0,
            }}
            value={value}
            {...restOfInputProps}
          />
          {/* the input element's size attribute doesn't respect letter-spacing
          in every browser, so this hidden span helps grow the container width.
          Then since both it and the input at set to gridArea: 1/1, the input
          will grow to the same size as this span. */}
          <span
            className={classNames(inputClassName, "invisible hidden sm:block")}
            aria-hidden="true"
            style={{
              // important to ensure the input and span takeup the same space
              gridArea: "1/1",
              // important to remove margin here as it will be added to the
              // parent div
              margin: 0,
            }}
          >
            {value || placeholder}
          </span>

          <span
            className={classNames(
              "bg-topaz text-white absolute inset-0 rounded-full flex items-center justify-center pointer-events-none transition-opacity gap-1 opacity-0 m-px",
              copied && "opacity-100",
            )}
          >
            {t`Copied`}
            <CheckCircleIcon className="h-5" />
          </span>
        </div>
        {showCopyButton && (
          <Button
            round
            variant={ButtonVariant.WHITE}
            className="flex gap-2 text-principalRoyalBlue"
            disabled={!value}
            onClick={handleCopyClick}
          >
            <DuplicateIcon className="h-5" />
            <span className="hidden sm:inline">{t`Copy`}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
