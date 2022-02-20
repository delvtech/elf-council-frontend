import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { t } from "ttag";

export const InlineElfiLabel = (
  <span className="whitespace-nowrap" key="elfi-label-in-body-text">
    <ElementIcon
      className="mb-0.5 -mt-0.5 w-6 bg-paleLily"
      inline
      size={IconSize.MEDIUM}
    />
    {t`ELFI`}
  </span>
);
