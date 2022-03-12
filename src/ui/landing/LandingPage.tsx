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
    <div className="relative h-screen overflow-hidden">
      <div className="h-screen overflow-y-auto bg-principalRoyalBlue text-white">
        <BackgroundGlows />
        {/* Background Graphics */}
        <div className="absolute top-[-298px] right-1/4 h-[1022px] w-[1022px] translate-x-1/2 rounded-full border border-white opacity-[.16]" />
        <div className="absolute top-1/2 right-1/3 h-[1022px] w-[1022px] translate-x-1/2 rounded-full border border-white opacity-[.16]" />

        <div className="relative m-auto mb-5 max-w-7xl flex-1 px-24">
          <Header />

          <main className="flex gap-24">
            <div className="z-10 flex-1 basis-[60%]">
              <div className="mt-4 flex ">
                <h1 className="mb-4 flex-1 text-7xl font-semibold leading-tight text-hackerSky">{t`Presenting Council`}</h1>
                <SparkleIcon className="ml-8 flex-1 fill-hackerSky" />
              </div>
              <p className="mb-8 text-2xl leading-10">{t`Welcome to Element's v0 Governance System. Explore below to learn more about our DAO launch.`}</p>

              <Disclosure>
                {({ open }) => (
                  <div className="inline-flex flex-col">
                    <Disclosure.Button
                      as={Button}
                      variant={ButtonVariant.SECONDARY}
                      className="mb-4 flex h-16 justify-between px-7"
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
                    <Disclosure.Panel as="ul" className="flex flex-col gap-4">
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

            <div className="flex-1 basis-[45%]">
              <Disclosure>
                {({ open }) => (
                  <>
                    <div className="relative">
                      <Disclosure.Button className="relative z-10 mb-5 flex w-full flex-col items-center rounded-2xl bg-white p-9 pt-11">
                        <span className="mb-24 bg-gradient-to-b from-principalBlue to-principalRoyalBlue bg-clip-text text-left text-3xl font-semibold leading-10 text-transparent">{t`Explore Governance Resources`}</span>
                        <CouncilLogo className="mb-16 h-auto w-56" />
                        <ChevronRightIcon
                          className={classNames(
                            open && "rotate-90 transform",
                            "ml-auto -mr-2 -mb-2 h-8 w-8 fill-principalRoyalBlue transition duration-150 ease-in-out",
                          )}
                        />
                      </Disclosure.Button>
                      <div className="absolute -left-20 -bottom-20 h-56 w-80 border-y-2 border-l-2 border-white/20 bg-gradient-to-r from-white/10 to-transparent bg-no-repeat" />
                    </div>
                    <Disclosure.Panel
                      as="ul"
                      className="relative z-10 flex items-stretch gap-5"
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

        <SideBar />
      </div>
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
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 right-1/3 z-10 translate-x-1/2">
        <Image
          src="/assets/landing-page/bottom-right-glow.png"
          width={710}
          height={760}
          alt=""
        />
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 z-10 -translate-x-3/4">
        <Image
          src="/assets/landing-page/bottom-left-glow.png"
          width={990}
          height={1080}
          alt=""
        />
      </div>
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
        className="relative flex h-full flex-col justify-between !rounded-[0_0_40px_0] border-2 border-white/20 !bg-white/10 px-4 pt-3 pb-6 text-xs font-semibold backdrop-blur-sm"
      >
        {children}
        <ArrowRightIcon className="mt-2 h-4 w-4" />
      </a>
    </li>
  );
}
