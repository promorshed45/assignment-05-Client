import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import logo from "../../../src/assets/logo.svg";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:container sticky w-full  z-20 top-0 start-0 bg-black">
      <div className="mx-auto flex  items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-12 w-24">
              <Link to="/">
                <img
                  alt="Elite Car Wash"
                  className="h-full w-full"
                  src={logo}
                />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block md:pl-16">
            <ul className="inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="text-md font-semibold text-gray-200 hover:text-red-600 hover:underline hover:decoration-red-600/[.33]"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden space-x-2 lg:block">
          <Link
            to='/login'
          >
            <button
              className="bg-yellow-500 px-2.5 py-1.5 rounded-sm outline-none hover:bg-gray-100"
            >
              <LogIn className="size-4 text-black" />
            </button>
          </Link>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="size-6 text-white cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute top-0 right-0 z-50 origin-top-right p-2 transform transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <h1 className="font-bold">
                      {" "}
                      Elite Car <span className="text-red-500">
                        {" "}
                        Wash{" "}
                      </span>{" "}
                    </h1>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="size-4 text-red-500" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="">
                  <nav className="grid">
                    {menuItems.map((item) => (
                      <NavLink
                        to={item.path}
                        className="block px-4 py-2 text-gray-700 hover:underline transition duration-300 ease-in-out btn btn-ghost"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-full h-0.5  bg-gray-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div className="ml-4 mt-2">
                  <Link to="/login">
                    <button
                      className="bg-yellow-500 px-2.5 py-1.5 rounded-sm outline-none hover:bg-slate-500"
                    >
                      <LogIn className="size-4 text-white " />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Services",
    path: "/service",
  }
];
