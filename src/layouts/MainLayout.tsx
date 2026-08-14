import { Outlet } from "react-router-dom";
import TabBar from "../components/TabBar";

export default function MainLayout() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen relative bg-white">
      <Outlet />
      <TabBar />
    </div>
  );
}
