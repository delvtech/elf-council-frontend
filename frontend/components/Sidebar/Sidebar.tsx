import { HomeIcon, UserAddIcon, UserGroupIcon } from "@heroicons/react/outline";
import {
  ChatAltIcon,
  DocumentTextIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";

const navigation = [
  { name: "Overview", href: "#", icon: HomeIcon, current: true },
  { name: "Proposals", href: "/proposals", icon: PencilIcon, current: false },
  { name: "Leaderboard", href: "#", icon: UserGroupIcon, current: false },
  { name: "Delegate", href: "#", icon: UserAddIcon, current: false },
  { name: "Forum", href: "#", icon: ChatAltIcon, current: false },
  { name: "Resources", href: "#", icon: DocumentTextIcon, current: false },
];

export default function Sidebar() {
  return (
    <div className="hidden bg-blue-50 md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-4 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-3"></div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-darkblue-800 text-blue"
                      : "text-lightblue-100 hover:bg-blue-600",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-blue-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
