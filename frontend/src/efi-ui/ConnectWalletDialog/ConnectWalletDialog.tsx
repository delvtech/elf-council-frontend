import React, { ReactElement } from "react";

import SimpleDialog from "elf/efi-ui/Dialog/Dialog";
import { ConnectWalletButtons } from "elf/efi-ui/ConnectWalletButtons/ConnectWalletButtons";

interface ConnectWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ConnectWalletDialog({
  isOpen,
  onClose,
}: ConnectWalletDialogProps): ReactElement {
  return (
    <SimpleDialog isOpen={isOpen} onClose={onClose}>
      <ConnectWalletButtons onClick={onClose} />
    </SimpleDialog>
  );
}
