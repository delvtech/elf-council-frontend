import tw from "elf-tailwindcss-classnames";
import Header from "pages/components/Header";
import Sidebar from "pages/components/Sidebar";
import React, { ReactElement, ReactNode } from "react";

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
