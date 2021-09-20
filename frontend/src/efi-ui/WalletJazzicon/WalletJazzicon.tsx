import React, { ReactElement, useEffect, useRef } from "react";

import jazzicon from "@metamask/jazzicon";
import { getMetamaskJazziconSeed } from "elf/getMetamaskJazziconSeed";

interface WalletJazziconProps {
  account: string | null | undefined;
  size?: number;

  className?: string;
}

const JAZZICON_DIAMETER_PIXELS = 48;
export function WalletJazzicon({
  account,
  size,
  className,
}: WalletJazziconProps): ReactElement {
  const jazziconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!account) {
      return;
    }

    const seed = getMetamaskJazziconSeed(account);
    const jazziconElement = jazzicon(size || JAZZICON_DIAMETER_PIXELS, seed);

    const jazziconRefElement = jazziconRef.current;
    if (jazziconRefElement) {
      jazziconRefElement.appendChild(jazziconElement);
    }

    return () => {
      // always remove the previuos render's injected elements
      if (jazziconRefElement?.children) {
        Array.from(jazziconRefElement?.children).forEach((child) => {
          child.remove();
        });
      }
    };
  }, [account, size]);

  return <div ref={jazziconRef} className={className} />;
}
