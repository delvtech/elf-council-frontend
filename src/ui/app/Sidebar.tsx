import React, { Fragment, ReactElement, useCallback, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";
import Image from "next/image";
import { ElementLogo } from "src/ui/base/ElementLogo";

export default function Sidebar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
          "flex",
          "flex-col",
          "items-center",
          "w-full",
          "h-full",
          "py-14",
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
        <div className={tw("py-3", "mt-1", "flex", "justify-around")}>
          <div className={tw("relative", "h-24", "w-24")}>
            <Image
              layout="fill"
              src="/assets/CouncilLogo.svg"
              alt={t`Element Council logo`}
            />
          </div>
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
        <div className={tw("w-full", "space-y-6", "mt-8")}>
          <SidebarLink link="/" label={t`Overview`} router={router} />
          <SidebarLink link="/proposals" label={t`Proposals`} router={router} />
          <SidebarLink link="/delegates" label={t`Delegate`} router={router} />
          <SidebarLinkExternal
            link="https://forum.element.fi"
            label={t`Forum`}
          />
          <SidebarLink link="/resources" label={t`Resources`} router={router} />
        </div>
        <div
          className={tw(
            "flex",
            "flex-col",
            "items-center",
            "mt-auto",
            "text-principalRoyalBlue"
          )}
        >
          <span className={tw("text-sm")}>Powered by</span>
          <ElementLogo height={"40"} />
        </div>
      </div>
    </Fragment>
  );
}

interface SidebarLinkProps {
  link: string;
  label: string;
  router: NextRouter;
}

interface SidebarLinkExternalProps {
  link: string;
  label: string;
}

function SidebarLink(props: SidebarLinkProps): ReactElement {
  const { link, label, router } = props;

  const isActive = router.pathname === link;

  return (
    <div>
      <Link href={link} passHref>
        <div
          className={tw(
            "flex",
            "justify-center",
            "p-3",
            "hover:bg-blue-50",
            "cursor-pointer",
            "text-brandDarkBlue-dark",
            {
              "font-bold": isActive,
            }
          )}
        >
          <p>{label}</p>
        </div>
      </Link>
    </div>
  );
}

function SidebarLinkExternal(props: SidebarLinkExternalProps): ReactElement {
  const { link, label } = props;
  return (
    <div>
      <a href={link}>
        <div
          className={tw(
            "flex",
            "justify-center",
            "p-3",
            "hover:bg-blue-50",
            "cursor-pointer",
            "text-brandDarkBlue-dark"
          )}
        >
          <p>{label}</p>
        </div>
      </a>
    </div>
  );
}
