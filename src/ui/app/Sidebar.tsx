import React, { Fragment, ReactElement, useCallback, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import tw, {
  position,
  height,
  width,
  inset,
  cursor,
  padding,
  display,
  borderRadius,
  boxShadow,
  flexDirection,
  alignItems,
  transitionTimingFunction,
  transitionProperty,
  transitionDuration,
  zIndex,
  backgroundColor,
  hardwareAcceleration,
  translate,
  margin,
  justifyContent,
  space,
  textColor,
  fontSize,
} from "src/elf-tailwindcss-classnames";
import classNames from "classnames";
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
          position("fixed"),
          height("h-12"),
          width("w-12"),
          inset("top-0", "left-0"),
          cursor("cursor-pointer"),
          padding("p-0"),
          display("md:hidden"),
          borderRadius("rounded-md"),
          boxShadow("hover:shadow"),
        )}
        onClick={onOpen}
      >
        <MenuIcon className={tw(height("h-16"), width("w-16"))} />
      </button>
      <div
        className={classNames(
          { "-translate-x-full": !isOpen },
          tw(
            display("flex"),
            flexDirection("flex-col"),
            alignItems("items-center"),
            width("w-full", "md:w-60"),
            height("h-full"),
            padding("py-14"),
            transitionTimingFunction("ease-in-out"),
            transitionProperty("transition-all"),
            transitionDuration("duration-300"),
            zIndex("z-30"),
            position("fixed"),
            inset("top-0", "left-0"),
            backgroundColor("bg-white"),
            hardwareAcceleration("transform-gpu"),
            translate("md:translate-x-0"),
            translate({ "translate-x-0": isOpen }),
          ),
        )}
      >
        <div
          className={tw(
            padding("py-3"),
            margin("mt-1"),
            display("flex"),
            justifyContent("justify-around"),
          )}
        >
          <div
            className={tw(position("relative"), height("h-24"), width("w-24"))}
          >
            <Image
              layout="fill"
              src="/assets/CouncilLogo.svg"
              alt={t`Element Council logo`}
            />
          </div>
          <button
            onClick={onClose}
            className={tw(
              position("absolute"),
              height("h-12"),
              width("w-12"),
              inset("top-0", "right-0"),
              cursor("cursor-pointer"),
              padding("p-0"),
              display("md:hidden"),
              borderRadius("rounded-md"),
              boxShadow("hover:shadow"),
            )}
          >
            <CloseIcon className={tw(height("h-16"), width("w-16"))} />
          </button>
        </div>
        <div
          className={tw(width("w-full"), space("space-y-6"), margin("mt-8"))}
        >
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
            display("flex"),
            flexDirection("flex-col"),
            alignItems("items-center"),
            margin("mt-auto"),
            textColor("text-principalRoyalBlue"),
          )}
        >
          <span className={fontSize("text-sm")}>Powered by</span>
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
      <Link href={link}>
        {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
        /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <div
            className={classNames(
              "flex justify-center p-3 hover:bg-blue-50 cursor-pointer text-brandDarkBlue-dark",
              { "font-bold": isActive },
            )}
          >
            <p>{label}</p>
          </div>
        </a>
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
            display("flex"),
            justifyContent("justify-center"),
            padding("p-3"),
            backgroundColor("hover:bg-blue-50"),
            cursor("cursor-pointer"),
            textColor("text-brandDarkBlue-dark"),
          )}
        >
          <p>{label}</p>
        </div>
      </a>
    </div>
  );
}
