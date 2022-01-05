import React, { ReactElement, ReactNode } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { DiscordIconFromFigma } from "src/ui/base/DiscordIconFromFigma";

interface CTACardProps {
  label: ReactNode;
  icon: ReactNode;
}
export function CTACard({ label, icon }: CTACardProps): ReactElement {
  return (
    <Card variant={CardVariant.HACKER_SKY} className="">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="text-principalRoyalBlue text-lg font-bold">
            {label}
          </div>
          <div className="flex flex-col items-center">{icon}</div>
        </div>
      </div>
    </Card>
  );
}
