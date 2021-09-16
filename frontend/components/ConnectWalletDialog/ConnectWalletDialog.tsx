import ExampleDialog from "components/ExampleDialog/ExampleDialog";
import React, { ReactElement } from "react";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
}: ConnectWalletDialogProps): ReactElement {
  return <ExampleDialog isOpen={isOpen} onClose={onClose} />;
}
