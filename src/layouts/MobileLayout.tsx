import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <div className="relative mx-auto min-h-screen max-w-[430px] bg-mcm-white">
      <Outlet />
    </div>
  );
}