import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider } from "../ui/ThemeProvider";
import AdminOverview from "./Users/AdminOverview";
import UserDashboard from "./Users/UserOverview";
import { useAppSelector } from '@/redux/hook';

const DashboardLayout = () => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  // Determine if the current route is the main dashboard route
  const isDashboardHome = location.pathname === '/dashboard';

  return (
    <ThemeProvider defaultTheme="light"> 
      <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full flex-col flex px-3 bg-gray-100 dark:bg-transparent">
          <Header />
          <div className="h-full overflow-auto smoothBar">
            
            {/* Show AdminOverview or UserDashboard only on the dashboard home page */}
            {isDashboardHome && (
              user.role === 'admin' ? <AdminOverview/> : <UserDashboard/>
            )}
            
            {/* Render other components/pages */}
            <Outlet />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
