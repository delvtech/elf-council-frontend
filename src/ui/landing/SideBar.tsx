import { PropsWithChildren, ReactElement } from "react";
import ElementUrls from "src/elf/urls";
import TwitterIcon from "src/ui/base/svg/TwitterIcon";
import DiscordIcon from "src/ui/base/svg/DiscordIcon";
import TelegramIcon from "src/ui/base/svg/TelegramIcon";
import CommonwealthIcon from "src/ui/base/svg/CommonwealthIcon";

export default function SideBar(): ReactElement {
  return (
    <footer className="fixed top-0 left-0 flex h-screen flex-col justify-end bg-gradient-to-br from-principalBlue to-principalRoyalBlue">
      <ul className="relative z-10 flex flex-col gap-5 p-10">
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
