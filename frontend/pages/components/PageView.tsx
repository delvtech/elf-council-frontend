import React, { ReactElement, ReactNode } from "react";

import Header from "components/Header";
import Sidebar from "components/Sidebar";

interface PageViewProps {
  children?: ReactNode;
}

export default function PageView(props: PageViewProps): ReactElement {
  const { children } = props;
  return (
    <div>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="w-screen ">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
