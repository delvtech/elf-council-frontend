import { Provider } from "@ethersproject/providers";
import { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";

interface GSCMemberProps {
  account: string;
  provider: Provider;
}
export function GSCMember(props: GSCMemberProps): ReactElement {
  const { account, provider } = props;

  const formattedAddress = useFormattedWalletAddress(account, provider);
  return (
    <Button variant={ButtonVariant.OUTLINE_WHITE}>
      <div className="flex w-full items-center overflow-hidden">
        <WalletJazzicon size={28} account={account} className="mr-4" />
        <div className="max-w-0 flex-shrink text-sm font-thin">
          {formattedAddress}
        </div>
      </div>
    </Button>
  );
}
