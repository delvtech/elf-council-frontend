import React, { ReactElement } from "react";

function RightBar(): ReactElement {
  return (
    <div className="bg-white  w-4/12 rounded-xl border border-gray-100">
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold  ">Delegation </p>
      </div>
      <div className="flex flex-col items-center p-3">
        <p className="font-semibold text-lg text-gray-800"> 23 h 56 m 14s</p>
        <p className="text-gray-600 text-sm">
          until voting closes for EFIP: Education Fund
        </p>
      </div>

      <div className="p-4  flex items-center justify-center">
        <div
          className="flex justify-center items-center     h-48 w-48   rounded-full"
          style={{ borderWidth: "16px" }}
        >
          <div className="flex justify-center items-center  border-gray-200 h-44 w-44 rounded-full ">
            <div className=" flex flex-col justify-center items-center shadow-2xl h-32 w-32 rounded-full  ">
              <p className="text-gray-800 font-semibold">50% to Quorum</p>
              <p className="text-blue-400 font-semibold text-sm"> Vote Now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center p-3">
        <p className="text-gray-600 text-sm text-center">
          {" "}
          Idle voting period begins once one voting period is missed.
        </p>
      </div>
    </div>
  );
}

export default RightBar;
