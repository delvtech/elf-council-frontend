import React, { ReactElement, useCallback } from "react";

import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { t } from "ttag";

import PopoverButton from "src/ui/base/Button/PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";

interface JoinGSCButtonProps {
  variant?: ButtonVariant;
}

export function JoinGSCButton(props: JoinGSCButtonProps): ReactElement {
  const { variant = ButtonVariant.PRIMARY } = props;

  const handleJoin = useCallback(() => {}, []);
  const handleLeave = useCallback(() => {}, []);

  return (
    <PopoverButton
      variant={variant}
      disabled={false}
      className="p-0"
      popover={
        <Card variant={CardVariant.HACKER_SKY}>
          <div className="-mx-4 -my-5 flex flex-col py-2 text-white">
            <DropdownItem label={t`Join`} onSelectItem={handleJoin} />
            <DropdownItem label={t`leave`} onSelectItem={handleLeave} />
          </div>
        </Card>
      }
    >
      {(open: boolean) => (
        <div className="flex w-[90px] items-center justify-center">
          <span>{t`Choose`}</span>

          <ChevronDownIcon
            className={classNames(
              open ? classNames("rotate-180 transform") : "",
              "ml-2 h-5 w-5 transition duration-150 ease-in-out",
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </PopoverButton>
  );
}
interface DropdownItemProps {
  label: string;
  onSelectItem: (choice: string) => void;
}
function DropdownItem(props: DropdownItemProps) {
  const { label, onSelectItem } = props;

  const handleSelectItem = useCallback(() => {
    onSelectItem(label);
  }, [label, onSelectItem]);

  return (
    <button
      className="flex w-[125px] items-center justify-between rounded px-3 py-2 hover:bg-principalRoyalBlue hover:bg-opacity-20"
      onClick={handleSelectItem}
    >
      <span className="mr-2 text-principalRoyalBlue">{label}</span>
    </button>
  );
}
