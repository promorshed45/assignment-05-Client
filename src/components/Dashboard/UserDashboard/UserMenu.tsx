import { BarChart, Wallet, Newspaper, BellRing, Paperclip, LogIn, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
    return (
        <>
           <div className="mt-6 flex flex-1 flex-col justify-between">
                    <nav className="-mx-3 space-y-6">
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-500">User Dashboard</label>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 dark:text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                                href="#"
                            >
                                <BarChart className="h-5 w-5 text-gradient-to-r from-rose-400 to-red-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Dashboard</span>
                            </a>
                            <Link
                            to='/dashboard/service-management'
                                className="flex items-center rounded-lg px-3 py-2 dark:text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                            >
                                <Wallet className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Service</span>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-500">Content</label>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 dark:text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                                href="#"
                            >
                                <Newspaper className="h-5 w-5 text-gradient-to-r from-green-400 to-teal-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Blogs</span>
                            </a>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 dark:text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                                href="#"
                            >
                                <BellRing className="h-5 w-5 text-gradient-to-r from-yellow-400 to-orange-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Notifications</span>
                            </a>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 dark:text-gray-300 transition transform duration-300 hover:bg-gray-200 hover:scale-105 dark:hover:text-gray-900"
                                href="#"
                            >
                                <Paperclip className="h-5 w-5 text-gradient-to-r from-blue-400 to-cyan-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Checklists</span>
                            </a>
                        </div>
                    </nav>
                </div> 
        </>
    );
};

export default UserMenu;