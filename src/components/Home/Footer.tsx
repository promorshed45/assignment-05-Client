import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
        <div className="w-full px-8 md:w-1/2 lg:px-0">
          <div className="inline-flex items-center space-x-2 pb-10">
            <div className="">
              <Link to="/">
                <img alt="Elite Car Wash" className="h-14 w-32" src={logo} />
              </Link>
            </div>
            
          </div>
          <h1 className="max-w-sm text-2xl font-semibold">
            Subscribe to our Newsletter
          </h1>
          <form
            action=""
            className="mt-4 inline-flex w-full items-center md:w-3/4"
          >
            <input
              className="flex h-10 w-full rounded-md border  border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
            ></input>
            <button
              type="button"
              className="ml-4 rounded-full bg-white px-2.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <ChevronRight className="size-6 text-rose-500" />
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-10 md:gap-6 md:mt-0 md:w-3/4 md:grid-cols-3">
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white text-left">
              Contact
            </p>
            <ul className="flex flex-col space-y-3 text-[14px]  text-left font-medium text-gray-500">
              <li> Ayshal Ali Mansion </li>
              <li> Pahartali, Raozan </li>
              <li> Chattagram, Bangladesh</li>
              <li> fitness@gmail.com </li>
              <li> Mobile No. 01851363745 </li>
            </ul>
          </div>

          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white text-left">
              Company
            </p>
            <ul className="flex flex-col space-y-3 text-[14px] text-left font-medium text-gray-500">
              <Link to='/about-us'><li>About us</li></Link>
              <Link to='/about-us'><li> Company History </li></Link>
              <Link to='/about-us'><li> Our Team </li></Link>
              <Link to='/about-us'><li> Our Vision </li></Link>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div className="mb-8 lg:mb-0">
            <p className="mb-6 text-lg font-semibold text-white text-left">
              Terms & Conditions
            </p>
            <ul className="flex flex-col space-y-4 text-[14px] text-left font-medium text-gray-500">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Warranty & Service </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mx-auto max-w-6xl items-center justify-center px-4 md:flex lg:px-0">
        <div className="mt-4 md:mt-0">
          <p className="text-sm font-medium text-gray-500">
            © 2024 Fitness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
