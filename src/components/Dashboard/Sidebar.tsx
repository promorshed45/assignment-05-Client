import { useState } from 'react';
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, LogIn, Menu } from 'lucide-react';
import logo from "../../../src/assets/logo.svg";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto border-r bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-5 py-8 transition-transform duration-300 lg:static lg:translate-x-0`}>
            <div className="h-14 w-26">
              <Link to="/">
                <img
                  alt="Elite Car Wash"
                  className="h-full w-full"
                  src={logo}
                />
              </Link>
            </div>
                <div className="mt-6 flex flex-1 flex-col justify-between">
                    <nav className="-mx-3 space-y-6">
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-900">Analytics</label>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition transform duration-300 hover:bg-gray-200 hover:scale-105 hover:text-gray-900"
                                href="#"
                            >
                                <BarChart className="h-5 w-5 text-gradient-to-r from-rose-400 to-red-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Dashboard</span>
                            </a>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition transform duration-300 hover:bg-gray-200 hover:scale-105 hover:text-gray-900"
                                href="#"
                            >
                                <Wallet className="h-5 w-5 text-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Sales</span>
                            </a>
                        </div>
                        <div className="space-y-3">
                            <label className="px-3 text-xs font-semibold uppercase text-gray-900">Content</label>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition transform duration-300 hover:bg-gray-200 hover:scale-105 hover:text-gray-900"
                                href="#"
                            >
                                <Newspaper className="h-5 w-5 text-gradient-to-r from-green-400 to-teal-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Blogs</span>
                            </a>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition transform duration-300 hover:bg-gray-200 hover:scale-105 hover:text-gray-900"
                                href="#"
                            >
                                <BellRing className="h-5 w-5 text-gradient-to-r from-yellow-400 to-orange-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Notifications</span>
                            </a>
                            <a
                                className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition transform duration-300 hover:bg-gray-200 hover:scale-105 hover:text-gray-900"
                                href="#"
                            >
                                <Paperclip className="h-5 w-5 text-gradient-to-r from-blue-400 to-cyan-500" aria-hidden="true" />
                                <span className="mx-2 text-sm font-medium">Checklists</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </aside>
            <div className="flex-1 bg-white p-8">
                <button
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 text-gray-800 transition transform duration-200 hover:text-blue-600"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-6 w-6" />
                </button>
                {/* Content goes here */}
            </div>
        </div>
    );
};

export default Sidebar;
