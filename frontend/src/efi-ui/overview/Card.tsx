import React, { ReactElement, ReactNode } from "react";

import tw from "src/elf-tailwindcss-classnames";

interface CardProps {
  title: string;
  balance: number;
  icon: ReactNode;
}
export function Card(props: CardProps): ReactElement {
  const { balance, icon, title } = props;
  const increasedBalance = balance * 9.5;

  return (
    <div
      className={tw(
        "transform-gpu",
        "hover:scale-110",
        "cursor-pointer",
        "transition",
        "delay-100",
        "w-3/12",
        "p-2",
        "py-4",
        "shadow-xl",
        "border",
        "rounded-xl",
        "bg-gradient-to-r",
        "from-blue-400",
        "to-blue-300"
      )}
    >
      <div className={tw("flex", "justify-end")}>
        <div
          className={tw(
            "w-10",
            "h-10",
            "flex",
            "items-center",
            "justify-center",
            "bg-gray-300",
            "rounded-xl",
            "m-1",
            "bg-opacity-30"
          )}
        >
          {icon}
        </div>
      </div>
      <p className={tw("text-gray-200", "text-xs")}>{title}</p>
      <p className={tw("text-gray-50", "text-lg", "font-semibold")}>
        {balance}
      </p>
      <p className={tw("text-gray-300", "text-sm")}>${increasedBalance}</p>
    </div>
  );
}

export default Card;
