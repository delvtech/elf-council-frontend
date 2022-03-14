import { PropsWithChildren, ReactElement } from "react";
import ElementUrls from "src/elf/urls";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { t } from "ttag";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import CouncilLogo from "src/ui/base/svg/CouncilLogo/CouncilLogo";
import Button from "src/ui/base/Button/Button";
import SparkleIcon from "src/ui/base/svg/SparkleIcon";
import Image from "next/image";
import Header from "./Header";
import SideBar from "./SideBar";

export default function LandingPage(): ReactElement {
  return (
    // outer element is set to overflow: hidden to hide the overflowing
    // background glows
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden bg-principalRoyalBlue text-white">
      <BackgroundGlows />
      <BackgroundCircles />

      {/* scroll container */}
      <div className="absolute top-0 right-0 bottom-[72px] z-20 overflow-y-auto lg:bottom-0 lg:left-[120px]">
        {/* wax width and padding container */}
        <div className="mx-auto max-w-7xl px-[4vw] pb-20 lg:px-24 xl:px-16 xl:pb-5">
          <Header />

          <main className="mt-4 flex flex-col gap-16 xl:mt-0 xl:flex-row xl:gap-24">
            {/* main left column */}
            <div className="flex-1 basis-[60%]">
              <div className="mb-10 mt-4 flex flex-col items-center text-center sm:mb-4 sm:flex-row-reverse sm:text-left lg:items-start">
                <SparkleIcon className="ml-8 mr-5 fill-hackerSky lg:flex-1 xl:mr-0" />
                <h1 className="flex-1 text-5xl font-semibold leading-tight text-hackerSky sm:text-7xl">{t`Presenting Council`}</h1>
              </div>
              <p className="mb-8 text-2xl leading-10">{t`Welcome to Element's v0 Governance System. Explore below to learn more about our DAO launch.`}</p>

              <Disclosure>
                {({ open }) => (
                  <div className="inline-flex w-full flex-col xl:w-auto">
                    <Disclosure.Button
                      as={Button}
                      variant={ButtonVariant.SECONDARY}
                      className="mb-4 hidden h-16 justify-between px-7 xl:flex"
                    >
                      <span className="bg-gradient-to-b from-principalBlue to-principalRoyalBlue bg-clip-text text-2xl text-transparent">
                        {t`Explore Claiming Rewards`}
                      </span>
                      <ChevronRightIcon
                        className={classNames(
                          open && "rotate-90 transform",
                          "ml-3 h-8 w-8 fill-principalRoyalBlue transition duration-150 ease-in-out",
                        )}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      static
                      as="ul"
                      className={classNames(
                        "flex flex-col gap-4",
                        !open && "xl:hidden",
                      )}
                    >
                      <ClaimLink href="/airdrop">
                        {t`Claim ELFI Governance Power`}
                      </ClaimLink>
                      <ClaimLink href={ElementUrls.NFT_APP} external>
                        {t`Claim ELFIverse NFT`}
                      </ClaimLink>
                      <ClaimLink href="/zk/discord">
                        {t`Claim for Discord Users`}
                      </ClaimLink>
                      <ClaimLink href="/zk/github">
                        {t`Claim for GitHub Users`}
                      </ClaimLink>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
            {/* main right column */}
            <div className="flex-1 basis-[45%]">
              <Disclosure>
                {({ open }) => (
                  <>
                    {/* relative container for background box */}
                    <div className="relative">
                      {/* header for small screens */}
                      <div className="mb-10 flex w-full items-center justify-between gap-5 xl:hidden">
                        <h2 className="text-left text-3xl font-semibold leading-10">{t`Explore Governance Resources`}</h2>
                        <CouncilLogo className="mr-5 h-auto w-16" />
                      </div>

                      {/* large button for large screens */}
                      <Disclosure.Button className="mb-5 hidden w-full flex-col items-center rounded-2xl bg-white p-9 pt-11 xl:flex">
                        <h2 className="mb-24 bg-gradient-to-b from-principalBlue to-principalRoyalBlue bg-clip-text text-left text-3xl font-semibold leading-10 text-transparent">{t`Explore Governance Resources`}</h2>
                        <CouncilLogo className="mb-16 h-auto w-56" />
                        <ChevronRightIcon
                          className={classNames(
                            open && "rotate-90 transform",
                            "ml-auto -mr-2 -mb-2 h-8 w-8 fill-principalRoyalBlue transition duration-150 ease-in-out",
                          )}
                        />
                      </Disclosure.Button>

                      {/* background box */}
                      <div className="absolute -left-20 -bottom-20 -z-10 hidden h-56 w-80 border-y-2 border-l-2 border-white/20 bg-gradient-to-r from-white/10 to-transparent bg-no-repeat xl:block" />
                    </div>
                    <Disclosure.Panel
                      as="ul"
                      className={classNames(
                        "flex flex-col items-stretch gap-5 xl:flex-row",
                        !open && "xl:hidden",
                      )}
                      static
                    >
                      <ArticleLink
                        href={`${ElementUrls.MEDIUM}/the-governance-steering-council-63aea7732262`}
                      >
                        {t`Read about our GSC Campaign`}
                      </ArticleLink>
                      <ArticleLink href={ElementUrls.MEDIUM}>
                        {t`Read about our Proposal Framework`}
                      </ArticleLink>
                      <ArticleLink
                        href={`${ElementUrls.MEDIUM}/voting-vaults-a-new-defi-and-governance-primitive-b4b2f6289d48`}
                      >
                        {t`Read about Voting Vaults and Delegation`}
                      </ArticleLink>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </main>
        </div>
      </div>

      <SideBar />
    </div>
  );
}

function BackgroundGlows() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 left-1/3 z-10 -translate-x-1/2">
        <Image
          src="/assets/landing-page/top-glow.png"
          width={1240}
          height={600}
          alt=""
          className="pointer-events-none"
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 right-1/3 z-10 translate-x-1/2">
        <Image
          src="/assets/landing-page/bottom-right-glow.png"
          width={710}
          height={760}
          alt=""
          className="pointer-events-none"
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 z-10 -translate-x-3/4 opacity-75 lg:opacity-100">
        <Image
          src="/assets/landing-page/bottom-left-glow.png"
          width={990}
          height={1080}
          alt=""
          className="pointer-events-none"
        />
      </div>
    </>
  );
}

function BackgroundCircles() {
  return (
    <>
      <div className="pointer-events-none absolute top-[-298px] right-1/4 h-[1022px] w-[1022px] translate-x-1/2 rounded-full border border-white opacity-[.16]" />
      <div className="pointer-events-none absolute top-1/2 right-1/3 h-[1022px] w-[1022px] translate-x-1/2 rounded-full border border-white opacity-[.16]" />
    </>
  );
}

function ClaimLink({
  href,
  external,
  children,
}: PropsWithChildren<{
  href: string;
  external?: boolean;
}>) {
  const Component = external ? AnchorButton : LinkButton;
  return (
    <li>
      <Component
        link={href}
        className="flex h-16 w-full justify-between px-7"
        variant={ButtonVariant.SECONDARY}
      >
        <span className="bg-gradient-to-b from-principalBlue to-principalRoyalBlue bg-clip-text text-2xl text-transparent">
          {children}
        </span>
        <div className="ml-3 flex h-8 w-8 items-center justify-center">
          <ArrowRightIcon className="h-5 w-5 fill-principalRoyalBlue" />
        </div>
      </Component>
    </li>
  );
}

function ArticleLink({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <li className="flex-1">
      <a
        href={href}
        className="flex h-16 items-center justify-between rounded-2xl border-2 border-white/50 bg-white/20 px-4 font-semibold backdrop-blur-sm xl:h-full xl:flex-col xl:items-start xl:rounded-[0_0_40px_0] xl:bg-white/10 xl:pt-3 xl:pb-6 xl:text-xs"
        style={{
          textShadow: "1px 1px 4px rgba(0,60,120,.5)",
        }}
      >
        {children}
        <ArrowRightIcon className="h-4 w-4 xl:mt-2" />
      </a>
    </li>
  );
}
