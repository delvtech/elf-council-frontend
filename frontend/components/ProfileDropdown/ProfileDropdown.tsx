import { Fragment } from "react";
import "tailwindcss/tailwind.css";

import { Menu, Transition } from "@headlessui/react";
import Img from "next/image";
import Link from "next/link";
import classNames from "classnames";

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export default function ProfileDropdown() {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="sr-only">Open user menu</span>
          <Img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width="24px"
            height="24px"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link href={item.href}>
                  <a
                    className={classNames(
                      active ? "bg-blue-50" : "",
                      "block px-4 py-2 text-sm text-blue-700"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
