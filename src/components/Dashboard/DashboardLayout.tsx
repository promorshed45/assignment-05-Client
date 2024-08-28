
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider } from "../ui/ThemeProvider";

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark"> 
    <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full flex-col flex px-3 bg-gray-100 dark:bg-transparent ">
          <Header />
          <div className="h-full overflow-auto smoothBar ">
            <Outlet />
          </div>
        </div>
      </div>
      </ThemeProvider>
  );
};

export default DashboardLayout;