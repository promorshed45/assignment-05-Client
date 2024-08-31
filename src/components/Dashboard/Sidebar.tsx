import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "../../../src/assets/logo.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import AdminMenu from "./AdminDashboard/AdminMenu";
import UserMenu from "./UserDashboard/UserMenu";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const role = user.role;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="z-50 flex h-screen overflow-hidden border-r border-gray-200 dark:border-gray-800">
            <aside
                className={`transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto px-5 py-8 transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <div className="h-14 w-26">
                    <Link to="/">
                        <img alt="Elite Car Wash" className="h-full w-full" src={logo} />
                    </Link>
                </div>

                {role === "admin" ? <AdminMenu /> : <UserMenu />}
            </aside>
            <div className="relative flex-1 bg-white p-8 sm:p-0">
                <button
                    className="lg:hidden fixed top-3 left-3 z-50 p-1 text-gray-800 transition transform duration-200 hover:text-blue-600"
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
