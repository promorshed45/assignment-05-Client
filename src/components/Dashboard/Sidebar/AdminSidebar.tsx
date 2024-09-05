import { Calendar, CarTaxiFrontIcon, LayoutDashboardIcon, User2Icon, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <>
            <div className="mt-6 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-6">
                    <div className="space-y-3">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-500">Admin Dashboard</label>
                        <Link
                            to='/dashboard'
                            className="flex items-center rounded-lg px-3 py-2 text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                        >
                            <LayoutDashboardIcon className="h-5 w-5 text-gradient-to-r from-rose-400 to-red-500" aria-hidden="true" />
                            <span className="mx-2 pl-3 text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link
                            to='/dashboard/service-management'
                            className="flex items-center rounded-lg px-3 py-2 text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                        >
                            <CarTaxiFrontIcon className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                            <span className="mx-2 pl-3 text-sm font-medium">Service </span>
                        </Link>
                        <Link
                            to='/dashboard/slots-management'
                            className="flex items-center rounded-lg px-3 py-2 text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                        >
                            <Calendar className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                            <span className="mx-2 pl-3 text-sm font-medium">Slot </span>
                        </Link>
                        <Link
                            to='/dashboard/users-management'
                            className="flex items-center rounded-lg px-3 py-2 text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                        >
                            <User2Icon className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                            <span className="mx-2 pl-3 text-sm font-medium">User </span>
                        </Link>
                        <Link
                            to='/dashboard/booking-management'
                            className="flex items-center rounded-lg px-3 py-2 text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                        >
                            <Wallet className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                            <span className="mx-2 pl-3 text-sm font-medium">Booking </span>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default AdminSidebar;