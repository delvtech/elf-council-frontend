import { formatEther } from "@ethersproject/units";
import React, { ReactElement } from "react";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { useElementTokenBalanceOf } from "src/ui/contracts/useElementTokenBalance";

interface TokenRewardsButtonProps {
  account: string | null | undefined;
}

export function TokenRewardsButton({
  account,
}: TokenRewardsButtonProps): ReactElement {
  const { data: balanceOf } = useElementTokenBalanceOf(account);
  const formatted = balanceOf ? formatEther(balanceOf) : "-";

  return (
    <LinkButton round variant={ButtonVariant.GRADIENT} link="/rewards">
      {`${formatted} ELF`}
    </LinkButton>
  );
}
