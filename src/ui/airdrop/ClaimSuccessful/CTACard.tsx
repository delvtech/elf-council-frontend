import React, { ReactElement, ReactNode } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";

interface CTACardProps {
  label: ReactNode;
  icon: ReactNode;
}
export function CTACard({ label, icon }: CTACardProps): ReactElement {
  return (
    <Card interactive variant={CardVariant.HACKER_SKY} className="w-full">
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="text-principalRoyalBlue text-lg font-bold mb-2">
            {label}
          </div>
          <div className="flex flex-col items-center">{icon}</div>
        </div>
      </div>
    </Card>
  );
}
