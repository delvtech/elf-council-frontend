import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement, ReactNode } from "react";
import Header from "src/efi-ui/app/Header";
import Sidebar from "src/efi-ui/app/Sidebar";

interface PageViewProps {
  children?: ReactNode;
}

export default function PageView(props: PageViewProps): ReactElement {
  const { children } = props;
  return (
    <div>
      <div className={tw("flex", "w-screen", "h-screen")}>
        <Sidebar />
        <div className={tw("w-screen")}>
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
