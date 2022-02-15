import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H2 from "src/ui/base/H2/H2";
import ClaimAmountCard from "./ClaimAmountCard";
// import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";

interface EligibleCardProps {
  className?: string;
  onBackClick?: () => void;
  onNextClick?: () => void;
}

// PLACEHOLDER
const ELFI_TOKEN_AMOUNT = "10000.0";

export default function EligibleCard({
  className,
  onBackClick,
  onNextClick,
}: EligibleCardProps): ReactElement {
  // const { library } = useWeb3React();

  // const [addToWallet, setAddToWallet] = useState(false);
  // const handleAddToWalletChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAddToWallet(e.target.checked);
  // };

  // const handleClaimClick = async () => {
  //   if (addToWallet) {
  //     try {
  //       // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  //       const wasAdded = await library.provider.request({
  //         method: "wallet_watchAsset",
  //         params: {
  //           type: "ERC20", // Initially only supports ERC20, but eventually more!
  //           options: {
  //             address: TOKEN_ADDRESS, // The address that the token is at.
  //             symbol: TOKEN_SYMBOL, // A ticker symbol or shorthand, up to 5 chars.
  //             decimals: TOKEN_DECIMALS, // The number of decimals in the token
  //             image: TOKEN_IMAGE, // A string url of the token logo
  //           },
  //         },
  //       });
  //       if (wasAdded) {
  //         console.log("Thanks for your interest!");
  //       } else {
  //         console.log("Your loss!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <Card className={className} variant={CardVariant.BLUE}>
      <div className="flex flex-col gap-2 p-2 text-white sm:px-6 sm:py-4">
        <div className="mb-12 text-center text-white sm:items-center sm:px-10 sm:text-center md:px-32">
          <h1 className="mb-2 text-3xl font-semibold">{t`Congratulations!`}</h1>
          <H2 className="mb-10 text-2xl text-votingGreen">{t`You're eligible for this Airdrop`}</H2>
          <ClaimAmountCard amount={ELFI_TOKEN_AMOUNT} />
          {/* <label className="flex items-center gap-3 mb-6 text-blueGrey group">
            <input
              id="add-elfi-to-metamask"
              type="checkbox"
              className="box-content w-4 h-4 text-current transition-all bg-transparent bg-center border-2 border-current rounded group:hover:border-white hover:border-white checked:border-white checked:focus:border-white checked:hover:border-white checked:text-principalRoyalBlue peer"
              style={{ backgroundSize: "80%" }}
              checked={addToWallet}
              onChange={handleAddToWalletChange}
            />
            <span className="transition-all peer-checked:text-white">{t`Add $ELFI to my Metamask`}</span>
          </label> */}
        </div>
        <div className="flex justify-between">
          {onBackClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >
              {t`Back`}
            </Button>
          )}
          {onNextClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.GRADIENT}
              onClick={onNextClick}
            >
              {t`Next`}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
