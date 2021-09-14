import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import Container from "./components/Container";

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
