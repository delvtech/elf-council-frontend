import React from "react";

import Container from "components/Container";
import Header from "components/Header";
import { Sidebar } from "components/Sidebar";

export default function Home() {
  return (
    <div>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="w-screen ">
          <Header />
          <Container />
        </div>
      </div>
    </div>
  );
}
