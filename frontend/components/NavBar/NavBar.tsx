import "tailwindcss/tailwind.css";

import { BellIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import ProfileDropdown from "components/ProfileDropdown/ProfileDropdown";

interface NavBarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function NavBar(props: NavBarProps) {
  const { setSidebarOpen } = props;

  return (
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
  );
}
