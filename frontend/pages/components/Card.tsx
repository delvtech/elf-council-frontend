import React from "react";

import DescriptionIcon from "@material-ui/icons/Description";
import GavelIcon from "@material-ui/icons/Gavel";
import GradeIcon from "@material-ui/icons/Grade";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const Style = "text-white text-xs";

const arrayIcon = [
  <GavelIcon fontSize="small" className={Style} />,
  <GradeIcon fontSize="small" className={Style} />,
  <DescriptionIcon fontSize="small" className={Style} />,
  <MonetizationOnIcon fontSize="small" className={Style} />,
];

const Color = [
  "from-blue-400 to-blue-300",
  "from-blue-400 to-blue-300",
  "from-blue-400 to-blue-300",
  "from-blue-400 to-blue-300",
];

interface CardProps {
  title: string;
  balance: number;
  icon: number;
}
export function Card(props: CardProps) {
  var balance = props.balance;
  balance = balance * 9.5;

  return (
    <div
      className={`transform hover:scale-110 cursor-pointer transition delay-100 w-3/12  p-2 py-4 shadow-xl  border rounded-xl bg-gradient-to-r ${
        Color[props.icon]
      }`}
    >
      <div className="flex justify-between">
        <div></div>
        <div className=" w-10  h-10 flex items-center justify-center  bg-gray-300 rounded-xl m-1  bg-opacity-30">
          {arrayIcon[props.icon]}
        </div>
      </div>
      <p className="text-gray-200 text-xs  ">{props.title}</p>
      <p className="text-gray-50 text-lg  font-semibold  ">{props.balance}</p>
      <p className="text-gray-300  text-sm ">${balance}</p>
    </div>
  );
}

export default Card;
