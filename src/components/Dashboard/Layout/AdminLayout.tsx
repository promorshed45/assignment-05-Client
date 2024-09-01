import { Outlet } from 'react-router';
import Sidebar from '../Sidebar';
import Header from '../Header';
import UserDashboard from '../Users/UserDashboard';
import { useAppSelector } from '@/redux/hook';
import AdminOverview from '../Users/AdminOverview';

const AdminLayout = () => {
    const { user } = useAppSelector((state) => state.user);

    console.log(user.role);

    return (
        <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full flex-col flex px-3 bg-gray-100 dark:bg-transparent ">
          <Header />
          <div className="h-full overflow-auto smoothBar ">
           
          {user.role === 'admin' ? <AdminOverview/> : <UserDashboard/>}
            
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default AdminLayout;
