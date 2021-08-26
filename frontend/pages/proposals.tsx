import type { NextPage } from "next";
import { useState } from "react";
import "tailwindcss/tailwind.css";

import { BellIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import ProfileDropdown from "components/ProfileDropdown/ProfileDropdown";
import Sidebar from "components/Sidebar/Sidebar";
import NavBar from "components/NavBar/NavBar";

const Proposals: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /* changes the background colour of main overview (not sidebar) */
    <div className="h-screen flex overflow-hidden bg-blue-50">
      <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <NavBar setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* This changes sidebar text colour*/}
            <h1 className="text-2xl font-semibold text-blue-400">Proposals</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* If we want to put borders we put them here */}
            <div className="py-4"></div>
            {/* /End replace */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Proposals;
