import ExternalLinkIcon from "@material-ui/icons/ExitToApp";
import StarIcon from "@material-ui/icons/Star";
import Link from "next/link";
import React, { ReactElement } from "react";
import LinkButton from "src/efi-ui/base/Button/LinkButton";
import { ButtonVariant } from "src/efi-ui/base/Button/styles";
import { ElementLogo } from "src/efi-ui/base/ElementLogo";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export default function Sidebar(): ReactElement {
  return (
    <div className={tw("w-80", "h-screen")}>
      <div className={tw("border-b", "py-3", "mt-1", "flex", "justify-around")}>
        <ElementLogo />
      </div>
      <div className={tw("space-y-8", "mt-12")}>
        <SidebarLink link="/" label={t`Overview`} />
        <SidebarLink link="/proposals" label={t`Proposals`} />
        <SidebarLink link="/delegates" label={t`Delegate`} />
        <SidebarLinkExternal link="https://forum.element.fi" label={t`Forum`} />
        <SidebarLink link="/resources" label={t`Resources`} />

        <div className={tw("text-center", "pt-8")}>
          <LinkButton round variant={ButtonVariant.GRADIENT} link="/rewards">
            {t`Rewards`}
            <StarIcon className={tw("ml-2")} />
          </LinkButton>
        </div>
      </div>
    </div>
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
            "cursor-pointer"
          )}
        >
          <p className={tw("text-blue-800")}>{label}</p>{" "}
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
            "text-blue-800"
          )}
        >
          <p>{label}</p>
          <ExternalLinkIcon />
        </div>
      </a>
    </div>
  );
}
