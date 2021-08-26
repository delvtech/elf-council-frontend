import type { NextPage } from "next";
import { useState } from "react";
import "tailwindcss/tailwind.css";

import { BellIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import ProfileDropdown from "components/ProfileDropdown/ProfileDropdown";
import Sidebar from "components/Sidebar/Sidebar";

const Proposals: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /* changes the background colour of main overview (not sidebar) */
    <div className="h-screen flex overflow-hidden bg-blue-50">
      <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray shadow">
          <button
            type="button"
            className="px-4 border-r border-blue-50 text-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex"></div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-blue-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <ProfileDropdown />
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* This changes sidebar text colour*/}
              <h1 className="text-2xl font-semibold text-blue-400">
                Proposals
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* If we want to put borders we put them here */}
              <div className="py-4"></div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proposals;
