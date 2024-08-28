
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full flex-col flex bg-[#111827] px-3 ">
          <Header />
          <div className="h-full overflow-auto smoothBar ">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default DashboardLayout;