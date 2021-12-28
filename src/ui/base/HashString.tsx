import React, { ReactElement, useState, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";
import { DuplicateIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { copyToClipboard } from "src/base/copyToClipboard";
import { t } from "ttag";

interface HashStringProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  value?: string;
  label?: string;
  showCopyButton?: boolean;
}

export default function HashString({
  label,
  showCopyButton,
  ...inputProps
}: HashStringProps): ReactElement {
  const { value, className, placeholder = "0x0", ...rest } = inputProps;
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1250);
    if (value) copyToClipboard(value);
  };

  const inputClassName = classNames(
    "placeholder:text-blueGrey px-4 h-12 bg-hackerSky border-blueGrey border box-border rounded-full text-principalRoyalBlue font-medium font-mono tracking-widest w-full sm:w-auto max-w-full",
    className,
  );

  return (
    <div className="text-left">
      {label && (
        <p className="text-white text-lg font-semibold mb-2">{label}</p>
      )}
      <div className="flex gap-3 sm:gap-4">
        <div
          className={classNames("grid items-center relative", inputClassName)}
          style={{
            padding: 0,
            border: "none",
            fontFamily: "inherit",
            fontWeight: "inherit",
            letterSpacing: "inherit",
          }}
        >
          <input
            type="text"
            className={inputClassName}
            placeholder={placeholder}
            style={{ gridArea: "1/1" }}
            value={value}
            {...rest}
          />
          {/**
           * the input element's size attribute doesn't respect letter-spacing
           * in every browser, so this hidden span helps grow the container
           * width. Then since both it and the input at set to gridArea: 1/1,
           * the input will grow to the same size as this span. */}
          <span
            className={classNames(inputClassName, "invisible", "hidden", 'sm:block')}
            aria-hidden="true"
            style={{ gridArea: "1/1" }}
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
