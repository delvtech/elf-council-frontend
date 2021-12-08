import React, { Fragment, ReactElement, useCallback, useState } from "react";

import ExternalLinkIcon from "@material-ui/icons/ExitToApp";
import StarIcon from "@material-ui/icons/Star";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import tw from "src/elf-tailwindcss-classnames";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ElementLogo } from "src/ui/base/ElementLogo";
import { t } from "ttag";

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Fragment>
      <button
        className={tw(
          "fixed",
          "h-12",
          "w-12",
          "top-0",
          "left-0",
          "cursor-pointer",
          "p-0",
          "md:hidden",
          "rounded-md",
          "hover:shadow"
        )}
        onClick={onOpen}
      >
        <MenuIcon className={tw("h-16", "w-16")} />
      </button>
      <div
        className={tw(
          "w-full",
          "h-full",
          "ease-in-out",
          "transition-all",
          "duration-300",
          "z-30",
          "fixed",
          "top-0",
          "left-0",
          "md:w-60",
          "bg-white",
          "transform-gpu",
          "md:translate-x-0",
          { "translate-x-0": isOpen, "-translate-x-full": !isOpen }
        )}
      >
        <div
          className={tw("border-b", "py-3", "mt-1", "flex", "justify-around")}
        >
          <ElementLogo />
          <button
            onClick={onClose}
            className={tw(
              "absolute",
              "h-12",
              "w-12",
              "top-0",
              "right-0",
              "cursor-pointer",
              "p-0",
              "md:hidden",
              "rounded-md",
              "hover:shadow"
            )}
          >
            <CloseIcon className={tw("h-16", "w-16")} />
          </button>
        </div>
        <div className={tw("space-y-8", "mt-12")}>
          <SidebarLink link="/" label={t`Overview`} />
          <SidebarLink link="/proposals" label={t`Proposals`} />
          <SidebarLink link="/delegates" label={t`Delegate`} />
          <SidebarLinkExternal
            link="https://forum.element.fi"
            label={t`Forum`}
          />
          <SidebarLink link="/resources" label={t`Resources`} />
        </div>
      </div>
    </Fragment>
  );
}

interface SidebarLinkProps {
  link: string;
  label: string;
}

function SidebarLink(props: SidebarLinkProps): ReactElement {
  const { link, label } = props;
  return (
    <div>
      <Link href={link} passHref>
        <div
          className={tw(
            "flex",
            "p-3",
            "pl-16",
            "hover:bg-blue-50",
            "cursor-pointer",
            "text-brandDarkBlue-dark"
          )}
        >
          <p>{label}</p>
        </div>
      </Link>
    </div>
  );
}

function SidebarLinkExternal(props: SidebarLinkProps): ReactElement {
  const { link, label } = props;
  return (
    <div>
      <a href={link}>
        <div
          className={tw(
            "flex",
            "p-3",
            "pl-16",
            "hover:bg-blue-50",
            "cursor-pointer",
            "justify-between",
            "text-brandDarkBlue-dark"
          )}
        >
          <p>{label}</p>
          <ExternalLinkIcon />
        </div>
      </a>
    </div>
  );
}
