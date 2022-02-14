import React, { Fragment, ReactElement, useCallback, useState } from "react";
import { MenuAlt4Icon } from "@heroicons/react/solid";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import classNames from "classnames";
import { t } from "ttag";
import Image from "next/image";
import { ElementLogo } from "src/ui/base/ElementLogo/ElementLogo";
import { RESOURCES_URL } from "src/ui/resources";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";

interface SidebarProps {
  account: string | null | undefined;
}

export default function Sidebar(props: SidebarProps): ReactElement {
  const { account } = props;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <Fragment>
      <button
        className="fixed top-0 left-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow md:hidden"
        onClick={onOpen}
      >
        <MenuAlt4Icon className="h-6 w-6" />
      </button>
      <div
        className={classNames(
          { "-translate-x-full": !isOpen },
          "fixed top-0 left-0 z-10 flex h-full w-full transform-gpu flex-col items-center bg-white py-14 transition-all duration-300 ease-in-out md:w-60 md:translate-x-0",
        )}
      >
        <div className="mt-1 flex justify-around py-3">
          <div className="relative h-24 w-24">
            <Image
              layout="fill"
              src="/assets/ElementLogoSidebar.svg"
              alt={t`Element Council logo`}
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md p-0 hover:shadow md:hidden"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-8 w-full space-y-6">
          <SidebarLink link="/" label={t`Overview`} router={router} />
          <SidebarLink link="/proposals" label={t`Proposals`} router={router} />
          <SidebarLink link="/delegate" label={t`Delegate`} router={router} />
          <SidebarLinkExternal
            link="https://forum.element.fi"
            label={t`Forum`}
          />
          <SidebarLinkExternal link={RESOURCES_URL} label={t`Resources`} />

          {!!Number(unclaimedAirdrop) && <AirdropLink link="/airdrop" />}
        </div>
        <div className="mt-auto flex flex-col items-center text-principalRoyalBlue">
          <span className="text-sm">{t`Powered by`}</span>
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

interface AirdropLinkProps {
  link: string;
}
function AirdropLink(props: AirdropLinkProps): ReactElement {
  const { link } = props;

  return (
    <div className="text-center">
      {/* Don't use the next router for this, since the user might already be on
      the airdrop page when they click this. This way, users can always go back
      to the beginning of the airdrop by clicking the sidebar link */}
      <AnchorButton href={link} variant={ButtonVariant.GRADIENT}>
        {t`Claim ELFI`}
      </AnchorButton>
    </div>
  );
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
              "flex cursor-pointer justify-center p-3 text-brandDarkBlue-dark hover:bg-blue-50",
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
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center hover:bg-blue-50"
    >
      {/* Empty span w/ same width as icon to center the label text */}
      <span className="w-4" />
      <div className="flex cursor-pointer justify-center p-3 text-brandDarkBlue-dark">
        <p>{label}</p>
      </div>
      <ExternalLinkIcon className="h-4 w-4 text-principalRoyalBlue" />
    </a>
  );
}
