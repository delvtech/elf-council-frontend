import React, { ReactElement } from "react";

import Card from "components/Card";
import Middle from "components/Middle";
import RightBar from "components/RightBar";

export function Container(): ReactElement {
  return (
    <div className=" bg-gradient-to-r from-gray-100 to-gray-50 h-full ">
      <div className="  px-8 py-1 ">
        <p>
          <p className="text-blue-400 font-bold text-2xl transform -translate-y-2">
            Governance Overview
          </p>
        </p>
      </div>
      <div className="flex   p-4 space-x-3">
        <Card title="VOTES DELEGATED" balance={6000} icon={0} />
        <Card title="TOTAL GOVERNANCE REWARDS" balance={400.079} icon={1} />
        <Card title="PROPOSALS" balance={100} icon={2} />
        <Card title="GOVERNANCE TOKENS CIRCULATING" balance={790} icon={3} />
      </div>
      <div className="flex  ml-3 mt-6 space-x-6  mr-4">
        <Middle />
        <RightBar />
      </div>
    </div>
  );
}

export default Container;
