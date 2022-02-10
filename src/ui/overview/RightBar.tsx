import React, { ReactElement } from "react";
import { t } from "ttag";

function RightBar(): ReactElement {
  return (
    <div className="w-4/12  rounded-xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 p-3">
        <p className="font-semibold  ">{t`Delegation`}</p>
      </div>
      <div className="flex flex-col items-center p-3">
        <p className="text-lg font-semibold text-gray-800"> 23 h 56 m 14s</p>
        <p className="text-sm text-gray-600">
          {t`until voting closes for EFIP: Education Fund`}
        </p>
      </div>

      <div className="flex  items-center justify-center p-4">
        <div
          className="flex h-48 w-48     items-center justify-center   rounded-full"
          style={{ borderWidth: "16px" }}
        >
          <div className="flex h-44 w-44  items-center justify-center rounded-full border-gray-200 ">
            <div className=" flex h-32 w-32 flex-col items-center justify-center rounded-full shadow-2xl  ">
              <p className="font-semibold text-gray-800">50% to Quorum</p>
              <p className="text-sm font-semibold text-blue-400"> Vote Now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-3">
        <p className="text-center text-sm text-gray-600">
          {" "}
          Idle voting period begins once one voting period is missed.
        </p>
      </div>
    </div>
  );
}

export default RightBar;
