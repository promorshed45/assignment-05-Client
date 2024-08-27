
import { Outlet } from "react-router-dom";
import DashboardHeader from "./Header";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../ui/ThemeProvider";

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full flex-col flex">
          <DashboardHeader />
          <div className="h-full overflow-auto smoothBar">
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;