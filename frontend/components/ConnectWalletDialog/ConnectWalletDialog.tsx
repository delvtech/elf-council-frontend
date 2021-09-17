import React, { ReactElement } from "react";

import Dialog from "components/Dialog/Dialog";
import { ConnectWalletButtons } from "components/ConnectWalletButtons/ConnectWalletButtons";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
}: ConnectWalletDialogProps): ReactElement {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <ConnectWalletButtons onClick={onClose} />
    </Dialog>
  );
}
