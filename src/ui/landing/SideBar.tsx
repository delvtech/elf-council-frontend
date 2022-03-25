import { PropsWithChildren, ReactElement } from "react";
import ElementUrls from "src/elf/urls";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import TelegramIcon from "src/ui/base/svg/TelegramIcon";
import CommonwealthIcon from "src/ui/base/svg/CommonwealthIcon";

// bottom-0 left-0 z-20 flex h-[72px] w-full justify-center px-5 py-4 lg:top-0 lg:z-10 lg:h-screen lg:w-[120px] lg:flex-col lg:items-center lg:justify-end lg:py-10

export default function SideBar(): ReactElement {
  return (
    <footer>
      {/* colored background in a separate container to be under the glows */}
      <div className="fixed bottom-0 left-0 z-20 h-[72px] w-full bg-gradient-to-br from-principalBlue to-principalRoyalBlue lg:z-0 lg:h-full lg:w-[120px]"></div>

      <ul className="fixed left-0 bottom-4 z-20 flex w-full justify-center gap-[8vw] lg:bottom-10 lg:z-10 lg:w-[120px] lg:flex-col lg:items-center lg:gap-5">
        <SocialLink href={ElementUrls.TWITTER} title="Twitter">
          <TwitterIcon className="h-auto w-5 fill-white" />
        </SocialLink>
        <SocialLink href={ElementUrls.DISCORD} title="Discord">
          <DiscordIcon className="h-auto w-5 fill-white" />
        </SocialLink>
        <SocialLink href={ElementUrls.TELEGRAM} title="Telegram">
          <TelegramIcon className="h-auto w-5 fill-white" />
        </SocialLink>
        <SocialLink href={ElementUrls.FORUM} title="Forum">
          <CommonwealthIcon className="h-auto w-5 fill-white" />
        </SocialLink>
      </ul>
    </footer>
  );
}

function SocialLink({
  title,
  href,
  children,
}: PropsWithChildren<{
  title: string;
  href: string;
}>) {
  return (
    <li className="flex">
      <a
        className="relative flex h-10 w-10 items-center justify-center border-2 border-transparent bg-no-repeat"
        style={{
          backgroundOrigin: "padding-box, border-box",
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 94, 190, 0.2), rgba(255, 255, 255, 0.048)), linear-gradient(to bottom right, rgba(0, 94, 190, 0.4), rgba(255, 255, 255, 0.4)",
        }}
        href={href}
        title={title}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    </li>
  );
}
